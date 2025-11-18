import React, { useState } from 'react';
import { AppState, ClientProfile, AnalysisResult } from './types';
import { Header } from './components/Header';
import { InterviewForm } from './components/InterviewForm';
import { AnalysisView } from './components/AnalysisView';
import { analyzeClientStrategy, generateSimulationScenario } from './services/geminiService';

const INITIAL_PROFILE: ClientProfile = {
  companyName: '',
  industry: '',
  teamSize: '',
  coreBusiness: '',
  painPoints: '',
  currentTechStack: '',
  primaryGoal: ''
};

const App: React.FC = () => {
  const [state, setState] = useState<AppState>(AppState.ONBOARDING);
  const [clientData, setClientData] = useState<ClientProfile>(INITIAL_PROFILE);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClientDataChange = (field: keyof ClientProfile, value: string) => {
    setClientData(prev => ({ ...prev, [field]: value }));
  };

  const startInterview = () => setState(AppState.INTERVIEW);

  const runSimulation = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const simulatedData = await generateSimulationScenario();
      setClientData(simulatedData);
      // We stay in interview mode but fill the data
    } catch (err) {
      setError("Errore nella generazione dello scenario. Controlla la chiave API.");
    } finally {
      setIsLoading(false);
    }
  };

  const submitAnalysis = async () => {
    setState(AppState.ANALYZING);
    setError(null);
    try {
      const result = await analyzeClientStrategy(clientData);
      setAnalysisResult(result);
      setState(AppState.RESULTS);
    } catch (err) {
      console.error(err);
      setError("Analisi fallita. Per favore riprova.");
      setState(AppState.INTERVIEW);
    }
  };

  const resetSession = () => {
    setClientData(INITIAL_PROFILE);
    setAnalysisResult(null);
    setState(AppState.INTERVIEW);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Header />

      <main className="py-8">
        {error && (
          <div className="max-w-3xl mx-auto mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 flex items-center gap-3">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            {error}
          </div>
        )}

        {state === AppState.ONBOARDING && (
          <div className="max-w-3xl mx-auto text-center px-6 pt-12">
            <div className="bg-white p-10 rounded-3xl shadow-lg border border-slate-100 flex flex-col items-center">
              <div className="w-20 h-20 bg-indigo-100 text-indigo-600 rounded-3xl flex items-center justify-center mb-6 shadow-sm">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
              </div>
              
              <h2 className="text-4xl font-bold text-slate-900 mb-8">Benvenuto, Operatore AI</h2>
              
              <div className="space-y-4 text-lg mb-10 max-w-2xl mx-auto">
                <p className="text-slate-600 font-medium">
                  Questo strumento è il tuo compagno per le interviste iniziali con i clienti.
                </p>
                <p className="text-indigo-600 font-bold text-xl">
                  Ti aiuta a: raccogliere i dati corretti, analizzare opportunità e proiettare piani concreti.
                </p>
                <div className="pt-4 border-t border-slate-100 mt-4">
                  <p className="text-slate-500 italic text-base">
                    "La tua missione: liberare tempo e risorse applicando l'AI in modo semplice (No-Code),<br/>senza tecnicismi, per migliorare la vita reale delle persone."
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto">
                <button 
                  onClick={startInterview}
                  className="bg-indigo-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-indigo-700 transition-all hover:-translate-y-1 shadow-xl shadow-indigo-200 w-full sm:w-auto"
                >
                  Inizia Nuova Intervista
                </button>
              </div>
              
              <p className="mt-8 text-sm text-slate-400 flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-full">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                Modalità Training Attiva: Puoi generare scenari fittizi all'interno
              </p>
            </div>
          </div>
        )}

        {state === AppState.INTERVIEW && (
          <InterviewForm 
            data={clientData} 
            onChange={handleClientDataChange} 
            onSubmit={submitAnalysis}
            onSimulate={runSimulation}
            isSimulating={isLoading}
          />
        )}

        {state === AppState.ANALYZING && (
          <div className="max-w-xl mx-auto text-center px-6 pt-20">
            <div className="relative w-24 h-24 mx-auto mb-8">
              <div className="absolute inset-0 border-4 border-indigo-100 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-indigo-600 rounded-full border-t-transparent animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                 <span className="text-2xl animate-pulse">✨</span>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Intelligenza Artificiale Attiva</h2>
            <p className="text-slate-500 mb-8">
              Gemini 3 Pro sta "Pensando"...<br/>
              <span className="text-sm opacity-75">Analisi trend, formulazione strategia No-Code e proiezione benefici. Potrebbe richiedere un momento.</span>
            </p>
            <div className="bg-white p-4 rounded-lg border border-slate-200 inline-block text-left shadow-sm">
               <div className="text-xs font-bold text-slate-400 uppercase mb-2">Fasi di Processo</div>
               <ul className="text-sm space-y-2 text-slate-600">
                 <li className="flex items-center gap-2">
                   <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                   Lettura Profilo Cliente
                 </li>
                 <li className="flex items-center gap-2 animate-pulse">
                   <svg className="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
                   Ricerca Trend Settore (Google Grounding)
                 </li>
                 <li className="flex items-center gap-2 opacity-50">
                   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                   Progettazione Flussi No-Code
                 </li>
               </ul>
            </div>
          </div>
        )}

        {state === AppState.RESULTS && analysisResult && (
          <AnalysisView 
            result={analysisResult} 
            client={clientData} 
            onReset={resetSession}
          />
        )}
      </main>
    </div>
  );
};

export default App;