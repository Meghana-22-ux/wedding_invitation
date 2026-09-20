import './App.css';
import mantapa from './assets/mantapa.png';
import { useEffect, useState, useRef} from "react";
import React from "react";

import aliaPhoto from "./images/alia.jpg";
import aryanPhoto from "./images/aryan.jpg";

function Countdown() {
  const targetDate = new Date("October 30, 2026 00:00:00").getTime();

  const calculateTimeLeft = () => {
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="countdown-section">

      <h2>Let the Countdown begins</h2>

      <div className="countdown-container">

        <div className="countdown-item">
          <span>{timeLeft.days}</span>
          <small>Days</small>
        </div>

        <div className="countdown-item">
          <span>{String(timeLeft.hours).padStart(2, "0")}</span>
          <small>Hrs</small>
        </div>

        <div className="countdown-item">
          <span>{String(timeLeft.minutes).padStart(2, "0")}</span>
          <small>Mins</small>
        </div>

        <div className="countdown-item">
          <span>{String(timeLeft.seconds).padStart(2, "0")}</span>
          <small>Secs</small>
        </div>

      </div>

    </section>
  );
}


function App() {
  const [showAiMessage, setShowAiMessage] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
const audioRef = useRef(null);

const toggleMusic = () => {
  if (!audioRef.current) return;

  if (isMusicPlaying) {
    audioRef.current.pause();
    setIsMusicPlaying(false);
  } else {
    audioRef.current.play();
    setIsMusicPlaying(true);
  }
};
  return (
    <div className="wedding-page">

      {/* NAVBAR */}
      <nav className="navbar">
        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#gallery">Gallery</a>
        </div>
      </nav>


      {/* FLORAL BORDER */}
      <div className="floral-border">
        <img
          src="/floral-border.png"
          alt=""
          className="floral-image"
        />
      </div>


      {/* ==============================
          FIRST / HOME SECTION
      =============================== */}

      <main className="hero" id="home">

        <p className="invitation-text">
          Inviting you to the celebration of
        </p>

        <h1 className="couple-names">
          <span>Alia Nair</span>
          <small>weds</small>
          <span>Aryan Kapoor</span>
        </h1>

        <p className="event-details">
          Oct 30 &amp; 31, 2026
          <span>|</span>
          Hall Complex
        </p>

        <button
          className="maps-button"
          onClick={() =>
            window.open(
              'https://www.google.com/maps',
              '_blank'
            )
          }
        >
          Open in Maps
        </button>


        {/* MANDAP */}
        <div className="wedding-image">
          <img
            src={mantapa}
            alt="Wedding Mandap"
            className="mandap-image"
          />
        </div>


        {/* BOTTOM CORNER FLOWERS */}
        <img
          src="/images/left-flower.png"
          alt=""
          className="bottom-flower bottom-left"
        />

        <img
          src="/images/right-flower.png"
          alt=""
          className="bottom-flower bottom-right"
        />

      </main>


      {/* ==============================
          SECOND / COUNTDOWN SECTION
      =============================== */}

      <Countdown />

<CoupleStory />

<WishesSection />

<section className="send-wishes-section">

  <img
    src="/images/couple-flower.png"
    className="wishes-flower wishes-flower-top-left"
    alt=""
  />

  <img
    src="/images/couple-flower.png"
    className="wishes-flower wishes-flower-top-right"
    alt=""
  />

  <img
    src="/images/flower-bottom-left.png"
    className="wishes-flower wishes-flower-bottom-left"
    alt=""
  />

  <img
    src="/images/flower-bottom-right.png"
    className="wishes-flower wishes-flower-bottom-right"
    alt=""
  />

  <h2>Send your Wishes</h2>

  <div className="wish-form">

    <input
      type="text"
      placeholder="Your Name"
    />

    <div className="wishes-textarea-wrapper">

      <textarea
        placeholder="Your Wishes"
      />

      <button
        type="button"
        className="ai-wishes-button"
        onClick={() => {
          setShowAiMessage(true)
          setTimeout(() =>{

          setShowAiMessage(false);
        },2000);
      }}
      >
        ✨ Generate AI Wishes
      </button>

    </div>
    {showAiMessage && (
      <p
        className="ai-wishes-message">
          You have to save the template for generating wishes.

        </p>
    )}

    <button
      type="button"
      className="submit-wish"
    >
      Submit
    </button>

  </div>

</section>

<WeddingEvents />
<Footer />  
<audio
  ref={audioRef}
  src="/music/wedding-music.mp3"
  loop
/>

<button
  className="music-button"
  onClick={toggleMusic}
  aria-label="Toggle music"
>
  {isMusicPlaying ? "🔊" : "🔇"}
</button>

      {/* FLOATING BUTTONS */}
      <div className="floating-buttons">

        <button
          className="float-button"
          onClick={() => {
            window.location.href = 'tel:+910000000000';
          }}
        >
          ☎
        </button>

        <button className="float-button">
          🔇
        </button>

      </div>

    </div>
  );
}
// ===============================
// COUPLE STORY SECTION
// ===============================

function CoupleStory() {
  const storyRef = useRef(null);
const [storyAnimated, setStoryAnimated] = useState(false);

useEffect(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        setStoryAnimated(true);
        observer.disconnect();
      }
    },
    {
      threshold: 0.25
    }
  );

  if (storyRef.current) {
    observer.observe(storyRef.current);
  }

  return () => observer.disconnect();
}, []);
  return (
    <section
  ref={storyRef}
  className={`couple-story ${storyAnimated ? "story-animate" : ""}`}
>

      <img
  src="/images/couple-flower.png"
  className="story-golden-flower story-golden-left"
  alt=""
/>

<img
  src="/images/couple-flower.png"
  className="story-golden-flower story-golden-right"
  alt=""
/>


      {/* =========================
          ALIA SECTION
      ========================= */}

      <div className="story-row alia-row">

        <div className="story-text alia-text">

          <h2>Alia Nair</h2>

          <h4>
            D/o Mr. Suresh Nair &amp; Mrs. Lakshmi Nair
          </h4>

          <p>
            A free spirit wrapped in grace, Alia moves through life with quiet
            confidence, an infectious laugh, and a kindness that makes everyone
            around her feel at home.
          </p>

        </div>


        <div className="story-photo alia-photo">

          <div className="photo-frame">
            <img
              src={aliaPhoto}
              alt="Alia Nair"
            />
          </div>

        </div>

      </div>



      {/* =========================
          ARYAN SECTION
      ========================= */}

      <div className="story-row aryan-row">

        <div className="story-photo aryan-photo">

          <div className="photo-frame">
            <img
              src={aryanPhoto}
              alt="Aryan Kapoor"
            />
          </div>

        </div>


        <div className="story-text aryan-text">

          <h2>Aryan Kapoor</h2>

          <h4>
            S/o Mr. Rajesh Kapoor &amp; Mrs. Meena Kapoor
          </h4>

          <p>
            A gentle soul with a poet's heart and an architect's mind, Aryan
            finds beauty in the details, whether in the curve of a building or
            the warmth of a quiet afternoon.
          </p>

        </div>

      </div>


      {/* Bottom decorative line */}

      <div className="story-bottom-line"></div>

    </section>
  );
}
function WishesSection() {
  const wishes = [
    {
      name: "Rahul",
      message:
        "May your marriage be filled with endless love, shared dreams, warm laughter, and beautiful adventures. Wishing you both a wonderful life together, surrounded by happiness, peace, and love."
    },
    {
      name: "Priya",
      message:
        "Congratulations on finding your forever! May your marriage be filled with love that grows stronger each day, laughter that never fades, dreams that come true, and memories you will cherish forever."
    },
    {
      name: "Sanjay",
      message:
        "Wishing you both a lifetime filled with love, laughter, and countless beautiful memories together."
    }
  ];

  const [currentWish, setCurrentWish] = useState(0);

  const nextWish = () => {
    setCurrentWish((prev) => (prev + 1) % wishes.length);
  };

  const previousWish = () => {
    setCurrentWish(
      (prev) => (prev - 1 + wishes.length) % wishes.length
    );
  };

  return (
    <section className="wishes-section">

      {/* TOP LEFT FLOWER */}
      <img
        src="/images/couple-flower.png"
        className="wishes-flower wishes-flower-top-left"
        alt=""
      />

      {/* TOP RIGHT FLOWER */}
      <img
        src="/images/couple-flower.png"
        className="wishes-flower wishes-flower-top-right"
        alt=""
      />

      {/* BOTTOM LEFT FLOWER */}
      <img
        src="/images/couple-flower.png"
        className="wishes-flower wishes-flower-bottom-left"
        alt=""
      />

      {/* BOTTOM RIGHT FLOWER */}
      <img
        src="/images/couple-flower.png"
        className="wishes-flower wishes-flower-bottom-right"
        alt=""
      />

      {/* TITLE */}
      <div className="wishes-title">
        <h2>Wishes for the couple</h2>
      </div>

      {/* WISH CARD */}
      <div className="wishes-card-wrapper">

        <div className="wishes-card">

          <h3>{wishes[currentWish].name}</h3>

          <p>{wishes[currentWish].message}</p>

          <div className="wish-navigation">

            <button onClick={previousWish}>
              ←
            </button>

            <span>
              {currentWish + 1} of {wishes.length}
            </span>

            <button onClick={nextWish}>
              →
            </button>

          </div>

        </div>

      </div>

    </section>
  );
}

function WeddingEvents() {
  return (
    <section className="wedding-events">

      {/* Corner flowers */}
      <img
        src="/images/wedding-flower.png"
        className="events-flower events-flower-tl"
        alt=""
      />

      <img
        src="/images/wedding-flower.png"
        className="events-flower events-flower-tr"
        alt=""
      />

      <img
        src="/images/wedding-flower.png"
        className="events-flower events-flower-bl"
        alt=""
      />

      <img
        src="/images/wedding-flower.png"
        className="events-flower events-flower-br"
        alt=""
      />

      {/* Heading */}
      <h1 className="events-title">
        The wedding celebrations begins!
      </h1>

      {/* Day 1 card */}
      <div className="event-card">

        {/* Image */}
        <div className="event-image">
          <img
            src="/images/wedding-hall.jpg"
            alt="Wedding Hall"
          />
        </div>

        {/* Details */}
        <div className="event-details-card">

          <h2>Day 1</h2>

          <p className="event-date">
            30 October 2026
          </p>

          <div className="event-row">
            <span>Haldi</span>
            <span>7:30 pm</span>
          </div>

          <div className="event-row">
            <span>Dinner</span>
            <span>9:00 pm</span>
          </div>

          <p className="event-venue">
            Hall Complex
          </p>

          <button
  className="event-map-button"
  onClick={() =>
    window.open(
      "https://www.google.com/maps/search/?api=1&query=Hall+Complex",
      "_blank"
    )
  }
>
  Open in Maps
</button>
        </div>

      </div>

    </section>
  );
}
function Footer() {
  return (
    <footer className="wedding-footer">

      {/* Right side flower */}
      <img
        src="/images/flower-bottom-right.png"
        alt=""
        className="footer-flower"
      />

      {/* Main footer text */}
      <div className="footer-main">

        <p className="footer-title">
          Wedding Invitation website by <strong>INVITATIONNATION</strong>
        </p>

        <div className="footer-logo">
  <img
    src="/images/invitationnation-logo.png"
    alt="Invitation Nation"
  />
</div>

      </div>
 {/* Divider */}
      <div className="footer-divider"></div>

      {/* Footer links */}
      <div className="footer-links">
        <span>ⓘ Report a Problem</span>
        <span>✉️ Contact Support</span>
        <span>◉ Privacy Policy</span>
      </div>

      {/* Powered by */}
      <p className="powered-by">
        POWERED BY <strong>INVITATION NATION</strong>
      </p>

      <div className="footer-line"></div>

      {/* Copyright */}
      <p className="copyright">
        © 2026 Invitation Nation. All rights reserved. Crafted with care for you forever.
      </p>
      
      
      

    </footer>
  );
}
export default App;