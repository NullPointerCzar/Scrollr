// /src/pages/Home.jsx
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Home() {
  const { user, logout } = useContext(AuthContext);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Welcome to Scrollr, {user?.username || "Guest"}!</h1>
      <p>This is your home page.</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
