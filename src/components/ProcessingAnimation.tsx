import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "@/contexts/AppContext";

interface ProcessingAnimationProps {
  currentStep: number;
  isVisible: boolean;
}

const ProcessingAnimation = ({ currentStep, isVisible }: ProcessingAnimationProps) => {
  const { t } = useApp();
  const steps = [
    t("processing.step1"),
    t("processing.step2"),
    t("processing.step3"),
  ];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="flex flex-col items-center gap-8 rounded-2xl glass p-10"
        >
          {/* Animated ring loader */}
          <div className="relative flex items-center justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="h-20 w-20 rounded-full border-[3px] border-muted"
              style={{
                borderTopColor: "hsl(173, 80%, 40%)",
                borderRightColor: "hsl(173, 80%, 40%)",
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="h-3 w-3 rounded-full bg-accent"
              />
            </div>
          </div>

          {/* Steps */}
          <div className="flex flex-col gap-4 w-full max-w-xs">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -15 }}
                animate={{
                  opacity: i <= currentStep ? 1 : 0.3,
                  x: 0,
                }}
                transition={{ delay: i * 0.15, duration: 0.3 }}
                className="flex items-center gap-3"
              >
                <div className="relative">
                  <div
                    className={`h-3 w-3 rounded-full transition-all duration-500 ${
                      i < currentStep
                        ? "bg-success"
                        : i === currentStep
                        ? "bg-accent"
                        : "bg-muted"
                    }`}
                  />
                  {i === currentStep && (
                    <motion.div
                      animate={{ scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="absolute inset-0 rounded-full bg-accent"
                    />
                  )}
                </div>
                <span
                  className={`text-sm font-medium transition-colors duration-300 ${
                    i <= currentStep ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {step}
                </span>
                {i < currentStep && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="ml-auto text-xs text-success"
                  >
                    ✓
                  </motion.span>
                )}
              </motion.div>
            ))}
          </div>

          {/* Shimmer bar */}
          <div className="h-1.5 w-full max-w-xs rounded-full bg-muted overflow-hidden">
            <motion.div
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="h-full w-1/2 rounded-full bg-gradient-to-r from-transparent via-accent/60 to-transparent"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProcessingAnimation;
