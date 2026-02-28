import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import InputPanel from "@/components/InputPanel";
import ResultPanel from "@/components/ResultPanel";
import ProcessingAnimation from "@/components/ProcessingAnimation";
import { AnalysisResult, getRandomResult } from "@/data/mockResults";

const Dashboard = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [processingStep, setProcessingStep] = useState(0);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleAnalyze = useCallback((content: string) => {
    setIsAnalyzing(true);
    setResult(null);
    setProcessingStep(0);

    const timers = [
      setTimeout(() => setProcessingStep(1), 800),
      setTimeout(() => setProcessingStep(2), 1600),
      setTimeout(() => {
        setIsAnalyzing(false);
        setResult(getRandomResult());
      }, 2800),
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="flex min-h-screen flex-col gradient-bg">
      <Navbar />

      <main className="flex-1 py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
            {/* Left: Input */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="glass rounded-3xl p-6 md:p-8"
            >
              <InputPanel onAnalyze={handleAnalyze} isAnalyzing={isAnalyzing} />
            </motion.div>

            {/* Right: Results */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="glass rounded-3xl p-6 md:p-8"
            >
              <AnimatePresence mode="wait">
                {isAnalyzing ? (
                  <ProcessingAnimation
                    key="processing"
                    currentStep={processingStep}
                    isVisible={true}
                  />
                ) : result ? (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                  >
                    <ResultPanel result={result} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex h-full min-h-[400px] flex-col items-center justify-center text-center"
                  >
                    <motion.div
                      animate={{ y: [0, -8, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl glass"
                    >
                      <svg className="h-10 w-10 text-muted-foreground/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
                      </svg>
                    </motion.div>
                    <p className="text-sm text-muted-foreground">
                      Submit content to see analysis results
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
