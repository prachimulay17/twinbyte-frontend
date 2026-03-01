import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import InputPanel from "@/components/InputPanel";
import ResultPanel from "@/components/ResultPanel";
import ProcessingAnimation from "@/components/ProcessingAnimation";
import { AnalysisResult } from "@/data/mockResults";

const Dashboard = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [processingStep, setProcessingStep] = useState(0);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = useCallback(async (formData: FormData) => {
    setIsAnalyzing(true);
    setResult(null);
    setError(null);
    setProcessingStep(0);

    // Simulate small UI progressive steps while waiting for network
    const interval = setInterval(() => {
      setProcessingStep((prev) => (prev < 2 ? prev + 1 : prev));
    }, 800);

    try {
      console.log("Sending request to backend... URL: http://localhost:8080/api/verify");

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000); // 15s timeout

      const response = await fetch("http://localhost:8080/api/verify", {
        method: "POST",
        body: formData,
        signal: controller.signal
      });

      clearTimeout(timeoutId);
      clearInterval(interval);

      console.log("Response Status:", response.status);
      const rawText = await response.text();
      console.log("Raw Response Text length:", rawText.length, "Preview:", rawText.substring(0, 50));

      if (!response.ok) {
        let errorMsg = "Server returned an error.";
        if (rawText) {
          try {
            const errData = JSON.parse(rawText);
            errorMsg = errData.error || errorMsg;
          } catch {
            errorMsg = `Server error (${response.status}): ${rawText.substring(0, 100)}`;
          }
        }
        throw new Error(errorMsg);
      }

      if (!rawText) {
        throw new Error("Received empty response from server.");
      }

      let data;
      try {
        data = JSON.parse(rawText);
      } catch (e) {
        throw new Error("Invalid response format received from server.");
      }

      if (!data.success) {
        throw new Error(data.error || "Failed to analyze content.");
      }

      // Map riskScore to Green/Yellow/Red Risk Color Logic:
      // 0–30 → Green (Low Risk)
      // 31–60 → Yellow (Medium Risk)
      // 61–100 → Red (High Risk)
      const score = data.riskScore;
      let classification: "Fake" | "Likely Fake" | "Authentic" = "Authentic";
      if (score >= 61) classification = "Fake";
      else if (score >= 31) classification = "Likely Fake";

      const analysisResult: AnalysisResult = {
        classification,
        riskScore: score,
        confidence: data.confidence,
        explanation: [data.explanation],
        verifiedLink: null,
      };

      setResult(analysisResult);
    } catch (err: any) {
      clearInterval(interval);
      console.error("Analysis Error:", err);

      let finalMessage = err.message;
      if (err.name === "AbortError") {
        finalMessage = "Server taking too long to respond. Please try again.";
      } else if (err.message === "Failed to fetch") {
        finalMessage = "Server unavailable. Make sure the backend is running.";
      }

      setError(finalMessage);
    } finally {
      setIsAnalyzing(false);
    }
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
              className="glass rounded-3xl p-6 md:p-8 relative"
            >
              <AnimatePresence mode="wait">
                {isAnalyzing ? (
                  <ProcessingAnimation
                    key="processing"
                    currentStep={processingStep}
                    isVisible={true}
                  />
                ) : error ? (
                  <motion.div
                    key="error"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex h-full min-h-[400px] flex-col items-center justify-center text-center px-4"
                  >
                    <div className="mb-4 rounded-full bg-destructive/10 p-3 text-destructive">
                      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2">Analysis Failed</h3>
                    <p className="text-muted-foreground">{error}</p>
                  </motion.div>
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
