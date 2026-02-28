import { Shield } from "lucide-react";
import { useApp } from "@/contexts/AppContext";

const Footer = () => {
  const { t } = useApp();

  return (
    <footer className="border-t border-border/50 glass-strong py-8">
      <div className="container mx-auto flex flex-col items-center gap-3 px-4 text-center">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Shield className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="font-display text-sm font-semibold gradient-text logo-text">SatyaDrishti</span>
        </div>
        <p className="text-xs text-muted-foreground">{t("footer.tagline")}</p>
        <p className="text-xs text-muted-foreground/60">© 2026 SatyaDrishti. {t("footer.rights")}</p>
      </div>
    </footer>
  );
};

export default Footer;
