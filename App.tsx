
import React, { useState, useEffect } from 'react';
import CatalogView from './components/CatalogView';
import UseCasesView from './components/UseCasesView';
import DiscoveryEngine from './components/DiscoveryEngine';

enum ViewState {
  DISCOVERY = 'discovery',
  USE_CASES = 'use_cases',
  CATALOG = 'catalog'
}

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.DISCOVERY);
  const [initialIntent, setInitialIntent] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openDevPortal = () => {
    window.open('https://docs.decentro.tech/', '_blank');
  };

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const handleBlueprintSelection = (intent: string) => {
    setInitialIntent(intent);
    setCurrentView(ViewState.DISCOVERY);
  };

  // Scroll to top on view change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView]);

  return (
    <div className="min-h-screen text-slate-200 selection:bg-blue-500 selection:text-white relative bg-[#020617]">
      {/* Navigation Bar */}
      <nav className="glass-card sticky top-0 z-50 px-6 lg:px-10 py-5 border-b border-white/10 bg-[#020617]/90 backdrop-blur-3xl shadow-2xl">
        <div className="max-w-[1600px] mx-auto flex items-center justify-between">
          <div 
            className="flex items-center space-x-5 cursor-pointer group" 
            onClick={() => {
              setInitialIntent(null);
              setCurrentView(ViewState.DISCOVERY);
            }}
          >
            <div className="w-10 h-10 lg:w-14 lg:h-14 bg-blue-600 rounded-[22px] flex items-center justify-center shadow-3xl shadow-blue-600/40 group-hover:scale-105 transition-all duration-500 group-hover:rotate-3">
              <span className="text-white font-black text-2xl lg:text-4xl italic">D</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl lg:text-3xl font-black tracking-tighter text-white leading-none">DECENTRO</h1>
              <p className="text-[10px] text-blue-400 font-black uppercase tracking-[0.5em] mt-2">Architect Nexus</p>
            </div>
          </div>

          <div className="flex items-center bg-white/5 p-1.5 rounded-[22px] border border-white/10 shadow-inner">
            {[
              { id: ViewState.DISCOVERY, label: 'Architect', icon: '⚡' },
              { id: ViewState.USE_CASES, label: 'Blueprints', icon: '💎' },
              { id: ViewState.CATALOG, label: 'Infrastructure', icon: '🏗️' },
            ].map(tab => (
              <button 
                key={tab.id}
                onClick={() => setCurrentView(tab.id as ViewState)}
                className={`flex items-center space-x-3 px-5 lg:px-10 py-3 rounded-[18px] text-[10px] lg:text-xs font-black transition-all duration-300 uppercase tracking-tighter ${
                  currentView === tab.id 
                  ? 'bg-white text-slate-950 shadow-2xl scale-105 transform -translate-y-0.5' 
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <span className="text-sm lg:text-lg">{tab.icon}</span>
                <span className="hidden md:inline">{tab.label}</span>
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-4 lg:space-x-8">
            <button 
              onClick={openDevPortal}
              className="hidden xl:block text-[10px] font-black text-slate-500 hover:text-white transition-colors uppercase tracking-[0.2em] border-b border-transparent hover:border-white/20 pb-1"
            >
              Dev Portal
            </button>
            <button 
              onClick={toggleModal}
              className="px-5 lg:px-10 py-3 lg:py-4 bg-blue-600 text-white rounded-[22px] text-[10px] lg:text-xs font-black hover:bg-blue-500 transition-all shadow-2xl shadow-blue-600/50 uppercase tracking-widest glow-blue active:scale-95"
            >
              Get API Key
            </button>
          </div>
        </div>
      </nav>

      {/* Primary Content Area */}
      <main className="px-6 lg:px-10 pb-32">
        {currentView === ViewState.DISCOVERY && (
          <DiscoveryEngine 
            initialIntent={initialIntent} 
            onClearIntent={() => setInitialIntent(null)} 
          />
        )}
        
        {currentView === ViewState.USE_CASES && (
          <div className="max-w-[1400px] mx-auto py-16 lg:py-28 animate-fadeIn">
            <div className="mb-20 lg:mb-32 text-center space-y-6 lg:space-y-10">
              <div className="inline-block px-5 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-widest">Pre-Engineered Solutions</div>
              <h2 className="text-5xl lg:text-8xl font-black text-white tracking-tighter leading-[0.9]">Industry-Standard <br/> <span className="text-blue-500">Blueprints.</span></h2>
              <p className="text-slate-400 max-w-2xl mx-auto text-lg lg:text-2xl font-medium italic opacity-70">"Stop reinventing the plumbing. Deploy battle-tested fintech sequences today."</p>
            </div>
            <UseCasesView onSelectUseCase={handleBlueprintSelection} />
          </div>
        )}
        
        {currentView === ViewState.CATALOG && (
          <div className="max-w-[1400px] mx-auto py-16 lg:py-28 animate-fadeIn">
             <div className="mb-20 lg:mb-28 space-y-6">
              <span className="text-blue-500 font-black text-[12px] uppercase tracking-[0.4em]">Developer Command Center</span>
              <h2 className="text-5xl lg:text-8xl font-black text-white tracking-tighter leading-[0.9]">Infrastructure <br/> API Stack.</h2>
              <p className="text-slate-400 max-w-2xl text-lg lg:text-2xl font-medium italic opacity-70">"Atomic modules designed for high-performance architectural scaling."</p>
            </div>
            <CatalogView />
          </div>
        )}
      </main>

      {/* Executive Strategy Section */}
      <footer className="border-t border-white/10 py-32 lg:py-48 bg-[#010409] relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-blue-600/5 blur-[200px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
          <div className="glass-card p-10 lg:p-24 rounded-[60px] lg:rounded-[80px] border border-blue-500/30 shadow-[0_0_100px_-20px_rgba(0,82,255,0.2)] overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
            
            <div className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-24">
              <div className="lg:w-2/3 space-y-10 lg:space-y-14 text-center lg:text-left">
                <div className="inline-block px-6 py-2 bg-blue-600/10 text-blue-400 text-[11px] font-black uppercase tracking-[0.3em] rounded-full border border-blue-500/20">
                  Strategic Proposal: Intent-First discovery
                </div>
                <h3 className="text-4xl lg:text-7xl font-black text-white leading-[1] tracking-tighter">
                  Solve for <span className="text-blue-500 underline decoration-blue-500/30 underline-offset-8">Intent.</span> <br/>
                  The APIs will follow.
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 pt-6">
                  <div className="space-y-4">
                    <h4 className="text-white font-black text-xl lg:text-2xl tracking-tight">The Friction Gap</h4>
                    <p className="text-slate-500 text-base lg:text-lg leading-relaxed font-medium">Traditional catalogs force buyers into technical silos before they see value. Nexus speaks 'Business Intent' to drive enterprise conversion.</p>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-white font-black text-xl lg:text-2xl tracking-tight">Ecosystem Lift</h4>
                    <p className="text-slate-500 text-base lg:text-lg leading-relaxed font-medium">By unifying the Product Manager and the Architect, Decentro reduces the sales cycle from months to minutes.</p>
                  </div>
                </div>
              </div>

              <div className="w-full lg:w-1/3 bg-slate-900/60 p-10 lg:p-14 rounded-[50px] lg:rounded-[60px] border border-white/10 text-center space-y-10 lg:space-y-12 backdrop-blur-3xl shadow-4xl">
                <div className="space-y-2">
                  <div className="text-6xl lg:text-7xl font-black text-white tracking-tighter">4.5X</div>
                  <p className="text-blue-400 text-[11px] font-black uppercase tracking-[0.3em]">Projected Conversion Delta</p>
                </div>
                <div className="w-full h-px bg-white/10"></div>
                <div className="space-y-2">
                  <div className="text-6xl lg:text-7xl font-black text-green-400 tracking-tighter">100%</div>
                  <p className="text-blue-400 text-[11px] font-black uppercase tracking-[0.3em]">AI-Driven Accuracy</p>
                </div>
                <button 
                  onClick={toggleModal}
                  className="w-full py-6 lg:py-7 bg-white text-slate-950 rounded-[30px] font-black text-sm lg:text-base tracking-tight hover:scale-105 transition-all shadow-4xl uppercase active:scale-95"
                >
                  Deploy Nexus Framework
                </button>
              </div>
            </div>
          </div>
          
          <div className="mt-32 text-center opacity-40">
            <p className="text-[11px] font-black uppercase tracking-[0.8em] text-slate-600">Decentro Global • Architectural Strategy • 2025 Release</p>
          </div>
        </div>
      </footer>

      {/* Get API Key Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-[#020617]/95 backdrop-blur-2xl transition-all duration-700">
          <div className="glass-card w-full max-w-lg p-10 lg:p-14 rounded-[60px] border border-white/10 shadow-[0_0_150px_-30px_rgba(0,82,255,0.4)] relative animate-slideUp">
            <button 
              onClick={toggleModal}
              className="absolute top-10 right-10 text-slate-500 hover:text-white transition-all hover:rotate-90"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
            <div className="text-center space-y-10">
              <div className="w-20 h-20 bg-blue-600/20 rounded-[30px] flex items-center justify-center text-blue-400 mx-auto border border-blue-500/20 shadow-inner">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"/></svg>
              </div>
              <div className="space-y-4">
                <h3 className="text-3xl lg:text-4xl font-black text-white tracking-tighter">Nexus Sandbox Access</h3>
                <p className="text-slate-400 text-lg font-medium leading-relaxed italic opacity-80">Connect with our architecture council to activate your enterprise sandbox.</p>
              </div>
              <div className="space-y-5 pt-6">
                <button 
                  onClick={() => window.location.href = 'mailto:hello@decentro.tech?subject=Decentro%20Nexus%20API%20Key%20Request'}
                  className="w-full py-6 bg-blue-600 text-white rounded-[28px] font-black text-sm lg:text-base uppercase tracking-widest hover:bg-blue-500 transition-all shadow-4xl shadow-blue-600/50 active:scale-95"
                >
                  Email Architecture Team
                </button>
                <button 
                  onClick={toggleModal}
                  className="w-full py-6 bg-white/5 text-white rounded-[28px] font-black text-sm lg:text-base uppercase tracking-widest hover:bg-white/10 transition-all border border-white/10 active:scale-95"
                >
                  Return to Explorer
                </button>
              </div>
              <div className="flex items-center justify-center space-x-3 text-[10px] text-slate-600 font-black uppercase tracking-[0.3em] pt-6 opacity-60">
                 <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                 <span>SLA: 4 Hour Activation</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
