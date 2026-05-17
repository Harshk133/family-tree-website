"use client";

import dynamic from 'next/dynamic';

const TreeCanvas = dynamic(() => import('../../components/tree/TreeCanvas'), {
  ssr: false,
  loading: () => <div className="w-full h-full flex items-center justify-center text-slate-500">Loading Tree...</div>
});

export default function TreeViewPage() {
  return (
    <div className="w-full h-full bg-slate-50">
      <TreeCanvas />
    </div>
  );
}
