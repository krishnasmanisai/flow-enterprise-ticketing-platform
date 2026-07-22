import React, { useState, useEffect, useRef } from 'react';
import { Phone, X, Delete, Copy, ChevronDown, Mic, MicOff, Pause, Play, Volume2, PhoneForwarded, PhoneOff, CircleDot, User, ArrowUpRight, ArrowDownLeft, Clock } from 'lucide-react';
import { Button } from './ui/Button';

const recentCallsMock = [
  { id: 1, name: 'John Doe', phone: '+91 9876543210', type: 'outgoing', duration: '05:23', time: '10:30 AM', avatar: 'JD' },
  { id: 2, name: 'Alice Brown', phone: '+91 9123456780', type: 'incoming', duration: '12:45', time: 'Yesterday', avatar: 'AB' },
  { id: 3, name: 'Michael Scott', phone: '+91 9988776655', type: 'outgoing', duration: '02:10', time: 'Yesterday', avatar: 'MS' },
  { id: 4, name: 'Emma Wilson', phone: '+91 9870012345', type: 'incoming', duration: '00:45', time: 'Mon', avatar: 'EW' },
  { id: 5, name: 'Sophia Lee', phone: '+91 9001122334', type: 'outgoing', duration: '15:00', time: 'Last Week', avatar: 'SL' }
];

export function FloatingDialer() {
  const [isOpen, setIsOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [callState, setCallState] = useState<'idle' | 'calling' | 'ringing' | 'connected' | 'incoming'>('idle');
  const [activeCall, setActiveCall] = useState<any>(null);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isOnHold, setIsOnHold] = useState(false);
  
  // Handle call duration
  useEffect(() => {
    let interval: any;
    if (callState === 'connected') {
      interval = setInterval(() => setDuration(d => d + 1), 1000);
    } else {
      setDuration(0);
    }
    return () => clearInterval(interval);
  }, [callState]);

  const formatDuration = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const handleDial = (num: string) => {
    setPhoneNumber(prev => prev + num);
  };

  const handleCall = () => {
    if (!phoneNumber) return;
    
    // Find contact if exists
    const contact = recentCallsMock.find(c => c.phone.includes(phoneNumber) || phoneNumber.includes(c.phone.replace(/\s+/g, '')));
    
    setActiveCall({
      name: contact ? contact.name : 'Unknown',
      phone: phoneNumber,
      avatar: contact ? contact.avatar : '?'
    });
    
    setCallState('calling');
    
    // Simulate call flow
    setTimeout(() => {
      if (callState !== 'idle') setCallState('ringing');
      setTimeout(() => {
        if (callState !== 'idle') setCallState('connected');
      }, 2000);
    }, 1500);
  };

  const handleEndCall = () => {
    setCallState('idle');
    setActiveCall(null);
    setDuration(0);
  };

  const handleRecentClick = (call: any) => {
    setPhoneNumber(call.phone);
  };

  const dialPadNumbers = [
    { num: '1', letters: '' }, { num: '2', letters: 'ABC' }, { num: '3', letters: 'DEF' },
    { num: '4', letters: 'GHI' }, { num: '5', letters: 'JKL' }, { num: '6', letters: 'MNO' },
    { num: '7', letters: 'PQRS' }, { num: '8', letters: 'TUV' }, { num: '9', letters: 'WXYZ' },
    { num: '*', letters: '' }, { num: '0', letters: '+' }, { num: '#', letters: '' }
  ];

  return (
    <>
      {/* Floating Button / Minimized View */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
        {!isOpen && callState !== 'idle' && activeCall ? (
          <button 
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-3 bg-gradient-to-b from-brand-500 to-brand-600 text-white px-5 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 animate-in slide-in-from-bottom-5"
          >
            <div className={`w-2 h-2 rounded-full ${callState === 'connected' ? 'bg-green-400 animate-pulse' : 'bg-yellow-400 animate-pulse'}`} />
            <Phone size={18} className="animate-pulse" />
            <div className="flex flex-col items-start text-sm">
              <span className="font-semibold">{activeCall.name}</span>
              <span className="text-xs text-brand-100">{callState === 'connected' ? formatDuration(duration) : callState}</span>
            </div>
          </button>
        ) : !isOpen && callState === 'idle' ? (
          <button 
            onClick={() => setIsOpen(true)}
            title="Open Dialer"
            className="w-14 h-14 bg-gradient-to-b from-brand-500 to-brand-600 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <Phone size={24} />
          </button>
        ) : null}
      </div>

      {/* Drawer Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-text-primary/20 backdrop-blur-sm transition-opacity" onClick={() => setIsOpen(false)} />
      )}

      {/* Slide-out Drawer */}
      <div className={`fixed top-0 right-0 h-full w-[360px] bg-bg-page border-l border-border-default shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border-default bg-bg-surface shrink-0">
          <div className="flex items-center gap-2 text-text-primary font-bold">
            <Phone size={18} className="text-brand-500" />
            Dialer
          </div>
          <button onClick={() => setIsOpen(false)} className="text-text-muted hover:text-text-primary hover:bg-bg-surface-hover p-1.5 rounded-md transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto flex flex-col relative custom-scrollbar">
          {callState === 'incoming' && activeCall ? (
            /* Incoming Call Screen */
            <div className="absolute inset-0 bg-bg-page flex flex-col items-center justify-center p-6 z-10 animate-in fade-in zoom-in-95 duration-200">
              <span className="text-sm font-semibold text-text-secondary uppercase tracking-widest mb-8 animate-pulse">Incoming Call</span>
              <div className="w-24 h-24 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center text-3xl font-bold mb-4 shadow-inner">
                {activeCall.avatar}
              </div>
              <h2 className="text-2xl font-bold text-text-primary mb-1">{activeCall.name}</h2>
              <p className="text-text-secondary mb-12">{activeCall.phone}</p>
              
              <div className="flex items-center gap-8 w-full justify-center">
                <button 
                  onClick={handleEndCall}
                  className="w-16 h-16 rounded-full bg-error-text hover:bg-red-600 text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
                >
                  <PhoneOff size={28} />
                </button>
                <button 
                  onClick={() => setCallState('connected')}
                  className="w-16 h-16 rounded-full bg-success-text hover:bg-green-600 text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 animate-bounce"
                >
                  <Phone size={28} />
                </button>
              </div>
            </div>
          ) : callState !== 'idle' && activeCall ? (
            /* Active Call Screen */
            <div className="absolute inset-0 bg-bg-page flex flex-col p-6 z-10 animate-in fade-in slide-in-from-right-4 duration-200">
              <div className="flex flex-col items-center justify-center flex-1">
                <div className="relative mb-6">
                  <div className="w-24 h-24 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center text-3xl font-bold shadow-inner relative z-10">
                    {activeCall.avatar}
                  </div>
                  {callState !== 'connected' && (
                    <>
                      <div className="absolute inset-0 rounded-full border-2 border-brand-300 animate-ping opacity-75" />
                      <div className="absolute -inset-4 rounded-full border border-brand-200 animate-ping opacity-50" style={{ animationDelay: '0.5s' }} />
                    </>
                  )}
                </div>
                <h2 className="text-2xl font-bold text-text-primary mb-1 text-center">{activeCall.name}</h2>
                <p className="text-text-secondary mb-3">{activeCall.phone}</p>
                <div className="px-3 py-1 bg-bg-surface border border-border-default rounded-full text-sm font-medium text-text-secondary capitalize flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${callState === 'connected' ? 'bg-success-text' : 'bg-brand-500 animate-pulse'}`} />
                  {callState} {callState === 'connected' && `- ${formatDuration(duration)}`}
                </div>
              </div>

              {/* Controls */}
              <div className="mt-auto">
                <div className="grid grid-cols-3 gap-y-6 gap-x-4 mb-8">
                  <button onClick={() => setIsMuted(!isMuted)} className="flex flex-col items-center gap-2 text-text-secondary hover:text-text-primary transition-colors">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center border ${isMuted ? 'bg-bg-surface-hover border-border-strong text-text-primary' : 'border-border-default hover:bg-bg-surface'}`}>
                      {isMuted ? <MicOff size={20} /> : <Mic size={20} />}
                    </div>
                    <span className="text-[11px] font-semibold uppercase">Mute</span>
                  </button>
                  <button onClick={() => setIsOnHold(!isOnHold)} className="flex flex-col items-center gap-2 text-text-secondary hover:text-text-primary transition-colors">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center border ${isOnHold ? 'bg-bg-surface-hover border-border-strong text-text-primary' : 'border-border-default hover:bg-bg-surface'}`}>
                      {isOnHold ? <Play size={20} /> : <Pause size={20} />}
                    </div>
                    <span className="text-[11px] font-semibold uppercase">Hold</span>
                  </button>
                  <button className="flex flex-col items-center gap-2 text-text-secondary hover:text-text-primary transition-colors">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center border border-border-default hover:bg-bg-surface">
                      <Volume2 size={20} />
                    </div>
                    <span className="text-[11px] font-semibold uppercase">Speaker</span>
                  </button>
                  
                  <button className="flex flex-col items-center gap-2 text-text-secondary hover:text-text-primary transition-colors">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center border border-border-default hover:bg-bg-surface">
                      <CircleDot size={20} />
                    </div>
                    <span className="text-[11px] font-semibold uppercase">Keypad</span>
                  </button>
                  <button className="flex flex-col items-center gap-2 text-text-secondary hover:text-text-primary transition-colors">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center border border-border-default hover:bg-bg-surface">
                      <PhoneForwarded size={20} />
                    </div>
                    <span className="text-[11px] font-semibold uppercase">Transfer</span>
                  </button>
                  <button className="flex flex-col items-center gap-2 text-text-secondary hover:text-text-primary transition-colors">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center border border-border-default hover:bg-bg-surface">
                      <div className="w-3 h-3 rounded-full bg-error-text" />
                    </div>
                    <span className="text-[11px] font-semibold uppercase">Record</span>
                  </button>
                </div>
                
                <div className="flex justify-center pb-6">
                  <button 
                    onClick={handleEndCall}
                    className="w-16 h-16 rounded-full bg-error-text hover:bg-red-600 text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
                  >
                    <PhoneOff size={28} />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Dialer Screen */
            <div className="flex flex-col h-full animate-in fade-in duration-200">
              {/* Input Area */}
              <div className="px-5 py-6 border-b border-border-default bg-bg-surface">
                <div className="flex items-center gap-2 mb-4 relative">
                  <div className="flex items-center gap-1 bg-bg-page border border-border-default rounded-md px-2 py-2 cursor-pointer hover:bg-bg-surface-hover transition-colors shrink-0">
                    <span className="text-sm font-medium">🇮🇳 +91</span>
                    <ChevronDown size={14} className="text-text-muted" />
                  </div>
                  <div className="relative flex-1">
                    <input 
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="Enter number..."
                      className="w-full text-lg font-semibold tracking-wide bg-transparent border-none outline-none text-text-primary placeholder:text-text-muted/50"
                    />
                  </div>
                  {phoneNumber && (
                    <button onClick={() => setPhoneNumber('')} className="p-1.5 text-text-muted hover:text-text-primary hover:bg-bg-page rounded-md transition-colors absolute right-0">
                      <X size={16} />
                    </button>
                  )}
                </div>
                <div className="flex items-center justify-center gap-4 text-xs font-semibold text-text-secondary uppercase">
                  <button onClick={async () => {
                    try {
                      const text = await navigator.clipboard.readText();
                      setPhoneNumber(text);
                    } catch(e) {}
                  }} className="flex items-center gap-1.5 hover:text-brand-500 transition-colors">
                    <Copy size={14} /> Paste
                  </button>
                  <button className="flex items-center gap-1.5 hover:text-brand-500 transition-colors">
                    <Clock size={14} /> Recent
                  </button>
                </div>
              </div>

              {/* Keypad */}
              <div className="px-8 py-6">
                <div className="grid grid-cols-3 gap-x-6 gap-y-4 max-w-[260px] mx-auto">
                  {dialPadNumbers.map((btn, i) => (
                    <button 
                      key={i}
                      onClick={() => handleDial(btn.num)}
                      className="w-16 h-16 rounded-full bg-bg-surface hover:bg-bg-surface-hover active:bg-border-subtle active:scale-95 border border-border-default flex flex-col items-center justify-center transition-all group shadow-sm"
                    >
                      <span className="text-xl font-medium text-text-primary group-active:text-brand-600">{btn.num}</span>
                      {btn.letters && <span className="text-[9px] font-bold text-text-muted uppercase tracking-widest">{btn.letters}</span>}
                    </button>
                  ))}
                </div>
                {!phoneNumber && (
                  <p className="text-center text-xs font-medium text-text-secondary mt-2 mb-2">
                    Enter a phone number to start calling.
                  </p>
                )}
                <div className="flex justify-center mt-6">
                  <button 
                    onClick={handleCall}
                    disabled={!phoneNumber}
                    className="w-[200px] h-12 bg-gradient-to-b from-success-text to-green-600 hover:from-green-600 hover:to-green-700 disabled:from-success-text/50 disabled:to-success-text/50 disabled:cursor-not-allowed text-white rounded-full flex items-center justify-center gap-2 font-semibold shadow-md transition-all hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
                  >
                    <Phone size={18} />
                    Call
                  </button>
                </div>
              </div>

              {/* Recent Calls */}
              <div className="flex-1 bg-bg-surface border-t border-border-default flex flex-col">
                <div className="px-5 py-3 border-b border-border-default">
                  <h3 className="text-xs font-semibold text-text-secondary uppercase tracking-widest">Recent Calls</h3>
                </div>
                <div className="flex-1 overflow-y-auto p-2">
                  {recentCallsMock.length > 0 ? (
                    recentCallsMock.map((call) => (
                      <div 
                        key={call.id} 
                        className="flex items-center p-3 hover:bg-bg-page rounded-lg cursor-pointer transition-colors group"
                        onClick={() => handleRecentClick(call)}
                      >
                        <div className="w-10 h-10 rounded-full bg-brand-50 text-brand-600 flex items-center justify-center font-bold text-sm shrink-0 border border-brand-100 group-hover:bg-brand-100 transition-colors">
                          {call.avatar}
                        </div>
                        <div className="ml-3 flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-0.5">
                            <span className="text-sm font-semibold text-text-primary truncate">{call.name}</span>
                            <span className="text-xs text-text-muted">{call.time}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            {call.type === 'incoming' ? (
                              <ArrowDownLeft size={12} className="text-error-text" />
                            ) : (
                              <ArrowUpRight size={12} className="text-success-text" />
                            )}
                            <span className="text-xs text-text-secondary font-mono">{call.phone}</span>
                            <span className="text-xs text-text-muted ml-auto">{call.duration}</span>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-8 text-center text-text-muted flex flex-col items-center justify-center h-full">
                      <Clock size={24} className="mb-2 opacity-50" />
                      <p className="text-sm">No recent calls</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
