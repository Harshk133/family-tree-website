"use client";

import { useMemo } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  Panel
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useFamilyStore } from '../../store/useFamilyStore';
import { getLayoutedElements } from '../../lib/treeUtils';
import FamilyNode from './FamilyNode';
import { motion } from 'framer-motion';

const nodeTypes = {
  familyNode: FamilyNode,
};

export default function TreeCanvas() {
  const members = useFamilyStore((state) => state.members);

  const { nodes: initialNodes, edges: initialEdges } = useMemo(
    () => getLayoutedElements(members),
    [members]
  );

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // Update layout when members change
  useMemo(() => {
    const layout = getLayoutedElements(members);
    setNodes(layout.nodes);
    setEdges(layout.edges);
  }, [members, setNodes, setEdges]);

  return (
    <motion.div 
      className="w-full h-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitView
        className="bg-slate-50"
      >
        <Background gap={16} color="#cbd5e1" />
        <Controls />
        <MiniMap nodeColor="#94a3b8" maskColor="rgba(248, 250, 252, 0.7)" />
        
        <Panel position="top-right" className="bg-white/80 p-3 rounded-xl shadow-sm backdrop-blur-sm border border-slate-200">
          <h3 className="font-bold text-sm text-slate-800">Tree Legend</h3>
          <div className="flex flex-col gap-2 mt-2 text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-400"></div> Male
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-pink-400"></div> Female
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-emerald-400"></div> Other
            </div>
            <div className="flex items-center gap-2 mt-1">
              <div className="w-4 h-0 border-t-2 border-slate-400"></div> Parent-Child
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-0 border-t-2 border-rose-500 border-dashed"></div> Spouse
            </div>
          </div>
        </Panel>
      </ReactFlow>
    </motion.div>
  );
}
