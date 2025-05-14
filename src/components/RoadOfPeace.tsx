
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCouple } from "../context/CoupleContext";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Textarea } from "./ui/textarea";
import { toast } from "../hooks/use-toast";
import { ArrowLeft, Send, Check, ChevronDown, ChevronUp } from "lucide-react";

interface Message {
  id: string;
  text: string;
  profileId: string;
  type: "message" | "apology" | "agreement";
  timestamp: string;
}

const RoadOfPeace = () => {
  const navigate = useNavigate();
  const { couple, isAuthenticated, updatePoints } = useCouple();
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"message" | "apology">("message");
  const [expandedGuide, setExpandedGuide] = useState(true);
  
  // Demo messages
  const [messages, setMessages] = useState<Message[]>([]);
  
  // Protect route
  React.useEffect(() => {
    if (!isAuthenticated || !couple?.activeProfileId) {
      navigate("/profile");
    }
  }, [isAuthenticated, couple, navigate]);
  
  if (!couple) {
    return <div className="p-8 text-center">Loading...</div>;
  }
  
  // Find active profile
  const activeProfile = couple.profiles.find(p => p.id === couple.activeProfileId);
  const partnerProfile = couple.profiles.find(p => p.id !== couple.activeProfileId);
  
  const handleSendMessage = () => {
    if (!message.trim() || !couple.activeProfileId) return;
    
    const newMessage: Message = {
      id: crypto.randomUUID(),
      text: message,
      profileId: couple.activeProfileId,
      type: messageType,
      timestamp: new Date().toISOString(),
    };
    
    setMessages([...messages, newMessage]);
    setMessage("");
    
    // Award points for communication
    if (messageType === "apology") {
      updatePoints(5);
      toast({
        title: "Apology sent",
        description: "+5 harmony points for talking it through",
        variant: "default",
      });
    } else {
      updatePoints(1);
    }
  };
  
  const handleAgree = (messageId: string) => {
    const agreementMessage: Message = {
      id: crypto.randomUUID(),
      text: "I acknowledge and accept your apology.",
      profileId: couple.activeProfileId!,
      type: "agreement",
      timestamp: new Date().toISOString(),
    };
    
    setMessages([...messages, agreementMessage]);
    
    // Award points for acceptance
    updatePoints(10);
    toast({
      title: "Apology accepted",
      description: "+10 harmony points for reconciliation",
      variant: "default",
    });
  };
  
  // Get profile name by ID
  const getProfileName = (profileId: string) => {
    return couple.profiles.find(p => p.id === profileId)?.name || "Unknown";
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <header className="bg-white border-b border-gray-200 p-4 sticky top-0 z-10">
        <div className="max-w-lg mx-auto flex items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/dashboard")}
            className="mr-2"
          >
            <ArrowLeft size={20} />
          </Button>
          <h1 className="text-xl font-semibold flex-1">Road of Peace</h1>
          <div className="h-8 w-8 rounded-full bg-purple-200 flex items-center justify-center">
            <span className="text-sm">👤</span>
          </div>
        </div>
      </header>
      
      <div className="max-w-lg mx-auto p-4 pb-32">
        <Card className="mb-6 overflow-hidden">
          <div 
            className="flex items-center justify-between p-4 bg-purple-100 cursor-pointer"
            onClick={() => setExpandedGuide(!expandedGuide)}
          >
            <h2 className="font-semibold text-purple-800">Communication Guide</h2>
            {expandedGuide ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </div>
          
          {expandedGuide && (
            <div className="p-4">
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Take turns expressing your feelings</li>
                <li>• Use "I" statements instead of "You" accusations</li>
                <li>• Listen actively without interrupting</li>
                <li>• Acknowledge each other's perspectives</li>
                <li>• Focus on the problem, not the person</li>
              </ul>
            </div>
          )}
        </Card>
        
        <div className="space-y-4 mb-6">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.profileId === couple.activeProfileId ? 'justify-end' : 'justify-start'}`}>
              <div 
                className={`max-w-[80%] rounded-2xl p-3 ${
                  msg.profileId === couple.activeProfileId 
                    ? 'bg-purple-600 text-white rounded-tr-none' 
                    : 'bg-gray-200 text-gray-800 rounded-tl-none'
                } ${
                  msg.type === 'apology' ? 'border-2 border-red-400' : ''
                } ${
                  msg.type === 'agreement' ? 'border-2 border-green-400' : ''
                }`}
              >
                <p>{msg.text}</p>
                <p className="text-xs mt-1 opacity-70">
                  {getProfileName(msg.profileId)} • {new Date(msg.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </p>
                
                {msg.type === 'apology' && msg.profileId !== couple.activeProfileId && (
                  <Button 
                    size="sm" 
                    className="mt-2 bg-green-500 hover:bg-green-600"
                    onClick={() => handleAgree(msg.id)}
                  >
                    <Check size={14} className="mr-1" />
                    Accept
                  </Button>
                )}
              </div>
            </div>
          ))}
          
          {messages.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <p>No messages yet. Start your conversation.</p>
            </div>
          )}
        </div>
      </div>
      
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <div className="max-w-lg mx-auto">
          <div className="flex gap-2 mb-2">
            <Button
              size="sm"
              variant={messageType === "message" ? "default" : "outline"}
              onClick={() => setMessageType("message")}
              className={messageType === "message" ? "bg-purple-600" : ""}
            >
              Message
            </Button>
            <Button
              size="sm"
              variant={messageType === "apology" ? "default" : "outline"}
              onClick={() => setMessageType("apology")}
              className={messageType === "apology" ? "bg-red-500" : ""}
            >
              Apology
            </Button>
          </div>
          
          <div className="flex gap-2 items-end">
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={messageType === "apology" ? "I'm sorry for..." : `Message to ${partnerProfile?.name}`}
              className="flex-1 resize-none"
              rows={2}
            />
            <Button
              className={`h-10 ${messageType === "apology" ? "bg-red-500" : "bg-purple-600"}`}
              onClick={handleSendMessage}
              disabled={!message.trim()}
            >
              <Send size={18} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoadOfPeace;
