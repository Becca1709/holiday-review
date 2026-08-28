import { Link, Outlet } from "react-router-dom";
import { Button, Alert } from "react-bootstrap";
import { Holiday } from "../components/holiday";
import { Carousel } from "../components/slider";
import { OffcanvasExample } from "../components/offMenu";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Footer } from "../components/footer";
import { SlCheck } from "react-icons/sl";

export function Home() {
  const [albums, setAlbums] = useState([]);
  const fetchAlbums = async () => {
    const response = await fetch("/api/user/3/albums");
    if (response.ok) {
      const data = await response.json();
      // Assuming your mock API returns an object like { albums: [...] }
      setAlbums(data.albums || data);
    }
  };

  useEffect(() => {
    fetchAlbums();
  }, [3]);

  return (
    <div>
      <div class="header">
        <OffcanvasExample />
      </div>
      <div className="home">
        <div className="main-pic">
          <div id="wlcm-msg">
            <h1>
              If privacy is more important than <i>likes. </i>
            </h1>
            <h1 id="action">Join us Today</h1>
            <div className="join">
              <Button as="a" variant="success" href="/LogIn">
                Create Account
              </Button>
            </div>
          </div>
          <div className="main-pic-img">
            <img
              src="./back-view-friends-holding-hands-up.jpg"
              alt="friends_holding_hands"
            />
            <a href="https://www.magnific.com/free-photo/back-view-friends-holding-hands-up_9969959.htm">
              Image by magnific
            </a>
          </div>
        </div>
        <div class="main">
          <div class="text">
            <h2 class="wel-h2">Start organizing your photos</h2>
            <h4>How can we help?</h4>
            <ul>
              <li>
                {" "}
                <SlCheck />
                Organize your old photos in a digital album without publicly
                sharing your <i>personal</i> memories.
              </li>
              <li>
                <SlCheck /> Have full control of your <i>privacy.</i>
              </li>
              <li>
                <SlCheck /> No more <i>decision fatigue. </i>Let's keep it
                simple.{" "}
              </li>
              <li>
                <SlCheck />
                Start your own account now!
              </li>
            </ul>
            <div className="join">
              <Button as="a" variant="success" href="/LogIn">
                Create Account
              </Button>
            </div>
          </div>
          <div class="main-img">
            {albums && Array.isArray(albums) && albums.length > 0 ? (
              albums.map((album) => (
                <React.Fragment key={album?.id || album?.place}>
                  <Holiday
                    place={album?.place}
                    year={album?.date}
                    highlight={album?.HH}
                  />
                  <Carousel
                    albumId={album?.id}
                    albumImages={album?.img || []}
                  />
                </React.Fragment>
              ))
            ) : (
              <p>No albums found for this user.</p>
            )}
          </div>
        </div>

        <div className="logo-end">
          <img src="./Logo5.png" width="300px" />
        </div>

        <Footer />
      </div>
    </div>
  );
}
