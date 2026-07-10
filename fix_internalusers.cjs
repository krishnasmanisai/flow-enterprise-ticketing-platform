const fs = require('fs');
let content = fs.readFileSync('src/pages/InternalUsers.tsx', 'utf-8');

content = content.replace(/<table className="w-full text-left border-collapse whitespace-nowrap">/g, 
  '<table className="w-full text-left border-collapse whitespace-nowrap hidden md:table">');

const mobileCards = `
              <div className="md:hidden flex flex-col gap-3 p-4 bg-bg-page">
                {paginatedUsers.map((user, index) => (
                  <div key={user.id} className="bg-bg-surface border border-border-default rounded-lg p-4 shadow-sm flex flex-col gap-3">
                    <div className="flex justify-between items-start">
                      <div className="flex flex-col gap-1">
                        <span className="text-sm font-semibold text-text-primary">{user.name}</span>
                        <span className="text-[11px] text-text-muted">{user.email}</span>
                      </div>
                      <Badge variant={getRoleBadgeVariant(user.role) as any} className="py-1 px-2 text-[10px] uppercase tracking-wider font-bold">
                        {user.role}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center text-xs text-text-secondary">
                      <span className="font-mono text-text-secondary">{user.id}</span>
                      <span>{user.bu} • {user.sbu}</span>
                    </div>
                    <div className="flex justify-between items-center mt-2 pt-2 border-t border-border-subtle">
                      <span className="text-xs text-text-secondary">Manager: {user.manager || '—'}</span>
                      <div className="flex items-center gap-3 text-text-muted">
                        <button onClick={() => handleEdit(user)} className="hover:text-text-primary transition-colors p-1" title="Edit User">
                          <Edit2 size={16} />
                        </button>
                        <button onClick={() => confirmDelete(user.id)} className="hover:text-error-text transition-colors p-1" title="Delete User">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
`;

content = content.replace('</table>\n            )}', '</table>\n' + mobileCards + '\n            )}');

fs.writeFileSync('src/pages/InternalUsers.tsx', content);
