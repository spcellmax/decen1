
import React from 'react';
import { USE_CASES } from '../constants';
import { UseCase } from '../types';

interface Props {
  onSelectUseCase: (intent: string) => void;
}

const UseCasesView: React.FC<Props> = ({ onSelectUseCase }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-10 animate-fadeIn">
      {USE_CASES.map((uc) => (
        <div 
          key={uc.id}
          onClick={() => onSelectUseCase(uc.description)}
          className="group relative glass-card rounded-[56px] p-1 cursor-pointer overflow-hidden border-white/10 hover:border-blue-500/50 transition-all hover:-translate-y-3 shadow-3xl bg-slate-900/40"
        >
          <div className="p-10 lg:p-14 h-full flex flex-col rounded-[54px] relative z-10">
            {/* Top Badge Row */}
            <div className="flex justify-between items-start mb-10">
              <div className="flex flex-wrap gap-2">
                <span className="px-5 py-2 bg-blue-600/10 border border-blue-500/30 text-blue-400 text-[10px] font-black rounded-full uppercase tracking-widest shadow-lg">
                  {uc.industry}
                </span>
                <span className="px-5 py-2 bg-white/5 border border-white/10 text-slate-400 text-[10px] font-black rounded-full uppercase tracking-widest">
                  ROI: {uc.roiPotential}
                </span>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-white/5 group-hover:bg-blue-600 group-hover:rotate-12 transition-all duration-500 flex items-center justify-center shadow-inner border border-white/10">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7-7 7"/></svg>
              </div>
            </div>

            {/* Content Section */}
            <div className="space-y-4 mb-10">
              <h3 className="text-3xl lg:text-4xl font-black text-white tracking-tighter group-hover:text-blue-400 transition-colors leading-none">
                {uc.title}
              </h3>
              <p className="text-slate-400 text-lg lg:text-xl font-medium leading-relaxed opacity-80">
                {uc.description}
              </p>
            </div>

            {/* Workflow Visualizer */}
            <div className="space-y-6 mb-12">
               <h4 className="text-[10px] font-black text-slate-600 uppercase tracking-[0.4em] mb-4 flex items-center">
                 <span className="w-6 h-px bg-slate-800 mr-3"></span>
                 Execution Sequence
               </h4>
               <div className="space-y-5">
                 {uc.flow.map((step, idx) => (
                   <div key={idx} className="flex items-start space-x-6 group/step bg-white/[0.02] p-4 rounded-3xl border border-transparent hover:border-white/5 transition-all">
                     <div className="w-10 h-10 rounded-2xl bg-blue-600/10 flex items-center justify-center text-blue-400 font-black text-sm border border-blue-600/20">
                       {idx + 1}
                     </div>
                     <div>
                       <span className="text-base text-slate-100 font-bold block">{step.step}</span>
                       <span className="text-xs text-slate-500 font-medium">{step.description}</span>
                     </div>
                   </div>
                 ))}
               </div>
            </div>
            
            {/* Bottom Metrics Row */}
            <div className="mt-auto pt-10 border-t border-white/5 flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Time to Market</span>
                <span className="text-2xl font-black text-white tracking-tighter">{uc.timeToMarket}</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="flex -space-x-3 hover:space-x-1 transition-all">
                  {uc.requiredModules.slice(0, 3).map((mId, i) => (
                    <div key={i} className="w-10 h-10 rounded-full bg-slate-950 border-2 border-blue-600/30 flex items-center justify-center text-[10px] font-black text-blue-400 shadow-2xl" title={mId}>
                      {mId[0]}
                    </div>
                  ))}
                  {uc.requiredModules.length > 3 && (
                    <div className="w-10 h-10 rounded-full bg-blue-600 border-2 border-slate-950 flex items-center justify-center text-[10px] font-black text-white shadow-2xl">
                      +{uc.requiredModules.length - 3}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Background Decorative Glow */}
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-blue-600/10 blur-[80px] rounded-full pointer-events-none group-hover:bg-blue-600/20 transition-all duration-700"></div>
        </div>
      ))}
    </div>
  );
};

export default UseCasesView;
