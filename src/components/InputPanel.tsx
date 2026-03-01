import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Image, Video, AudioLines, Mic, Search, Sparkles } from "lucide-react";
import { useApp } from "@/contexts/AppContext";

interface InputPanelProps {
  onAnalyze: (formData: FormData) => void;
  isAnalyzing: boolean;
}

const InputPanel = ({ onAnalyze, isAnalyzing }: InputPanelProps) => {
  const { t, isSimpleMode } = useApp();
  const [content, setContent] = useState("");
  const [language, setLanguage] = useState("English");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = (type: string) => {
    if (type === "image" && fileInputRef.current) {
      fileInputRef.current.click();
    } else {
      // Fallback or placeholder for other types if needed, 
      // but backend currently only supports image specifically for file uploads
      alert(`Upload for ${type} is not supported in this demo yet.`);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setUploadedFile(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    if (content.trim() || uploadedFile) {
      const formData = new FormData();
      if (content.trim()) {
        formData.append("text", content.trim());
      }
      if (uploadedFile) {
        formData.append("image", uploadedFile);
      }

      // Pass the selected UI language to the backend for the AI payload
      formData.append("language", language);

      onAnalyze(formData);
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

      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/jpeg, image/png, image/webp"
        style={{ display: "none" }}
      />

      {/* Upload Buttons */}
      <div className="grid grid-cols-2 gap-2.5">
        {uploadButtons.map(({ icon: Icon, label, type }) => (
          <motion.button
            key={type}
            type="button"
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleUploadClick(type)}
            className={`flex items-center justify-center gap-2 rounded-2xl glass px-3 transition-all ${uploadedFile && type === "image"
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
          className="text-xs text-accent font-medium truncate"
        >
          📎 {uploadedFile.name}
        </motion.p>
      )}

      {/* Language Selector */}
      <div>
        <label className={`mb-2 block font-medium text-foreground ${isSimpleMode ? "text-base" : "text-sm"}`}>
          {t("dashboard.language")}
        </label>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="w-full rounded-2xl glass px-4 py-3 text-sm text-foreground outline-none transition-all focus:border-accent/60 cursor-pointer"
        >
          <option value="English" className="bg-card">English</option>
          <option value="Hindi" className="bg-card">हिंदी</option>
          <option value="Marathi" className="bg-card">मराठी</option>
        </select>
      </div>

      {/* Analyze Button */}
      <motion.button
        type="button"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        onClick={(e) => {
          e.preventDefault();
          console.log("Verify Button Clicked! Content length:", content.length, "File:", uploadedFile?.name);
          handleSubmit();
        }}
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

