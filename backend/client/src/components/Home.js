import React from "react";
import Navbar from "./Navbar";
export default function Home() {
  return (
    <>
      <Navbar />
      <div id="carouselExampleCaptions" className="carousel slide">
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src="/images/mountfuji.jpg"
              className="d-block w-100"
              style={{ height: "500px" }}
              alt="..."
            />
            <div className="carousel-caption d-none d-md-block">
              <h2 style={{ color: "white" }}>Mount Fuji</h2>
              <p style={{ color: "white", fontSize: 16 }}>
                Celebrate Every Season. From snowy retreats to sunny adventures,
                find your perfect escape. Explore Seasonal Beauty.
              </p>
            </div>
          </div>
          <div className="carousel-item ">
            <img
              src="/images/paris.jpg"
              className="d-block w-100"
              style={{ height: "500px" }}
              alt="..."
            />
            <div className="carousel-caption d-none d-md-block">
              <h2>Paris</h2>
              <p style={{ fontSize: 18 }}>
                Explore the Magic of Paris. Uncover the allure of the City of
                Lights.
              </p>
            </div>
          </div>
          <div className="carousel-item">
            <img
              src="/images/beach.jpg"
              className="d-block w-100"
              style={{ height: "500px" }}
              alt="..."
            />
            <div className="carousel-caption d-none d-md-block">
              <h2 style={{ color: "black" }}>Bask in Tropical Paradise</h2>
              <p style={{ color: "black", fontSize: 16 }}>
                Escape to Tranquility. Immerse yourself in the serenity of our
                tropical beach destination.
              </p>
            </div>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      <section>
        <div className="container">
          <div className="feature-wrapper">
            <div>
              <div className="feature-icon">
                <i className="ri-plane-line"></i>
              </div>
              <h3 className="feature-title">Customizable Tours</h3>
              <p className="feature-description">
                Create your own itinerary and choose the destinations,
                activities, and experiences that match your interests and
                preferences.
              </p>
            </div>
            <div>
              <div className="feature-icon">
                <i className="ri-book-mark-line"></i>
              </div>
              <h3 className="feature-title">Plan, Personalize, Book</h3>
              <p className="feature-description">
                Planning your personalized travel experience has never been
                easier. Customize your itinerary and book your unique adventure
                with us today.
              </p>
            </div>
            <div>
              <div className="feature-icon">
                <i className="ri-time-line"></i>
              </div>
              <h3 className="feature-title">Custom Tours for Every Schedule</h3>
              <p className="feature-description">
                Whether you're a weekend warrior or a long-term traveler, our
                custom tours offer something for every time traveler.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="destination">
        <div className="container">
          <h2 className="destination-title">Top Destinations</h2>
          <div className="destination-wrapper">
            <div className="destination-list" id="destination-list">
              <div>
                <div className="destination-list-top">
                  <img src="/images/queenstown.jpg" />
                  <a className="destinations-list-top-favourite">
                    <i className="ri-heart-3-line"></i>
                  </a>
                </div>
                <div className="destination-list-content">
                  <div className="destination-list-content-location">
                    <i className="ri-global-line"></i>
                    Queenstown, New Zealand
                  </div>
                  <a className="destination-list-content-title" href="#">
                    Adventure hub, lake serenity
                  </a>
                  <div className="destination-list-content-rating">
                    <i className="ri-star-fill"></i>
                    <i className="ri-star-fill"></i>
                    <i className="ri-star-fill"></i>
                    <i className="ri-star-half-fill"></i>
                  </div>
                  <div className="destination-list-content-price">
                    from <span>$123</span>
                  </div>
                </div>
              </div>
              <div>
                <div className="destination-list-top">
                  <img src="/images/paris1.jpg" />
                </div>
                <div className="destination-list-content">
                  <div className="destination-list-content-location">
                    <i className="ri-global-line"></i>
                    Paris, France
                  </div>
                  <a className="destination-list-content-title" href="#">
                    Explore the City of Lights
                  </a>
                  <div className="destination-list-content-rating">
                    <i className="ri-star-fill"></i>
                    <i className="ri-star-fill"></i>
                    <i className="ri-star-fill"></i>
                  </div>
                  <div className="destination-list-content-price">
                    from <span>$163</span>
                  </div>
                </div>
              </div>
              <div>
                <div className="destination-list-top">
                  <img src="/images/barcelona.jpg" />
                </div>
                <div className="destination-list-content">
                  <div className="destination-list-content-location">
                    <i className="ri-global-line"></i>
                    Barcelona, Spain
                  </div>
                  <a className="destination-list-content-title" href="#">
                    Gaudí's art, beach vibes
                  </a>
                  <div className="destination-list-content-rating">
                    <i className="ri-star-fill"></i>
                    <i className="ri-star-fill"></i>
                    <i className="ri-star-fill"></i>
                    <i className="ri-star-half-fill"></i>
                  </div>
                  <div className="destination-list-content-price">
                    from <span>$110</span>
                  </div>
                </div>
              </div>
              <div>
                <div className="destination-list-top">
                  <img src="/images/dubrovnuc.jpg" />
                </div>
                <div className="destination-list-content">
                  <div className="destination-list-content-location">
                    <i className="ri-global-line"></i>
                    Dubrovnic, Croatia
                  </div>
                  <a className="destination-list-content-title" href="#">
                    Medieval walls, Adriatic splendor
                  </a>
                  <div className="destination-list-content-rating">
                    <i className="ri-star-fill"></i>
                    <i className="ri-star-fill"></i>
                    <i className="ri-star-fill"></i>
                    <i className="ri-star-half-fill"></i>
                  </div>
                  <div className="destination-list-content-price">
                    from <span>$103</span>
                  </div>
                </div>
              </div>
              <div>
                <div className="destination-list-top">
                  <img src="/images/budapest.jpg" />
                </div>
                <div className="destination-list-content">
                  <div className="destination-list-content-location">
                    <i className="ri-global-line"></i>
                    Budapest, Hungary
                  </div>
                  <a className="destination-list-content-title" href="#">
                    Danube beauty, thermal baths
                  </a>
                  <div className="destination-list-content-rating">
                    <i className="ri-star-fill"></i>
                    <i className="ri-star-fill"></i>
                    <i className="ri-star-fill"></i>
                  </div>
                  <div className="destination-list-content-price">
                    from <span>$115</span>
                  </div>
                </div>
              </div>
              <div>
                <div className="destination-list-top">
                  <img src="/images/kyoto.jpg" />
                </div>
                <div className="destination-list-content">
                  <div className="destination-list-content-location">
                    <i className="ri-global-line"></i>
                    Kyoto, Japan
                  </div>
                  <a className="destination-list-content-title" href="#">
                    Timeless temples, cherry blossoms
                  </a>
                  <div className="destination-list-content-rating">
                    <i className="ri-star-fill"></i>
                    <i className="ri-star-fill"></i>
                    <i className="ri-star-fill"></i>
                  </div>
                  <div className="destination-list-content-price">
                    from <span>$107</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer className="bg-dark text-white p-4">
        <div className="container">
          <div className="row">
            {/* Company Information */}
            <div className="col-md-6">
              <h5>Our Mission</h5>
              <p>
                At Group 15, we aim to revolutionize digital experiences with
                cutting-edge technology and innovative solutions. We strive to
                provide our users with seamless and impactful tools that make a
                difference.
              </p>
              <p>© 2024 Group 15 - Empowering the Future</p>
            </div>

            {/* Contact & Social Links */}
            <div className="col-md-6">
              <h5>Follow Us</h5>
              <p>
                Stay updated with our latest news and products on social media:
              </p>
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="/images/facebooklogo.png"
                  height="35"
                  className="mx-1"
                  width="35"
                  alt="Facebook"
                />
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="/images/instagramlogo.png"
                  height="35"
                  className="mx-1"
                  width="35"
                  alt="Instagram"
                />
              </a>
              <a
                href="https://www.twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="/images/twitterlogo.png"
                  className="mx-1"
                  height="35"
                  width="35"
                  alt="Twitter"
                />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
