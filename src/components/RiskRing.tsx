import { motion } from "framer-motion";

interface RiskRingProps {
  score: number;
  size?: number;
  strokeWidth?: number;
}

const RiskRing = ({ score, size = 140, strokeWidth = 10 }: RiskRingProps) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  const getColor = () => {
    if (score <= 30) return "hsl(142, 76%, 36%)";
    if (score <= 60) return "hsl(38, 92%, 50%)";
    return "hsl(0, 84%, 50%)";
  };

  const getGlowClass = () => {
    if (score <= 30) return "glow-success";
    if (score <= 60) return "";
    return "glow-destructive";
  };

  return (
    <div className={`relative inline-flex items-center justify-center ${getGlowClass()} rounded-full`}>
      <svg width={size} height={size} className="-rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-muted/50"
        />
        {/* Animated fill */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={getColor()}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.8, ease: "easeOut", delay: 0.3 }}
        />
      </svg>
      {/* Center text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.4 }}
          className="font-display text-3xl font-bold"
          style={{ color: getColor() }}
        >
          {score}%
        </motion.span>
        <span className="text-xs text-muted-foreground font-medium">Risk</span>
      </div>
    </div>
  );
};

export default RiskRing;
