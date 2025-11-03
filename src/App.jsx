import { Routes, Route } from "react-router-dom";
import CameraFeed from "./components/CameraFeed";
import Home from "./components/home/home";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<CameraFeed />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
}
