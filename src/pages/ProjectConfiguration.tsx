import { useState } from 'react';
import { ArrowLeft, Check, ArrowRight } from 'lucide-react';
import { Page } from '../types';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { BUMappingStep } from '../components/project-configuration/BUMappingStep';
import { ChannelsStep } from '../components/project-configuration/ChannelsStep';
import { RoleAssignmentStep } from '../components/project-configuration/RoleAssignmentStep';
import { ReviewStep } from '../components/project-configuration/ReviewStep';

export default function ProjectConfiguration({ onNavigate }: { onNavigate: (page: Page) => void }) {
  const [currentStep, setCurrentStep] = useState(1);
  
  const steps = [
    { id: 1, title: 'BU Mapping', desc: 'Select Business Units' },
    { id: 2, title: 'Channels', desc: 'Enable Communication' },
    { id: 3, title: 'Role Assignment', desc: 'Define Access Rights' },
    { id: 4, title: 'Review', desc: 'Confirm & Save' }
  ];

  const handleNext = () => setCurrentStep(prev => Math.min(4, prev + 1));
  const handlePrev = () => setCurrentStep(prev => Math.max(1, prev - 1));
  const handleSave = () => onNavigate('client_details');
  const handleCancel = () => onNavigate('client_details');

  return (
    <div className="flex flex-col h-full bg-bg-page w-full">
      {/* Top Header */}
      <header className="bg-bg-surface border-b border-border-default px-8 py-5 flex items-center justify-between sticky top-0 z-30 shadow-sm">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={handleCancel} className="text-text-secondary hover:bg-bg-surface-hover -ml-2 shrink-0">
            <ArrowLeft size={20} />
          </Button>
          <div className="flex flex-col">
            <div className="flex items-center gap-3">
               <h1 className="text-xl font-bold text-text-primary tracking-tight leading-none">Global Tech Solutions — Project Alpha</h1>
               <Badge variant="success" className="py-0 px-2 font-bold uppercase tracking-wider text-[10px]">Configuration Mode</Badge>
            </div>
            <p className="text-sm text-text-secondary mt-1">Configure project modules and services</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3 shrink-0">
          <Button variant="ghost" onClick={handleCancel} className="font-semibold text-text-secondary hover:text-text-primary">Cancel</Button>
          <Button variant="primary" onClick={handleSave} className="font-semibold" icon={Check}>Save Configuration</Button>
        </div>
      </header>

      {/* Main Container with Sidebar + Content */}
      <div className="flex flex-1 overflow-hidden max-w-[1600px] w-full mx-auto">
        {/* Left Stepper Sidebar */}
        <div className="w-[300px] bg-bg-surface border-r border-border-default shrink-0 flex flex-col p-8 z-10 sticky top-[73px]">
          <h3 className="text-[11px] font-semibold text-text-muted uppercase tracking-widest mb-8">Setup Wizard</h3>
          
          <div className="space-y-6 relative before:content-[''] before:absolute before:left-[15px] before:top-2 before:bottom-2 before:w-0.5 before:bg-border-default">
            {steps.map((step) => {
              const isActive = currentStep === step.id;
              const isPast = currentStep > step.id;
              
              return (
                <div 
                  key={step.id} 
                  className={`relative flex items-start gap-4 group ${isPast ? 'cursor-pointer' : ''}`}
                  onClick={() => isPast ? setCurrentStep(step.id) : undefined}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold z-10 transition-colors shadow-sm shrink-0 mt-0.5
                    ${isPast ? 'bg-brand-500 text-bg-surface border-brand-500 hover:bg-brand-600' : 
                      isActive ? 'bg-bg-page border-2 border-brand-500 text-brand-500' : 
                      'bg-bg-surface border-2 border-border-default text-text-muted'}
                  `}>
                    {isPast ? <Check className="w-4 h-4" strokeWidth={3} /> : step.id}
                  </div>
                  <div className="flex flex-col">
                    <span className={`text-[15px] font-semibold transition-colors ${isActive ? 'text-brand-600' : isPast ? 'text-text-primary group-hover:text-brand-600' : 'text-text-muted'}`}>
                      {step.title}
                    </span>
                    <span className={`text-xs ${isActive ? 'text-text-secondary' : 'text-text-muted'}`}>{step.desc}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto px-10 py-10 bg-bg-page">
           <div className="max-w-4xl mx-auto w-full pb-24">
              <div className="animate-in fade-in duration-300">
                {currentStep === 1 && <BUMappingStep />}
                {currentStep === 2 && <ChannelsStep />}
                {currentStep === 3 && <RoleAssignmentStep />}
                {currentStep === 4 && <ReviewStep onEditStep={setCurrentStep} />}
              </div>
           </div>
        </main>
      </div>

      {/* Sticky Footer for current step */}
      <footer className="bg-bg-surface border-t border-border-default px-10 py-4 flex items-center justify-between sticky bottom-0 z-30">
        <div>
           {currentStep > 1 && (
              <Button 
                variant="outline" 
                onClick={handlePrev} 
                className="font-semibold"
                icon={ArrowLeft}
              >
                Previous Step
              </Button>
           )}
        </div>
        <div className="flex items-center gap-3">
          <Button 
            variant="primary" 
            onClick={currentStep === 4 ? handleSave : handleNext}
            className="font-semibold"
          >
            {currentStep === 4 ? 'Confirm & Save Configuration' : <>Next Step <ArrowRight size={16} className="ml-2" /></>}
          </Button>
        </div>
      </footer>
    </div>
  );
}
