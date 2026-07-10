const fs = require('fs');
let content = fs.readFileSync('src/pages/TicketDetails.tsx', 'utf-8');

const oldTabs = `            {[
              { id: 'attachments', label: 'Attachments (2)', icon: Paperclip },
              { id: 'tasks', label: 'Tasks (2)', icon: CheckSquare },
              { id: 'linked', label: 'Linked Tickets (1)', icon: LinkIcon },
              { id: 'activity', label: 'Activity (18)', icon: Activity },
              { id: 'history', label: 'Audit History', icon: History },
            ]`;

const newTabs = `            {[
              { id: 'attachments', label: 'Attachments (2)', icon: Paperclip },
              { id: 'tasks', label: 'Tasks (2)', icon: CheckSquare },
              { id: 'linked', label: 'Linked Tickets (1)', icon: LinkIcon },
              { id: 'activity', label: 'Activity (18)', icon: Activity },
            ]`;

content = content.replace(oldTabs, newTabs);

const oldActivity = `             {activeBottomTab === 'activity' && (
               <div className="flex flex-col gap-4">
                 <h4 className="text-sm font-bold text-text-primary mb-2">Activity Timeline</h4>
                 <div className="flex flex-col relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border-default before:to-transparent">
                    {/* Activity Item 1 */}
                    <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active mb-6">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full border border-bg-page bg-bg-surface text-brand-500 shadow-sm shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                        <Lock size={16} />
                      </div>
                      <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-md border border-border-default bg-bg-surface shadow-sm">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-text-primary text-sm">John Doe</span>
                          <span className="text-[11px] text-text-muted font-mono">Today, 08:45 AM</span>
                        </div>
                        <p className="text-[13px] text-text-secondary font-medium">Added an <span className="font-bold text-text-primary">Internal Note</span>.</p>
                      </div>
                    </div>

                    {/* Activity Item 2 */}
                    <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active mb-6">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full border border-bg-page bg-bg-surface text-warning-text shadow-sm shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                        <Activity size={16} />
                      </div>
                      <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-md border border-border-default bg-bg-surface shadow-sm">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-text-primary text-sm">Jane Smith</span>
                          <span className="text-[11px] text-text-muted font-mono">Today, 08:30 AM</span>
                        </div>
                        <p className="text-[13px] text-text-secondary font-medium">Changed <span className="font-bold text-text-primary">Status</span> from Open to <span className="font-bold text-text-primary">In Progress</span>.</p>
                      </div>
                    </div>

                    {/* Activity Item 3 */}
                    <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active mb-6">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full border border-bg-page bg-brand-100 text-brand-700 shadow-sm shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                        <User size={16} />
                      </div>
                      <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-md border border-border-default bg-bg-surface shadow-sm">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-text-primary text-sm">Sarah Connor</span>
                          <span className="text-[11px] text-text-muted font-mono">Today, 08:00 AM</span>
                        </div>
                        <p className="text-[13px] text-text-secondary font-medium">Submitted <span className="font-bold text-text-primary">Original Request</span>.</p>
                      </div>
                    </div>
                 </div>
               </div>
             )}

             {activeBottomTab === 'history' && (
               <div className="flex flex-col gap-4">
                 <div className="flex items-center justify-between">
                   <h4 className="text-sm font-bold text-text-primary">Audit History</h4>
                   <Button variant="outline" size="sm" icon={Download} className="font-bold shadow-sm">Export Log</Button>
                 </div>
                 <div className="overflow-x-auto mt-2 border border-border-default rounded-md shadow-sm bg-bg-surface">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-border-default bg-bg-page">
                          <th className="py-3 px-4 text-[11px] font-bold text-text-muted uppercase tracking-wider">Date & Time</th>
                          <th className="py-3 px-4 text-[11px] font-bold text-text-muted uppercase tracking-wider">User</th>
                          <th className="py-3 px-4 text-[11px] font-bold text-text-muted uppercase tracking-wider">Action</th>
                          <th className="py-3 px-4 text-[11px] font-bold text-text-muted uppercase tracking-wider">Changes</th>
                        </tr>
                      </thead>
                      <tbody className="text-[13px] text-text-primary font-medium">
                        <tr className="border-b border-border-subtle hover:bg-bg-surface-hover cursor-pointer transition-colors">
                          <td className="py-3 px-4 text-text-muted font-mono">Oct 24, 08:45 AM</td>
                          <td className="py-3 px-4 font-bold text-text-primary">John Doe</td>
                          <td className="py-3 px-4 text-text-secondary">Added internal note</td>
                          <td className="py-3 px-4 text-text-secondary font-mono text-[12px]"><span className="text-text-muted">N/A</span></td>
                        </tr>
                        <tr className="border-b border-border-subtle hover:bg-bg-surface-hover cursor-pointer transition-colors">
                          <td className="py-3 px-4 text-text-muted font-mono">Oct 24, 08:30 AM</td>
                          <td className="py-3 px-4 font-bold text-text-primary">Jane Smith</td>
                          <td className="py-3 px-4 text-text-secondary">Updated field</td>
                          <td className="py-3 px-4 text-text-secondary font-mono text-[12px]"><span className="text-text-muted line-through">Open</span> <span className="mx-1">→</span> <span className="font-bold text-text-primary">In Progress</span> (Status)</td>
                        </tr>
                        <tr className="border-b border-border-subtle hover:bg-bg-surface-hover cursor-pointer transition-colors">
                          <td className="py-3 px-4 text-text-muted font-mono">Oct 24, 08:30 AM</td>
                          <td className="py-3 px-4 font-bold text-text-primary">Jane Smith</td>
                          <td className="py-3 px-4 text-text-secondary">Sent public reply</td>
                          <td className="py-3 px-4 text-text-secondary font-mono text-[12px]"><span className="text-text-muted">N/A</span></td>
                        </tr>
                        <tr className="hover:bg-bg-surface-hover cursor-pointer transition-colors">
                          <td className="py-3 px-4 text-text-muted font-mono">Oct 24, 08:00 AM</td>
                          <td className="py-3 px-4 font-bold text-text-primary">System</td>
                          <td className="py-3 px-4 text-text-secondary">Created ticket via Portal</td>
                          <td className="py-3 px-4 text-text-secondary font-mono text-[12px]">Initialized</td>
                        </tr>
                      </tbody>
                    </table>
                 </div>
               </div>
             )}`;

const newActivity = `             {activeBottomTab === 'activity' && (
               <div className="flex flex-col gap-4">
                 <div className="flex items-center justify-between mb-2">
                   <h4 className="text-sm font-bold text-text-primary">Ticket Historical</h4>
                   <Button variant="outline" size="sm" icon={Download} className="font-bold shadow-sm">Export Log</Button>
                 </div>
                 
                 <div className="overflow-x-auto border border-border-default rounded-md shadow-sm bg-bg-surface">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-border-default bg-bg-page">
                          <th className="py-3 px-4 text-[11px] font-bold text-text-muted uppercase tracking-wider w-[25%]">Name</th>
                          <th className="py-3 px-4 text-[11px] font-bold text-text-muted uppercase tracking-wider w-[50%]">Action</th>
                          <th className="py-3 px-4 text-[11px] font-bold text-text-muted uppercase tracking-wider w-[25%]">Time & Date</th>
                        </tr>
                      </thead>
                      <tbody className="text-[13px] text-text-primary font-medium">
                        <tr className="border-b border-border-subtle hover:bg-bg-surface-hover transition-colors">
                          <td className="py-4 px-4 font-bold text-text-primary align-top">Sankar Das</td>
                          <td className="py-4 px-4 align-top">
                            <div className="font-bold text-text-primary mb-1">Status</div>
                            <div className="text-[12px] text-text-secondary flex flex-col gap-0.5 font-mono">
                               <div><span className="text-text-muted">From:</span> Open</div>
                               <div><span className="text-text-muted">To:</span> <span className="font-bold text-text-primary">Resolved</span></div>
                            </div>
                          </td>
                          <td className="py-4 px-4 align-top text-text-secondary font-mono text-[12px]">
                            <div><span className="text-text-muted">Date:</span> 09/07/2026</div>
                            <div><span className="text-text-muted">Time:</span> 18:53:12</div>
                          </td>
                        </tr>
                        <tr className="border-b border-border-subtle hover:bg-bg-surface-hover transition-colors">
                          <td className="py-4 px-4 font-bold text-text-primary align-top">Saif Ali Sharafat Hussain Shah</td>
                          <td className="py-4 px-4 align-top">
                            <div className="font-bold text-text-primary mb-1">Assignee</div>
                            <div className="text-[12px] text-text-secondary flex flex-col gap-0.5 font-mono">
                               <div><span className="text-text-muted">From:</span> Navneet Kumar</div>
                               <div><span className="text-text-muted">To:</span> Sankar Das</div>
                            </div>
                          </td>
                          <td className="py-4 px-4 align-top text-text-secondary font-mono text-[12px]">
                            <div><span className="text-text-muted">Date:</span> 09/07/2026</div>
                            <div><span className="text-text-muted">Time:</span> 18:47:48</div>
                          </td>
                        </tr>
                        <tr className="border-b border-border-subtle hover:bg-bg-surface-hover transition-colors">
                          <td className="py-4 px-4 font-bold text-text-primary align-top">John Doe</td>
                          <td className="py-4 px-4 align-top">
                            <div className="font-bold text-text-primary mb-1">Added Internal Note</div>
                            <div className="text-[12px] text-text-secondary font-mono">
                               <span className="text-text-muted">No field changes</span>
                            </div>
                          </td>
                          <td className="py-4 px-4 align-top text-text-secondary font-mono text-[12px]">
                            <div><span className="text-text-muted">Date:</span> 09/07/2026</div>
                            <div><span className="text-text-muted">Time:</span> 18:40:00</div>
                          </td>
                        </tr>
                        <tr className="hover:bg-bg-surface-hover transition-colors">
                          <td className="py-4 px-4 font-bold text-text-primary align-top">Veera Chandrakar</td>
                          <td className="py-4 px-4 align-top">
                            <div className="font-bold text-text-primary mb-1">Ticket Created</div>
                            <div className="text-[12px] text-text-secondary flex flex-col gap-0.5 font-mono">
                               <div><span className="text-text-muted">From:</span> </div>
                               <div><span className="text-text-muted">To:</span> </div>
                            </div>
                          </td>
                          <td className="py-4 px-4 align-top text-text-secondary font-mono text-[12px]">
                            <div><span className="text-text-muted">Date:</span> 09/07/2026</div>
                            <div><span className="text-text-muted">Time:</span> 18:32:38</div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                 </div>
               </div>
             )}`;

content = content.replace(oldActivity, newActivity);
fs.writeFileSync('src/pages/TicketDetails.tsx', content);
