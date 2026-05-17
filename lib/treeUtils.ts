import { Node, Edge, Position } from '@xyflow/react';
import * as dagre from 'dagre';
import { FamilyMember } from '../store/useFamilyStore';

const nodeWidth = 220;
const nodeHeight = 120;

export const getLayoutedElements = (members: FamilyMember[], direction = 'TB') => {
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));

  dagreGraph.setGraph({ rankdir: direction, nodesep: 100, ranksep: 100 });

  const nodes: Node[] = [];
  const edges: Edge[] = [];

  // Add nodes to dagre and our nodes array
  members.forEach((member) => {
    dagreGraph.setNode(member.id, { width: nodeWidth, height: nodeHeight });
    
    nodes.push({
      id: member.id,
      type: 'familyNode',
      data: { member },
      position: { x: 0, y: 0 },
    });
  });

  // Create edges for parent-child relationships
  members.forEach((member) => {
    if (member.fatherId) {
      edges.push({
        id: `e-${member.fatherId}-${member.id}`,
        source: member.fatherId,
        target: member.id,
        type: 'smoothstep',
        animated: true,
        style: { stroke: '#94a3b8', strokeWidth: 2 },
      });
      dagreGraph.setEdge(member.fatherId, member.id);
    }
    
    if (member.motherId) {
      edges.push({
        id: `e-${member.motherId}-${member.id}`,
        source: member.motherId,
        target: member.id,
        type: 'smoothstep',
        animated: true,
        style: { stroke: '#94a3b8', strokeWidth: 2 },
      });
      dagreGraph.setEdge(member.motherId, member.id);
    }

    // Connect spouses with a special edge type
    if (member.spouseId && members.some(m => m.id === member.spouseId)) {
      // To prevent duplicate edges, only add if member.id < spouseId
      if (member.id < member.spouseId) {
        edges.push({
          id: `e-spouse-${member.id}-${member.spouseId}`,
          source: member.id,
          target: member.spouseId,
          type: 'straight',
          style: { stroke: '#f43f5e', strokeWidth: 2, strokeDasharray: '5,5' },
        });
        // We do NOT add spouse edges to dagre layout to prevent cyclic loops, 
        // dagre is for hierarchical layout (parents -> children).
        // Spouse nodes will naturally appear near each other if they share children, 
        // or we could use custom positioning, but for MVP, this is sufficient.
      }
    }
  });

  dagre.layout(dagreGraph);

  nodes.forEach((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    node.targetPosition = direction === 'LR' ? Position.Left : Position.Top;
    node.sourcePosition = direction === 'LR' ? Position.Right : Position.Bottom;
    
    // Adjust position to be top-left aligned instead of center aligned for React Flow
    node.position = {
      x: nodeWithPosition.x - nodeWidth / 2,
      y: nodeWithPosition.y - nodeHeight / 2,
    };
  });

  return { nodes, edges };
};
