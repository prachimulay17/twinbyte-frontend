export interface AnalysisResult {
  classification: "Fake" | "Likely Fake" | "Authentic";
  riskScore: number;
  confidence: number;
  explanation: string[];
  verifiedLink: string | null;
}

export const mockResults: AnalysisResult[] = [
  {
    classification: "Likely Fake",
    riskScore: 78,
    confidence: 91,
    explanation: [
      "Suspicious shortened link detected.",
      "No official government record found.",
      "Language pattern matches known scam templates.",
    ],
    verifiedLink: "https://gov.in/official-page",
  },
  {
    classification: "Fake",
    riskScore: 95,
    confidence: 97,
    explanation: [
      "Image metadata has been tampered with.",
      "Content contradicts verified news sources.",
      "Originally debunked by fact-checkers in 2024.",
    ],
    verifiedLink: null,
  },
  {
    classification: "Authentic",
    riskScore: 12,
    confidence: 88,
    explanation: [
      "Content matches official press release.",
      "Source domain is verified and trusted.",
      "No manipulation patterns detected.",
    ],
    verifiedLink: "https://pib.gov.in/press-release",
  },
];

export const getRandomResult = (): AnalysisResult => {
  return mockResults[Math.floor(Math.random() * mockResults.length)];
};
