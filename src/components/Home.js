import React, { useEffect, useRef, useContext } from 'react';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './bootstrap-4.0.0-dist/css/bootstrap-grid.min.css';
import './bootstrap-4.0.0-dist/css/bootstrap.min.css';
import loadScript from './utils/loadScript';
import $ from 'jquery';
import './style.css';

// Import images
import pin from './assets/pin.jpg';
import ru from './assets/ru.jpg';
import chopper from './assets/chopper.jpg';
import erick from './assets/erick.jpg';
import pexelsKatieCerami from './assets/pexels-katie-cerami-110690626-20562279.jpg';
import boeing737 from './assets/2.jpg';
import boeingC130 from './assets/pexels-harrisonhaines-7286083.jpg';
import cameronA400 from './assets/pexels-skitterphoto-597054.jpg';

const App = () => {

  useEffect(() => {
    const loadDependencies = async () => {
      try {
        await loadScript('https://code.jquery.com/jquery-3.2.1.slim.min.js');
        await loadScript('https://cdn.jsdelivr.net/npm/popper.js@1.12.9/dist/umd/popper.min.js');
        await loadScript('https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js');
        console.log('Scripts loaded successfully');

        // Initialize carousel after scripts are loaded
        $(carouselRef.current).carousel();
      } catch (error) {
        console.error('Error loading scripts', error);
      }
    };

    loadDependencies();
  }, []);

  const handlePrev = () => {
    $(carouselRef.current).carousel('prev');
  };

  const handleNext = () => {
    $(carouselRef.current).carousel('next');
  };

  return (

    <div>
      <nav className="navbar navbar-expand-lg navbar-dark">
        <a className="navbar-brand" href="./index.html"><strong style={{ fontWeight: 800 }}>SK</strong>hire</a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <a className="nav-link" href="./index.html">HOME <span className="sr-only">(current)</span></a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#video">VIDEO</a>
            </li>
            
<li className="nav-item">
  <Route path="ai-image-editor" element={<AIImageEditor />} />
</li>

            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-toggle="dropdown"
                aria-expanded="false">
                OUR FLEET
              </a>
              <div className="dropdown-menu yo">
                <a className="dropdown-item" href="videos/vid4.html">Bombardier Challenger 650 </a>
                <a className="dropdown-item" href="videos/vid2.html">Gulfstream G650</a>
                <a className="dropdown-item" href="videos/vid1.html">The Cessna Citation X </a>
                <a className="dropdown-item" href="videos/vid3.html">Embraer Phenom 300 </a>
                <a className="dropdown-item" href="videos/vid5.html">Piper M600</a>
                <a className="dropdown-item" href="videos/vid6.html">Sikorsky S-76</a>
                <a className="dropdown-item" href="videos/vid7.html">Robinson R44 </a>
                <a className="dropdown-item" href="videos/vid8.html">Cameron A-400 here</a>
                <a className="dropdown-item" href="videos/vid9.html">Airbus H160 here</a>
              </div>
            </li>
          </ul>
          <ul className="ml-auto d-flex navbar-nav">
            <li className="nav-item jk">
              <a className="nav-link jk" href="#sky">ABOUT US</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#see">CONTACT US</a>
            </li>
          </ul>
        </div>
      </nav>
      <section className="meda">
        <div className="container-fluid">
          <div className="row">
            <div className="col"></div>
            <div className="col-sm-12 col-md-12">
              <div className="jumbotron jumbotron-fluid">
                <div className="container">
                  <h1 className="display-3 hi">SkyHire</h1>
                  <p className="lead yu">Premier Flight Experiences Since 1987</p>
                </div>
              </div>
            </div>
            <div className="col"></div>
          </div>
          <div className="row">
            <div className="col"></div>
            <div className="col-md-6 col-sm-58">
              <div id="carouselExampleControls" className="carousel slide" data-ride="carousel" ref={carouselRef}>
                <div className="carousel-inner">
                  <div className="carousel-item active">
                    <img className="d-block w-100" src={pin} alt="First slide" />
                  </div>
                  <div className="carousel-item">
                    <img className="d-block w-100" src={ru} alt="Second slide" />
                  </div>
                  <div className="carousel-item">
                    <img className="d-block w-100" src={chopper} alt="Third slide" />
                    <div className="carousel-caption d-none d-md-block">
                      <h5>Commando Fridays</h5>
                      <p>Enjoy Combat flying</p>
                    </div>
                  </div>
                </div>
                <a
                  className="carousel-control-prev"
                  href="#"
                  role="button"
                  onClick={handlePrev}>
                  <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span className="sr-only">Previous</span>
                </a>
                <a
                  className="carousel-control-next"
                  href="#"
                  role="button"
                  onClick={handleNext}>
                  <span className="carousel-control-next-icon" aria-hidden="true"></span>
                  <span className="sr-only">Next</span>
                </a>
              </div>
              <div className="ti">
                <button
                  type="button"
                  className="btn btn-primary orange"
                  data-toggle="modal"
                  data-target="#exampleModal">
                  Let's go flying
                </button>
              </div>
            </div>
            <div className="col"></div>
          </div>
        </div>
      </section>
      <section className="second" id="sky">
        <div className="row">
          <div className="col-md-4 offset-md-1 offset-lg-1 col-lg-2">
            <img className="img-fluid pot" src={erick} alt="Erick" />
          </div>
          <div className="col-md-7 col-lg-6">
            <div className="row">
              <div className="col-sm-12">
                <p className="meaow">
                  Welcome to SkyHire, your premier destination for private plane rentals. Experience
                  luxury and convenience with our modern fleet, skipping long lines and delays. Whether
                  for business or leisure, our spacious cabins and plush seating ensure comfort and
                  productivity, tailored to your needs.
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12 col-md-12 col-lg-8">
                <p className="meaow rt">
                  At SkyHire, safety and customer satisfaction are our top priorities. Our experienced
                  pilots and crew adhere to the highest safety standards, providing you with a smooth and
                  secure journey. We offer a diverse range of aircraft, from light jets for short trips to
                  heavy jets for long-distance travel, ensuring we meet all your travel requirements. Our
                  simple booking process allows you to request a quote, select your aircraft, and confirm
                  your flight with ease.
                </p>
              </div>
              <div className="col-sm-12 col-md-8 col-lg-3">
                <img className="img-fluid" src={pexelsKatieCerami} alt="Pexels Katie Cerami" />
              </div>
            </div>
          </div>
          <div className="col"></div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <div className="cen"></div>
          </div>
        </div>
      </section>
      <section className="boeing" id="hf">
        <div className="container">
          <h2 className="tg" id="fleet">New fleet</h2>
          <div className="row">
            <div className="col-12">
              <div className="row">
                <div className="col-md-4 col-sm-12 col-lg-4">
                  <img className="img-fluid" src={boeing737} alt="Boeing 737" />
                  <div className="card-body jj">
                    <h6>Boeing 737</h6>
                    <p><strong>Range</strong>: 3,850 nautical miles</p>
                    <p><strong>Capacity</strong>: Up to 189 passengers in a high-density configuration</p>
                    <p><strong>Features</strong>: Customizable interiors for VIP travel, large cargo hold</p>
                  </div>
                </div>
                <div className="col-md-4 col-sm-12 col-lg-4">
                  <img className="img-fluid" src={boeingC130} alt="Boeing C-130 Hercules" />
                  <div className="card-body jj">
                    <h6>Boeing C-130 Hercules</h6>
                    <p><strong>Range</strong>: 2,360 nautical miles</p>
                    <p><strong>Capacity</strong>: Up to 92 passengers or significant cargo</p>
                    <p><strong>Features</strong>: Customizable interiors for VIP travel, large cargo hold</p>
                  </div>
                </div>
                <div className="col-md-4 col-sm-12 col-lg-4">
                  <img className="img-fluid" src={cameronA400} alt="Cameron A-400" />
                  <div className="card-body jj">
                    <h6>Cameron A-400</h6>
                    <p><strong>Range</strong>: Upto 3 hours of flight</p>
                    <p><strong>Capacity</strong>:Up to 24 passengers</p>
                    <p><strong>Features</strong>: Ideal for sightseeing and adventure tours, Large basket for carrying multiple passengers.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">GETTING STARTED GUIDE</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span style={{ color: 'white' }} aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div>
                <h6>1. Explore Our Services</h6>
                <p>Visit our website to browse our fleet, including jets and hot air balloons.</p>
                <h6>2. Book a Call</h6>
                <p>Click the "Book a Call" button to schedule a consultation with our flight coordinators.</p>
                <h6>3. Get Your Quote</h6>
                <p>Receive a personalized quote during your consultation based on your travel needs.</p>
                <h6>4. Confirm Your Booking</h6>
                <p>Confirm your flight and receive your ticket directly after the consultation.</p>
                <h6>5. Enjoy Your Flight</h6>
                <p>Our team will ensure a seamless experience from start to finish. <a href="https://app.acuityscheduling.com/schedule.php?owner=33176001">Book your call now</a>.</p>
              </div>
              <button type="submit" className="btn btn-secondary it" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
      <section>
        <div className="embed-responsive embed-responsive-21by9 rtu" id="video">
          <iframe
            width="100%"
            height="511"
            src="https://www.youtube.com/embed/3kTK4u-2Dcs"
            title="4K Boeing 737 Beautiful Sunset Cockpit Landing in Dubai (DXB/OMDB)"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen></iframe>
        </div>
      </section>
      <section className="footer2" id="last">
        <div className="row">
          <div className="col"></div>
          <div className="col-12 col-12-sm">
            <div className="row" id="see">
              <div className="col-md-4 col-sm-6">
                <h4>Contact us</h4>
                <p>Email: info@skyhire.com</p>
                <p>Phone: +123 456 7890</p>
                <p>Address: 123 Aviation Blvd, Suite 100, City, State, ZIP</p>
              </div>
              <div className="col-md-4 col-sm-6">
                <h4>Follow Us</h4>
                <p>Facebook: SkyHire</p>
                <p>Twitter: @SkyHire</p>
                <p>Instagram: @SkyHire</p>
              </div>
              <div className="col-md-4 col-sm-6">
                <h4>About Us</h4>
                <p>SkyHire offers luxury private plane rentals with a focus on safety and customer satisfaction. Enjoy a seamless, comfortable journey with our modern fleet.</p>
              </div>
            </div>
          </div>
          <div className="col"></div>
        </div>
      </section>
    </div>

  );
};

export default App;
