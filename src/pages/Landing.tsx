import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Upload, BarChart3, CheckCircle, Layers, Target, Brain, Link2, Languages, Moon, ArrowRight } from "lucide-react";
import { useApp } from "@/contexts/AppContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const steps = [
  { icon: Upload, key: "step1" },
  { icon: BarChart3, key: "step2" },
  { icon: CheckCircle, key: "step3" },
];

const features = [
  { icon: Layers, key: "multiFormat" },
  { icon: Target, key: "riskScoring" },
  { icon: Brain, key: "explainableAI" },
  { icon: Link2, key: "sourceVerify" },
  { icon: Languages, key: "multilingual" },
  { icon: Moon, key: "darkMode" },
];

const Landing = () => {
  const { t, isSimpleMode } = useApp();
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col gradient-bg">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[#EFF6FF]/60 dark:bg-transparent">
        {/* Animated background glows */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-primary/10 blur-[100px]"
          />
          <motion.div
            animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-accent/10 blur-[100px]"
          />
        </div>

        <div className="container relative mx-auto px-4 py-24 md:py-36">

          {/* Shield — centered background watermark */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.1, ease: "easeOut" }}
            className="pointer-events-none absolute inset-0 flex items-center justify-center"
            style={{ zIndex: 0 }}
          >
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              style={{ opacity: 0.22, filter: "blur(0.5px) drop-shadow(0 0 32px hsl(230 60% 29% / 0.18))" }}
            >
              <svg
                viewBox="0 0 260 300"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                className="h-[360px] w-auto sm:h-[440px] md:h-[510px]"
              >
                <defs>
                  <radialGradient id="shieldGlow" cx="50%" cy="45%" r="55%">
                    <stop offset="0%" stopColor="hsl(230,60%,29%)" stopOpacity="0.18" />
                    <stop offset="100%" stopColor="hsl(230,60%,29%)" stopOpacity="0" />
                  </radialGradient>
                  <linearGradient id="shieldFill" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="hsl(230,60%,29%)" stopOpacity="0.13" />
                    <stop offset="100%" stopColor="hsl(173,80%,40%)" stopOpacity="0.06" />
                  </linearGradient>
                  <linearGradient id="shieldBorder" x1="0%" y1="0%" x2="80%" y2="100%">
                    <stop offset="0%" stopColor="hsl(230,60%,55%)" stopOpacity="0.7" />
                    <stop offset="60%" stopColor="hsl(200,70%,50%)" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="hsl(173,80%,40%)" stopOpacity="0.5" />
                  </linearGradient>
                  <linearGradient id="shieldShine" x1="20%" y1="0%" x2="80%" y2="60%">
                    <stop offset="0%" stopColor="white" stopOpacity="0.09" />
                    <stop offset="100%" stopColor="white" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {/* Soft glow halo */}
                <ellipse cx="130" cy="148" rx="105" ry="118" fill="url(#shieldGlow)" />
                {/* Shield body */}
                <path
                  d="M130 12 L238 52 L238 145 C238 205 190 258 130 278 C70 258 22 205 22 145 L22 52 Z"
                  fill="url(#shieldFill)"
                  stroke="url(#shieldBorder)"
                  strokeWidth="1.8"
                />
                {/* Inner shine */}
                <path
                  d="M130 12 L238 52 L238 145 C238 205 190 258 130 278 C70 258 22 205 22 145 L22 52 Z"
                  fill="url(#shieldShine)"
                />
                {/* Circuit rail lines */}
                <line x1="60" y1="148" x2="200" y2="148" stroke="hsl(230,60%,55%)" strokeWidth="0.8" strokeOpacity="0.35" strokeDasharray="4 5" />
                <line x1="130" y1="75" x2="130" y2="230" stroke="hsl(230,60%,55%)" strokeWidth="0.8" strokeOpacity="0.35" strokeDasharray="4 5" />
                <line x1="75" y1="100" x2="105" y2="148" stroke="hsl(173,80%,40%)" strokeWidth="0.7" strokeOpacity="0.3" />
                <line x1="185" y1="100" x2="155" y2="148" stroke="hsl(173,80%,40%)" strokeWidth="0.7" strokeOpacity="0.3" />
                <line x1="80" y1="195" x2="110" y2="148" stroke="hsl(173,80%,40%)" strokeWidth="0.7" strokeOpacity="0.3" />
                <line x1="180" y1="195" x2="150" y2="148" stroke="hsl(173,80%,40%)" strokeWidth="0.7" strokeOpacity="0.3" />
                {/* Node dots */}
                <circle cx="130" cy="148" r="3.5" fill="hsl(230,60%,55%)" fillOpacity="0.6" />
                <circle cx="75" cy="100" r="2.2" fill="hsl(173,80%,40%)" fillOpacity="0.5" />
                <circle cx="185" cy="100" r="2.2" fill="hsl(173,80%,40%)" fillOpacity="0.5" />
                <circle cx="80" cy="195" r="2.2" fill="hsl(173,80%,40%)" fillOpacity="0.5" />
                <circle cx="180" cy="195" r="2.2" fill="hsl(173,80%,40%)" fillOpacity="0.5" />
                <circle cx="60" cy="148" r="2" fill="hsl(230,60%,55%)" fillOpacity="0.4" />
                <circle cx="200" cy="148" r="2" fill="hsl(230,60%,55%)" fillOpacity="0.4" />
                <circle cx="130" cy="75" r="2" fill="hsl(230,60%,55%)" fillOpacity="0.4" />
                <circle cx="130" cy="230" r="2" fill="hsl(230,60%,55%)" fillOpacity="0.4" />
                {/* Concentric rings */}
                <circle cx="130" cy="148" r="22" stroke="hsl(230,60%,55%)" strokeWidth="1" strokeOpacity="0.25" fill="none" />
                <circle cx="130" cy="148" r="34" stroke="hsl(173,80%,40%)" strokeWidth="0.6" strokeOpacity="0.15" fill="none" strokeDasharray="3 6" />
                {/* Checkmark */}
                <polyline
                  points="114,148 125,160 148,134"
                  stroke="hsl(230,60%,65%)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                  strokeOpacity="0.85"
                />
              </svg>
            </motion.div>
          </motion.div>

          {/* Text content — above shield */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="relative mx-auto max-w-3xl text-center"
            style={{ zIndex: 10 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-8 inline-flex items-center gap-2 rounded-full glass px-5 py-2 text-xs font-medium text-accent"
            >
              <span className="h-2 w-2 rounded-full bg-accent animate-pulse-glow" />
              AI-Powered Verification
            </motion.div>

            <h1 className={`font-display font-bold leading-tight gradient-text ${isSimpleMode ? "text-5xl md:text-7xl" : "text-4xl md:text-6xl"}`}>
              {t("landing.headline")}
            </h1>

            <p className={`mx-auto mt-6 max-w-2xl text-muted-foreground ${isSimpleMode ? "text-xl md:text-2xl" : "text-base md:text-lg"}`}>
              {t("landing.subheading")}
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate("/dashboard")}
              className={`group mt-10 inline-flex items-center gap-2.5 rounded-2xl bg-primary font-display font-semibold text-primary-foreground transition-all glow-primary hover:shadow-2xl ${isSimpleMode ? "px-12 py-5 text-xl" : "px-10 py-4 text-base"}`}
            >
              {t("landing.cta")}
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </motion.button>
          </motion.div>

        </div>
      </section>

      {/* How It Works */}
      <section className="relative border-t border-border/50 py-20 md:py-28 bg-[#F0F6FF]/50 dark:bg-transparent">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className={`text-center font-display font-bold gradient-text ${isSimpleMode ? "text-3xl" : "text-2xl"} mb-14`}
          >
            {t("landing.howItWorks")}
          </motion.h2>
          <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-3">
            {steps.map(({ icon: Icon, key }, i) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                whileHover={{ y: -8 }}
                className="group relative flex flex-col items-center glass rounded-2xl p-8 text-center transition-all hover:glow-accent"
                style={{ animationDelay: `${i * 2}s` }}
              >
                <motion.div
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/15 text-accent"
                >
                  <Icon className="h-8 w-8" />
                </motion.div>
                <span className="absolute -top-3 left-4 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground shadow-lg">
                  {i + 1}
                </span>
                <h3 className={`font-display font-semibold text-foreground ${isSimpleMode ? "text-xl" : "text-base"}`}>
                  {t(`landing.${key}.title`)}
                </h3>
                <p className={`mt-2 text-muted-foreground ${isSimpleMode ? "text-base" : "text-sm"}`}>
                  {t(`landing.${key}.desc`)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 md:py-28 bg-[#F5F3FF]/30 dark:bg-transparent">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className={`text-center font-display font-bold gradient-text ${isSimpleMode ? "text-3xl" : "text-2xl"} mb-14`}
          >
            {t("landing.features")}
          </motion.h2>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map(({ icon: Icon, key }, i) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -4, scale: 1.02 }}
                className="group flex items-start gap-4 glass rounded-2xl p-5 transition-all hover:glow-accent"
              >
                <motion.div
                  whileHover={{ rotate: 10 }}
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary transition-colors group-hover:bg-accent/15 group-hover:text-accent"
                >
                  <Icon className="h-5 w-5" />
                </motion.div>
                <div>
                  <h3 className={`font-display font-semibold text-foreground ${isSimpleMode ? "text-lg" : "text-sm"}`}>
                    {t(`feature.${key}`)}
                  </h3>
                  <p className={`mt-1 text-muted-foreground ${isSimpleMode ? "text-base" : "text-xs"}`}>
                    {t(`feature.${key}.desc`)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Landing;
