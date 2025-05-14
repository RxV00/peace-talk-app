
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCouple } from "../context/CoupleContext";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Textarea } from "./ui/textarea";
import { toast } from "../hooks/use-toast";
import { ArrowLeft, Send, Check, ChevronDown, ChevronUp, AlertCircle, Smile } from "lucide-react";
import CustomEmojiSelector from "./CustomEmojiSelector";
import { Popover, PopoverTrigger, PopoverContent } from "./ui/popover";

interface Message {
  id: string;
  text: string;
  profileId: string;
  type: "message" | "apology" | "agreement";
  timestamp: string;
  emoji?: string;
}

const RoadOfPeace = () => {
  const navigate = useNavigate();
  const { couple, isAuthenticated, updatePoints } = useCouple();
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"message" | "apology">("message");
  const [expandedGuide, setExpandedGuide] = useState(true);
  const [alarmTriggered, setAlarmTriggered] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState<string | null>(null);
  
  // Demo messages
  const [messages, setMessages] = useState<Message[]>([]);
  
  // Check if alarm was triggered
  useEffect(() => {
    const wasAlarmTriggered = sessionStorage.getItem("alarmTriggered") === "true";
    setAlarmTriggered(wasAlarmTriggered);
    
    if (!wasAlarmTriggered) {
      toast({
        title: "Message Locked",
        description: "You need to trigger the alarm from the dashboard first",
        variant: "destructive",
      });
    }
  }, []);
  
  // Protect route
  useEffect(() => {
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
    if (!message.trim() || !couple.activeProfileId || !alarmTriggered) return;
    
    const newMessage: Message = {
      id: crypto.randomUUID(),
      text: message,
      profileId: couple.activeProfileId,
      type: messageType,
      timestamp: new Date().toISOString(),
      emoji: selectedEmoji || undefined
    };
    
    setMessages([...messages, newMessage]);
    setMessage("");
    setSelectedEmoji(null);
    
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
        {!alarmTriggered && (
          <Card className="mb-6 bg-red-50 border-red-200">
            <div className="p-4 flex items-center">
              <AlertCircle className="text-red-500 mr-2" size={20} />
              <div>
                <h3 className="font-medium text-red-800">Communication Locked</h3>
                <p className="text-sm text-red-700">
                  Return to dashboard and trigger the alarm to enable messaging.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-2 text-red-700 border-red-300"
                  onClick={() => navigate("/dashboard")}
                >
                  Go to Dashboard
                </Button>
              </div>
            </div>
          </Card>
        )}
        
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
                {msg.emoji && <div className="text-lg mb-1">{msg.emoji}</div>}
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
              disabled={!alarmTriggered}
            >
              Message
            </Button>
            <Button
              size="sm"
              variant={messageType === "apology" ? "default" : "outline"}
              onClick={() => setMessageType("apology")}
              className={messageType === "apology" ? "bg-red-500" : ""}
              disabled={!alarmTriggered}
            >
              Apology
            </Button>
            {selectedEmoji && (
              <div className="flex-1 text-right">
                <span className="inline-block bg-purple-100 text-lg p-1 rounded-full">
                  {selectedEmoji}
                </span>
              </div>
            )}
          </div>
          
          <div className="flex gap-2 items-end">
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={!alarmTriggered ? "Alarm not triggered" : messageType === "apology" ? "I'm sorry for..." : `Message to ${partnerProfile?.name}`}
              className="flex-1 resize-none"
              rows={2}
              disabled={!alarmTriggered}
            />
            
            <div className="flex flex-col gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    size="icon"
                    variant="outline"
                    className="bg-purple-50"
                    disabled={!alarmTriggered}
                  >
                    <Smile size={20} />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-0">
                  <CustomEmojiSelector 
                    onSelectEmoji={(emoji) => {
                      if (typeof emoji === 'string') {
                        setSelectedEmoji(emoji);
                      } else {
                        setSelectedEmoji(emoji.emoji);
                      }
                    }}
                    selectedEmoji={selectedEmoji || undefined}
                  />
                </PopoverContent>
              </Popover>
              
              <Button
                className={`h-10 ${messageType === "apology" ? "bg-red-500" : "bg-purple-600"}`}
                onClick={handleSendMessage}
                disabled={!message.trim() || !alarmTriggered}
              >
                <Send size={18} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoadOfPeace;
