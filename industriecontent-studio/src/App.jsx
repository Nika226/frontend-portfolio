import { useState } from "react";

export default function App() {
  const [inputText, setInputText] = useState("");
  const [resultText, setResultText] = useState("");
  const [toast, setToast] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState(
    "Unternehmensbeschreibung (B2B)",
  );

  const PLACEHOLDERS = {
    "Unternehmensbeschreibung (B2B)":
      "Beschreibe kurz dein Unternehmen (Branche, Leistungen, Zielkunden, Vorteile)…",
    Leistungsbeschreibung:
      "Welche Leistung bietest du an? Für wen? Prozess, Umfang, Vorteile (Stichpunkte)…",
    "Landing-Text":
      "Ziel der Landingpage + Angebot + Zielgruppe + Ton (seriös / modern)…",
    "Google Business Beschreibung":
      "Kurz: Wer seid ihr? Was macht ihr? Standort Nürnberg + 3–5 Vorteile…",
    "Kundenantwort (E-Mail)":
      "Beschreibe die Anfrage des Kunden + gewünschter Ton + wichtige Details…",
  };
  const EXAMPLES = {
    "Unternehmensbeschreibung (B2B)": `Wir sind ein technischer Industrie-Dienstleister mit Sitz in Nürnberg.
Wir unterstützen Industrieunternehmen in den Bereichen Wartung, Instandhaltung und technische Beratung.

Unsere Stärken:
- Zuverlässige Projektabwicklung
- Erfahrene Fachkräfte
- Individuelle Lösungen

Ziel: Eine kurze, professionelle Unternehmensbeschreibung für unsere Website.`,

    Leistungsbeschreibung: `Leistung: Industrielle Wartung & Instandhaltung (B2B)
Zielgruppe: Produktionsbetriebe in Nürnberg und Umgebung
Umfang:
- Regelmäßige Wartungsintervalle
- Störungsbehebung (kurzfristig)
- Dokumentation & Prüfprotokolle

Vorteile:
- Weniger Stillstandzeiten
- Planbare Kosten
- Erhöhte Anlagenverfügbarkeit`,

    "Landing-Text": `Ziel: Anfragen für Wartungs-Services generieren
Angebot: Wartung & Instandhaltung für Industrieanlagen
USP:
- Schnelle Reaktionszeiten
- Zertifizierte Fachkräfte
- Transparente Prozesse

CTA: Termin vereinbaren / Angebot anfordern`,

    "Google Business Beschreibung": `Technischer Industrie-Dienstleister in Nürnberg.
Wir bieten Wartung, Instandhaltung und technische Beratung für B2B-Kunden.
Zuverlässig, termintreu und mit erfahrenen Fachkräften. Kontaktieren Sie uns für ein Angebot.`,

    "Kundenantwort (E-Mail)": `Kunde: Anfrage zur Wartung einer Produktionsanlage (Termin + Kosten)
Ton: freundlich & professionell
Wichtige Infos: Standort Nürnberg, Zeitraum nächste Woche

Bitte antworte dem Kunden und schlage einen kurzen Telefontermin vor.`,
  };

  const smartPlaceholder =
    PLACEHOLDERS[selectedTemplate] ||
    "Beschreibe kurz dein Unternehmen oder füge Stichpunkte ein…";
  function buildResult(template, text) {
    const clean = text.trim();
    if (!clean) return "";

    switch (template) {
      case "Unternehmensbeschreibung (B2B)":
        return `**Unternehmensprofil (Kurztext)**

${clean}

**Leistungen**
- Wartung & Instandhaltung
- Technische Beratung
- Individuelle B2B-Lösungen

**Kontakt**
Nürnberg · Angebot anfordern · Telefontermin vereinbaren`;

      case "Leistungsbeschreibung":
        return `**Leistungsbeschreibung**

${clean}

**Nutzen für den Kunden**
- Reduzierte Stillstandzeiten
- Planbare Wartung
- Dokumentierte Qualität (B2B)

**Nächster Schritt**
Kurz telefonieren → Bedarf klären → Angebot senden`;

      case "Landing-Text":
        return `**Headline**
Zuverlässige Wartung & Instandhaltung für Industrieanlagen in Nürnberg

**Kurzbeschreibung**
${clean}

**Vorteile**
- Schnelle Reaktionszeit
- Erfahrene Fachkräfte
- Transparente Prozesse

**Call-to-Action**
Jetzt Angebot anfordern`;

      case "Google Business Beschreibung":
        return `Technischer Industrie-Dienstleister in Nürnberg.
${clean}
Wartung, Instandhaltung & technische Beratung für B2B-Kunden. Kontaktieren Sie uns für ein Angebot.`;

      case "Kundenantwort (E-Mail)":
        return `Betreff: Ihre Anfrage zur Wartung – kurzer Abstimmungstermin

Guten Tag,

vielen Dank für Ihre Anfrage. ${clean}

Gerne klären wir die Details (Umfang, Termin, benötigte Informationen) in einem kurzen Telefonat.
Passt Ihnen morgen oder übermorgen ein 10–15-minütiger Termin?

Mit freundlichen Grüßen
IndustrieContent Studio`;

      default:
        return clean;
    }
  }
  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(resultText);
      setToast("Kopiert!");
      setTimeout(() => setToast(""), 1500);
    } catch {
      setToast("Kopieren nicht möglich (Browser-Berechtigung).");
      setTimeout(() => setToast(""), 2000);
    }
  }

  return (
    <div className="container">
      <header className="header">
        <div>
          <h1 className="title">IndustrieContent Studio</h1>
          <p className="subtitle">
            KI-Textassistent für technische Industrie-Dienstleister (B2B)
          </p>
        </div>
      </header>

      <div className="workspace">
        {/* LEFT PANEL */}
        <section className="panel">
          <h2 className="panelTitle">Eingabe</h2>

          <label className="label">
            Vorlage
            <select
              className="select"
              value={selectedTemplate}
              onChange={(e) => setSelectedTemplate(e.target.value)}
            >
              <option>Unternehmensbeschreibung (B2B)</option>
              <option>Leistungsbeschreibung</option>
              <option>Landing-Text</option>
              <option>Google Business Beschreibung</option>
              <option>Kundenantwort (E-Mail)</option>
            </select>
          </label>

          <label className="label">
            Eingabetext
            <textarea
              className="textarea"
              rows={8}
              placeholder={smartPlaceholder}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
          </label>
          <div className="buttonGroup">
            <button
              className="button buttonGhost"
              onClick={() => setInputText(EXAMPLES[selectedTemplate] || "")}
            >
              Beispieltext einfügen
            </button>
            <button
              className="button"
              onClick={() => {
                const output = buildResult(selectedTemplate, inputText);
                setResultText(output);
                setInputText("");
              }}
            >
              Text vorbereiten
            </button>
          </div>
        </section>

        {/* RIGHT PANEL */}
        <section className="panel">
          <h2 className="panelTitle">Ergebnis</h2>
          <p className="hint">
            Hier wird später der generierte Text angezeigt.
          </p>

          <div className="resultBox">
            <p className="resultPlaceholder">
              {resultText ||
                "Noch kein Ergebnis. Gib Text ein und klicke auf den Button."}
            </p>
          </div>

          <button
            className="button buttonGhost"
            disabled={!resultText}
            onClick={handleCopy}
          >
            Kopieren
          </button>
          {toast && <p className="hint">{toast}</p>}
        </section>
      </div>
    </div>
  );
}
