import React, { useEffect, useState } from 'react';
import { db } from '../../firebase'; // Adjust the import based on your firebase setup
import { collection, getDocs, query, orderBy, where } from 'firebase/firestore'; // Import Firestore methods
import { Link } from 'react-router-dom';
import { useUser } from '../../UserContext'; // Import UserContext
import './RecentPosts.css';

const RecentPosts = () => {
  const [posts, setPosts] = useState([]);
  const { user } = useUser(); // Get user from UserContext

  useEffect(() => {
    const fetchPosts = async () => {
      if (!user || !user.uid) {
        console.error('User is not logged in or user ID is undefined');
        alert('User is not logged in');
        return; // Ensure user is logged in and user ID is defined
      }

      try {
        console.log('Fetching posts for user:', user.uid); // Debugging log

        // Create a reference to the 'blogs' collection
        const postsCollection = collection(db, 'blogs');
        // Create a query to filter posts by userId, order by 'createdAt', and limit the results
        const q = query(
          postsCollection,
          where('userId', '==', user.uid),
          orderBy('createdAt', 'desc')
        );
        // Fetch the documents
        const querySnapshot = await getDocs(q);
        // Map the documents to an array of post data
        const postsData = querySnapshot.docs.map(doc => {
          const content = doc.data().content;
          const pTagsContent = content.match(/<p>(.*?)<\/p>/g)?.map(tag => tag.replace(/<\/?p>/g, '')) || [];
          return {
            id: doc.id,
            title: doc.data().title,
            content: pTagsContent.join(' '), // Join all <p> tag content
            media: doc.data().media,
            date: new Date(doc.data().createdAt.seconds * 1000).toLocaleString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
          };
        });
        // Log postsData to verify
        console.log('Posts fetched:', postsData); 
        // Update the state with the fetched posts
        setPosts(postsData);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, [user]);

  return (
    <div>
      <h2>My Posts</h2>
      <ul className="post-list">
        {posts.map(post => (
          <li key={post.id} className="post-card">
            <img src={post.media} alt="Post Media" className="post-media" />
            <div className="post-content">
              <h3>{post.title}</h3>
              <p>{post.content.substring(0, 100)}...</p>
              <p>{post.date}</p>
              <Link to={`/post/${post.id}`}><div id="read-more">Read more</div></Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentPosts;
