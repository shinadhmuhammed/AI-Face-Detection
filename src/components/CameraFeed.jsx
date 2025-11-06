import { useEffect, useRef, useState } from "react";
import { useFaceDetection } from "../hooks/useFaceDetection";
import FaceBox from "./FaceBox";
import Loader from "./Loader";
import {
  useRecognizeFaceMutation,
  useRegisterFaceMutation,
} from "../services/faceApiService";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function CameraFeed({ mode = "recognize" }) {
  const { videoRef, detections, loading, setIsPaused } = useFaceDetection();
  const [recognizedUser, setRecognizedUser] = useState(null);
  const [recognizeFace] = useRecognizeFaceMutation();
  const [registerFace] = useRegisterFaceMutation();
  const [name, setName] = useState("");
  const [statusMsg, setStatusMsg] = useState(
    "Align your face with the camera..."
  );
  const [isProcessing, setIsProcessing] = useState(false);
  const canvasRef = useRef();
  const isSendingRef = useRef(false);
  const navigate = useNavigate();

useEffect(() => {
  if (detections.length > 0 && !isSendingRef.current && !isProcessing) {
    setTimeout(() => {
      isSendingRef.current = true;
      captureAndSend();
    }, 300); 
  }
}, [detections]);


  const getDominantEmotion = () => {
    if (detections.length === 0 || !detections[0].expressions) return "neutral";

    const expressions = detections[0].expressions;
    return Object.keys(expressions).reduce((a, b) =>
      expressions[a] > expressions[b] ? a : b
    );
  };

  const captureAndSend = async () => {
    if (!videoRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

    setStatusMsg("😊 Face detected! Processing...");
    setIsProcessing(true);

    canvas.toBlob(async (blob) => {
      try {
        if (mode === "register") {
          if (!name) {
            setStatusMsg("⚠️ Please enter your name before registering!");
            setIsProcessing(false);
            isSendingRef.current = false;
            return;
          }

          setStatusMsg("🧠 Registering your face... please wait");
          const res = await registerFace({ name, imageBlob: blob });

          if (res?.data?.success) {
            setStatusMsg("✅ Face registered successfully!");
            setTimeout(() => navigate("/home"), 1500);
          } else {
            setStatusMsg("⚠️ Couldn’t register face properly. Try again!");
          }
        } else {
          setStatusMsg("🔍 Recognizing face...");
          const emotion = getDominantEmotion();

          const formData = new FormData();
          formData.append("image", blob);
          formData.append("emotion", emotion);

          const res = await recognizeFace(formData);

          if (res?.data?.match && !res.data.match.includes("unknown")) {
            setRecognizedUser(res.data.match);
            setIsPaused(true);
            setStatusMsg(`✅ Recognized: ${res.data.match}`);
            setTimeout(() => navigate("/home"), 1500);
          } else {
            setStatusMsg("❌ Face not recognized. Try again!");
          }
        }
      } catch (err) {
        console.error("Error:", err);
        setStatusMsg("❌ Something went wrong. Try again!");
      } finally {
        isSendingRef.current = false;
        setIsProcessing(false);
      }
    }, "image/jpeg");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-6">
        {mode === "register" ? "Register Your Face" : "Recognize Face"}
      </h1>

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

      {mode === "register" && (
        <div className="mt-6 flex gap-3 items-center">
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="text-black"
          />
        </div>
      )}

      <div className="mt-6 text-lg font-medium text-center">{statusMsg}</div>

      {mode === "register" && !isProcessing && (
        <Button
          onClick={captureAndSend}
          className="mt-4 bg-blue-600 hover:bg-blue-700"
        >
          Save Face
        </Button>
      )}
    </div>
  );
}
