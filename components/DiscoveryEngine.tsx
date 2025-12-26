
import React, { useState, useRef, useEffect } from 'react';
import { findSolutions } from '../services/geminiService';
import { SearchResult, APIModule } from '../types';
import { DECENTRO_MODULES } from '../constants';

interface Props {
  initialIntent?: string | null;
  onClearIntent?: () => void;
}

const DiscoveryEngine: React.FC<Props> = ({ initialIntent, onClearIntent }) => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SearchResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [selectedModuleDetail, setSelectedModuleDetail] = useState<APIModule | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  // Auto-trigger if initialIntent is passed
  useEffect(() => {
    if (initialIntent) {
      setQuery(initialIntent);
      runDiscovery(initialIntent);
      onClearIntent?.();
    }
  }, [initialIntent]);

  const runDiscovery = async (searchQuery: string) => {
    const trimmedQuery = searchQuery.trim();
    if (!trimmedQuery) return;
    
    setLoading(true);
    setResult(null);
    setError(null);
    
    try {
      const data = await findSolutions(trimmedQuery);
      setResult(data);
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 300);
    } catch (err) {
      console.error("Discovery Error:", err);
      setError("Architectural mapping failed. Please try a different intent.");
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loading) runDiscovery(query);
  };

  const handleTemplateClick = (tag: string) => {
    if (loading) return;
    const fullQuery = `Build a robust ${tag} solution`;
    setQuery(fullQuery);
    runDiscovery(fullQuery);
  };

  const findModuleByName = (name: string) => {
    const normalize = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, '');
    const cleanName = normalize(name);
    return DECENTRO_MODULES.find(m => {
      const mClean = normalize(m.name);
      return mClean === cleanName || cleanName.includes(mClean) || mClean.includes(cleanName);
    });
  };

  const parseWorkflowSteps = (workflow: string) => {
    if (!workflow) return [];
    let steps = workflow.split('\n').filter(s => s.trim());
    if (steps.length <= 1) {
      steps = workflow.split(/(?=\d+\.|\d+\))/).filter(s => s.trim());
    }
    return steps.map(s => s.replace(/^\d+[\.\)\-\s]*/, '').trim()).filter(s => s.length > 0);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-12 lg:space-y-16 py-12 animate-slideUp">
      {/* Header Section */}
      <div className="text-center space-y-8">
        <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-[0.2em] shadow-xl">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          <span>Nexus Intelligence Active</span>
        </div>
        <h1 className="text-5xl lg:text-8xl font-black tracking-tighter text-white leading-[1.1]">
          Launch your Fintech <br/> in <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">Record Time.</span>
        </h1>
        <p className="text-slate-400 text-base lg:text-xl max-w-3xl mx-auto font-medium leading-relaxed italic opacity-80">
          "The fastest path between a business idea and a live transaction is no longer code—it's intent."
        </p>
      </div>

      {/* Input Stage */}
      <div className="max-w-4xl mx-auto w-full px-4 sm:px-0">
        <div className="relative group">
          <div className="absolute -inset-1 lg:-inset-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 rounded-[35px] lg:rounded-[45px] blur opacity-10 group-focus-within:opacity-40 transition duration-1000"></div>
          
          <div className="relative bg-[#0a0f1e] rounded-[30px] lg:rounded-[40px] border border-white/10 p-2 shadow-3xl">
            <form onSubmit={handleFormSubmit} className="flex flex-col md:flex-row items-center">
              <input 
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g. 'Build a marketplace with split payments'"
                className="w-full flex-1 bg-transparent px-8 py-5 text-white outline-none placeholder:text-slate-700 text-lg lg:text-2xl font-bold"
                disabled={loading}
              />
              <button 
                disabled={loading || !query.trim()}
                type="submit"
                className="w-full md:w-auto bg-blue-600 hover:bg-blue-500 text-white px-12 py-5 rounded-[25px] font-black transition-all flex items-center justify-center space-x-3 disabled:opacity-30 shadow-2xl uppercase tracking-tighter text-xs active:scale-95"
              >
                {loading ? "Architecting..." : "Build Architecture"}
              </button>
            </form>
          </div>

          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            {['Escrow Logic', 'Gold Lending', 'Payout Automations', 'KYC Engine'].map(tag => (
              <button 
                key={tag} 
                onClick={() => handleTemplateClick(tag)} 
                disabled={loading}
                className="px-5 py-2.5 rounded-2xl border border-white/10 bg-white/5 text-[10px] text-slate-400 hover:border-blue-500/50 hover:bg-blue-600/10 hover:text-white transition-all font-black uppercase tracking-tight shadow-xl active:scale-95"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      {error && <div className="text-center text-red-400 font-bold py-10 animate-shake">{error}</div>}

      {/* Discovery Result View */}
      <div ref={resultRef} className="pt-16">
        {result && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 animate-slideUp">
            
            {/* Primary Blueprint */}
            <div className="lg:col-span-8 space-y-8">
              <div className="glass-card rounded-[56px] p-10 lg:p-14 border border-white/5 relative overflow-hidden shadow-3xl">
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-600/[0.05] blur-[120px] pointer-events-none"></div>
                
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-14 gap-6">
                  <div className="flex items-center space-x-6">
                    <div className="w-16 h-16 bg-blue-600/20 rounded-[28px] flex items-center justify-center text-blue-400 shadow-inner border border-blue-500/20">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
                    </div>
                    <div>
                      <h3 className="text-4xl font-black text-white tracking-tighter">The Blueprint</h3>
                      <p className="text-blue-400 text-[10px] font-black uppercase tracking-[0.4em] mt-1">Validated Strategy</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-14">
                  <div className="space-y-4">
                    <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center space-x-3">
                      <span className="w-6 h-px bg-blue-600"></span>
                      <span>Strategic Product Rationale</span>
                    </h4>
                    <p className="text-slate-100 text-2xl lg:text-3xl font-bold tracking-tight leading-relaxed italic border-l-4 border-blue-600 pl-8">
                      "{result.reasoning}"
                    </p>
                  </div>

                  <div className="space-y-8">
                    <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center space-x-3">
                      <span className="w-6 h-px bg-blue-600"></span>
                      <span>Execution Workflow</span>
                    </h4>
                    <div className="relative space-y-6">
                      {parseWorkflowSteps(result.workflow).map((step, i) => (
                        <div key={i} className="flex items-start space-x-8 p-8 rounded-[32px] bg-white/[0.03] border border-white/5 hover:bg-white/[0.05] transition-all group">
                          <span className="flex-shrink-0 w-12 h-12 rounded-2xl bg-blue-600/10 text-blue-400 border border-blue-500/20 flex items-center justify-center font-black text-lg group-hover:bg-blue-600 group-hover:text-white transition-all">
                            {i+1}
                          </span>
                          <div className="flex-1">
                            <p className="text-slate-100 font-bold text-xl lg:text-2xl tracking-tight leading-snug">
                              {step}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Business/Infra Sidebar */}
            <div className="lg:col-span-4 space-y-8">
              {/* TTM Highlight */}
              <div className="bg-gradient-to-br from-blue-600 to-indigo-800 rounded-[48px] p-10 shadow-3xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"/><path d="M13 7h-2v6h6v-2h-4z"/></svg>
                </div>
                <h4 className="text-[10px] font-black text-blue-100 uppercase tracking-widest mb-4 opacity-80">Estimated Go-To-Market</h4>
                <div className="text-7xl font-black text-white tracking-tighter mb-4">{result.timeToMarket}</div>
                <p className="text-blue-100/70 text-sm font-bold">Fast-tracked via Nexus pre-integrations.</p>
              </div>

              {/* Interactive Modules */}
              <div className="glass-card rounded-[48px] p-10 border border-white/5 bg-slate-900/50 shadow-2xl">
                <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-8">Infrastructure Stack</h4>
                <div className="space-y-4">
                  {result.recommendedModules.map(moduleName => {
                    const module = findModuleByName(moduleName);
                    return (
                      <button 
                        key={moduleName}
                        onClick={() => module && setSelectedModuleDetail(module)}
                        className={`w-full text-left p-6 rounded-3xl flex items-center justify-between group transition-all ${module ? 'bg-white/[0.04] border border-white/10 hover:border-blue-500/50 hover:bg-white/[0.08] cursor-pointer' : 'bg-slate-800/50 cursor-default opacity-60'}`}
                      >
                        <div className="flex items-center space-x-4">
                          <span className="text-3xl">{module?.icon || '⚙️'}</span>
                          <div>
                            <span className="font-bold text-slate-200 text-sm block">{moduleName}</span>
                            {module && <span className="text-[9px] text-blue-400 font-black uppercase tracking-widest mt-1 block">Explorer Spec</span>}
                          </div>
                        </div>
                        {module && (
                          <div className="w-8 h-8 rounded-full bg-blue-600/20 flex items-center justify-center text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-all">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7"/></svg>
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Strategic Advantage */}
              <div className="bg-slate-900/80 rounded-[48px] p-10 border border-white/5 shadow-2xl">
                <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6">Business Advantage</h4>
                <p className="text-white text-xl font-bold leading-relaxed tracking-tight italic">
                  "{result.businessImpact}"
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Module Detail Overlay */}
      {selectedModuleDetail && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-[#020617]/95 backdrop-blur-2xl transition-all duration-500">
          <div className="glass-card w-full max-w-2xl p-10 lg:p-14 rounded-[60px] border border-white/10 shadow-4xl relative animate-slideUp">
            <button 
              onClick={() => setSelectedModuleDetail(null)}
              className="absolute top-10 right-10 text-slate-500 hover:text-white transition-all hover:rotate-90"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
            <div className="space-y-10">
              <div className="flex items-center space-x-6">
                <div className="w-20 h-20 bg-blue-600/20 rounded-[30px] flex items-center justify-center text-5xl shadow-inner border border-blue-500/20">
                  {selectedModuleDetail.icon}
                </div>
                <div>
                  <h3 className="text-4xl font-black text-white tracking-tighter">{selectedModuleDetail.name}</h3>
                  <p className="text-blue-400 text-[10px] font-black uppercase tracking-widest mt-2">API Infrastructure Module</p>
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Capabilities</h4>
                <p className="text-slate-300 text-lg font-medium leading-relaxed">{selectedModuleDetail.description}</p>
                <div className="p-4 rounded-2xl bg-blue-600/5 border border-blue-600/20">
                  <p className="text-xs text-blue-400 font-bold leading-relaxed italic">{selectedModuleDetail.businessValue}</p>
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Key Integration Hooks</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {selectedModuleDetail.endpoints.map(ep => (
                    <div key={ep.id} className="p-4 rounded-2xl bg-white/[0.04] border border-white/5 flex items-center justify-between group/ep cursor-pointer hover:bg-white/[0.08] transition-all">
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-slate-200">{ep.name}</span>
                        <code className="text-[9px] text-slate-500 mt-1 font-mono">{ep.path}</code>
                      </div>
                      <span className={`text-[9px] font-black px-2 py-0.5 rounded border ${ep.method === 'POST' ? 'text-green-400 border-green-400/20 bg-green-400/5' : 'text-blue-400 border-blue-400/20 bg-blue-400/5'}`}>
                        {ep.method}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="pt-6">
                 <button onClick={() => window.open('https://docs.decentro.tech/', '_blank')} className="w-full py-5 bg-blue-600 text-white rounded-[28px] font-black text-sm uppercase tracking-widest shadow-3xl hover:bg-blue-500 transition-all active:scale-95">
                    View Full API Specification
                 </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DiscoveryEngine;
