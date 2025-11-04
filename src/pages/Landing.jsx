import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <Card className="max-w-md text-center p-6 shadow-lg rounded-2xl bg-gray-950/70 border border-gray-700">
        <CardHeader>
          <h1 className="text-3xl font-bold mb-2 text-white">👁️ FaceVision AI</h1>
          <p className="text-gray-400 text-sm">
            Smart Face Recognition & Emotion Tracking powered by AI
          </p>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 mt-6">
          <Button onClick={() => navigate("/register")} className="bg-blue-600 hover:bg-blue-700">
            Register Your Face
          </Button>
          <Button onClick={() => navigate("/recognize")} className="bg-green-600 hover:bg-green-700">
            Recognize Me
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
