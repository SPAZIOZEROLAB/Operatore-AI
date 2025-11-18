import React from 'react';
import { AnalysisResult, ClientProfile } from '../types';

interface AnalysisViewProps {
  result: AnalysisResult;
  client: ClientProfile;
  onReset: () => void;
}

export const AnalysisView: React.FC<AnalysisViewProps> = ({ result, client, onReset }) => {
  return (
    <div className="max-w-5xl mx-auto p-6 pb-24">
      
      {/* Top Navigation / Breadcrumb */}
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Piano Strategico AI</h2>
          <p className="text-slate-500 mt-1">Personalizzato per <span className="font-semibold text-slate-900">{client.companyName}</span></p>
        </div>
        <button onClick={onReset} className="text-sm text-slate-500 hover:text-indigo-600 underline">
          Nuova Sessione
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Narrative & Strategy */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Executive Summary Card */}
          <section className="bg-white rounded-2xl p-8 shadow-sm border border-indigo-100 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-500"></div>
            <h3 className="text-xl font-bold text-indigo-900 mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
              Il Concetto Chiave (Spiegazione Semplice)
            </h3>
            <p className="text-lg text-slate-700 leading-relaxed">
              {result.executiveSummary}
            </p>
          </section>

          {/* Benefits Scenario - The "Life After AI" */}
          <section className="bg-emerald-50 rounded-2xl p-8 border border-emerald-100 relative">
             <div className="flex items-center gap-3 mb-4">
               <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
               </div>
               <div>
                 <h3 className="text-lg font-bold text-emerald-900">La Visione: Libertà e Nuovi Scenari</h3>
                 <p className="text-xs text-emerald-700 uppercase font-semibold tracking-wide">Come cambierà la vita in azienda</p>
               </div>
             </div>
             <p className="text-emerald-800 text-md leading-relaxed italic">
               "{result.benefitsScenario}"
             </p>
          </section>

          {/* Detailed Transformations */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-slate-900">Implementazioni Concrete (No-Code)</h3>
              <span className="text-xs bg-slate-100 text-slate-500 px-3 py-1 rounded-full">Strumenti accessibili</span>
            </div>
            
            <div className="space-y-6">
              {result.transformations.map((transform, idx) => (
                <div key={idx} className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex justify-between items-center">
                    <h4 className="font-bold text-slate-800">{transform.processName}</h4>
                    <span className={`text-xs font-bold px-2 py-1 rounded border ${
                      transform.implementationDifficulty === 'Low' ? 'bg-green-50 text-green-700 border-green-200' :
                      transform.implementationDifficulty === 'Medium' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                      'bg-red-50 text-red-700 border-red-200'
                    }`}>
                      Difficoltà {transform.implementationDifficulty}
                    </span>
                  </div>
                  <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Attuale (Manuale)</div>
                      <div className="text-slate-600 text-sm bg-red-50/50 p-3 rounded border border-red-100">
                        {transform.currentWorkflow}
                      </div>
                    </div>
                    <div className="relative">
                      <div className="absolute top-1/2 -left-4 -translate-y-1/2 bg-white rounded-full border border-slate-200 p-1 text-slate-400 hidden md:block">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                      </div>
                      <div className="text-xs font-semibold text-indigo-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zm0 9l2.5-1.25L12 8.5l-2.5 1.25L12 11zm0 2.5l-5-2.5-5 2.5L12 22l10-8.5-5-2.5-5 2.5z"/></svg>
                        Futuro (Libero da Routine)
                      </div>
                      <div className="text-slate-700 text-sm bg-indigo-50/50 p-3 rounded border border-indigo-100 font-medium">
                        {transform.aiEnhancedWorkflow}
                      </div>
                    </div>
                  </div>
                  <div className="bg-slate-50 px-6 py-3 border-t border-slate-100 flex flex-wrap gap-2 items-center">
                    <span className="text-xs text-slate-500 mr-2">Strumenti Consigliati:</span>
                    {transform.toolsRecommended.map((tool, i) => (
                      <span key={i} className="text-xs bg-white border border-slate-200 px-2 py-1 rounded text-slate-600 shadow-sm font-medium text-indigo-600">
                        {tool}
                      </span>
                    ))}
                    <div className="ml-auto text-xs font-bold text-green-600">
                      Guadagno: {transform.estimatedEfficiencyGain}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

           {/* Reasoning for the Student */}
           <section className="bg-slate-50 rounded-2xl p-8 border border-slate-200 mt-8">
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-slate-200 text-slate-700 text-xs font-bold px-2 py-1 rounded uppercase tracking-wide">Dietro le quinte</span>
              <h3 className="text-lg font-bold text-slate-800">Il Ragionamento dell'AI (Per te Operatore)</h3>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-wrap">
              {result.strategicReasoning}
            </p>
          </section>
        </div>

        {/* Right Column: Context & Grounding */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-indigo-900 to-slate-900 text-white rounded-2xl p-6 shadow-lg">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
              Contesto di Settore
            </h3>
            <div className="text-indigo-100 text-sm space-y-4">
               <p className="opacity-90 italic">
                 "Basato su dati di ricerca live per {client.industry}..."
               </p>
               <p className="leading-relaxed">
                 {result.industryTrends}
               </p>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h4 className="font-bold text-slate-800 mb-3">Roadmap Operativa</h4>
            <ul className="space-y-3 text-sm text-slate-600">
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-xs">1</span>
                Leggi la sezione "Visione Futura" al cliente per emozionarlo.
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-xs">2</span>
                Verifica se gli strumenti No-Code suggeriti (es. Zapier) sono integrabili.
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-xs">3</span>
                Proponi un test pilota su un singolo processo.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};