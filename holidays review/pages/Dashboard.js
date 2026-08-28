import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Holiday } from "../components/holiday";
import { OffcanvasExample } from "../components/offMenu";
import { Footer } from "../components/footer";
import { Dashoff } from "../components/Dashoff";
import { Carousel } from "../components/slider";
import { AlbumForm } from "../components/Album";
import {
  SlFrame,
  SlRefresh,
  SlTrash,
  SlPlus,
  SlSizeActual,
  SlSizeFullscreen,
} from "react-icons/sl";
import { Button, Form, InputGroup, Row, Col } from "react-bootstrap";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { format } from "date-fns";
/*useful for testing albums
<pre
style={{
  background: "#f4f4f4",
  padding: "10px",
  fontSize: "12px",
}}
>
{JSON.stringify(album, null, 2)}
</pre>*/
export function Dashboard({ UserData, onAlbumCreated, onFormSubmit }) {
  const location = useLocation();
  //displays the create album form onclick
  const [display, setDisplay] = useState(false);
  //gets the user data from the mock API
  const [user, setUser] = useState(null);
  //gets the album data from the mock API
  const [albums, setAlbums] = useState([]);
  //for the new albums being created
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  //for editing options.
  const [currentUserId, setCurrentUserId] = useState(null);
  const [activeAlbumId, setActiveAlbumId] = useState(null);

  const selectedAlbum = albums.find((album) => album.id === activeAlbumId);
  //this runs the url 3 times
  const generateAlbumUrls = () => {
    return Array.from({ length: 3 }, () => {
      const randomId = Math.floor(Math.random() * 1000);
      return `https://picsum.photos/id/${randomId}/500`;
    });
  };

  const fetchAlbums = async () => {
    if (!currentUserId) return;

    try {
      const response = await fetch(`/api/user/${currentUserId}/albums`);
      if (response.ok) {
        const data = await response.json();

        // 1.get the array of images.
        const targetAlbums = Array.isArray(data) ? data : data.albums || [];

        // 2.go through the albums info and check
        const albumsWithImages = targetAlbums.map((album) => {
          const hasDatabaseImages =
            album?.img && Array.isArray(album?.img) && album?.img.length > 0;
          if (hasDatabaseImages) {
            // if there is a img array with info, return the album in the db
            return album;
          } else {
            //if there is no img info then create the array with 3 new urls
            const imagesArray = generateAlbumUrls();
            return {
              ...album,
              images: imagesArray,
            };
          }
        });

        // 3. save the new album with the new url
        setAlbums(albumsWithImages);
      }
    } catch (error) {
      console.error("Failed to load albums:", error);
    } finally {
      setLoading(false);
    }
  };

  // 2. Load albums when the dashboard mounts
  useEffect(() => {
    fetchAlbums();
  }, [currentUserId]);
  //finds the albums in the mock api to display
  useEffect(() => {
    const savedContext = localStorage.getItem("userContext");
    const loggedInUserId = localStorage.getItem("userId");

    if (savedContext) {
      // 3. Convert it into an object and put it INTO your state variable
      const userObject = JSON.parse(savedContext);
      setUser(userObject); // This tells React: "Hey, draw 'John Doe' right now!"
    }

    if (loggedInUserId) {
      // This will match your new server route configuration perfectly
      fetch(`/api/user/${loggedInUserId}/albums`)
        .then((res) => res.json())
        .then((data) => setAlbums(data.albums))
        .catch((err) => console.error("Error fetching albums:", err));
    }
    //set the id in number to pass to the form component
    setCurrentUserId(loggedInUserId);
  }, []);
  //delete option
  const handleDelete = async (albumId) => {
    // Confirmación opcional antes de borrar
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this album?"
    );
    if (!confirmDelete) return;

    if (!currentUserId) {
      console.error("No userId prop was received by this component!");
      return;
    }

    try {
      // Enviamos la petición DELETE incluyendo el userId y el albumId
      const response = await fetch(
        `/api/user/${currentUserId}/albums/${albumId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setAlbums((prevAlbums) =>
          prevAlbums.filter((album) => album.id !== albumId)
        );
      } else {
        console.error("Failed to delete data from server");
      }
    } catch (error) {
      console.error("Error connecting to the API:", error);
    }
  };

  return (
    <>
      <div>
        <OffcanvasExample />
      </div>
      <div className="Dashboard-cont">
        <div className="user-menu">
          <p>Welcome {user?.name}!</p>
          <button className="cr-bttn" onClick={() => setDisplay(!display)}>
            {" "}
            <SlPlus /> Create New Album
          </button>
        </div>
        <div className="user-display">
          {display && (
            <AlbumForm userId={currentUserId} onAlbumCreated={fetchAlbums} />
          )}
          <div className="album-display">
            {albums && Array.isArray(albums) && albums.length > 0 ? (
              albums.map((album) => (
                <React.Fragment key={album?.id || album?.place}>
                  <div className="album-cards">
                    <div className="edit" id="db-bttn">
                      <div className="fs-left">
                        <SlSizeFullscreen
                          onClick={() => setActiveAlbumId(album.id)}
                        />
                      </div>
                      <div className="dt-right">
                        <SlTrash onClick={() => handleDelete(album.id)} />
                      </div>
                    </div>
                    <Holiday
                      place={album?.place}
                      year={
                        album?.date && format(new Date(album.date), "MMMM yyyy")
                      }
                      highlight={album?.HH}
                    />

                    <Carousel
                      albumId={album?.id}
                      albumImages={
                        album.img && album.img.length > 0
                          ? album.img
                          : album.images || []
                      }
                    />
                  </div>
                </React.Fragment>
              ))
            ) : (
              <p>No albums found for this user.</p>
            )}
          </div>
          <Footer />
        </div>
      </div>
      {selectedAlbum && (
        <div className="popup-fullscreen-overlay">
          <div className="popup-fullscreen-content">
            {
              <React.Fragment key={selectedAlbum?.id || selectedAlbum?.place}>
                <div className="album-cards-fs">
                  <div className="edit" id="db-bttn">
                    <div className="fs-left">
                      <SlSizeActual onClick={() => setActiveAlbumId(null)} />
                    </div>
                  </div>
                  <Carousel
                    albumId={selectedAlbum?.id}
                    albumImages={
                      selectedAlbum.img && selectedAlbum.img.length > 0
                        ? selectedAlbum?.img
                        : selectedAlbum?.images || []
                    }
                  />
                </div>
              </React.Fragment>
            }
          </div>
        </div>
      )}
    </>
  );
}
