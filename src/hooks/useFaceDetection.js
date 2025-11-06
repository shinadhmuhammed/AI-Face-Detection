import { useEffect, useRef, useState, useCallback } from "react";
import * as faceapi from "face-api.js";

export const useFaceDetection = () => {
  const videoRef = useRef(null);
  const [detections, setDetections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPaused, setIsPaused] = useState(false);   

  const loadModels = useCallback(async () => {
    const MODEL_URL = "/models";
    try {
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
        faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
      ]);
    } catch (err) {
      console.error("Error loading models:", err);
      setError("Failed to load face detection models");
    }
  }, []);

  const startVideo = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) videoRef.current.srcObject = stream;
      return () => stream.getTracks().forEach(track => track.stop());
    } catch (err) {
      console.error("Error accessing webcam:", err);
      setError("Webcam access denied");
    }
  }, []);

  const detectFaces = useCallback(async () => {
    if (isPaused || !videoRef.current || videoRef.current.readyState !== 4) return;

    const detections = await faceapi
      .detectAllFaces(
        videoRef.current,
        new faceapi.TinyFaceDetectorOptions({ inputSize: 224, scoreThreshold: 0.5 })
      )
      .withFaceLandmarks()
      .withFaceDescriptors()
      .withFaceExpressions()

    setDetections(detections);
  }, [isPaused]);

  useEffect(() => {
    let cleanupFn = null;
    let detectionInterval;

    (async () => {
      await loadModels();
      cleanupFn = await startVideo();
      setLoading(false);

      detectionInterval = setInterval(detectFaces, 500);
    })();

    return () => {
      if (cleanupFn) cleanupFn();
      clearInterval(detectionInterval);
    };
  }, [loadModels, startVideo, detectFaces]);

  return { videoRef, detections, loading, error, setIsPaused };
};

