import { useState } from "react";
import { motion } from "framer-motion";
import { Image, Video, AudioLines, Mic, Search, Sparkles } from "lucide-react";
import { useApp } from "@/contexts/AppContext";

interface InputPanelProps {
  onAnalyze: (content: string) => void;
  isAnalyzing: boolean;
}

const InputPanel = ({ onAnalyze, isAnalyzing }: InputPanelProps) => {
  const { t, isSimpleMode } = useApp();
  const [content, setContent] = useState("");
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);

  const handleUpload = (type: string) => {
    setUploadedFile(`${type}_sample.${type === "image" ? "jpg" : type === "video" ? "mp4" : "mp3"}`);
  };

  const handleSubmit = () => {
    if (content.trim() || uploadedFile) {
      onAnalyze(content || uploadedFile || "");
    }
  };

  const uploadButtons = [
    { icon: Image, label: t("dashboard.upload.image"), type: "image" },
    { icon: Video, label: t("dashboard.upload.video"), type: "video" },
    { icon: AudioLines, label: t("dashboard.upload.audio"), type: "audio" },
    { icon: Mic, label: t("dashboard.upload.voice"), type: "voice" },
  ];

  return (
    <div className="flex flex-col gap-5">
      <h2 className={`font-display font-bold text-foreground ${isSimpleMode ? "text-2xl" : "text-xl"}`}>
        {t("dashboard.title")}
      </h2>

      {/* Text Input */}
      <div>
        <label className={`mb-2 block font-medium text-foreground ${isSimpleMode ? "text-base" : "text-sm"}`}>
          {t("dashboard.inputLabel")}
        </label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={t("dashboard.placeholder")}
          rows={isSimpleMode ? 6 : 5}
          className={`w-full resize-none rounded-2xl glass px-4 py-3.5 text-foreground placeholder:text-muted-foreground outline-none transition-all focus:border-accent/60 focus:ring-2 focus:ring-accent/20 focus:glow-accent ${isSimpleMode ? "text-lg" : "text-sm"
            }`}
        />
      </div>

      {/* Upload Buttons */}
      <div className="grid grid-cols-2 gap-2.5">
        {uploadButtons.map(({ icon: Icon, label, type }) => (
          <motion.button
            key={type}
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleUpload(type)}
            className={`flex items-center justify-center gap-2 rounded-2xl glass px-3 transition-all ${uploadedFile?.startsWith(type)
                ? "border-accent/50 bg-accent/10 text-accent glow-accent"
                : "text-muted-foreground hover:text-foreground hover:border-accent/30"
              } ${isSimpleMode ? "text-base py-3.5" : "text-sm py-3"}`}
          >
            <Icon className="h-4 w-4" />
            {label}
          </motion.button>
        ))}
      </div>

      {uploadedFile && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs text-accent font-medium"
        >
          📎 {uploadedFile}
        </motion.p>
      )}

      {/* Language Selector */}
      <div>
        <label className={`mb-2 block font-medium text-foreground ${isSimpleMode ? "text-base" : "text-sm"}`}>
          {t("dashboard.language")}
        </label>
        <select className="w-full rounded-2xl glass px-4 py-3 text-sm text-foreground outline-none transition-all focus:border-accent/60 cursor-pointer">
          <option value="en" className="bg-card">English</option>
          <option value="hi" className="bg-card">हिंदी</option>
          <option value="mr" className="bg-card">मराठी</option>
        </select>
      </div>

      {/* Analyze Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        onClick={handleSubmit}
        disabled={isAnalyzing || (!content.trim() && !uploadedFile)}
        className={`relative flex items-center justify-center gap-2.5 overflow-hidden rounded-2xl bg-primary px-6 font-display font-semibold text-primary-foreground transition-all disabled:opacity-40 disabled:cursor-not-allowed glow-primary ${isSimpleMode ? "py-4.5 text-lg" : "py-3.5 text-sm"
          }`}
      >
        {isAnalyzing ? (
          <>
            <Sparkles className="h-4 w-4 animate-pulse-glow" />
            {t("dashboard.analyzing")}
          </>
        ) : (
          <>
            <Search className="h-4 w-4" />
            {t("dashboard.analyze")}
          </>
        )}
      </motion.button>
    </div>
  );
};

export default InputPanel;
