import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Holiday } from "../components/holiday";
import { OffcanvasExample } from "../components/offMenu";
import { Carousel } from "../components/slider";
import { AlbumForm } from "../components/Album";
import { Footer } from "../components/footer";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Placeholder from "react-bootstrap/Placeholder";

export function Account({ UserData }) {
  const [user, setUser] = useState("");
  const [userData, setUserData] = useState(null);
  const [albums, setAlbums] = useState([]);
  //display create new album form
  const [display, setDisplay] = useState(false);
  useEffect(() => {
    // Read the name from storage on component mount
    const savedUser = localStorage.getItem(user.name);
    if (savedUser) {
      setUser(savedUser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("username");
    setUser("");
  };
  fetch("/api/user")
    .then((res) => res.json())
    .then((data) => {
      // If Mirage sends { user: { name: 'John Doe' } }
      setUser(data.user); // DO NOT do setUser(data)
    });

  useEffect(() => {
    fetch("/api/albums")
      .then((res) => res.json())
      .then((data) => {
        // Mirage returns data wrapped in a pluralized key: data.albums
        setAlbums(data.albums || data);
      });
  }, []); // Empty brackets mean it runs exactly once on page load
  if (!userData) {
    return (
      <div>
        <OffcanvasExample />
        <div>
          <div class="main-demo">
            <h1>Welcome to your digital album</h1>
            <p>{user?.name}</p>
            <p>This is how you can showcase your holidays on an easy format.</p>
            <p>
              Just Need a Name of place, a year and a highlight of your holiday
              so you can always remember what you took away with you.
            </p>
            <p>
              To get started with your digital album click on the button bellow.{" "}
            </p>
            <Button onClick={() => setDisplay(!display)}>
              CREATE YOUR NEW ALBUM
            </Button>
            {display && <AlbumForm />}
          </div>
          <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
              <Placeholder as={Card.Title} animation="glow">
                <Placeholder xs={6} />
              </Placeholder>
              <Placeholder as={Card.Text} animation="glow">
                <Placeholder xs={7} /> <Placeholder xs={4} />{" "}
                <Placeholder xs={4} /> <Placeholder xs={6} />{" "}
                <Placeholder xs={8} />
              </Placeholder>
              <Placeholder.Button variant="primary" xs={6} />
            </Card.Body>
          </Card>
        </div>
        Loading your updated profile...
      </div>
    );
  }
  return;
  <div>
    <OffcanvasExample />
    <p>{user?.name}</p>
    <div>
      <div class="main-demo">
        <h1>Welcome to your digital album</h1>
        <p>This is how you can showcase your holidays on an easy format.</p>
        <p>
          Just Need a Name of place, a year and a highlight of your holiday so
          you can always remember what you took away with you.
        </p>
        <p>
          To get started with your digital album click on the button bellow.{" "}
        </p>
        <Button onClick={() => setDisplay(!display)}>
          CREATE YOUR NEW ALBUM
        </Button>
        {display && <AlbumForm />}
      </div>
      <Holiday
        place={userData.place}
        year={userData.date}
        highlight={userData.HH}
      />
      <Carousel
        img1="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZwNYw3WRpxb688RtSx0gOSyxgtvckI5Krj_LIcIfQKg&s=10"
        img2="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBOFgEAwVANXDlnqd4k3t3gEexDZWT7yUCG19YwXfXOg&s=10"
        img3="https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/15/8e/7a/8e.jpg"
      />
    </div>
  </div>;
}
