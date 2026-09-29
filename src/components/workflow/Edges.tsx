import { BaseEdge, EdgeLabelRenderer, getBezierPath } from '@xyflow/react';
import { Trash2, Plus } from 'lucide-react';

export function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
  data
}: any) {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition,
  });
  
  return (
    <>
      <BaseEdge path={edgePath} markerEnd={markerEnd} style={{ ...style, strokeWidth: 2 }} />
      <EdgeLabelRenderer>
        <div
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            pointerEvents: 'all',
          }}
          className="flex items-center gap-1 opacity-0 hover:opacity-100 transition-opacity"
        >
          {data?.onInsert && (
            <button onClick={() => data.onInsert(id)} className="w-5 h-5 bg-brand-500 text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform">
               <Plus size={12} />
            </button>
          )}
          {data?.onDelete && (
            <button onClick={() => data.onDelete(id)} className="w-5 h-5 bg-error-bg text-error-text rounded-full flex items-center justify-center hover:scale-110 transition-transform border border-error-text/20">
               <Trash2 size={12} />
            </button>
          )}
        </div>
      </EdgeLabelRenderer>
    </>
  );
}
