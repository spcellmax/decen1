
import React, { useState } from 'react';
import { DECENTRO_MODULES } from '../constants';
import { APIModule } from '../types';

const CatalogView: React.FC = () => {
  const [selectedModule, setSelectedModule] = useState<APIModule>(DECENTRO_MODULES[0]);

  return (
    <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 animate-fadeIn pb-20">
      {/* Sidebar - Service Navigator */}
      <div className="w-full lg:w-96 space-y-4">
        <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-4 mb-4">Core Infrastructure</h4>
        {DECENTRO_MODULES.map((m) => (
          <button
            key={m.id}
            onClick={() => setSelectedModule(m)}
            className={`w-full flex items-center space-x-5 p-6 rounded-[32px] transition-all text-left border ${
              selectedModule.id === m.id 
              ? 'bg-blue-600/10 border-blue-600/50 text-white shadow-xl glow-blue' 
              : 'hover:bg-white/[0.03] border-transparent text-slate-500'
            }`}
          >
            <span className="text-3xl lg:text-4xl bg-white/5 w-14 h-14 flex items-center justify-center rounded-2xl shadow-inner">{m.icon}</span>
            <div className="flex-1">
              <p className="font-black text-base tracking-tight leading-none">{m.name}</p>
              <p className="text-[9px] text-slate-600 mt-2 font-bold uppercase tracking-widest">{m.endpoints.length} Endpoints • {m.complexity} Complexity</p>
            </div>
          </button>
        ))}
      </div>

      {/* API Documentation Explorer */}
      <div className="flex-1 space-y-8">
        <div className="glass-card p-8 lg:p-12 rounded-[56px] border border-white/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/5 blur-[140px] pointer-events-none"></div>
          
          <div className="flex flex-col md:flex-row items-center space-x-0 md:space-x-8 mb-12 border-b border-white/5 pb-10 gap-6">
            <div className="w-24 h-24 bg-blue-600/20 rounded-[32px] flex items-center justify-center text-5xl shadow-inner border border-blue-500/20">
              {selectedModule.icon}
            </div>
            <div className="text-center md:text-left">
              <h2 className="text-4xl font-black text-white mb-3 tracking-tighter">{selectedModule.name}</h2>
              <p className="text-slate-400 max-w-2xl text-lg font-medium italic opacity-80 leading-relaxed">{selectedModule.description}</p>
            </div>
          </div>

          <div className="space-y-10">
            <div className="flex items-center justify-between px-2">
               <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">REST API Methods</h4>
               <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest bg-blue-600/10 px-3 py-1 rounded-full border border-blue-500/20">v2.0 Documentation</span>
            </div>
            
            <div className="grid grid-cols-1 gap-6">
              {selectedModule.endpoints.map((ep) => (
                <div key={ep.id} className="group p-8 rounded-[40px] bg-white/[0.02] border border-white/5 hover:border-blue-500/30 hover:bg-white/[0.04] transition-all">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
                    <div>
                      <div className="flex items-center space-x-3 mb-4">
                        <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-tight shadow-lg ${
                          ep.method === 'POST' ? 'bg-green-600/20 text-green-400 border border-green-500/20' : 'bg-blue-600/20 text-blue-400 border border-blue-500/20'
                        }`}>
                          {ep.method}
                        </span>
                        <code className="text-sm font-black text-slate-500 tracking-tighter bg-white/5 px-4 py-1.5 rounded-xl border border-white/5">{ep.path}</code>
                      </div>
                      <h5 className="text-2xl font-black text-white group-hover:text-blue-400 transition-colors tracking-tight">{ep.name}</h5>
                      <p className="text-slate-400 text-base mt-2 font-medium leading-relaxed opacity-80">{ep.description}</p>
                    </div>
                    <button 
                      onClick={() => window.open('https://docs.decentro.tech/', '_blank')}
                      className="px-8 py-3.5 bg-blue-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-500 transition-all shadow-xl shadow-blue-600/20"
                    >
                      Inspect Spec
                    </button>
                  </div>
                  
                  {/* Mock Request Preview */}
                  <div className="mt-6 bg-slate-950/80 rounded-[24px] p-6 border border-white/5 relative group/code overflow-hidden">
                    <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-3">
                       <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">cURL Request</span>
                       <span className="text-[9px] text-blue-500/60 font-black">bash</span>
                    </div>
                    <code className="text-[11px] lg:text-xs text-blue-100/80 font-mono leading-relaxed block overflow-x-auto whitespace-nowrap lg:whitespace-normal">
                      curl -X {ep.method} 'https://api.decentro.tech{ep.path}' \<br/>
                      &nbsp;&nbsp;-H 'client_id: YOUR_CLIENT_ID' \<br/>
                      &nbsp;&nbsp;-H 'client_secret: YOUR_CLIENT_SECRET' \<br/>
                      &nbsp;&nbsp;-d '{`{ "reference_id": "REF_123" }`}'
                    </code>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CatalogView;
