const fs = require('fs');
let content = fs.readFileSync('src/pages/Tasks.tsx', 'utf8');

// Replace tasks array
content = content.replace(
    /const tasks = \[\s*\{ id: 'TSK-8492'.*?\];/s,
    `const allTasks = [
    { id: 'TSK-8492', type: 'Internal Task', title: 'Call customer regarding billing issue', status: 'In Progress', priority: 'High', due: 'Today, 2:00 PM', linked: 'TKT-1088', assignee: 'Me', requester: 'Alice B.', icon: 'message' },
    { id: 'TSK-8445', type: 'Jira Task', title: 'Update SSL certificate for Client Portal', status: 'To Do', priority: 'Medium', due: 'Today, 5:00 PM', linked: 'REQ-502', assignee: 'Jane Smith', requester: 'Me', icon: 'message' },
    { id: 'TSK-8488', type: 'Internal Task', title: 'Audit user access logs for Q3', status: 'In Review', priority: 'Low', due: 'Oct 24, 2023', linked: 'None', assignee: 'System', requester: 'Me', icon: 'lock' },
    { id: 'TSK-8493', type: 'Jira Task', title: 'Fix broken links in documentation', status: 'To Do', priority: 'Low', due: 'Tomorrow, 10:00 AM', linked: 'TKT-1090', assignee: 'Me', requester: 'Bob S.', icon: 'message' },
    { id: 'TSK-8494', type: 'Internal Task', title: 'Review Q4 Marketing Plan', status: 'In Progress', priority: 'High', due: 'Today, 4:00 PM', linked: 'None', assignee: 'Me', requester: 'Charlie D.', icon: 'message' },
    { id: 'TSK-8495', type: 'Internal Task', title: 'Set up new employee workstation', status: 'Done', priority: 'Medium', due: 'Yesterday, 9:00 AM', linked: 'TKT-1100', assignee: 'David E.', requester: 'Alice B.', icon: 'message' },
    { id: 'TSK-8496', type: 'Jira Task', title: 'Deploy release v2.4.1', status: 'To Do', priority: 'Critical', due: 'Today, 11:00 PM', linked: 'REQ-503', assignee: 'Eve F.', requester: 'Me', icon: 'lock' },
    { id: 'TSK-8497', type: 'Internal Task', title: 'Prepare monthly report', status: 'In Review', priority: 'Medium', due: 'Next Week', linked: 'None', assignee: 'Jane Smith', requester: 'Bob S.', icon: 'message' },
  ];

  const tasks = allTasks.filter(task => {
      if (activeTab === 'Raised by Me') return task.requester === 'Me';
      if (activeTab === 'Assigned to Me') return task.assignee === 'Me';
      return true;
  });`
);

// We need to change the table columns.
const tableHeaderOld = `<thead className="bg-bg-page text-xs font-semibold text-text-secondary tracking-wider sticky top-0 border-b border-border-default z-10">
              <tr>
                <th className="p-3 w-12 text-center"><input type="checkbox" className="rounded border-border-strong text-brand-500 focus:ring-brand-500" /></th>
                <th className="py-3 px-4">TASK ID</th>
                <th className="py-3 px-4">TASK TYPE</th>
                <th className="py-3 px-4">TASK TITLE</th>
                <th className="py-3 px-4">STATUS</th>
                <th className="py-3 px-4">PRIORITY</th>
                <th className="py-3 px-4">DUE DATE</th>
                <th className="py-3 px-4">TICKET ID</th>
                <th className="py-3 px-4">ASSIGNEE</th>
              </tr>
            </thead>`;
            
const tableHeaderNew = `<thead className="bg-bg-page text-xs font-semibold text-text-secondary tracking-wider sticky top-0 border-b border-border-default z-10">
              <tr>
                <th className="p-3 w-12 text-center"><input type="checkbox" className="rounded border-border-strong text-brand-500 focus:ring-brand-500" /></th>
                <th className="py-3 px-4">TASK ID</th>
                <th className="py-3 px-4">TASK TYPE</th>
                <th className="py-3 px-4">TICKET ID</th>
                <th className="py-3 px-4">TASK TITLE</th>
                <th className="py-3 px-4">STATUS</th>
                <th className="py-3 px-4">PRIORITY</th>
                <th className="py-3 px-4">DUE DATE</th>
                {(activeTab === 'All Tasks' || activeTab === 'Raised by Me') && <th className="py-3 px-4">ASSIGNEE</th>}
                {(activeTab === 'All Tasks' || activeTab === 'Assigned to Me') && <th className="py-3 px-4">REQUESTER</th>}
              </tr>
            </thead>`;
            
content = content.replace(tableHeaderOld, tableHeaderNew);

// Also we need to change the table rows.
const oldRow = `<td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      {task.icon === 'lock' ? <Lock size={14} className="text-text-muted shrink-0" /> : <MessageSquare size={14} className="text-text-muted shrink-0" />}
                      <span className="font-medium text-text-primary truncate max-w-[280px]" title={task.title}>{task.title}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    {getStatusBadge(task.status)}
                  </td>
                  <td className="py-3 px-4">
                    {getPriorityBadge(task.priority)}
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-mono text-xs font-medium text-text-secondary">{task.due}</span>
                  </td>
                  <td className="py-3 px-4" onClick={(e) => {
                      if (task.linked !== 'None') {
                          e.stopPropagation();
                          onNavigate('ticket_details');
                      }
                  }}>
                    {task.linked !== 'None' ? (
                      <span className="inline-flex items-center gap-1 font-mono text-xs font-medium text-brand-500 bg-bg-page px-2 py-1 rounded border border-border-default hover:border-brand-500/30 transition-colors cursor-pointer">
                        <ArrowUpRight size={12} /> <CopyId id={task.linked} type="ticket" />
                      </span>
                    ) : (
                      <span className="text-text-muted text-lg font-mono pl-4">-</span>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-medium text-text-secondary">{task.assignee}</span>
                  </td>`;
                  
const newRow = `<td className="py-3 px-4" onClick={(e) => {
                      if (task.linked !== 'None') {
                          e.stopPropagation();
                          onNavigate('ticket_details');
                      }
                  }}>
                    {task.linked !== 'None' ? (
                      <span className="inline-flex items-center gap-1 font-mono text-xs font-medium text-brand-500 bg-bg-page px-2 py-1 rounded border border-border-default hover:border-brand-500/30 transition-colors cursor-pointer">
                        <ArrowUpRight size={12} /> <CopyId id={task.linked} type="ticket" />
                      </span>
                    ) : (
                      <span className="text-text-muted text-lg font-mono pl-4">-</span>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      {task.icon === 'lock' ? <Lock size={14} className="text-text-muted shrink-0" /> : <MessageSquare size={14} className="text-text-muted shrink-0" />}
                      <span className="font-medium text-text-primary truncate max-w-[280px]" title={task.title}>{task.title}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    {getStatusBadge(task.status)}
                  </td>
                  <td className="py-3 px-4">
                    {getPriorityBadge(task.priority)}
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-mono text-xs font-medium text-text-secondary">{task.due}</span>
                  </td>
                  {(activeTab === 'All Tasks' || activeTab === 'Raised by Me') && (
                  <td className="py-3 px-4">
                    <span className="font-medium text-text-secondary">{task.assignee}</span>
                  </td>
                  )}
                  {(activeTab === 'All Tasks' || activeTab === 'Assigned to Me') && (
                  <td className="py-3 px-4">
                    <span className="font-medium text-text-secondary">{task.requester}</span>
                  </td>
                  )}`;
                  
content = content.replace(oldRow, newRow);

const getCount = (tabName) => {
    let tabTasks = content.match(/const allTasks = \[(.*?)\];/s);
    // Well we can just change the count in the tab UI
}

content = content.replace(
    /\{i === 0 \? 12 : i === 1 \? 8 : 48\}/,
    `{allTasks.filter(task => tab === 'Raised by Me' ? task.requester === 'Me' : tab === 'Assigned to Me' ? task.assignee === 'Me' : true).length}`
);

fs.writeFileSync('src/pages/Tasks.tsx', content);
console.log('Done');
