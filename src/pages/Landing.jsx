import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Eye,
  Sparkles,
  Shield,
  Zap,
  MessageSquare,
  Brain,
  Users,
} from "lucide-react";

export default function Landing() {
  const navigate = useNavigate();
  const [guestName, setGuestName] = useState("");
  const [showGuestInput, setShowGuestInput] = useState(false);

  const handleGuestAccess = () => {
    if (guestName.trim()) {
      localStorage.setItem("guestName", guestName.trim());
      localStorage.setItem("isGuest", "true");

      navigate("/home", {
        state: { guestName: guestName.trim(), isGuest: true },
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-950 via-purple-900 to-gray-900 text-white relative overflow-hidden py-12">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-700"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Left side - Main content */}
          <div className="order-2 md:order-1 space-y-6">
            <Card className="backdrop-blur-xl bg-gray-950/40 border border-gray-700/50 shadow-2xl rounded-3xl overflow-hidden">
              <CardHeader className="space-y-4 pb-4">
                <div className="flex items-center gap-3 justify-center md:justify-start">
                  <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-3 rounded-2xl">
                    <Eye className="w-8 h-8" />
                  </div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    FaceVision AI
                  </h1>
                </div>
                <p className="text-gray-300 text-base leading-relaxed">
                  Recognize your face, unlock intelligent conversations. Chat
                  with AI after secure facial authentication.
                </p>
              </CardHeader>

              <CardContent className="space-y-4 pt-2">
                {/* Feature highlights */}
                <div className="grid grid-cols-3 gap-3 py-4">
                  <div className="text-center">
                    <div className="bg-blue-500/20 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-2">
                      <Eye className="w-6 h-6 text-blue-400" />
                    </div>
                    <p className="text-xs text-gray-400">Face Recognition</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-purple-500/20 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-2">
                      <MessageSquare className="w-6 h-6 text-purple-400" />
                    </div>
                    <p className="text-xs text-gray-400">AI Chat</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-green-500/20 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-2">
                      <Shield className="w-6 h-6 text-green-400" />
                    </div>
                    <p className="text-xs text-gray-400">Secure</p>
                  </div>
                </div>

                {/* Main action buttons */}
                <div className="space-y-3">
                  <Button
                    onClick={() => navigate("/register")}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-blue-500/50 transition-all duration-300"
                  >
                    Register Your Face
                  </Button>

                  <Button
                    onClick={() => navigate("/recognize")}
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-green-500/50 transition-all duration-300"
                  >
                    Recognize & Chat
                  </Button>

                  {/* Divider */}
                  <div className="flex items-center gap-3 py-2">
                    <div className="flex-1 h-px bg-gray-700"></div>
                    <span className="text-gray-500 text-sm">or</span>
                    <div className="flex-1 h-px bg-gray-700"></div>
                  </div>

                  {/* Guest access */}
                  {!showGuestInput ? (
                    <Button
                      onClick={() => setShowGuestInput(true)}
                      variant="outline"
                      className="w-full border-gray-600 text-gray-300 hover:bg-gray-800/50 py-5 rounded-xl"
                    >
                      Try as Guest
                    </Button>
                  ) : (
                    <div className="space-y-3 p-4 bg-gray-800/30 rounded-xl border border-gray-700">
                      <input
                        type="text"
                        placeholder="Enter your name"
                        value={guestName}
                        onChange={(e) => setGuestName(e.target.value)}
                        onKeyPress={(e) =>
                          e.key === "Enter" && handleGuestAccess()
                        }
                        className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        autoFocus
                      />
                      <div className="flex gap-2">
                        <Button
                          onClick={handleGuestAccess}
                          disabled={!guestName.trim()}
                          className="flex-1 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg"
                        >
                          Continue
                        </Button>
                        <Button
                          onClick={() => {
                            setShowGuestInput(false);
                            setGuestName("");
                          }}
                          variant="outline"
                          className="border-gray-600 text-gray-300 hover:bg-gray-800/50 rounded-lg"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* How it works */}
            <div className="backdrop-blur-xl bg-gray-950/30 border border-gray-700/50 rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-yellow-400" />
                How It Works
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="bg-blue-500/20 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-blue-400 font-bold text-sm">1</span>
                  </div>
                  <div>
                    <p className="text-gray-300 text-sm">
                      <span className="font-semibold text-white">Register</span>{" "}
                      your face for secure authentication
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-green-500/20 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-green-400 font-bold text-sm">2</span>
                  </div>
                  <div>
                    <p className="text-gray-300 text-sm">
                      <span className="font-semibold text-white">
                        Get Recognized
                      </span>{" "}
                      instantly with our AI
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-purple-500/20 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-purple-400 font-bold text-sm">3</span>
                  </div>
                  <div>
                    <p className="text-gray-300 text-sm">
                      <span className="font-semibold text-white">
                        Chat & Interact
                      </span>{" "}
                      with our intelligent AI assistant
                    </p>
                  </div>
                </div>
              </div>

              {/* Extra paragraph section */}
              <p className="text-gray-400 text-sm mt-6 leading-relaxed">
                You can also{" "}
                <span className="text-white font-medium">try it instantly</span>{" "}
                by logging in as a guest — no registration needed! We’re
                constantly improving our platform —{" "}
                <span className="text-blue-400 font-medium">
                  more exciting features are on the way
                </span>{" "}
                🚀
              </p>
            </div>
          </div>

          <div className="order-1 md:order-2 space-y-6">
            {/* Face Recognition Visualization */}
            <div className="relative">
              <div className="relative bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-3xl p-8 backdrop-blur-sm border border-gray-700/50">
                <div className="aspect-square bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl flex items-center justify-center overflow-hidden relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-48 h-48 border-4 border-blue-500 rounded-lg animate-pulse"></div>
                    <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
                    <div className="absolute top-1/4 right-1/4 w-3 h-3 bg-green-400 rounded-full animate-ping delay-150"></div>
                    <div className="absolute bottom-1/3 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-red-400 rounded-full animate-pulse"></div>
                  </div>

                  <Eye className="w-32 h-32 text-blue-400/30 relative z-10" />

                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/20 to-transparent animate-scan"></div>
                </div>

                {/* Stats overlay */}
                <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-md rounded-xl p-4 border border-gray-700/50">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-bold text-green-400">99.9%</p>
                      <p className="text-xs text-gray-400">Accuracy</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-blue-400">&lt;1s</p>
                      <p className="text-xs text-gray-400">Speed</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-purple-400">AI</p>
                      <p className="text-xs text-gray-400">Powered</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Chat Preview */}
            <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-3xl p-6 backdrop-blur-sm border border-purple-700/50">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-2 rounded-xl">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">AI Chat Assistant</h3>
                  <p className="text-xs text-gray-400">
                    After recognition, chat with AI
                  </p>
                </div>
              </div>

              {/* Sample chat messages */}
              <div className="space-y-3">
                <div className="bg-gray-800/50 rounded-2xl rounded-bl-sm p-3 border border-gray-700/50">
                  <p className="text-sm text-gray-300">
                    Hello! How can I help you today?
                  </p>
                </div>
                <div className="bg-blue-600/30 rounded-2xl rounded-br-sm p-3 border border-blue-500/50 ml-8">
                  <p className="text-sm text-gray-200">
                    Tell me about my account
                  </p>
                </div>
                <div className="bg-gray-800/50 rounded-2xl rounded-bl-sm p-3 border border-gray-700/50">
                  <p className="text-sm text-gray-300">
                    Sure! Let me check your profile...
                  </p>
                </div>
              </div>

              {/* Features list */}
              <div className="mt-4 pt-4 border-t border-gray-700/50 grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2">
                  <Brain className="w-4 h-4 text-purple-400" />
                  <span className="text-xs text-gray-300">Smart AI</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-yellow-400" />
                  <span className="text-xs text-gray-300">
                    Instant Response
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-green-400" />
                  <span className="text-xs text-gray-300">
                    Private & Secure
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-blue-400" />
                  <span className="text-xs text-gray-300">Personalized</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scan {
          0%, 100% { transform: translateY(-100%); }
          50% { transform: translateY(100%); }
        }
        .animate-scan {
          animation: scan 3s ease-in-out infinite;
        }
        .delay-150 {
          animation-delay: 150ms;
        }
        .delay-700 {
          animation-delay: 700ms;
        }
        .delay-1000 {
          animation-delay: 1000ms;
        }
      `}</style>
    </div>
  );
}
