const fs = require('fs');
let content = fs.readFileSync('src/pages/ClientConfiguration.tsx', 'utf-8');

content = content.replace(/<table className="w-full text-left border-collapse whitespace-nowrap">/g, 
  '<table className="w-full text-left border-collapse whitespace-nowrap hidden md:table">');

const mobileCards = `
              <div className="md:hidden flex flex-col gap-3 p-4 bg-bg-page">
                {clients.map((client, index) => (
                  <div key={index} className="bg-bg-surface border border-border-default rounded-lg p-4 shadow-sm flex flex-col gap-3">
                    <div className="flex justify-between items-start">
                      <div className="font-medium text-text-primary text-sm flex items-center gap-2">
                        <div className="w-8 h-8 rounded border border-border-default flex items-center justify-center shrink-0">
                          {client.logo}
                        </div>
                        {client.name}
                      </div>
                      <div className="flex items-center gap-2">
                         <Button variant="ghost" size="icon" className="h-8 w-8 text-text-muted hover:text-text-primary">
                           <Edit2 size={14} />
                         </Button>
                         <Button variant="ghost" size="icon" onClick={() => onNavigate('client_details')} className="h-8 w-8 text-brand-500 hover:bg-brand-50">
                           <ArrowRight size={14} />
                         </Button>
                      </div>
                    </div>
                    <div className="flex justify-between items-center text-xs text-text-secondary mt-2 pt-2 border-t border-border-subtle">
                      <span>{client.queues} Queues</span>
                      <span className="font-mono text-text-muted">{client.modified}</span>
                    </div>
                  </div>
                ))}
              </div>
`;

content = content.replace('</table>\n          </div>', '</table>\n' + mobileCards + '\n          </div>');

fs.writeFileSync('src/pages/ClientConfiguration.tsx', content);
