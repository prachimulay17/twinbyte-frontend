import { motion } from "framer-motion";
import { AlertTriangle, ExternalLink, Volume2, CheckCircle2, XCircle } from "lucide-react";
import { useState } from "react";
import { AnalysisResult } from "@/data/mockResults";
import { useApp } from "@/contexts/AppContext";
import RiskRing from "@/components/RiskRing";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface ResultPanelProps {
  result: AnalysisResult;
}

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
};

const ResultPanel = ({ result }: ResultPanelProps) => {
  const { t, isSimpleMode } = useApp();
  const [isPlaying, setIsPlaying] = useState(false);
  const isHighRisk = result.riskScore > 60;

  const classificationColor = () => {
    switch (result.classification) {
      case "Fake": return "bg-destructive/15 text-destructive border border-destructive/30";
      case "Likely Fake": return "bg-warning/15 text-warning border border-warning/30";
      case "Authentic": return "bg-success/15 text-success border border-success/30";
    }
  };

  const classificationKey = () => {
    switch (result.classification) {
      case "Fake": return t("class.fake");
      case "Likely Fake": return t("class.likelyFake");
      case "Authentic": return t("class.authentic");
    }
  };

  const handleTTS = () => {
    setIsPlaying(true);
    setTimeout(() => setIsPlaying(false), 3000);
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="flex flex-col gap-5"
    >
      <motion.h2 variants={item} className={`font-display font-bold text-foreground ${isSimpleMode ? "text-2xl" : "text-xl"}`}>
        {t("result.title")}
      </motion.h2>

      {/* Decision Block */}
      <motion.div
        variants={item}
        className={`relative overflow-hidden rounded-2xl border-2 p-5 ${
          isHighRisk
            ? "border-destructive/40 bg-destructive/5 glow-destructive"
            : "border-success/40 bg-success/5 glow-success"
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-transparent to-background/20" />
        <div className="relative">
          <p className={`text-center font-display font-semibold ${isSimpleMode ? "text-lg" : "text-sm"} text-muted-foreground mb-2`}>
            {t("result.decision")}
          </p>
          <div className="flex items-center justify-center gap-2">
            {isHighRisk ? (
              <XCircle className="h-6 w-6 text-destructive" />
            ) : (
              <CheckCircle2 className="h-6 w-6 text-success" />
            )}
            <span className={`font-display font-bold ${isHighRisk ? "text-destructive" : "text-success"} ${isSimpleMode ? "text-2xl" : "text-lg"}`}>
              {isHighRisk ? t("result.decisionYes") : t("result.decisionNo")}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Classification Badge */}
      <motion.div variants={item} className="flex items-center gap-3">
        <span className={`text-sm font-medium ${isSimpleMode ? "text-base" : ""} text-muted-foreground`}>{t("result.classification")}:</span>
        <motion.span
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          className={`rounded-full px-4 py-1.5 text-sm font-bold ${classificationColor()}`}
        >
          {classificationKey()}
        </motion.span>
      </motion.div>

      {/* Risk Score Ring */}
      <motion.div variants={item} className="glass rounded-2xl p-6 flex flex-col items-center gap-3">
        <span className={`font-medium text-foreground ${isSimpleMode ? "text-lg" : "text-sm"}`}>{t("result.riskScore")}</span>
        <RiskRing score={result.riskScore} />
      </motion.div>

      {/* Confidence */}
      <motion.div variants={item} className="glass rounded-2xl p-4 flex items-center justify-between">
        <span className={`font-medium text-foreground ${isSimpleMode ? "text-lg" : "text-sm"}`}>{t("result.confidence")}</span>
        <div className="flex items-center gap-2">
          <div className="h-2 w-24 rounded-full bg-muted overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${result.confidence}%` }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
              className="h-full rounded-full bg-accent"
            />
          </div>
          <span className={`font-display font-bold text-accent ${isSimpleMode ? "text-2xl" : "text-xl"}`}>
            {result.confidence}%
          </span>
        </div>
      </motion.div>

      {/* Warning Box */}
      {isHighRisk && (
        <motion.div
          variants={item}
          className="rounded-2xl border-2 border-destructive/30 bg-destructive/5 p-5 glow-destructive"
        >
          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-destructive/15">
              <AlertTriangle className="h-4 w-4 text-destructive" />
            </div>
            <div>
              <p className={`font-display font-bold text-destructive ${isSimpleMode ? "text-lg" : "text-sm"}`}>
                {t("result.warning")}
              </p>
              <p className={`mt-1 text-muted-foreground ${isSimpleMode ? "text-base" : "text-xs"}`}>
                {t("result.warningMsg")}
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Explanation Accordion */}
      <motion.div variants={item}>
        <Accordion type="single" collapsible defaultValue="explanation">
          <AccordionItem value="explanation" className="glass rounded-2xl px-5 border-none">
            <AccordionTrigger className={`font-medium text-foreground ${isSimpleMode ? "text-lg" : "text-sm"}`}>
              {t("result.explanation")}
            </AccordionTrigger>
            <AccordionContent>
              <ul className="space-y-3 pb-2">
                {result.explanation.map((text, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + i * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent" />
                    <span className={`text-muted-foreground ${isSimpleMode ? "text-base" : "text-sm"}`}>{text}</span>
                  </motion.li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </motion.div>

      {/* Source Verification */}
      <motion.div variants={item} className="glass rounded-2xl p-5">
        <p className={`mb-3 font-medium text-foreground ${isSimpleMode ? "text-lg" : "text-sm"}`}>
          {t("result.sourceVerify")}
        </p>
        {result.verifiedLink ? (
          <motion.a
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            href={result.verifiedLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-primary/80 px-5 py-2.5 text-sm font-medium text-primary-foreground transition-all glow-primary"
          >
            <ExternalLink className="h-4 w-4" />
            {t("result.openSource")}
          </motion.a>
        ) : (
          <p className={`text-muted-foreground ${isSimpleMode ? "text-base" : "text-sm"}`}>
            {t("result.noSource")}
          </p>
        )}
      </motion.div>

      {/* TTS Button */}
      <motion.button
        variants={item}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleTTS}
        disabled={isPlaying}
        className={`flex items-center justify-center gap-2 rounded-2xl glass px-5 py-3.5 font-medium text-foreground transition-all hover:border-accent/50 disabled:opacity-50 ${
          isPlaying ? "glow-accent" : ""
        }`}
      >
        <Volume2 className={`h-4 w-4 ${isPlaying ? "animate-pulse-glow text-accent" : ""}`} />
        <span className={isSimpleMode ? "text-base" : "text-sm"}>
          {isPlaying ? t("result.listening") : t("result.listenResult")}
        </span>
      </motion.button>
    </motion.div>
  );
};

export default ResultPanel;
