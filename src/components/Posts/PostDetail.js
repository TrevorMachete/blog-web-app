import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../../firebase'; 
import { doc, getDoc, deleteDoc } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { FacebookShareButton, TwitterShareButton, LinkedinShareButton, WhatsappShareButton, TelegramShareButton, RedditShareButton, EmailShareButton } from 'react-share';
import '../../App.css';

const PostDetail = () => {
  const { id } = useParams(); // Retrieve the post ID from the URL
  const [post, setPost] = useState(null);
  const navigate = useNavigate(); // For navigation after delete or update

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const postRef = doc(db, 'blogs', id); // Create a reference to the post document
        const postDoc = await getDoc(postRef); // Fetch the document
        if (postDoc.exists()) {
          const postData = postDoc.data();
          setPost(postData);
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    fetchPost();
  }, [id]);

  if (!post) return <div>Loading...</div>;
  
  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, 'blogs', id));
      navigate('/welcome'); // Redirect after deletion
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <div className="post-detail-content">
      <div className="post-detail-main-content">
        {post ? (
          <div>
            <h2 id="article-title">{post.title}</h2>

            <p id="author-label">Author: {post.author ? post.author : 'SamaSkies'}</p>

            <hr/>
            <div className="post-content" dangerouslySetInnerHTML={{ __html: post.content.replace(/<img /g, '<img class="responsive-image" ') }} />

            <div className='button-group'>
              <Link to={`/edit-post/${id}`} className='link-button'>Edit Post</Link> {/* Link to edit page */}
              <button id='delete-button' onClick={handleDelete}>Delete Post</button> {/* Delete button */}
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default PostDetail;
