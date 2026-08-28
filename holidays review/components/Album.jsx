import { react } from "react";
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Form, InputGroup, Button } from "react-bootstrap";

export function AlbumForm({ userId, onAlbumCreated, onFormSubmit }) {
  const navigate = useNavigate();
  // Create a state object linked to your inputs
  const [formData, setFormData] = useState({
    place: "",
    date: "",
    HH: "",
    img: [],
  });

  //FORM SUBMIT

  const handleSubmit = async (e) => {
    e.preventDefault();
    /* const savedUser = JSON.parse(localStorage.getItem("userContext"));*/

    if (!{ userId }) {
      console.error("No userId prop was received by this component!");
      return;
    }

    try {
      const response = await fetch(`/api/user/${userId}/albums`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        if (onAlbumCreated) {
          await onAlbumCreated();
        }
        //alert("Album created!");

        // reset form to clean inputs
        setFormData({ place: "", date: "", HH: "", img: "" });

        navigate("/Dashboard");
      }
    } catch (error) {
      console.error("Failed to post data:", error);
    }
  };

  /* <Form.Group controlId="formFileMultiple" className="mb-3">
          <Form.Label>Select your holiday pictures</Form.Label>
          <Form.Control name="fotos" type="file" multiple />
        </Form.Group>
           <p>
        Active User ID Status:{" "}
        <strong>{userId ? String(userId) : "MISSING/NULL"}</strong>
      </p>
         */

  return (
    <div class="form">
      <h5>Create your new Album </h5>
      <Form onSubmit={handleSubmit}>
        <InputGroup className="mb-3">
          <InputGroup.Text id="inputGroup-sizing-default">
            Where?
          </InputGroup.Text>
          <Form.Control
            name="place"
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
            placeholder="Place"
            value={formData.place}
            onChange={(e) =>
              setFormData({ ...formData, place: e.target.value })
            }
            required
          />
        </InputGroup>
        <InputGroup id="inputGroup-sizing-default" controlId="date">
          <InputGroup.Text id="inputGroup-sizing-default">
            When?
          </InputGroup.Text>
          <Form.Control
            name="date"
            type="date"
            required
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          />
        </InputGroup>

        <InputGroup controlId="HH">
          <InputGroup.Text>Best Memories</InputGroup.Text>
          <Form.Control
            as="textarea"
            aria-label="With textarea"
            name="HH"
            value={formData.HH}
            required
            onChange={(e) => setFormData({ ...formData, HH: e.target.value })}
          />
        </InputGroup>
        <Form.Group controlId="formFileMultiple" className="mb-3" id="img">
          <Form.Label>Select your holiday pictures</Form.Label>
          <Form.Control
            name="img"
            type="file"
            multiple
            value={formData.img ? undefined : ""}
          />
        </Form.Group>
        <Button variant="success" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}
