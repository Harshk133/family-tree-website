"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { UserPlus, Network, Users } from "lucide-react";
import { useFamilyStore } from "../store/useFamilyStore";
import { useEffect, useState } from "react";

export default function Home() {
  const members = useFamilyStore((state) => state.members);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  };

  if (!mounted) return null;

  return (
    <div className="min-h-full p-8 flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <motion.div 
        className="max-w-3xl w-full text-center space-y-8"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div variants={itemVariants} className="space-y-4">
          <div className="inline-block p-4 rounded-3xl bg-indigo-100 text-indigo-600 mb-2">
            <Network size={48} strokeWidth={1.5} />
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight">
            Family<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Tree</span> Explorer
          </h1>
          <p className="text-lg text-slate-600 max-w-xl mx-auto">
            Build, visualize, and explore your family history with interactive nodes and smooth animations.
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
          <Link href="/add-member">
            <div className="group bg-white p-6 rounded-2xl shadow-sm hover:shadow-md border border-slate-100 transition-all cursor-pointer flex flex-col items-center gap-4 hover:-translate-y-1">
              <div className="w-14 h-14 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <UserPlus size={24} />
              </div>
              <div className="text-center">
                <h3 className="font-bold text-slate-800">Add Member</h3>
                <p className="text-sm text-slate-500">Grow your tree</p>
              </div>
            </div>
          </Link>

          <Link href="/tree-view">
            <div className="group bg-white p-6 rounded-2xl shadow-sm hover:shadow-md border border-slate-100 transition-all cursor-pointer flex flex-col items-center gap-4 hover:-translate-y-1">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Network size={24} />
              </div>
              <div className="text-center">
                <h3 className="font-bold text-slate-800">View Tree</h3>
                <p className="text-sm text-slate-500">Interactive graph</p>
              </div>
            </div>
          </Link>

          <Link href="/profiles">
            <div className="group bg-white p-6 rounded-2xl shadow-sm hover:shadow-md border border-slate-100 transition-all cursor-pointer flex flex-col items-center gap-4 hover:-translate-y-1">
              <div className="w-14 h-14 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Users size={24} />
              </div>
              <div className="text-center">
                <h3 className="font-bold text-slate-800">Profiles</h3>
                <p className="text-sm text-slate-500">Manage members</p>
              </div>
            </div>
          </Link>
        </motion.div>

        <motion.div variants={itemVariants} className="pt-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm text-sm font-medium text-slate-600">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            {members.length} Family Members Documented
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
