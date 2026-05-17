"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useFamilyStore, FamilyMember } from "../../store/useFamilyStore";
import { Search, User, Trash2, Edit } from "lucide-react";

export default function ProfilesPage() {
  const members = useFamilyStore((state) => state.members);
  const deleteMember = useFamilyStore((state) => state.deleteMember);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMember, setSelectedMember] = useState<FamilyMember | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredMembers = members.filter((m) => 
    `${m.firstName} ${m.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!mounted) return null;

  return (
    <div className="min-h-full p-6 md:p-12 bg-slate-50">
      <div className="max-w-6xl mx-auto">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Family Profiles</h1>
            <p className="text-slate-500">Manage and explore your family members</p>
          </div>
          
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="text-slate-400" size={18} />
            </div>
            <input
              type="text"
              placeholder="Search members..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2.5 rounded-full border border-slate-200 w-full md:w-64 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 outline-none transition-all shadow-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredMembers.map((member) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                key={member.id}
                className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden group hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => setSelectedMember(member)}
              >
                <div className="p-6 flex items-start gap-4">
                  <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center overflow-hidden shrink-0">
                    {member.photoUrl ? (
                      <img src={member.photoUrl} alt={member.firstName} className="w-full h-full object-cover" />
                    ) : (
                      <User className="text-slate-400" size={32} />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-lg text-slate-800 truncate">
                      {member.firstName} {member.lastName}
                    </h3>
                    <p className="text-sm text-slate-500 capitalize">
                      {member.age ? `${member.age} yrs • ` : ''}{member.gender}
                    </p>
                    {member.notes && (
                      <p className="text-xs text-slate-400 mt-2 line-clamp-2">
                        {member.notes}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {filteredMembers.length === 0 && (
            <div className="col-span-full py-12 text-center text-slate-500">
              No members found. Try adjusting your search.
            </div>
          )}
        </div>

        {/* Profile Modal */}
        <AnimatePresence>
          {selectedMember && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="bg-white rounded-3xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]"
              >
                <div className="p-6 md:p-8 flex-1 overflow-y-auto">
                  <div className="flex items-center gap-6 mb-6">
                    <div className="w-24 h-24 rounded-full bg-slate-100 flex items-center justify-center overflow-hidden shrink-0 shadow-inner">
                      {selectedMember.photoUrl ? (
                        <img src={selectedMember.photoUrl} alt={selectedMember.firstName} className="w-full h-full object-cover" />
                      ) : (
                        <User className="text-slate-400" size={48} />
                      )}
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-slate-800">
                        {selectedMember.firstName} {selectedMember.lastName}
                      </h2>
                      <p className="text-slate-500 text-lg capitalize">
                        {selectedMember.age ? `${selectedMember.age} yrs • ` : ''}{selectedMember.gender}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-slate-50 p-4 rounded-xl">
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Bio / Notes</h4>
                      <p className="text-slate-700">{selectedMember.notes || "No notes provided."}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-slate-50 p-4 rounded-xl">
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Father</h4>
                        <p className="text-slate-800 font-medium truncate">
                          {selectedMember.fatherId ? (
                            members.find(m => m.id === selectedMember.fatherId)?.firstName || "Unknown"
                          ) : "Unknown"}
                        </p>
                      </div>
                      <div className="bg-slate-50 p-4 rounded-xl">
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Mother</h4>
                        <p className="text-slate-800 font-medium truncate">
                          {selectedMember.motherId ? (
                            members.find(m => m.id === selectedMember.motherId)?.firstName || "Unknown"
                          ) : "Unknown"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-between items-center">
                  <div className="flex gap-2">
                    <button 
                      onClick={() => {
                        if(confirm('Are you sure you want to delete this member?')) {
                          deleteMember(selectedMember.id);
                          setSelectedMember(null);
                        }
                      }}
                      className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors flex items-center gap-2"
                    >
                      <Trash2 size={18} />
                      <span className="hidden sm:inline text-sm font-medium">Delete</span>
                    </button>
                    {/* <button className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors flex items-center gap-2">
                      <Edit size={18} />
                      <span className="hidden sm:inline text-sm font-medium">Edit</span>
                    </button> */}
                  </div>
                  
                  <button 
                    onClick={() => setSelectedMember(null)}
                    className="px-6 py-2 bg-slate-800 text-white rounded-xl font-medium hover:bg-slate-700 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
