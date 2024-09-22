import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import './EditPost.css';

const EditPost = () => {
  const { id } = useParams(); // Retrieve the post ID from the URL
  const [post, setPost] = useState({ title: '', content: '' });
  const navigate = useNavigate(); // For navigation after update

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const postRef = doc(db, 'blogs', id); // Create a reference to the post document
        const postDoc = await getDoc(postRef); // Fetch the document
        if (postDoc.exists()) {
          setPost(postDoc.data()); // Set the state with fetched data
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    fetchPost();
  }, [id]);

  const handleChange = (e, editor) => {
    const data = editor.getData();
    setPost((prevPost) => ({
      ...prevPost,
      content: data,
    }));
  };

  const handleTitleChange = (e) => {
    const { name, value } = e.target;
    setPost((prevPost) => ({
      ...prevPost,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const postRef = doc(db, 'blogs', id);
      await updateDoc(postRef, post);
      navigate(`/post/${id}`); // Redirect to the post detail page after updating
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  return (
    <div className='container'>
      <h2>Edit Post</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={post.title}
            onChange={handleTitleChange}
          />
        </div>
        <div>
          <label>Content</label>
          <CKEditor
            editor={ClassicEditor}
            data={post.content}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Update Post</button>
      </form>
    </div>
  );
};

export default EditPost;
