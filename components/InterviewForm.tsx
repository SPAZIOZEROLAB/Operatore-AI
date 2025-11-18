import React from 'react';
import { ClientProfile } from '../types';

interface InterviewFormProps {
  data: ClientProfile;
  onChange: (field: keyof ClientProfile, value: string) => void;
  onSubmit: () => void;
  onSimulate: () => void;
  isSimulating: boolean;
}

export const InterviewForm: React.FC<InterviewFormProps> = ({ 
  data, 
  onChange, 
  onSubmit, 
  onSimulate, 
  isSimulating 
}) => {
  
  const renderInput = (label: string, field: keyof ClientProfile, placeholder: string, type: 'text' | 'textarea' = 'text') => (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-slate-700">
        {label}
      </label>
      {type === 'textarea' ? (
        <textarea
          value={data[field]}
          onChange={(e) => onChange(field, e.target.value)}
          placeholder={placeholder}
          rows={3}
          className="w-full px-4 py-2 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all resize-none text-sm shadow-sm"
        />
      ) : (
        <input
          type="text"
          value={data[field]}
          onChange={(e) => onChange(field, e.target.value)}
          placeholder={placeholder}
          className="w-full px-4 py-2 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all text-sm shadow-sm"
        />
      )}
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Intervista Cliente</h2>
            <p className="text-slate-500">Raccogli i dati chiave per alimentare l'analisi dell'AI.</p>
          </div>
          <button
            onClick={onSimulate}
            disabled={isSimulating}
            className={`text-xs font-medium px-4 py-2 rounded-lg border flex items-center gap-2 transition-colors ${
              isSimulating 
                ? "bg-slate-100 text-slate-400 cursor-wait" 
                : "bg-white border-indigo-200 text-indigo-600 hover:bg-indigo-50"
            }`}
          >
            {isSimulating ? (
               <>Generazione Scenario...</>
            ) : (
               <>
                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                 Genera Cliente Simulato
               </>
            )}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {renderInput("Nome Azienda", "companyName", "es. Rossi & Associati")}
          {renderInput("Settore", "industry", "es. Studio Legale, Manifattura, Retail")}
          {renderInput("Dimensione Team", "teamSize", "es. 15 dipendenti")}
          {renderInput("Core Business", "coreBusiness", "Cosa vendono o fanno esattamente?")}
        </div>
        
        <div className="space-y-6">
          {renderInput("Stack Tecnologico Attuale", "currentTechStack", "Software usati, CRM, o 'Carta e Penna'", "textarea")}
          {renderInput("Problemi Principali (Pain Points)", "painPoints", "Dove perdono tempo o soldi?", "textarea")}
          {renderInput("Obiettivo Primario", "primaryGoal", "Cosa definirebbe il 'successo' per loro?", "textarea")}
        </div>

        <div className="mt-8 flex justify-end">
          <button
            onClick={onSubmit}
            disabled={!data.industry || !data.painPoints}
            className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:shadow-indigo-300 hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none disabled:hover:translate-y-0"
          >
            Avvia Analisi Strategica AI
          </button>
        </div>
      </div>
      
      {/* Tips for the student */}
      <div className="mt-8 bg-blue-50 rounded-xl p-6 border border-blue-100">
        <h3 className="text-sm font-bold text-blue-800 mb-2 flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          Consigli per l'Operatore
        </h3>
        <ul className="text-sm text-blue-700 space-y-1 list-disc list-inside">
          <li>Non fare domande generiche. Chiedi dei <strong>colli di bottiglia</strong>.</li>
          <li>Chiedi di vedere un processo specifico (es. "Mostrami come gestisci una fattura").</li>
          <li>Identifica dove i dati vengono copiati manualmente da un posto all'altro.</li>
        </ul>
      </div>
    </div>
  );
};