import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { db, storage, auth } from "../../firebase";
import { collection, addDoc } from "firebase/firestore"; // Firestore methods
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import "./CreatePost.css";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [media, setMedia] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        navigate("/login"); // Redirect to login if not logged in
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("You need to be logged in to create a post.");
      return;
    }
    try {
      await addDoc(collection(db, "blogs"), {
        title: title,
        content: content,
        author: author,
        media: media,
        userId: user.uid,
        createdAt: new Date(),
      });
      alert("Blog added successfully!");
      setTitle("");
      setContent("");
      setAuthor("");
      setMedia(null);
    } catch (error) {
      console.error("Error adding blog: ", error);
    }
  };

  // Custom Upload Adapter for Firebase Storage
  class MyUploadAdapter {
    constructor(loader) {
      this.loader = loader;
    }

    upload() {
      return this.loader.file.then(
        (file) =>
          new Promise((resolve, reject) => {
            const storageRef = ref(storage, `images/${file.name}`);
            uploadBytes(storageRef, file)
              .then((snapshot) => getDownloadURL(snapshot.ref))
              .then((url) => {
                console.log('Upload Adapter URL:', url); 
                setMedia(url); 
                resolve({
                  default: url,
                });
              })
              .catch((error) => {
                reject(error);
              });
          })
      );
    }
  }

  function MyCustomUploadAdapterPlugin(editor) {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
      return new MyUploadAdapter(loader);
    };
  }

  const extractTitleAndMedia = (data) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(data, 'text/html');
    const heading = doc.querySelector('h2');
    const image = doc.querySelector('img');

    if (heading) {
      setTitle(heading.textContent);
    }

    if (image) {
      setMedia(image.src);
    }
  };

  return (
    <div className="create-post">
      <h2>Add a New Blog</h2>
      <form onSubmit={handleSubmit}>
        <label>Blog Title:</label>
        <input
          type="text"
          name="title"
          placeholder="Enter blog title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Blog Content:</label>
        <CKEditor
          editor={ClassicEditor}
          data={content}
          onChange={(event, editor) => {
            const data = editor.getData();
            setContent(data);
            extractTitleAndMedia(data);
          }}
          config={{
            extraPlugins: [MyCustomUploadAdapterPlugin],
            image: {
              toolbar: [
                'imageTextAlternative',
                'imageStyle:full',
                'imageStyle:side',
                'resizeImage:50',
                'resizeImage:75',
                'resizeImage:original',
                'cropImage'
              ]
            }
          }}
        />
        <label>Blog Author:</label>
        <input
          type="text"
          name="author"
          placeholder="Author name"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreatePost;
