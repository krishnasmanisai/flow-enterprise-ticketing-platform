import React, { useState } from 'react';
import { 
  Phone, Lock, Tag, Star, Gift, FileText, User, 
  ArrowLeft, CheckCircle, Search, RefreshCw, Copy, ChevronRight, X,
  ChevronUp, ChevronDown, ArrowUpDown
} from 'lucide-react';
import { Button } from '../ui/Button';

export interface CallAssistQuickActionsProps {
  customerMobile?: string;
  onLogActivity: (activity: any) => void;
}

type MainAction = 'NONE' | 'OTP' | 'UNBLOCK_POINTS' | 'UNBLOCK_COUPON' | 'UNBLOCK_GV' | 'COUPON' | 'POINTS' | 'GV' | 'MORE';

const SortableHeader = ({ label, sortKey, currentSort, onSort }: { label: string, sortKey: string, currentSort: {key: string, direction: 'asc'|'desc'}, onSort: (key: string) => void }) => {
  return (
    <th 
      className="py-2 px-3 font-bold text-text-muted text-xs uppercase cursor-pointer hover:bg-bg-surface-hover select-none whitespace-nowrap transition-colors"
      onClick={() => onSort(sortKey)}
    >
      <div className="flex items-center gap-1.5">
        {label}
        {currentSort?.key === sortKey ? (
          currentSort.direction === 'asc' ? <ChevronUp size={14} className="text-brand-600" /> : <ChevronDown size={14} className="text-brand-600" />
        ) : (
          <ArrowUpDown size={14} className="text-text-disabled opacity-40 hover:opacity-100" />
        )}
      </div>
    </th>
  )
}

// --- Data Definitions ---
const COUPONS_DATA = [
  { id: 1, code: 'CYR7YCCMWA', value: 25, valueStr: '25.00%', narration: 'CYR25P', issueDate: '2026-04-01T00:00:00', issueDateStr: '04/01/2026\n00:00:00', expiryDate: '2026-12-31T23:59:59', expiryDateStr: '12/31/2026\n23:59:59', status: 'Issued' },
  { id: 2, code: 'WINTER10', value: 10, valueStr: '10.00%', narration: 'WINTER10', issueDate: '2026-01-01T00:00:00', issueDateStr: '01/01/2026\n00:00:00', expiryDate: '2026-01-31T23:59:59', expiryDateStr: '01/31/2026\n23:59:59', status: 'Used' }
];

const GV_DATA = [
  { id: 1, code: 'GV-XXXX21', value: 1000, valueStr: '₹1,000', availableBalance: 1000, availableBalanceStr: '₹1,000', issueDate: '2026-01-01T00:00:00', issueDateStr: '01 Jan 2026', expiryDate: '2027-01-01T00:00:00', expiryDateStr: '01 Jan 2027', status: 'Active' },
  { id: 2, code: 'GV-XXXX42', value: 500, valueStr: '₹500', availableBalance: 0, availableBalanceStr: '₹0', issueDate: '2025-06-01T00:00:00', issueDateStr: '01 Jun 2025', expiryDate: '2026-06-01T00:00:00', expiryDateStr: '01 Jun 2026', status: 'Used' },
  { id: 3, code: 'GV-XXXX73', value: 2000, valueStr: '₹2,000', availableBalance: 500, availableBalanceStr: '₹500', issueDate: '2024-01-01T00:00:00', issueDateStr: '01 Jan 2024', expiryDate: '2025-01-01T00:00:00', expiryDateStr: '01 Jan 2025', status: 'Expired' }
];

const POINTS_DATA = [
  { id: 1, batchId: 'BCH-9921', points: 5000, pointsStr: '5,000', earnedDate: '2026-08-01', earnedDateStr: '01 Aug 2026', expiryDate: '2026-12-31', expiryDateStr: '31 Dec 2026' },
  { id: 2, batchId: 'BCH-8834', points: 4450, pointsStr: '4,450', earnedDate: '2026-07-15', earnedDateStr: '15 Jul 2026', expiryDate: '2026-11-15', expiryDateStr: '15 Nov 2026' },
  { id: 3, batchId: 'BCH-7712', points: 3000, pointsStr: '3,000', earnedDate: '2026-06-10', earnedDateStr: '10 Jun 2026', expiryDate: '2026-08-31', expiryDateStr: '31 Aug 2026' }
];

const TRANSACTIONS_DATA = [
  { id: 1, date: '2026-08-16', dateStr: '16 Aug', type: 'Purchase', typeLabel: 'Purchase', amount: -2500, amountStr: '₹2,500' },
  { id: 2, date: '2026-08-15', dateStr: '15 Aug', type: 'Redemption', typeLabel: 'Redemption', amount: -1000, amountStr: '₹1,000' },
  { id: 3, date: '2026-08-14', dateStr: '14 Aug', type: 'Earn', typeLabel: 'Earn', amount: 500, amountStr: '+500 Points' }
];

const sortData = (data: any[], config: {key: string, direction: 'asc'|'desc'}) => {
  if (!config || !config.direction) return data;
  return [...data].sort((a, b) => {
    let valA = a[config.key];
    let valB = b[config.key];
    if (valA < valB) return config.direction === 'asc' ? -1 : 1;
    if (valA > valB) return config.direction === 'asc' ? 1 : -1;
    return 0;
  });
};

export function CallAssistQuickActions({ customerMobile = '+91 98765 43210', onLogActivity }: CallAssistQuickActionsProps) {
  const [activeAction, setActiveAction] = useState<MainAction>('NONE');
  
  // Sort States
  const [couponSort, setCouponSort] = useState<{key: string, direction: 'asc'|'desc'}>({key: 'issueDate', direction: 'desc'});
  const [pointsSort, setPointsSort] = useState<{key: string, direction: 'asc'|'desc'}>({key: 'earnedDate', direction: 'desc'});
  const [gvSort, setGvSort] = useState<{key: string, direction: 'asc'|'desc'}>({key: 'issueDate', direction: 'desc'});
  const [txSort, setTxSort] = useState<{key: string, direction: 'asc'|'desc'}>({key: 'date', direction: 'desc'});

  const handleSort = (key: string, currentSort: {key: string, direction: 'asc'|'desc'}, setSort: any) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (currentSort.key === key) {
      direction = currentSort.direction === 'asc' ? 'desc' : 'asc';
    }
    setSort({ key, direction });
  };
  
  // OTP States
  const [otpLoading, setOtpLoading] = useState(false);
  const [otpResult, setOtpResult] = useState<{ code: string, validUntil: string } | null>(null);
  
  // Unblock States
  const [unblockLoading, setUnblockLoading] = useState(false);
  const [unblockResult, setUnblockResult] = useState<string | null>(null);
  const [unblockItems, setUnblockItems] = useState<any[]>([]);
  const [selectedUnblockItem, setSelectedUnblockItem] = useState<any>(null);

  // Other States
  const [dataLoading, setDataLoading] = useState(false);
  const [moreAction, setMoreAction] = useState<'NONE' | 'TRANSACTIONS' | 'MEMBER'>('NONE');

  const resetState = () => {
    setActiveAction('NONE');
    setOtpResult(null);
    setUnblockResult(null);
    setUnblockItems([]);
    setSelectedUnblockItem(null);
    setMoreAction('NONE');
  };

  const handleLog = (type: string, details: string) => {
    onLogActivity({ type, details });
  };

  // --- OTP Flow ---
  const handleFetchOtp = (purpose: string) => {
    setOtpLoading(true);
    setOtpResult(null);
    setTimeout(() => {
      setOtpLoading(false);
      setOtpResult({ code: '482913', validUntil: '10:37 PM' });
      handleLog('OTP retrieved', `Purpose: ${purpose}\nChannel: API`);
    }, 600);
  };

  const renderOtpContent = () => {
    if (otpLoading) {
      return <div className="text-sm text-text-secondary flex items-center gap-2 py-2"><div className="w-4 h-4 border-2 border-brand-200 border-t-brand-600 rounded-full animate-spin"></div> Retrieving OTP...</div>;
    }
    if (otpResult) {
      return (
        <div className="flex items-center gap-4 py-1">
          <div className="flex items-center gap-2">
            <CheckCircle size={16} className="text-success-text" />
            <span className="font-bold text-text-primary text-lg tracking-widest">{otpResult.code}</span>
          </div>
          <span className="text-xs text-error-text font-medium">Valid until {otpResult.validUntil}</span>
          <Button variant="outline" size="sm" icon={Copy} className="h-7 text-xs" onClick={() => {}}>Copy</Button>
          <Button variant="ghost" size="sm" className="h-7 text-xs ml-auto text-text-muted hover:text-text-primary" onClick={resetState}>Close</Button>
        </div>
      );
    }
    return (
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" className="h-8 text-xs font-semibold" onClick={() => handleFetchOtp('Points Redemption')}>Points OTP</Button>
        <Button variant="outline" size="sm" className="h-8 text-xs font-semibold" onClick={() => handleFetchOtp('Coupon Redemption')}>Coupon OTP</Button>
        <Button variant="outline" size="sm" className="h-8 text-xs font-semibold" onClick={() => handleFetchOtp('GV Redemption')}>GV OTP</Button>
        <Button variant="ghost" size="sm" className="h-8 text-xs ml-auto text-text-muted" onClick={resetState}><X size={14}/></Button>
      </div>
    );
  };

  // --- Unblock Flow ---
  const handleSelectUnblockAction = (action: 'UNBLOCK_POINTS' | 'UNBLOCK_COUPON' | 'UNBLOCK_GV' | 'NONE') => {
    setActiveAction(action);
    setUnblockLoading(true);
    setUnblockResult(null);
    setSelectedUnblockItem(null);
    
    setTimeout(() => {
      setUnblockLoading(false);
      if (action === 'UNBLOCK_POINTS') {
        setUnblockItems([
          { id: 1, storeCode: 'STR001', billNumber: 'test1234', blockedPoints: 100, date: '16 Aug', otpValidated: true },
          { id: 2, storeCode: 'STR002', billNumber: 'inv98765', blockedPoints: 50, date: '15 Aug', otpValidated: false }
        ]);
      } else if (action === 'UNBLOCK_COUPON') {
        setUnblockItems([
          { id: 1, storeCode: 'STR001', code: 'CYR7YCCMWA', date: '16 Aug 2026', otpValidated: false },
          { id: 2, storeCode: 'STR005', code: 'WINTER10', date: '15 Aug 2026', otpValidated: true }
        ]);
      } else if (action === 'UNBLOCK_GV') {
        setUnblockItems([
          { id: 1, storeCode: 'STR001', code: 'GV-XXXX21', date: '16 Aug 2026', otpValidated: false }
        ]);
      }
    }, 600);
  };

  const handleConfirmUnblock = () => {
    if (!selectedUnblockItem) return;
    setUnblockLoading(true);
    setTimeout(() => {
      setUnblockLoading(false);
      if (activeAction === 'UNBLOCK_POINTS') {
        setUnblockResult(`✓ ${selectedUnblockItem.blockedPoints} points successfully unblocked`);
        handleLog(`${selectedUnblockItem.blockedPoints} points unblocked`, `Bill: ${selectedUnblockItem.billNumber}`);
      } else if (activeAction === 'UNBLOCK_COUPON') {
        setUnblockResult(`✓ Coupon ${selectedUnblockItem.code} successfully unblocked`);
        handleLog(`Coupon unblocked`, `Coupon: ${selectedUnblockItem.code}`);
      } else if (activeAction === 'UNBLOCK_GV') {
        setUnblockResult(`✓ Gift Voucher ${selectedUnblockItem.code} successfully unblocked`);
        handleLog(`Gift Voucher unblocked`, `GV: ${selectedUnblockItem.code}`);
      }
    }, 600);
  };

  const renderUnblockContent = () => {
    if (unblockResult) {
      return (
        <div className="flex items-center gap-3 py-1">
          <CheckCircle size={16} className="text-success-text" />
          <span className="text-sm font-semibold text-text-primary">{unblockResult}</span>
          <Button variant="ghost" size="sm" className="h-7 text-xs ml-auto text-text-muted hover:text-text-primary" onClick={resetState}>Close</Button>
        </div>
      );
    }

    if (unblockLoading) {
      return <div className="text-sm text-text-secondary flex items-center gap-2 py-2"><div className="w-4 h-4 border-2 border-brand-200 border-t-brand-600 rounded-full animate-spin"></div> Loading blocked items...</div>;
    }

    return (
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-text-muted uppercase tracking-wider">
            {activeAction === 'UNBLOCK_POINTS' ? 'Blocked Points' : activeAction === 'UNBLOCK_COUPON' ? 'Blocked Coupons' : 'Blocked Gift Vouchers'}
          </span>
          <Button variant="ghost" size="sm" className="h-7 text-xs text-text-muted" onClick={resetState}><X size={14}/></Button>
        </div>
        
        {unblockItems.length === 0 ? (
          <div className="text-sm text-text-secondary py-2">No blocked items found.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {unblockItems.map((item, idx) => (
              <div 
                key={idx} 
                onClick={() => setSelectedUnblockItem(item)}
                className={`p-3 border rounded-md cursor-pointer transition-colors ${selectedUnblockItem === item ? 'border-brand-500 bg-brand-50' : 'border-border-default hover:border-brand-300 bg-bg-surface'}`}
              >
                {activeAction === 'UNBLOCK_POINTS' && (
                  <>
                    <div className="flex justify-between items-start">
                      <div className="font-bold text-sm text-text-primary">Bill: {item.billNumber}</div>
                      <div className="font-mono font-bold text-error-text text-sm">{item.blockedPoints} pts</div>
                    </div>
                    <div className="text-xs text-text-secondary mt-1">Store: {item.storeCode}</div>
                    <div className="text-xs text-text-secondary">Date: {item.date}</div>
                    <div className="text-[11px] font-medium mt-1.5 flex items-center gap-1"><span className="text-text-muted">OTP Validated:</span><span className={item.otpValidated ? 'text-success-text' : 'text-error-text'}>{item.otpValidated ? 'True' : 'False'}</span></div>
                  </>
                )}
                {activeAction === 'UNBLOCK_COUPON' && (
                  <>
                    <div className="flex justify-between items-start">
                      <div className="font-bold text-sm text-text-primary">{item.code}</div>
                      <div className="text-xs px-2 rounded-full bg-error-bg text-error-text font-bold">Blocked</div>
                    </div>
                    <div className="text-xs text-text-secondary mt-1">Store: {item.storeCode}</div>
                    <div className="text-xs text-text-secondary">Date: {item.date}</div>
                    <div className="text-[11px] font-medium mt-1.5 flex items-center gap-1"><span className="text-text-muted">OTP Validated:</span><span className={item.otpValidated ? 'text-success-text' : 'text-error-text'}>{item.otpValidated ? 'True' : 'False'}</span></div>
                  </>
                )}
                {activeAction === 'UNBLOCK_GV' && (
                  <>
                    <div className="flex justify-between items-start">
                      <div className="font-bold text-sm text-text-primary">{item.code}</div>
                      <div className="text-xs px-2 rounded-full bg-error-bg text-error-text font-bold">Blocked</div>
                    </div>
                    <div className="text-xs text-text-secondary mt-1">Store: {item.storeCode}</div>
                    <div className="text-xs text-text-secondary">Date: {item.date}</div>
                    <div className="text-[11px] font-medium mt-1.5 flex items-center gap-1"><span className="text-text-muted">OTP Validated:</span><span className={item.otpValidated ? 'text-success-text' : 'text-error-text'}>{item.otpValidated ? 'True' : 'False'}</span></div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
        
        {selectedUnblockItem && (
          <div className="flex items-center gap-3 mt-2">
            <Button variant="primary" size="sm" className="h-8" onClick={handleConfirmUnblock}>Confirm Unblock</Button>
            <Button variant="ghost" size="sm" className="h-8" onClick={() => setSelectedUnblockItem(null)}>Cancel</Button>
          </div>
        )}
      </div>
    );
  };

  // --- Data Loading Effect ---
  const loadData = (action: MainAction) => {
    setActiveAction(action);
    setDataLoading(true);
    setTimeout(() => {
      setDataLoading(false);
      handleLog(`${action} status checked`, 'Viewed customer info');
    }, 600);
  };

  const renderCouponContent = () => {
    if (dataLoading) return <div className="text-sm text-text-secondary flex items-center gap-2 py-2"><div className="w-4 h-4 border-2 border-brand-200 border-t-brand-600 rounded-full animate-spin"></div> Loading Coupons...</div>;
    const sortedCoupons = sortData(COUPONS_DATA, couponSort);
    return (
      <div className="flex flex-col gap-3">
         <div className="flex items-center justify-between">
           <h4 className="text-sm font-bold text-text-primary">Coupons</h4>
           <Button variant="ghost" size="sm" className="h-7 text-xs text-text-muted" onClick={resetState}><X size={14}/></Button>
         </div>
         <div className="border border-border-default rounded-md overflow-x-auto custom-scrollbar">
           <table className="w-full min-w-[700px] text-left border-collapse text-sm">
             <thead>
               <tr className="bg-bg-page border-b border-border-default">
                 <SortableHeader label="Code" sortKey="code" currentSort={couponSort} onSort={(k) => handleSort(k, couponSort, setCouponSort)} />
                 <SortableHeader label="Value" sortKey="value" currentSort={couponSort} onSort={(k) => handleSort(k, couponSort, setCouponSort)} />
                 <SortableHeader label="Narration" sortKey="narration" currentSort={couponSort} onSort={(k) => handleSort(k, couponSort, setCouponSort)} />
                 <SortableHeader label="Issue Date" sortKey="issueDate" currentSort={couponSort} onSort={(k) => handleSort(k, couponSort, setCouponSort)} />
                 <SortableHeader label="Expiry Date" sortKey="expiryDate" currentSort={couponSort} onSort={(k) => handleSort(k, couponSort, setCouponSort)} />
                 <SortableHeader label="Status" sortKey="status" currentSort={couponSort} onSort={(k) => handleSort(k, couponSort, setCouponSort)} />
               </tr>
             </thead>
             <tbody className="bg-bg-surface">
               {sortedCoupons.map((c, i) => (
                 <tr key={c.id} className={`${i !== sortedCoupons.length - 1 ? 'border-b border-border-subtle' : ''} hover:bg-bg-surface-hover`}>
                   <td className="py-2 px-3 font-mono font-bold text-text-primary">{c.code}</td>
                   <td className="py-2 px-3 font-semibold text-text-primary">{c.valueStr}</td>
                   <td className="py-2 px-3 text-text-secondary">{c.narration}</td>
                   <td className="py-2 px-3 text-text-secondary text-[11px] whitespace-pre-line leading-tight">{c.issueDateStr}</td>
                   <td className="py-2 px-3 text-text-secondary text-[11px] whitespace-pre-line leading-tight">{c.expiryDateStr}</td>
                   <td className="py-2 px-3">
                     <span className={`text-xs px-2 py-0.5 rounded-full font-bold whitespace-nowrap ${c.status === 'Issued' ? 'bg-success-bg text-success-text' : 'bg-bg-page border border-border-default text-text-muted'}`}>
                       {c.status}
                     </span>
                   </td>
                 </tr>
               ))}
             </tbody>
           </table>
         </div>
      </div>
    );
  };

  const renderPointsContent = () => {
    if (dataLoading) return <div className="text-sm text-text-secondary flex items-center gap-2 py-2"><div className="w-4 h-4 border-2 border-brand-200 border-t-brand-600 rounded-full animate-spin"></div> Loading Points...</div>;
    const sortedPoints = sortData(POINTS_DATA, pointsSort);
    return (
      <div className="flex flex-col gap-4">
         <div className="flex items-center justify-between">
           <h4 className="text-sm font-bold text-text-primary">Points Summary</h4>
           <Button variant="ghost" size="sm" className="h-7 text-xs text-text-muted" onClick={resetState}><X size={14}/></Button>
         </div>
         <div className="flex items-center gap-6 p-4 border border-border-default rounded-md bg-bg-surface overflow-x-auto">
            <div>
              <div className="text-2xl font-mono font-bold text-brand-600 leading-none">12,450</div>
              <div className="text-[10px] font-bold text-text-muted uppercase tracking-wider mt-1 whitespace-nowrap">Available Points</div>
            </div>
            <div className="h-10 w-px bg-border-default shrink-0"></div>
            <div className="flex gap-6 shrink-0">
              <div>
                <div className="text-sm font-mono font-bold text-text-primary">18,200</div>
                <div className="text-[10px] text-text-secondary uppercase mt-0.5 whitespace-nowrap">Earned</div>
              </div>
              <div>
                <div className="text-sm font-mono font-bold text-text-primary">5,000</div>
                <div className="text-[10px] text-text-secondary uppercase mt-0.5 whitespace-nowrap">Redeemed</div>
              </div>
              <div>
                <div className="text-sm font-mono font-bold text-error-text">750</div>
                <div className="text-[10px] text-error-text uppercase mt-0.5 whitespace-nowrap">Blocked</div>
              </div>
            </div>
         </div>
         
         <div className="flex flex-col gap-2">
            <h5 className="text-xs font-bold text-text-muted uppercase tracking-wider">Available Points Listing</h5>
            <div className="border border-border-default rounded-md overflow-x-auto custom-scrollbar">
               <table className="w-full text-left border-collapse text-sm min-w-[500px]">
                 <thead>
                   <tr className="bg-bg-page border-b border-border-default">
                     <SortableHeader label="Batch ID" sortKey="batchId" currentSort={pointsSort} onSort={(k) => handleSort(k, pointsSort, setPointsSort)} />
                     <SortableHeader label="Points" sortKey="points" currentSort={pointsSort} onSort={(k) => handleSort(k, pointsSort, setPointsSort)} />
                     <SortableHeader label="Earned Date" sortKey="earnedDate" currentSort={pointsSort} onSort={(k) => handleSort(k, pointsSort, setPointsSort)} />
                     <SortableHeader label="Expiry Date" sortKey="expiryDate" currentSort={pointsSort} onSort={(k) => handleSort(k, pointsSort, setPointsSort)} />
                   </tr>
                 </thead>
                 <tbody className="bg-bg-surface">
                   {sortedPoints.map((p, i) => (
                     <tr key={p.id} className={`${i !== sortedPoints.length - 1 ? 'border-b border-border-subtle' : ''} hover:bg-bg-surface-hover`}>
                       <td className="py-2 px-3 font-mono text-text-secondary">{p.batchId}</td>
                       <td className="py-2 px-3 font-semibold text-text-primary">{p.pointsStr}</td>
                       <td className="py-2 px-3 text-text-secondary">{p.earnedDateStr}</td>
                       <td className={`py-2 px-3 font-medium ${p.expiryDate < '2026-09-01' ? 'text-error-text' : 'text-text-primary'}`}>{p.expiryDateStr}</td>
                     </tr>
                   ))}
                 </tbody>
               </table>
            </div>
         </div>
      </div>
    );
  };

  const renderGVContent = () => {
    if (dataLoading) return <div className="text-sm text-text-secondary flex items-center gap-2 py-2"><div className="w-4 h-4 border-2 border-brand-200 border-t-brand-600 rounded-full animate-spin"></div> Loading Gift Vouchers...</div>;
    const sortedGv = sortData(GV_DATA, gvSort);
    return (
      <div className="flex flex-col gap-3">
         <div className="flex items-center justify-between">
           <h4 className="text-sm font-bold text-text-primary">Gift Vouchers</h4>
           <Button variant="ghost" size="sm" className="h-7 text-xs text-text-muted" onClick={resetState}><X size={14}/></Button>
         </div>
         <div className="border border-border-default rounded-md overflow-x-auto custom-scrollbar">
           <table className="w-full text-left border-collapse text-sm min-w-[700px]">
             <thead>
               <tr className="bg-bg-page border-b border-border-default">
                 <SortableHeader label="GV Code" sortKey="code" currentSort={gvSort} onSort={(k) => handleSort(k, gvSort, setGvSort)} />
                 <SortableHeader label="Value" sortKey="value" currentSort={gvSort} onSort={(k) => handleSort(k, gvSort, setGvSort)} />
                 <SortableHeader label="Available Balance" sortKey="availableBalance" currentSort={gvSort} onSort={(k) => handleSort(k, gvSort, setGvSort)} />
                 <SortableHeader label="Issue Date" sortKey="issueDate" currentSort={gvSort} onSort={(k) => handleSort(k, gvSort, setGvSort)} />
                 <SortableHeader label="Expiry Date" sortKey="expiryDate" currentSort={gvSort} onSort={(k) => handleSort(k, gvSort, setGvSort)} />
                 <SortableHeader label="Status" sortKey="status" currentSort={gvSort} onSort={(k) => handleSort(k, gvSort, setGvSort)} />
               </tr>
             </thead>
             <tbody className="bg-bg-surface">
               {sortedGv.map((gv, i) => (
                 <tr key={gv.id} className={`${i !== sortedGv.length - 1 ? 'border-b border-border-subtle' : ''} hover:bg-bg-surface-hover`}>
                   <td className="py-2 px-3 font-mono font-semibold text-text-primary">{gv.code}</td>
                   <td className="py-2 px-3 font-bold text-text-primary">{gv.valueStr}</td>
                   <td className="py-2 px-3 font-bold text-text-primary">{gv.availableBalanceStr}</td>
                   <td className="py-2 px-3 text-text-secondary">{gv.issueDateStr}</td>
                   <td className="py-2 px-3 text-text-secondary">{gv.expiryDateStr}</td>
                   <td className="py-2 px-3">
                     <span className={`text-xs px-2 py-0.5 rounded-full font-bold whitespace-nowrap ${
                       gv.status === 'Active' ? 'bg-success-bg text-success-text' : 
                       gv.status === 'Expired' ? 'bg-error-bg text-error-text' : 
                       'bg-bg-page border border-border-default text-text-muted'
                     }`}>
                       {gv.status}
                     </span>
                   </td>
                 </tr>
               ))}
             </tbody>
           </table>
         </div>
      </div>
    );
  };

  const loadMoreAction = (action: 'TRANSACTIONS' | 'MEMBER') => {
    setActiveAction('MORE');
    setMoreAction(action);
    setDataLoading(true);
    setTimeout(() => {
      setDataLoading(false);
      handleLog(`${action.toLowerCase()} checked`, 'Viewed customer info');
    }, 600);
  };

  const renderMoreContent = () => {
    if (moreAction === 'NONE') {
      return (
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-8 text-xs font-semibold" onClick={() => loadMoreAction('TRANSACTIONS')}>Transaction History</Button>
          <Button variant="outline" size="sm" className="h-8 text-xs font-semibold" onClick={() => loadMoreAction('MEMBER')}>Member Profile</Button>
          <Button variant="ghost" size="sm" className="h-8 text-xs ml-auto text-text-muted" onClick={resetState}><X size={14}/></Button>
        </div>
      );
    }
    
    if (dataLoading) {
      return <div className="text-sm text-text-secondary flex items-center gap-2 py-2"><div className="w-4 h-4 border-2 border-brand-200 border-t-brand-600 rounded-full animate-spin"></div> Loading...</div>;
    }
    
    if (moreAction === 'TRANSACTIONS') {
      const sortedTx = sortData(TRANSACTIONS_DATA, txSort);
      return (
        <div className="flex flex-col gap-3">
           <div className="flex items-center justify-between">
             <div className="flex items-center gap-2">
               <button className="text-text-muted hover:text-text-primary transition-colors" onClick={() => setMoreAction('NONE')}><ArrowLeft size={16} /></button>
               <h4 className="text-sm font-bold text-text-primary">Transaction History</h4>
             </div>
             <div className="flex gap-2">
               <select className="text-xs border border-border-default rounded px-2 py-1 bg-bg-surface text-text-primary outline-none"><option>All Dates</option></select>
               <select className="text-xs border border-border-default rounded px-2 py-1 bg-bg-surface text-text-primary outline-none"><option>All Types</option></select>
             </div>
           </div>
           <div className="border border-border-default rounded-md overflow-x-auto custom-scrollbar">
             <table className="w-full text-left border-collapse text-sm min-w-[500px]">
               <thead>
                 <tr className="bg-bg-page border-b border-border-default">
                   <SortableHeader label="Date" sortKey="date" currentSort={txSort} onSort={(k) => handleSort(k, txSort, setTxSort)} />
                   <SortableHeader label="Type" sortKey="type" currentSort={txSort} onSort={(k) => handleSort(k, txSort, setTxSort)} />
                   <SortableHeader label="Amount" sortKey="amount" currentSort={txSort} onSort={(k) => handleSort(k, txSort, setTxSort)} />
                 </tr>
               </thead>
               <tbody className="bg-bg-surface">
                 {sortedTx.map((tx, i) => (
                   <tr key={tx.id} className={`${i !== sortedTx.length - 1 ? 'border-b border-border-subtle' : ''} hover:bg-bg-surface-hover`}>
                     <td className="py-2 px-3">
                       <div className="font-bold text-text-primary text-xs">{tx.dateStr}</div>
                       <div className="text-[11px] text-text-secondary">Bill Date: {tx.dateStr}</div>
                     </td>
                     <td className={`py-2 px-3 font-semibold ${
                       tx.type === 'Earn' ? 'text-success-text' :
                       tx.type === 'Redemption' ? 'text-brand-600' :
                       'text-text-primary'
                     }`}>
                       {tx.typeLabel}
                     </td>
                     <td className={`py-2 px-3 font-mono font-bold text-right ${
                       tx.type === 'Earn' ? 'text-success-text' : 'text-text-primary'
                     }`}>
                       {tx.amountStr}
                     </td>
                   </tr>
                 ))}
               </tbody>
             </table>
           </div>
        </div>
      );
    }
    
    if (moreAction === 'MEMBER') {
       return (
        <div className="flex flex-col gap-3">
           <div className="flex items-center gap-2">
             <button className="text-text-muted hover:text-text-primary transition-colors" onClick={() => setMoreAction('NONE')}><ArrowLeft size={16} /></button>
             <h4 className="text-sm font-bold text-text-primary">Member Profile</h4>
           </div>
           <div className="p-4 border border-border-default rounded-md bg-bg-surface grid grid-cols-2 gap-4">
              <div>
                <div className="text-[10px] font-bold text-text-muted uppercase">Member ID</div>
                <div className="text-sm font-mono font-semibold text-text-primary">MEM-90218</div>
              </div>
              <div>
                <div className="text-[10px] font-bold text-text-muted uppercase">Mobile</div>
                <div className="text-sm font-mono font-semibold text-text-primary">{customerMobile}</div>
              </div>
              <div>
                <div className="text-[10px] font-bold text-text-muted uppercase">Enrollment Status</div>
                <div className="text-sm font-semibold text-success-text">Active (Since Jan 2024)</div>
              </div>
              <div>
                <div className="text-[10px] font-bold text-text-muted uppercase">Loyalty Tier</div>
                <div className="text-sm font-semibold text-brand-600">Platinum</div>
              </div>
           </div>
        </div>
      );
    }
  };

  return (
    <div className="bg-brand-50/40 border border-brand-500/30 rounded-lg p-3 shadow-sm">
      <div className="flex flex-col gap-3">
        {/* Quick Actions Row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-bold text-brand-700">
            <Phone size={16} />
            <span className="uppercase tracking-wide text-xs">Call Assist</span>
          </div>
          
          <div className="flex items-center gap-1.5 overflow-x-auto custom-scrollbar pb-1 sm:pb-0">
            <Button 
              variant={activeAction === 'OTP' ? 'primary' : 'outline'} 
              size="sm" 
              className={`h-8 text-xs font-semibold whitespace-nowrap ${activeAction === 'OTP' ? 'bg-brand-600 text-white border-brand-600' : 'bg-bg-surface'}`}
              onClick={() => setActiveAction(activeAction === 'OTP' ? 'NONE' : 'OTP')}
            >
              OTP
            </Button>
            <Button 
              variant={activeAction === 'UNBLOCK_POINTS' ? 'primary' : 'outline'} 
              size="sm" 
              className={`h-8 text-xs font-semibold whitespace-nowrap ${activeAction === 'UNBLOCK_POINTS' ? 'bg-brand-600 text-white border-brand-600' : 'bg-bg-surface'}`}
              onClick={() => handleSelectUnblockAction(activeAction === 'UNBLOCK_POINTS' ? 'NONE' : 'UNBLOCK_POINTS')}
            >
              Unblock Points
            </Button>
            <Button 
              variant={activeAction === 'UNBLOCK_COUPON' ? 'primary' : 'outline'} 
              size="sm" 
              className={`h-8 text-xs font-semibold whitespace-nowrap ${activeAction === 'UNBLOCK_COUPON' ? 'bg-brand-600 text-white border-brand-600' : 'bg-bg-surface'}`}
              onClick={() => handleSelectUnblockAction(activeAction === 'UNBLOCK_COUPON' ? 'NONE' : 'UNBLOCK_COUPON')}
            >
              Unblock Coupon
            </Button>
            <Button 
              variant={activeAction === 'UNBLOCK_GV' ? 'primary' : 'outline'} 
              size="sm" 
              className={`h-8 text-xs font-semibold whitespace-nowrap ${activeAction === 'UNBLOCK_GV' ? 'bg-brand-600 text-white border-brand-600' : 'bg-bg-surface'}`}
              onClick={() => handleSelectUnblockAction(activeAction === 'UNBLOCK_GV' ? 'NONE' : 'UNBLOCK_GV')}
            >
              Unblock GV
            </Button>
            <Button 
              variant={activeAction === 'COUPON' ? 'primary' : 'outline'} 
              size="sm" 
              className={`h-8 text-xs font-semibold whitespace-nowrap ${activeAction === 'COUPON' ? 'bg-brand-600 text-white border-brand-600' : 'bg-bg-surface'}`}
              onClick={() => activeAction === 'COUPON' ? setActiveAction('NONE') : loadData('COUPON')}
            >
              Coupon
            </Button>
            <Button 
              variant={activeAction === 'POINTS' ? 'primary' : 'outline'} 
              size="sm" 
              className={`h-8 text-xs font-semibold whitespace-nowrap ${activeAction === 'POINTS' ? 'bg-brand-600 text-white border-brand-600' : 'bg-bg-surface'}`}
              onClick={() => activeAction === 'POINTS' ? setActiveAction('NONE') : loadData('POINTS')}
            >
              Points
            </Button>
            <Button 
              variant={activeAction === 'GV' ? 'primary' : 'outline'} 
              size="sm" 
              className={`h-8 text-xs font-semibold whitespace-nowrap ${activeAction === 'GV' ? 'bg-brand-600 text-white border-brand-600' : 'bg-bg-surface'}`}
              onClick={() => activeAction === 'GV' ? setActiveAction('NONE') : loadData('GV')}
            >
              GV
            </Button>
            <Button 
              variant={activeAction === 'MORE' ? 'primary' : 'outline'} 
              size="sm" 
              className={`h-8 text-xs font-semibold whitespace-nowrap ${activeAction === 'MORE' ? 'bg-brand-600 text-white border-brand-600' : 'bg-bg-surface'}`}
              onClick={() => setActiveAction(activeAction === 'MORE' ? 'NONE' : 'MORE')}
            >
              More
            </Button>
          </div>
        </div>

        {/* Action Content Area (Expands Inline) */}
        {activeAction !== 'NONE' && (
          <div className="pt-3 border-t border-brand-500/20 animate-in slide-in-from-top-2 duration-200">
            {activeAction === 'OTP' && renderOtpContent()}
            {(activeAction === 'UNBLOCK_POINTS' || activeAction === 'UNBLOCK_COUPON' || activeAction === 'UNBLOCK_GV') && renderUnblockContent()}
            {activeAction === 'COUPON' && renderCouponContent()}
            {activeAction === 'POINTS' && renderPointsContent()}
            {activeAction === 'GV' && renderGVContent()}
            {activeAction === 'MORE' && renderMoreContent()}
          </div>
        )}
      </div>
    </div>
  );
}
