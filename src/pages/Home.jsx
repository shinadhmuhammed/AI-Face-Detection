import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion, AnimatePresence } from "framer-motion";
import {
  SendHorizonal,
  Loader2,
  Info,
  Sparkles,
  Menu,
  Settings,
  LogOut,
  User,
  MessageSquare,
} from "lucide-react";
import { useSendChatMessageMutation } from "@/services/chatApiService";

export default function Home() {
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "👋 Hey! I'm here to listen — how are you feeling today?",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
  ]);
  const [input, setInput] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const chatEndRef = useRef(null);
  const [isTyping, setIsTyping] = useState(false);

  const [sendChatMessage, { isLoading }] = useSendChatMessageMutation();

  const guestName = localStorage.getItem("guestName") || "Shinadh";
  const isGuest = localStorage.getItem("isGuest") === "true";

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = {
      sender: "user",
      text: input,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    try {
      const res = await sendChatMessage({
        message: input,
        user: guestName,
        emotion: "neutral",
        guest: isGuest,
      }).unwrap();

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: res.reply,
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "⚠️ Sorry, something went wrong.",
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-indigo-950 text-white relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <AnimatePresence>
        {showMenu && (
          <motion.div
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            className="absolute lg:relative w-72 h-full bg-gray-900/95 backdrop-blur-xl border-r border-gray-800 z-50 flex flex-col"
          >
            <div className="p-6 border-b border-gray-800">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-2 rounded-xl">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="font-bold text-lg">Chat History</h2>
                  <p className="text-xs text-gray-400">Your conversations</p>
                </div>
              </div>
            </div>

            <div className="flex-1 p-4 space-y-2 overflow-y-auto">
              <div className="bg-gray-800/50 rounded-xl p-3 border border-gray-700/50 hover:bg-gray-800 transition-colors cursor-pointer">
                <p className="text-sm font-medium">Today's Chat</p>
                <p className="text-xs text-gray-400 mt-1">
                  Active conversation
                </p>
              </div>
            </div>

            <div className="p-4 border-t border-gray-800 space-y-2">
              <Button
                variant="outline"
                className="w-full justify-start gap-2 border-gray-700 hover:bg-gray-800"
              >
                <Settings className="w-4 h-4" />
                Settings
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start gap-2 border-gray-700 hover:bg-gray-800 text-red-400 hover:text-red-300"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex-1 flex flex-col relative z-10">
        <header className="backdrop-blur-xl bg-gray-900/50 border-b border-gray-800/50 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowMenu(!showMenu)}
                className="hover:bg-gray-800"
              >
                <Menu className="w-5 h-5" />
              </Button>

              <div className="flex items-center gap-3">
                <div className="relative">
                  <Avatar className="h-12 w-12 ring-2 ring-purple-500/50">
                    <AvatarImage src="/bot.png" />
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600">
                      AI
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-900"></div>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-lg">
                      Emotional Companion
                    </span>
                    <Sparkles className="w-4 h-4 text-yellow-400" />
                  </div>
                  <p className="text-xs text-green-400 flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                    Online & Ready to Help
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Avatar className="h-10 w-10 ring-2 ring-blue-500/50">
                <AvatarFallback className="bg-gradient-to-br from-gray-700 to-gray-800">
                  {guestName?.[0]?.toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
              <div className="hidden sm:block">
                <p className="text-sm font-semibold">{guestName}</p>
                <p className="text-xs text-gray-400">
                  {isGuest ? "Guest User" : "Registered"}
                </p>
              </div>
            </div>
          </div>
        </header>

        {isGuest && (
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border-b border-yellow-500/30 text-yellow-400 px-6 py-3 flex items-center justify-between backdrop-blur-sm"
          >
            <div className="flex items-center gap-3">
              <div className="bg-yellow-500/20 p-2 rounded-lg">
                <Info className="w-4 h-4" />
              </div>
              <div>
                <p className="text-sm font-medium">
                  Welcome <span className="font-bold">{guestName}</span>! You're
                  using <span className="font-bold">Guest Mode</span>.
                </p>
                <p className="text-xs text-yellow-400/70">
                  Your messages won't be stored in our database — for a full
                  experience, please register your face later.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
              className={`flex items-end gap-2 ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {msg.sender === "ai" && (
                <Avatar className="h-9 w-9 ring-2 ring-purple-500/30">
                  <AvatarImage src="/bot.png" />
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-xs">
                    AI
                  </AvatarFallback>
                </Avatar>
              )}

              <div className="flex flex-col max-w-[75%]">
                <div
                  className={`px-5 py-3 rounded-2xl text-sm leading-relaxed shadow-lg backdrop-blur-sm ${
                    msg.sender === "user"
                      ? "bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-br-sm"
                      : "bg-gray-800/80 text-gray-100 rounded-bl-sm border border-gray-700/50"
                  }`}
                >
                  {msg.text}
                </div>
                <span
                  className={`text-xs text-gray-500 mt-1 px-2 ${
                    msg.sender === "user" ? "text-right" : "text-left"
                  }`}
                >
                  {msg.timestamp}
                </span>
              </div>

              {msg.sender === "user" && (
                <Avatar className="h-9 w-9 ring-2 ring-blue-500/30">
                  <AvatarFallback className="bg-gradient-to-br from-gray-700 to-gray-800 text-xs">
                    {guestName?.[0]?.toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
              )}
            </motion.div>
          ))}

          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3 ml-11"
            >
              <div className="bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-2xl rounded-bl-sm px-5 py-3 flex items-center gap-2">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-100"></div>
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-200"></div>
                </div>
                <span className="text-gray-400 text-sm">AI is thinking...</span>
              </div>
            </motion.div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Enhanced Input Area */}
        <div className="backdrop-blur-xl bg-gray-900/50 border-t border-gray-800/50 p-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex gap-3 items-end">
              <div className="flex-1 relative">
                <Input
                  placeholder="Share your thoughts, feelings, or questions..."
                  className="bg-gray-800/50 text-white border-gray-700/50 focus-visible:ring-2 focus-visible:ring-purple-500 rounded-2xl px-6 py-6 text-sm backdrop-blur-sm pr-12"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === "Enter" && !e.shiftKey && sendMessage()
                  }
                  disabled={isLoading}
                />
                <div className="absolute right-4 bottom-4 text-xs text-gray-500">
                  {input.length}/500
                </div>
              </div>
              <Button
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-2xl px-6 py-6 shadow-lg hover:shadow-purple-500/50 transition-all duration-300"
                onClick={sendMessage}
                disabled={isLoading || !input.trim()}
              >
                {isLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <SendHorizonal className="h-5 w-5" />
                )}
              </Button>
            </div>
            <p className="text-xs text-gray-500 text-center mt-2">
              Press Enter to send • Shift+Enter for new line
            </p>
          </div>
        </div>
      </div>

      <style>{`
        .delay-100 {
          animation-delay: 100ms;
        }
        .delay-200 {
          animation-delay: 200ms;
        }
        .delay-1000 {
          animation-delay: 1000ms;
        }
        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: #374151;
          border-radius: 3px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: #4b5563;
        }
      `}</style>
    </div>
  );
}
