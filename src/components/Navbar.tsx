import { Sun, Moon, Globe, Shield, Eye } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "@/contexts/AppContext";
import { Link, useLocation } from "react-router-dom";
import { Language } from "@/i18n/translations";

const languageLabels: Record<Language, string> = {
  en: "English",
  hi: "हिंदी",
  mr: "मराठी",
};

const Navbar = () => {
  const { t, language, setLanguage, isDark, toggleTheme, isSimpleMode, toggleSimpleMode } = useApp();
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 glass-strong">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link to="/" className="group flex items-center gap-2.5">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent glow-primary"
          >
            <Shield className="h-5 w-5 text-primary-foreground" />
          </motion.div>
          <span className="font-display text-lg font-bold gradient-text">
            SatyaDrishti
          </span>
        </Link>

        {/* Nav links */}
        <div className="hidden items-center gap-1 md:flex">
          {[
            { to: "/", label: t("nav.home") },
            { to: "/dashboard", label: t("nav.dashboard") },
          ].map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`relative rounded-lg px-4 py-2 text-sm font-medium transition-all hover:text-accent ${
                location.pathname === to ? "text-accent" : "text-muted-foreground"
              }`}
            >
              {label}
              {location.pathname === to && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full bg-accent"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </Link>
          ))}
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          {/* Simple Mode */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleSimpleMode}
            className={`flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-medium transition-all ${
              isSimpleMode
                ? "bg-accent/20 text-accent glow-accent"
                : "glass text-muted-foreground hover:text-foreground"
            }`}
            title={t("nav.simpleMode")}
          >
            <Eye className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">{t("nav.simpleMode")}</span>
          </motion.button>

          {/* Language */}
          <div className="relative">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as Language)}
              className="appearance-none rounded-xl glass px-3 py-2 pr-7 text-xs font-medium text-foreground outline-none transition-all hover:border-accent/50 cursor-pointer"
            >
              {Object.entries(languageLabels).map(([key, label]) => (
                <option key={key} value={key} className="bg-card text-foreground">{label}</option>
              ))}
            </select>
            <Globe className="pointer-events-none absolute right-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          </div>

          {/* Theme toggle */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme}
            className="relative rounded-xl glass p-2.5 text-foreground transition-all hover:border-accent/50"
          >
            <AnimatePresence mode="wait">
              {isDark ? (
                <motion.div
                  key="sun"
                  initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Sun className="h-4 w-4" />
                </motion.div>
              ) : (
                <motion.div
                  key="moon"
                  initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Moon className="h-4 w-4" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>

          {/* Mobile nav */}
          <div className="flex items-center gap-1 md:hidden">
            <Link to="/dashboard" className="rounded-xl glass p-2 text-muted-foreground hover:text-accent">
              <Shield className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
