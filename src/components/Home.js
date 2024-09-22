import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { db } from '../firebase'; // Import your Firebase Firestore instance
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore'; // Import Firestore methods
import '../App.css';
import Footer from './Footer';

const addScripts = () => {
  const jqueryScript = document.createElement('script');
  jqueryScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js';
  jqueryScript.async = true;
  document.body.appendChild(jqueryScript);

  const slickScript = document.createElement('script');
  slickScript.src = 'https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js';
  slickScript.async = true;
  document.body.appendChild(slickScript);
};

const addFontAwesome = () => {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'https://use.fontawesome.com/releases/v5.7.2/css/all.css';
  link.integrity = 'sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr';
  link.crossOrigin = 'anonymous';
  document.head.appendChild(link);
};

const settings = {
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
  nextArrow: <div className="next">▶</div>,
  prevArrow: <div className="prev">◀</div>,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
};

const Home = ({ navVisible }) => {
  const [items, setItems] = useState([]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    addScripts();
  }, []);

  useEffect(() => {
    addFontAwesome();
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsCollection = collection(db, 'blogs');
        const q = query(postsCollection, orderBy('createdAt', 'desc'), limit(5));
        const querySnapshot = await getDocs(q);
        const postsData = querySnapshot.docs.map(doc => {
          console.log('Document ID:', doc.id); // Log the document ID
          const content = doc.data().content;
          const pTagsContent = content.match(/<p>(.*?)<\/p>/g)?.map(tag => tag.replace(/<\/?p>/g, '')) || [];
          return {
            id: doc.id,
            imgSrc: doc.data().media,
            title: doc.data().title,
            date: new Date(doc.data().createdAt.seconds * 1000).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
            content: pTagsContent.join(' '), // Join all <p> tag content
            author: doc.data().author || 'SAMASKIES'
          };
        });
        setPosts(postsData);
        setItems(postsData);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="page-wrapper">
      {/* Content */}
      {!navVisible && (
        <div className="post-slider">
          <div className="div">
            <h1 className="slider-title">Stop by for clear sky!</h1>
          </div>
            <Slider {...settings} className="post-wrapper">
            {items.map(item => (
              <div className="post" key={item.id}>
                <img src={item.imgSrc} alt="" className="slider-image" />
                <div className="post-info">
                  <h4>
                    <a >{item.title.substring(0, 33)}...</a>
                  </h4>
                  <i className="far fa-user author-label-home"> {item.author}</i>
                   
                  <i className="far fa-calendar date-home"> {item.date}</i>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      )}

      <div className="content clearfix">
        {/* Main Content */}
        <div className="main-content">
          <h1 className="recent-post-title">Recent Posts</h1>
          {posts.map(post => (
            <div className="post clearfix" key={post.id}>
              <Link to={`/article/${post.id}`}>
                <img src={post.imgSrc} alt="" className="post-image" />
                <div className="post-preview">
                  <h2><a href="single.html">{post.title.substring(0, 50)}...</a></h2>
                  <i className="far fa-user"> {post.author}</i>
                  <i className="far fa-calendar"> {post.date}</i>
                  <p className="preview-text" dangerouslySetInnerHTML={{ __html: post.content.substring(0, 120) + '...' }} />
                  <a href="single.html" className="btn read-more">Read More</a>
                </div>
              </Link>
            </div>
          ))}
        </div>
        {/* // Main Content */}

        <div className="sidebar">
          <div className="section search">
            <h2 className="section-title">Search</h2>
            <form action="index.html" method="post">
              <input type="text" name="search-term" className="text-input" placeholder="Search..." />
            </form>
          </div>

          <div className="section topics">
            <h2 className="section-title">Topics</h2>
            <ul>
              <li><a href="#">Poems</a></li>
              <li><a href="#">Quotes</a></li>
              <li><a href="#">Fiction</a></li>
              <li><a href="#">Biography</a></li>
              <li><a href="#">Motivation</a></li>
              <li><a href="#">Inspiration</a></li>
              <li><a href="#">Life Lessons</a></li>
            </ul>
          </div>
        </div>
      </div>
      {/* // Content */}

      {/* Footer */}
      <Footer />
      {/* // Footer */}
    </div>
  );
};

export default Home;
