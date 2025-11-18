import { GoogleGenAI, Type } from "@google/genai";
import { ClientProfile, AnalysisResult } from "../types";

const apiKey = process.env.API_KEY;

// Helper to check API key availability
export const checkApiKey = (): boolean => {
  return !!apiKey;
};

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey: apiKey || 'dummy-key-for-types' });

/**
 * Generates a fictional client scenario for training purposes.
 * Uses Flash for speed.
 */
export const generateSimulationScenario = async (): Promise<ClientProfile> => {
  if (!apiKey) throw new Error("API Key not found");

  const prompt = `Genera un profilo cliente realistico e dettagliato (in ITALIANO) per una PMI italiana che ha difficoltà con processi manuali e necessita di ottimizzazione AI.
  Restituisci solo JSON.
  Campi: companyName, industry, teamSize, coreBusiness, painPoints, currentTechStack, primaryGoal.`;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          companyName: { type: Type.STRING },
          industry: { type: Type.STRING },
          teamSize: { type: Type.STRING },
          coreBusiness: { type: Type.STRING },
          painPoints: { type: Type.STRING },
          currentTechStack: { type: Type.STRING },
          primaryGoal: { type: Type.STRING },
        },
        required: ["companyName", "industry", "painPoints"],
      }
    }
  });

  const text = response.text;
  if (!text) throw new Error("Failed to generate scenario");
  
  return JSON.parse(text) as ClientProfile;
};

/**
 * Performs the main analysis using Gemini 3 Pro with Thinking Mode.
 * Also incorporates Google Search for industry context.
 */
export const analyzeClientStrategy = async (client: ClientProfile): Promise<AnalysisResult> => {
  if (!apiKey) throw new Error("API Key not found");

  // Step 1: Gather industry context using Search Grounding (Flash)
  // This ensures the advice is current (e.g., current AI laws, new tools).
  const searchPrompt = `Trova gli ultimi 3 trend e applicazioni di Intelligenza Artificiale specifici per il settore ${client.industry} in Italia o globalmente nel 2024-2025. Focus su efficienza operativa.`;
  
  let searchContext = "";
  try {
    const searchResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: searchPrompt,
      config: {
        tools: [{ googleSearch: {} }],
      }
    });
    // We capture the text to feed into the thinker
    searchContext = searchResponse.text || "Nessun dato specifico trovato.";
  } catch (e) {
    console.warn("Search grounding failed, proceeding with internal knowledge.", e);
    searchContext = "Ricerca non disponibile. Uso conoscenza interna.";
  }

  // Step 2: Deep Analysis with Thinking Mode (Pro)
  // We want a very detailed JSON response.
  
  const analysisPrompt = `
    Sei un esperto Consulente di Business AI che fa da mentore a un operatore AI (che NON è un programmatore/nerd, ma un consulente di processo).
    
    Profilo Cliente:
    - Nome: ${client.companyName}
    - Settore: ${client.industry}
    - Dimensione: ${client.teamSize}
    - Business Core: ${client.coreBusiness}
    - Problemi (Pain Points): ${client.painPoints}
    - Strumenti attuali: ${client.currentTechStack}
    - Obiettivo: ${client.primaryGoal}

    Contesto di Settore Rilevante (da ricerca web):
    ${searchContext}

    Il tuo compito:
    Analizza questo cliente e proponi un piano concreto di adozione AI.
    
    ISTRUZIONI CRITICHE:
    1. Scrivi TUTTO IN ITALIANO.
    2. Approccio NO-CODE/LOW-CODE: Proponi strumenti che non richiedono di scrivere codice (es. Zapier, Make, ChatGPT Team, software specifici user-friendly). L'obiettivo è democratizzare l'AI.
    3. L'"executiveSummary" deve essere scritto in linguaggio estremamente semplice (spiegazione "a prova di nonna"), ma autorevole.
    4. "benefitsScenario": Descrivi una SCENA CONCRETA di "Vita Futura" dopo l'AI. Non parlare di %, parla di persone. Esempio: "Il titolare Mario non deve più controllare le email il sabato sera perché l'AI le smista, quindi può stare con la famiglia". Enfatizza la LIBERTÀ dal lavoro ripetitivo.
    5. La "strategicReasoning" deve spiegare il 'Perché' e il 'Come' allo studente operatore, guidandolo nel ragionamento.

    Restituisci un oggetto JSON corrispondente alla struttura AnalysisResult.
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: analysisPrompt,
    config: {
      thinkingConfig: { thinkingBudget: 32768 }, // Max thinking for deep reasoning
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          executiveSummary: { type: Type.STRING, description: "Spiegazione semplice e chiara della proposta di valore." },
          benefitsScenario: { type: Type.STRING, description: "Scenario narrativo di vita lavorativa migliorata e libertà ritrovata." },
          industryTrends: { type: Type.STRING, description: "Riassunto di come i trend di settore si applicano qui." },
          strategicReasoning: { type: Type.STRING, description: "Ragionamento didattico sul perché è stata scelta questa strategia." },
          transformations: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                processName: { type: Type.STRING },
                currentWorkflow: { type: Type.STRING, description: "Il vecchio modo manuale." },
                aiEnhancedWorkflow: { type: Type.STRING, description: "Il nuovo modo guidato dall'AI." },
                toolsRecommended: { type: Type.ARRAY, items: { type: Type.STRING } },
                estimatedEfficiencyGain: { type: Type.STRING },
                implementationDifficulty: { type: Type.STRING, enum: ["Low", "Medium", "High"] }
              }
            }
          }
        }
      }
    }
  });

  const text = response.text;
  if (!text) throw new Error("AI failed to generate analysis");

  return JSON.parse(text) as AnalysisResult;
};