import { Link, Outlet } from "react-router-dom";

export function LayOut() {
  return (
    <div>
      <nav
        style={{
          display: "flex",
          gap: "15px",
          padding: "10px",
          background: "#eee",
        }}
      >
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </nav>
      <main style={{ padding: "20px" }}>
        <Outlet />
      </main>
    </div>
  );
}
