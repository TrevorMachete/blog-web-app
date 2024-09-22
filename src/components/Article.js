import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { db } from '../firebase'; // Import your Firebase Firestore instance
import { collection, getDocs, doc, getDoc } from 'firebase/firestore'; // Import Firestore methods
import '../App.css';
import Footer from './Footer';
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
  TelegramShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  WhatsappIcon,
  TelegramIcon
} from 'react-share';

const Article = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [popularPosts, setPopularPosts] = useState([]);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        console.log('Fetching article with ID:', id); 
        const articleDoc = doc(db, 'blogs', id); 
        const docSnap = await getDoc(articleDoc);
        if (docSnap.exists()) {
          const articleData = docSnap.data();
          const formattedDate = new Date(articleData.createdAt.seconds * 1000).toLocaleString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
          setArticle({ ...articleData, date: formattedDate });
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching article:', error);
      }
    };

    if (id) {
      fetchArticle();
    } else {
      console.error('No ID provided');
    }
  }, [id]);

  useEffect(() => {
    const fetchPopularPosts = async () => {
      try {
        const postsCollection = collection(db, 'blogs');
        const querySnapshot = await getDocs(postsCollection);
        const postsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        
        // Shuffle the posts array and select 5 random posts
        const shuffledPosts = postsData.sort(() => 0.5 - Math.random());
        const selectedPosts = shuffledPosts.slice(0, 5);
        
        setPopularPosts(selectedPosts);
      } catch (error) {
        console.error('Error fetching popular posts:', error);
      }
    };

    fetchPopularPosts();
  }, []);

  if (!article) return <div>Loading...</div>;

  return (
    <div>
      {/* Page Wrapper */}
      <div className="page-wrapper">
        {/* Content */}
        <div className="content clearfix">
          {/* Main Content Wrapper */}
          <div className="main-content-wrapper">
            <div className="main-content single">
              <h2 id="article-title">{article.title}</h2>
              <p id="article-date-time">{article.date}</p>

              <div className="share-buttons-container">
                <div className="share-buttons">
                  <FacebookShareButton url={window.location.href}>
                    <FacebookIcon size={32} round />
                  </FacebookShareButton>
                  <TwitterShareButton url={window.location.href}>
                    <TwitterIcon size={32} round />
                  </TwitterShareButton>
                  <LinkedinShareButton url={window.location.href}>
                    <LinkedinIcon size={32} round />
                  </LinkedinShareButton>
                  <WhatsappShareButton url={window.location.href}>
                    <WhatsappIcon size={32} round />
                  </WhatsappShareButton>
                  <TelegramShareButton url={window.location.href}>
                    <TelegramIcon size={32} round />
                  </TelegramShareButton>
                </div>
              </div>

              <p id="author-label">Author: {article.author ? article.author : 'SamaSkies'}</p>

              <hr/>
              <div className="post-content" dangerouslySetInnerHTML={{ __html: article.content.replace(/<img /g, '<img class="responsive-image" ') }} />

            </div>
          </div>
          {/* // Main Content */}

          {/* Sidebar */}
          <div className="sidebar single">

            <div className="section popular">
              <h2 className="section-title">Popular</h2>
              {popularPosts.map(post => (
                <div key={post.id} className="post clearfix">
                  <img src={post.media} alt="" />
                  <Link to={`/article/${post.id}`} className="title">
                    <h5>{post.title.substring(0, 50) + '...' }</h5>
                  </Link>
                </div>
              ))}
            </div>

            <div className="section topics">
              <h2 className="section-title">Topics</h2>
              <ul>
                <li><Link to="#">Poems</Link></li>
                <li><Link to="#">Quotes</Link></li>
                <li><Link to="#">Fiction</Link></li>
                <li><Link to="#">Biography</Link></li>
                <li><Link to="#">Motivation</Link></li>
                <li><Link to="#">Inspiration</Link></li>
                <li><Link to="#">Life Lessons</Link></li>
              </ul>
            </div>
          </div>
          {/* // Sidebar */}
        </div>
        {/* // Content */}
      </div>
      {/* // Page Wrapper */}

      {/* Footer */}
      <Footer />
      {/* // Footer */}
    </div>
  );
};

export default Article;
