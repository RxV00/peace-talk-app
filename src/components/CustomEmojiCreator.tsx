
import React, { useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Slider } from "./ui/slider";
import { Switch } from "./ui/switch";
import { Card, CardContent } from "./ui/card";
import { Palette, User, Smile } from "lucide-react";
import { motion } from "framer-motion";

type EmojiFeature = {
  type: string;
  options: string[];
  current: number;
};

interface CustomEmojiCreatorProps {
  initialEmoji?: string;
  onEmojiCreate: (emoji: string) => void;
  activeProfile: 1 | 2;
}

const SKIN_COLORS = ["🏻", "🏼", "🏽", "🏾", "🏿", ""];
const HAIR_STYLES = ["👱", "👨", "👩", "🧑", "👴", "👵", "🧓"];
const FACE_FEATURES = ["😊", "😄", "😁", "🙂", "😍", "😎", "🤔"];

const CustomEmojiCreator: React.FC<CustomEmojiCreatorProps> = ({
  initialEmoji = "🙂",
  onEmojiCreate,
  activeProfile
}) => {
  const [baseEmoji, setBaseEmoji] = useState<string>("🙂");
  const [skinTone, setSkinTone] = useState<string>("");
  const [hairStyle, setHairStyle] = useState<string>("");
  const [previewEmoji, setPreviewEmoji] = useState<string>(initialEmoji);

  const updateEmoji = () => {
    // This is a simplified representation as actual emoji composition is more complex
    // In a real implementation, we would use proper emoji composition techniques
    const newEmoji = hairStyle + skinTone + baseEmoji;
    setPreviewEmoji(newEmoji);
  };

  const applySelection = () => {
    onEmojiCreate(previewEmoji);
  };

  // Update preview when any component changes
  React.useEffect(() => {
    updateEmoji();
  }, [baseEmoji, skinTone, hairStyle]);

  return (
    <Card className="purpleTheme border-purpleTheme-medium/30">
      <CardContent className="pt-6">
        <div className="flex flex-col items-center space-y-6">
          {/* Preview */}
          <div className="emoji-preview mb-4">
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.1 }}
              className="text-6xl cursor-pointer"
              onClick={applySelection}
            >
              {previewEmoji}
            </motion.div>
            <p className="text-sm text-center mt-2 text-purpleTheme-dark">
              {`Partner ${activeProfile} Avatar`}
            </p>
          </div>

          {/* Customization options */}
          <div className="grid grid-cols-1 gap-4 w-full">
            {/* Skin Tone Selection */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Palette className="h-4 w-4 text-purpleTheme-dark" />
                <h3 className="text-sm font-medium text-purpleTheme-dark">Skin Tone</h3>
              </div>
              <div className="flex justify-between items-center">
                {SKIN_COLORS.map((tone, index) => (
                  <button
                    key={index}
                    className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${
                      skinTone === tone ? "border-purpleTheme" : "border-transparent"
                    }`}
                    onClick={() => setSkinTone(tone)}
                  >
                    <span className="text-xl">{tone ? `👍${tone}` : "👍"}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Hair Style Selection */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4 text-purpleTheme-dark" />
                <h3 className="text-sm font-medium text-purpleTheme-dark">Base Character</h3>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {HAIR_STYLES.map((style, index) => (
                  <button
                    key={index}
                    className={`h-10 rounded-md border-2 flex items-center justify-center ${
                      hairStyle === style ? "border-purpleTheme bg-purpleTheme-light/20" : "border-transparent hover:bg-purpleTheme-light/10"
                    }`}
                    onClick={() => setHairStyle(style)}
                  >
                    <span className="text-xl">{style}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Face Features Selection */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Smile className="h-4 w-4 text-purpleTheme-dark" />
                <h3 className="text-sm font-medium text-purpleTheme-dark">Expression</h3>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {FACE_FEATURES.map((face, index) => (
                  <button
                    key={index}
                    className={`h-10 rounded-md border-2 flex items-center justify-center ${
                      baseEmoji === face ? "border-purpleTheme bg-purpleTheme-light/20" : "border-transparent hover:bg-purpleTheme-light/10"
                    }`}
                    onClick={() => setBaseEmoji(face)}
                  >
                    <span className="text-xl">{face}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Apply button */}
          <Button 
            onClick={applySelection} 
            className="w-full bg-purpleTheme hover:bg-purpleTheme-hover text-white"
          >
            Apply Avatar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomEmojiCreator;
