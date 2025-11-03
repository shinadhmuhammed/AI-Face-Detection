import { useEffect, useRef, useState } from "react";
import { useFaceDetection } from "../hooks/useFaceDetection";
import FaceBox from "./FaceBox";
import Loader from "./Loader";
import {
  useRecognizeFaceMutation,
  useRegisterFaceMutation,
} from "../services/faceApiService";
import { useNavigate } from "react-router-dom";

export default function CameraFeed() {
  const { videoRef, detections, loading, setIsPaused } = useFaceDetection();
  const [recognizedUser, setRecognizedUser] = useState(null);
  const [recognizeFace] = useRecognizeFaceMutation();
  const [registerFace] = useRegisterFaceMutation();
  const [name, setName] = useState("");
  const [mode, setMode] = useState("recognize");
  const canvasRef = useRef();
  const isSendingRef = useRef(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (detections.length > 0 && !isSendingRef.current) {
      isSendingRef.current = true;
      captureAndSend();
    }
  }, [detections]);

  const captureAndSend = async () => {
    if (!videoRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

    canvas.toBlob(async (blob) => {
      try {
        if (mode === "register") {
          if (!name) return alert("Enter a name before registering!");
          const res = await registerFace({ name, imageBlob: blob });
          alert(res.data?.message);
          navigate("/home");
        } else {
          const res = await recognizeFace(blob);

          if (res?.data?.match && !res.data.match.includes("unknown")) {
            setRecognizedUser(res.data.match);
            setIsPaused(true);
            navigate("/home");
          } else {
            alert("❌ Face not recognized or not in database.");
          }
        }
      } catch (err) {
        console.error("Error:", err);
      } finally {
        isSendingRef.current = false;
      }
    }, "image/jpeg");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-6">FaceVision AI</h1>

      {loading ? (
        <Loader />
      ) : (
        <div className="relative">
          <video
            ref={videoRef}
            autoPlay
            muted
            width="640"
            height="480"
            className="rounded-lg shadow-lg"
          />
          <canvas
            ref={canvasRef}
            width="640"
            height="480"
            style={{ display: "none" }}
          />
          {detections.map((d, i) => (
            <FaceBox key={i} box={d.detection.box} />
          ))}
        </div>
      )}

      <div className="flex mt-6 gap-3 items-center">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter name to register"
          className="text-black px-3 py-2 rounded"
        />
        <button
          className={`px-4 py-2 rounded ${
            mode === "register" ? "bg-blue-500" : "bg-gray-500"
          }`}
          onClick={() => setMode("register")}
        >
          Register Mode
        </button>
        <button
          className={`px-4 py-2 rounded ${
            mode === "recognize" ? "bg-green-500" : "bg-gray-500"
          }`}
          onClick={() => setMode("recognize")}
        >
          Recognize Mode
        </button>
      </div>

      {recognizedUser && (
        <p className="mt-6 text-lg">
          ✅ Recognized: <strong>{recognizedUser}</strong>
        </p>
      )}
    </div>
  );
}
