"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useFamilyStore, Gender } from "../../store/useFamilyStore";
import { UserPlus, Save, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function AddMemberPage() {
  const router = useRouter();
  const addMember = useFamilyStore((state) => state.addMember);
  const members = useFamilyStore((state) => state.members);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    gender: "male" as Gender,
    fatherId: "",
    motherId: "",
    spouseId: "",
    notes: "",
    photoUrl: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    addMember({
      firstName: formData.firstName,
      lastName: formData.lastName,
      age: formData.age ? parseInt(formData.age) : undefined,
      gender: formData.gender,
      fatherId: formData.fatherId || null,
      motherId: formData.motherId || null,
      spouseId: formData.spouseId || null,
      notes: formData.notes,
      photoUrl: formData.photoUrl,
    });
    
    router.push("/profiles");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const males = members.filter(m => m.gender === 'male');
  const females = members.filter(m => m.gender === 'female');

  if (!mounted) return null;

  return (
    <div className="min-h-full p-6 md:p-12 bg-slate-50">
      <div className="max-w-2xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-indigo-600 mb-6 transition-colors">
          <ArrowLeft size={16} /> Back to Dashboard
        </Link>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden"
        >
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-8 py-6 text-white flex items-center gap-4">
            <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
              <UserPlus size={28} />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Add Family Member</h2>
              <p className="text-indigo-100 text-sm">Expand your family tree</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">First Name *</label>
                <input 
                  required
                  type="text" 
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                  placeholder="e.g. John"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Last Name *</label>
                <input 
                  required
                  type="text" 
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                  placeholder="e.g. Doe"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Age</label>
                <input 
                  type="number" 
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                  placeholder="e.g. 35"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Gender *</label>
                <select 
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <hr className="border-slate-100 my-6" />
            <h3 className="font-semibold text-slate-800 text-lg mb-4">Relationships (Optional)</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Father</label>
                <select 
                  name="fatherId"
                  value={formData.fatherId}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                >
                  <option value="">None / Unknown</option>
                  {males.map(m => (
                    <option key={m.id} value={m.id}>{m.firstName} {m.lastName}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Mother</label>
                <select 
                  name="motherId"
                  value={formData.motherId}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                >
                  <option value="">None / Unknown</option>
                  {females.map(m => (
                    <option key={m.id} value={m.id}>{m.firstName} {m.lastName}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Spouse</label>
                <select 
                  name="spouseId"
                  value={formData.spouseId}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                >
                  <option value="">None</option>
                  {members.map(m => (
                    <option key={m.id} value={m.id}>{m.firstName} {m.lastName}</option>
                  ))}
                </select>
              </div>
            </div>

            <hr className="border-slate-100 my-6" />
            <h3 className="font-semibold text-slate-800 text-lg mb-4">Additional Details</h3>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Photo URL</label>
              <input 
                type="url" 
                name="photoUrl"
                value={formData.photoUrl}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                placeholder="https://example.com/photo.jpg"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Notes & Bio</label>
              <textarea 
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all resize-none"
                placeholder="Interesting facts, life events, etc."
              />
            </div>

            <div className="pt-4 flex justify-end">
              <button 
                type="submit"
                className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-2"
              >
                <Save size={18} />
                Save Member
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
