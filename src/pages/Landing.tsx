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
      <section className="relative overflow-hidden">
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
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mx-auto max-w-3xl text-center"
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
              className={`group mt-10 inline-flex items-center gap-2.5 rounded-2xl bg-gradient-to-r from-primary to-primary/80 font-display font-semibold text-primary-foreground transition-all glow-primary hover:shadow-2xl ${
                isSimpleMode ? "px-12 py-5 text-xl" : "px-10 py-4 text-base"
              }`}
            >
              {t("landing.cta")}
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="relative border-t border-border/50 py-20 md:py-28">
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
                  className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-accent/20 to-accent/5 text-accent"
                >
                  <Icon className="h-8 w-8" />
                </motion.div>
                <span className="absolute -top-3 left-4 flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/80 text-xs font-bold text-primary-foreground shadow-lg">
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
      <section className="py-20 md:py-28">
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
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary/15 to-accent/10 text-primary transition-colors group-hover:from-accent/20 group-hover:to-accent/5 group-hover:text-accent"
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
