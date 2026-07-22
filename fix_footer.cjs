const fs = require('fs');
let code = fs.readFileSync('src/components/FilterDrawer.tsx', 'utf8');

const oldFooter = `        {/* Footer */}
        <div className="p-6 border-t border-border-default bg-bg-surface flex flex-col gap-3">
          <div className="flex items-center gap-3 w-full">
            <Button variant="outline" className="flex-1" onClick={handleClear}>
              Clear All
            </Button>
            <Button variant="primary" className="flex-1" icon={Search} onClick={handleApply}>
              Apply Filter
            </Button>
          </div>
          <Button variant="secondary" className="w-full" icon={Save} onClick={handleSaveAndSearch}>
            Save and Search
          </Button>
        </div>
      </div>`;

const newFooter = `            </div>
          ) : (
            <div className="space-y-4">
              {savedFilters.length === 0 ? (
                <div className="text-center py-10 flex flex-col items-center">
                  <Bookmark size={32} className="text-text-muted mb-3 opacity-50" />
                  <p className="text-sm font-medium text-text-primary">No saved filters yet</p>
                  <p className="text-xs text-text-secondary mt-1">Save your frequently used filters for quick access.</p>
                </div>
              ) : (
                savedFilters.map(sf => (
                  <div key={sf.id} className="p-4 rounded-md border border-border-default bg-bg-surface hover:border-brand-500 transition-colors group cursor-pointer" onClick={() => applySavedFilter(sf)}>
                    <div className="flex items-center justify-between">
                      <div className="font-medium text-sm text-text-primary flex items-center gap-2">
                        <Bookmark size={14} className="text-brand-500" />
                        {sf.name}
                      </div>
                      <button 
                        onClick={(e) => { e.stopPropagation(); deleteSavedFilter(sf.id); }}
                        className="text-text-muted hover:text-error-text transition-colors p-1"
                        title="Delete saved filter"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
        
        {/* Footer */}
        {activeTab === 'filters' && (
          <div className="p-6 border-t border-border-default bg-bg-surface flex flex-col gap-3">
            {isSaving ? (
              <div className="flex flex-col gap-2">
                <input 
                  type="text" 
                  placeholder="Filter Name (e.g., My Open Incidents)" 
                  value={filterName}
                  onChange={(e) => setFilterName(e.target.value)}
                  className="input-base text-sm w-full"
                  autoFocus
                />
                <div className="flex items-center gap-2">
                  <Button variant="secondary" className="flex-1" onClick={() => setIsSaving(false)}>Cancel</Button>
                  <Button variant="primary" className="flex-1" onClick={saveCurrentFilter} disabled={!filterName.trim()}>Save</Button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-3 w-full">
                  <Button variant="outline" className="flex-1" onClick={handleClear}>
                    Clear All
                  </Button>
                  <Button variant="primary" className="flex-1" icon={Search} onClick={handleApply}>
                    Apply Filter
                  </Button>
                </div>
                <Button variant="secondary" className="w-full" icon={Bookmark} onClick={() => setIsSaving(true)}>
                  Save Current Filter
                </Button>
              </>
            )}
          </div>
        )}
        {activeTab === 'saved' && (
          <div className="p-6 border-t border-border-default bg-bg-surface">
            <Button variant="outline" className="w-full" onClick={onClose}>
              Close
            </Button>
          </div>
        )}
      </div>`;

if (code.includes(oldFooter)) {
  code = code.replace(oldFooter, newFooter);
  fs.writeFileSync('src/components/FilterDrawer.tsx', code);
  console.log("Fixed footer");
} else {
  console.log("Old footer not found!");
}
