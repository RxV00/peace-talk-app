
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const DEFAULT_EMOJIS = ["😊", "😢", "😡", "😍", "🥳", "😎", "🤔", "😂", "❤️", "👍"];

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

  // Check if an emoji is selected
  const isSelected = (emoji: string | CustomEmoji) => {
    if (typeof selectedEmoji === "string" && typeof emoji === "string") {
      return selectedEmoji === emoji;
    } else if (typeof selectedEmoji !== "string" && typeof emoji !== "string") {
      return selectedEmoji?.id === emoji.id;
    }
    return false;
  };

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
              <div className="custom-emoji-creator space-y-3">
                <div>
                  <label className="text-xs text-blueTheme-dark mb-1 block">Emoji</label>
                  <Input
                    value={newEmojiText}
                    onChange={(e) => setNewEmojiText(e.target.value)}
                    placeholder="Enter emoji or text"
                    className="blue-gui-input"
                  />
                </div>
                <div>
                  <label className="text-xs text-blueTheme-dark mb-1 block">Name</label>
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
