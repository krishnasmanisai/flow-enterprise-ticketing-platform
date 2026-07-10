const fs = require('fs');
let content = fs.readFileSync('src/pages/TicketDetails.tsx', 'utf-8');

const replacement1 = `        {/* 2. Customer, Details, SLA */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left: Customer & SLA (30%) */}
          <div className="lg:w-[30%] flex flex-col gap-6">
            <div className="card-base p-0 overflow-hidden flex flex-col shadow-sm h-fit">
               <div className="px-5 py-4 bg-bg-surface border-b border-border-default flex items-center gap-2">
                 <User size={16} className="text-text-secondary"/>
                 <h3 className="font-bold text-sm text-text-primary">Customer</h3>
               </div>
               <div className="p-5 flex flex-col gap-5">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center font-bold text-lg shadow-sm">SC</div>
                    <div className="min-w-0">
                      <div className="font-bold text-text-primary text-base truncate">Sarah Connor</div>
                      <div className="text-[13px] text-text-secondary truncate">sarah.connor@acmecorp.com</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-y-3.5 mt-2">
                    <div className="flex items-center gap-3 text-sm">
                      <Phone size={14} className="text-text-muted shrink-0"/>
                      <span className="text-text-primary font-semibold">+1 555-0198</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Building size={14} className="text-text-muted shrink-0"/>
                      <span className="text-text-secondary w-16 shrink-0 font-medium">Tenant:</span>
                      <span className="text-text-primary font-semibold truncate">Acme Corp</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Briefcase size={14} className="text-text-muted shrink-0"/>
                      <span className="text-text-secondary w-16 shrink-0 font-medium">BU:</span>
                      <span className="text-text-primary font-semibold truncate">IT Operations</span>
                    </div>
                  </div>
               </div>
            </div>

            <div className="card-base p-0 overflow-hidden flex flex-col shadow-sm h-fit">
               <div className="px-5 py-4 bg-bg-surface border-b border-border-default flex items-center justify-between">
                 <div className="flex items-center gap-2">
                   <Clock size={16} className="text-text-secondary"/>
                   <h3 className="font-bold text-sm text-text-primary">SLA Summary</h3>
                 </div>
                 <Badge variant="error" className="py-0.5 px-2 text-[10px] font-bold tracking-wide uppercase">Breached</Badge>
               </div>
               <div className="p-5 flex flex-col gap-6">
                   <div className="flex flex-col gap-2">
                      <div className="flex justify-between items-center">
                        <span className="text-[13px] font-bold text-text-primary">First Response</span>
                        <span className="text-[11px] font-bold text-error-text tracking-wider uppercase">Breached</span>
                      </div>
                      <div className="w-full h-2 bg-error-text/20 rounded-full overflow-hidden">
                        <div className="h-full bg-error-text" style={{ width: '100%' }}></div>
                      </div>
                      <div className="text-[11px] text-text-muted font-mono font-medium flex justify-between">
                        <span>Target: 08:30 AM</span>
                        <span className="text-error-text font-bold">-15m overdue</span>
                      </div>
                   </div>
                   
                   <div className="flex flex-col gap-2">
                      <div className="flex justify-between items-center">
                        <span className="text-[13px] font-bold text-text-primary">Resolution</span>
                        <span className="text-[11px] font-bold text-warning-text tracking-wider uppercase">Healthy</span>
                      </div>
                      <div className="w-full h-2 bg-border-default rounded-full overflow-hidden">
                        <div className="h-full bg-warning-text" style={{ width: '40%' }}></div>
                      </div>
                      <div className="text-[11px] text-text-muted font-mono font-medium flex justify-between">
                        <span>Target: 16:00 PM</span>
                        <span className="text-warning-text font-bold">1h 45m left</span>
                      </div>
                   </div>
               </div>
            </div>
          </div>

          {/* Right: Ticket Details (70%) */}
          <div className="lg:w-[70%] card-base p-0 overflow-hidden flex flex-col shadow-sm transition-all h-fit">
            <div className="px-5 py-3 bg-bg-surface border-b border-border-default flex items-center justify-between">
               <h3 className="font-bold text-sm text-text-primary">Ticket Details</h3>
               {isEditingDetails ? (
                 <div className="flex items-center gap-2">
                   <Button variant="ghost" size="sm" onClick={() => setIsEditingDetails(false)} className="text-text-secondary hover:text-text-primary h-8 text-xs font-bold">Cancel</Button>
                   <Button variant="primary" size="sm" onClick={() => setIsEditingDetails(false)} className="h-8 text-xs px-4 font-bold">Save Changes</Button>
                 </div>
               ) : (
                 <Button variant="ghost" size="sm" onClick={() => setIsEditingDetails(true)} className="text-brand-500 hover:text-brand-600 hover:bg-brand-50/50 h-8 text-xs font-bold px-3">Edit Ticket</Button>
               )}
             </div>
             
             <div className="p-6 flex flex-col">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
                  {ticketFields.map(field => (
                    <div key={field.id} className={field.type === 'textarea' ? 'col-span-1 md:col-span-2' : ''}>
                      <div className="text-[11px] font-bold text-text-muted uppercase tracking-wider mb-2">{field.label}</div>
                      {isEditingDetails ? (
                        field.type === 'select' ? (
                          <SingleSearchDropdown 
                            options={field.options || []} 
                            value={field.value} 
                            onChange={(val) => setTicketFields(prev => prev.map(f => f.id === field.id ? { ...f, value: val } : f))} 
                            className="h-9 text-sm w-full input-base border border-border-default bg-bg-page focus-within:border-border-focus font-medium" 
                          />
                        ) : field.type === 'textarea' ? (
                          <textarea 
                            className="input-base w-full h-20 text-sm border-border-default focus:border-border-focus p-2.5 resize-none font-medium" 
                            value={field.value} 
                            onChange={(e) => setTicketFields(prev => prev.map(f => f.id === field.id ? { ...f, value: e.target.value } : f))} 
                          />
                        ) : (
                          <input 
                            type="text" 
                            className="input-base w-full h-9 text-sm border-border-default focus:border-border-focus px-3 font-medium" 
                            value={field.value} 
                            onChange={(e) => setTicketFields(prev => prev.map(f => f.id === field.id ? { ...f, value: e.target.value } : f))} 
                          />
                        )
                      ) : (
                        <div className="text-[13px] font-semibold text-text-primary break-words leading-relaxed bg-bg-surface px-3 py-2 rounded-md border border-border-default">
                          {field.value || '-'}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
             </div>
          </div>
        </div>`;

const newReplacement1 = `        {/* 2. Unified Workspace Panel */}
        <div className="card-base p-0 overflow-hidden flex flex-col bg-bg-surface shadow-sm border border-border-default rounded-xl">
          <div className="flex flex-col lg:flex-row divide-y lg:divide-y-0 lg:divide-x divide-border-default">
            
            {/* Left Column (Customer & SLA) - 30% */}
            <div className="lg:w-[30%] flex flex-col divide-y divide-border-default">
              {/* Customer */}
              <div className="flex flex-col">
                 <div className="px-5 py-4 bg-bg-surface-alt/50 border-b border-border-default flex items-center gap-2">
                   <User size={16} className="text-text-secondary"/>
                   <h3 className="font-bold text-sm text-text-primary tracking-tight">Customer Profile</h3>
                 </div>
                 <div className="p-5 flex flex-col gap-5">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-brand-50 text-brand-600 flex items-center justify-center font-bold text-lg border border-brand-500/20">SC</div>
                      <div className="min-w-0">
                        <div className="font-bold text-text-primary text-base truncate tracking-tight">Sarah Connor</div>
                        <div className="text-[13px] text-text-secondary truncate">sarah.connor@acmecorp.com</div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-y-3.5 mt-2">
                      <div className="flex items-center gap-3 text-sm">
                        <Phone size={14} className="text-text-muted shrink-0"/>
                        <span className="text-text-primary font-semibold">+1 555-0198</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <Building size={14} className="text-text-muted shrink-0"/>
                        <span className="text-text-secondary w-16 shrink-0 font-medium">Tenant:</span>
                        <span className="text-text-primary font-semibold truncate">Acme Corp</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <Briefcase size={14} className="text-text-muted shrink-0"/>
                        <span className="text-text-secondary w-16 shrink-0 font-medium">BU:</span>
                        <span className="text-text-primary font-semibold truncate">IT Operations</span>
                      </div>
                    </div>
                 </div>
              </div>

              {/* SLA */}
              <div className="flex flex-col">
                 <div className="px-5 py-4 bg-bg-surface-alt/50 border-b border-border-default flex items-center justify-between">
                   <div className="flex items-center gap-2">
                     <Clock size={16} className="text-text-secondary"/>
                     <h3 className="font-bold text-sm text-text-primary tracking-tight">SLA Summary</h3>
                   </div>
                   <Badge variant="error" className="py-0.5 px-2 text-[10px] font-bold tracking-wide uppercase">Breached</Badge>
                 </div>
                 <div className="p-5 flex flex-col gap-6">
                     <div className="flex flex-col gap-2">
                        <div className="flex justify-between items-center">
                          <span className="text-[13px] font-bold text-text-primary">First Response</span>
                          <span className="text-[11px] font-bold text-error-text tracking-wider uppercase">Breached</span>
                        </div>
                        <div className="w-full h-1.5 bg-error-text/20 rounded-full overflow-hidden">
                          <div className="h-full bg-error-text" style={{ width: '100%' }}></div>
                        </div>
                        <div className="text-[11px] text-text-muted font-mono font-medium flex justify-between">
                          <span>Target: 08:30 AM</span>
                          <span className="text-error-text font-bold">-15m overdue</span>
                        </div>
                     </div>
                     
                     <div className="flex flex-col gap-2">
                        <div className="flex justify-between items-center">
                          <span className="text-[13px] font-bold text-text-primary">Resolution</span>
                          <span className="text-[11px] font-bold text-warning-text tracking-wider uppercase">Healthy</span>
                        </div>
                        <div className="w-full h-1.5 bg-border-default rounded-full overflow-hidden">
                          <div className="h-full bg-warning-text" style={{ width: '40%' }}></div>
                        </div>
                        <div className="text-[11px] text-text-muted font-mono font-medium flex justify-between">
                          <span>Target: 16:00 PM</span>
                          <span className="text-warning-text font-bold">1h 45m left</span>
                        </div>
                     </div>
                 </div>
              </div>
            </div>

            {/* Right Column (Ticket Details) - 70% */}
            <div className="lg:w-[70%] flex flex-col transition-all">
              <div className="px-5 py-4 bg-bg-surface-alt/50 border-b border-border-default flex items-center justify-between">
                 <h3 className="font-bold text-sm text-text-primary tracking-tight">Ticket Details</h3>
                 {isEditingDetails ? (
                   <div className="flex items-center gap-2">
                     <Button variant="ghost" size="sm" onClick={() => setIsEditingDetails(false)} className="text-text-secondary hover:text-text-primary h-8 text-xs font-bold">Cancel</Button>
                     <Button variant="primary" size="sm" onClick={() => setIsEditingDetails(false)} className="h-8 text-xs px-4 font-bold">Save Changes</Button>
                   </div>
                 ) : (
                   <Button variant="ghost" size="sm" onClick={() => setIsEditingDetails(true)} className="text-brand-500 hover:text-brand-600 hover:bg-brand-50/50 h-8 text-xs font-bold px-3">Edit Ticket</Button>
                 )}
               </div>
               
               <div className="p-6 flex flex-col">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
                    {ticketFields.map(field => (
                      <div key={field.id} className={field.type === 'textarea' ? 'col-span-1 md:col-span-2' : ''}>
                        <div className="text-[11px] font-bold text-text-muted uppercase tracking-wider mb-2">{field.label}</div>
                        {isEditingDetails ? (
                          field.type === 'select' ? (
                            <SingleSearchDropdown 
                              options={field.options || []} 
                              value={field.value} 
                              onChange={(val) => setTicketFields(prev => prev.map(f => f.id === field.id ? { ...f, value: val } : f))} 
                              className="h-9 text-sm w-full input-base border border-border-default bg-bg-page focus-within:border-border-focus font-medium" 
                            />
                          ) : field.type === 'textarea' ? (
                            <textarea 
                              className="input-base w-full h-20 text-sm border-border-default focus:border-border-focus p-2.5 resize-none font-medium" 
                              value={field.value} 
                              onChange={(e) => setTicketFields(prev => prev.map(f => f.id === field.id ? { ...f, value: e.target.value } : f))} 
                            />
                          ) : (
                            <input 
                              type="text" 
                              className="input-base w-full h-9 text-sm border-border-default focus:border-border-focus px-3 font-medium" 
                              value={field.value} 
                              onChange={(e) => setTicketFields(prev => prev.map(f => f.id === field.id ? { ...f, value: e.target.value } : f))} 
                            />
                          )
                        ) : (
                          <div className="text-[13px] font-semibold text-text-primary break-words leading-relaxed py-1.5 border-b border-border-subtle">
                            {field.value || '-'}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
               </div>
            </div>
          </div>
        </div>`;

content = content.replace(replacement1, newReplacement1);
fs.writeFileSync('src/pages/TicketDetails.tsx', content);
