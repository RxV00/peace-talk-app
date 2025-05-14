
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Smile, User, Palette } from "lucide-react";

const DEFAULT_EMOJIS = ["😊", "😢", "😡", "😍", "🥳", "😎", "🤔", "😂", "❤️", "👍"];

// Emoji customization options
const SKIN_TONES = ["", "🏻", "🏼", "🏽", "🏾", "🏿"];
const HAIR_STYLES = ["👱", "👨", "👩", "🧑", "👴", "👵", "🧓"];
const FACE_EXPRESSIONS = ["😊", "😄", "😁", "🙂", "😍", "😎", "🤔"];

export type CustomEmoji = {
  id: string;
  emoji: string;
  name: string;
};

interface CustomEmojiSelectorProps {
  onSelectEmoji: (emoji: string | CustomEmoji) => void;
  selectedEmoji?: string | CustomEmoji;
}

const CustomEmojiSelector: React.FC<CustomEmojiSelectorProps> = ({
  onSelectEmoji,
  selectedEmoji
}) => {
  const [customEmojis, setCustomEmojis] = useState<CustomEmoji[]>([]);
  const [newEmojiText, setNewEmojiText] = useState("");
  const [newEmojiName, setNewEmojiName] = useState("");
  const [showCustomForm, setShowCustomForm] = useState(false);
  
  // Custom emoji builder state
  const [selectedSkinTone, setSelectedSkinTone] = useState("");
  const [selectedHairStyle, setSelectedHairStyle] = useState("");
  const [selectedExpression, setSelectedExpression] = useState("🙂");
  const [customEmojiPreview, setCustomEmojiPreview] = useState("🙂");

  // Check if an emoji is selected
  const isSelected = (emoji: string | CustomEmoji) => {
    if (typeof selectedEmoji === "string" && typeof emoji === "string") {
      return selectedEmoji === emoji;
    } else if (typeof selectedEmoji !== "string" && typeof emoji !== "string") {
      return selectedEmoji?.id === emoji.id;
    }
    return false;
  };

  // Update the emoji preview whenever components change
  React.useEffect(() => {
    // This is a simplified representation as actual emoji composition is complex
    // In a real app, we would use proper emoji composition techniques
    const newEmoji = selectedHairStyle + selectedSkinTone + selectedExpression;
    setCustomEmojiPreview(newEmoji);
    setNewEmojiText(newEmoji);
  }, [selectedSkinTone, selectedHairStyle, selectedExpression]);

  // Create a new custom emoji
  const handleCreateEmoji = () => {
    if (newEmojiText.trim() && newEmojiName.trim()) {
      const newEmoji: CustomEmoji = {
        id: Date.now().toString(),
        emoji: newEmojiText,
        name: newEmojiName
      };
      setCustomEmojis([...customEmojis, newEmoji]);
      setNewEmojiText("");
      setNewEmojiName("");
      setShowCustomForm(false);
      onSelectEmoji(newEmoji);
    }
  };

  return (
    <Card className="blue-gui-card">
      <CardHeader>
        <CardTitle className="text-blueTheme-dark">Select Emoji</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="emoji-grid">
            {DEFAULT_EMOJIS.map((emoji) => (
              <div
                key={emoji}
                className={`emoji-item ${isSelected(emoji) ? "selected" : ""}`}
                onClick={() => onSelectEmoji(emoji)}
              >
                {emoji}
              </div>
            ))}
          </div>

          <div className="border-t border-blueTheme-light my-4 pt-4">
            <h3 className="text-sm font-medium mb-2 text-blueTheme-dark">Custom Emojis</h3>
            
            {customEmojis.length > 0 && (
              <div className="emoji-grid mb-4">
                {customEmojis.map((emoji) => (
                  <div
                    key={emoji.id}
                    className={`emoji-item ${isSelected(emoji) ? "selected" : ""}`}
                    onClick={() => onSelectEmoji(emoji)}
                    title={emoji.name}
                  >
                    {emoji.emoji}
                  </div>
                ))}
              </div>
            )}

            {showCustomForm ? (
              <div className="custom-emoji-creator space-y-4">
                <div className="text-center mb-4">
                  <div className="text-5xl mb-2">{customEmojiPreview}</div>
                  <p className="text-xs text-gray-500">Emoji Preview</p>
                </div>
                
                <Tabs defaultValue="components" className="w-full">
                  <TabsList className="grid grid-cols-3">
                    <TabsTrigger value="components" className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <span>Base</span>
                    </TabsTrigger>
                    <TabsTrigger value="skin" className="flex items-center gap-2">
                      <Palette className="h-4 w-4" />
                      <span>Skin</span>
                    </TabsTrigger>
                    <TabsTrigger value="expression" className="flex items-center gap-2">
                      <Smile className="h-4 w-4" />
                      <span>Face</span>
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="components" className="pt-3">
                    <div className="grid grid-cols-4 gap-2">
                      {HAIR_STYLES.map((style) => (
                        <button
                          key={style}
                          className={`h-10 rounded-md border-2 flex items-center justify-center ${
                            selectedHairStyle === style ? "border-blueTheme-dark bg-blueTheme-light/20" : "border-transparent hover:bg-blueTheme-light/10"
                          }`}
                          onClick={() => setSelectedHairStyle(style)}
                        >
                          <span className="text-xl">{style}</span>
                        </button>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="skin" className="pt-3">
                    <div className="flex justify-between items-center">
                      {SKIN_TONES.map((tone, index) => (
                        <button
                          key={index}
                          className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${
                            selectedSkinTone === tone ? "border-blueTheme-dark" : "border-transparent"
                          }`}
                          onClick={() => setSelectedSkinTone(tone)}
                        >
                          <span className="text-xl">{tone ? `👍${tone}` : "👍"}</span>
                        </button>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="expression" className="pt-3">
                    <div className="grid grid-cols-4 gap-2">
                      {FACE_EXPRESSIONS.map((expression) => (
                        <button
                          key={expression}
                          className={`h-10 rounded-md border-2 flex items-center justify-center ${
                            selectedExpression === expression ? "border-blueTheme-dark bg-blueTheme-light/20" : "border-transparent hover:bg-blueTheme-light/10"
                          }`}
                          onClick={() => setSelectedExpression(expression)}
                        >
                          <span className="text-xl">{expression}</span>
                        </button>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>

                <div>
                  <label className="text-xs text-blueTheme-dark mb-1 block">Emoji Name</label>
                  <Input
                    value={newEmojiName}
                    onChange={(e) => setNewEmojiName(e.target.value)}
                    placeholder="Emoji name"
                    className="blue-gui-input"
                  />
                </div>
                
                <div className="flex space-x-2">
                  <Button
                    onClick={handleCreateEmoji}
                    className="blue-gui-button"
                    disabled={!newEmojiText.trim() || !newEmojiName.trim()}
                  >
                    Create
                  </Button>
                  <Button
                    onClick={() => setShowCustomForm(false)}
                    variant="outline"
                    className="border-blueTheme-medium text-blueTheme-dark"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <Button
                onClick={() => setShowCustomForm(true)}
                className="blue-gui-button w-full mt-2"
              >
                Create Custom Emoji
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomEmojiSelector;
