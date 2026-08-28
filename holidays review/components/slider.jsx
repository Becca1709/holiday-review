import { react } from "react";
import React, { useState, useEffect } from "react";

function Carousel({ userId, albumImages }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Array of 3 image URLs

  // const images = [
  // "https://cdn.tourradar.com/s3/serp/1500x800/5032_Gia44gKW.jpg",
  //  "https://upload.wikimedia.org/wikipedia/commons/2/21/Flag_of_Vietnam.svg",
  //  "https://unsplash.com",
  //  ];
  //const images = [props.img1, props.img2, props.img3];
  const images =
    Array.isArray(albumImages) && albumImages.length > 0
      ? albumImages
      : ["https://placeholder.com"];

  // 2. Keep your existing slider state completely untouched!

  const prevSlide = () => {
    setCurrentIndex((curr) => (curr === 0 ? images.length - 1 : curr - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((curr) => (curr === images.length - 1 ? 0 : curr + 1));
  };

  // Auto-slide every 3 seconds
  /* useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 3000);
    return () => clearInterval(timer);
  }, [currentIndex]); */

  return (
    <div style={styles.container} className="container">
      <div style={styles.slider} className="carousel">
        <button onClick={prevSlide} style={styles.leftArrow}>
          ❰
        </button>

        <img
          src={images[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          style={styles.image}
        />

        <button onClick={nextSlide} style={styles.rightArrow}>
          ❱
        </button>
      </div>
    </div>
  );
}

export { Carousel };

// Basic inline styles
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    fontFamily: "sans-serif",
    marginTop: "20px",
  },
  slider: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: "10px",
    objectFit: "cover",
  },

  leftArrow: {
    position: "absolute",
    left: "10px",
    zIndex: 1,
    background: "rgba(255, 255, 255, 0.7)",
    border: "none",
    borderRadius: "50%",
    cursor: "pointer",
    padding: "10px",
  },
  rightArrow: {
    position: "absolute",
    right: "10px",
    zIndex: 1,
    background: "rgba(255, 255, 255, 0.7)",
    border: "none",
    borderRadius: "50%",
    cursor: "pointer",
    padding: "10px",
  },
};
/* width: "500px",
    height: "300px",*/
