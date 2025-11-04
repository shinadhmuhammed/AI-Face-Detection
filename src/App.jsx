import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Register from "./pages/Register";
import Recognize from "./pages/Recognize";
import { Home } from "lucide-react";


export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/register" element={<Register />} />
      <Route path="/recognize" element={<Recognize />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
}
