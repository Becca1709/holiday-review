import { Button, Form } from "react-bootstrap";
import React, { useState } from "react";
import { Dashboard } from "../pages/Dashboard";
import { OffcanvasExample } from "../components/offMenu";
import { Footer } from "../components/footer";

export function LogIn() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Authentication failed");
      }

      // Save token to localStorage to simulate session persistence
      if (data && data.user) {
        // Save the full user object context (This is why your username works now!)
        localStorage.setItem("userContext", JSON.stringify(data.user));
        localStorage.setItem("userId", data.user.id);
        window.location.href = "/Dashboard";
      } else {
        throw new Error(
          "Invalid server response: Missing user payload metadata."
        );
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setCredentials({ email: "", password: "" });
  };

  return (
    <>
      <div>
        <OffcanvasExample />
        <div>
          <div className="login-cont">
            <h1>LOG IN</h1>
            <div class="logIn">
              {error && <p style={{ color: "red" }}>{error}</p>}
              <Form onSubmit={handleLogin}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={credentials.email}
                    onChange={handleChange}
                    required
                  />
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={credentials.password}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
}
