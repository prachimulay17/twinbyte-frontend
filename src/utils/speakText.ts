/**
 * speakText — modular Text-to-Speech utility using SpeechSynthesis API.
 *
 * Usage:  speakText("Hello world", "en-IN")
 *         speakText(text, "hi-IN")
 *         speakText(text, "mr-IN")
 *
 * Accepts both short codes ("en","hi","mr") and full BCP-47 ("en-IN","hi-IN","mr-IN").
 * Cancels any in-progress speech before starting.
 * Returns a Promise that resolves when speech ends, or rejects on error.
 */

// ── Language code normaliser ────────────────────────────────────
const LANG_MAP: Record<string, string> = {
    en: "en-IN",
    hi: "hi-IN",
    mr: "mr-IN",
    English: "en-IN",
    Hindi: "hi-IN",
    Marathi: "mr-IN",
    "en-IN": "en-IN",
    "hi-IN": "hi-IN",
    "mr-IN": "mr-IN",
};

function resolveLang(lang?: string): string {
    return (lang && LANG_MAP[lang]) || "en-IN";
}

// ── Main function ───────────────────────────────────────────────
export function speakText(
    text: string,
    lang?: string
): Promise<void> {
    return new Promise((resolve, reject) => {
        // Guard: nothing to say
        if (!text || !text.trim()) {
            resolve();
            return;
        }

        // Guard: browser support
        if (!window.speechSynthesis) {
            const msg = "Text-to-Speech is not supported in your browser. Please use Chrome or Edge.";
            console.error("🔊", msg);
            reject(new Error(msg));
            return;
        }

        // Cancel any ongoing speech to prevent overlap
        window.speechSynthesis.cancel();

        const langCode = resolveLang(lang);
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = langCode;
        utterance.rate = 1;
        utterance.pitch = 1;
        utterance.volume = 1;

        // Try to pick a matching voice (best-effort)
        const voices = window.speechSynthesis.getVoices();
        const match = voices.find((v) => v.lang === langCode) ||
            voices.find((v) => v.lang.startsWith(langCode.split("-")[0]));
        if (match) {
            utterance.voice = match;
        }

        utterance.onend = () => {
            console.log("🔊 Speech finished");
            resolve();
        };

        utterance.onerror = (event) => {
            console.error("🔊 Speech error:", event.error);
            reject(new Error(event.error));
        };

        window.speechSynthesis.speak(utterance);
        console.log(`🔊 Speaking — lang: ${langCode}`);
    });
}

/** Immediately cancel any in-progress speech. */
export function cancelSpeech(): void {
    if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
    }
}
