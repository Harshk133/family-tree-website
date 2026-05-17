import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';

export type Gender = 'male' | 'female' | 'other';

export interface FamilyMember {
  id: string;
  firstName: string;
  lastName: string;
  age?: number;
  gender: Gender;
  notes?: string;
  photoUrl?: string;
  fatherId?: string | null;
  motherId?: string | null;
  spouseId?: string | null;
}

interface FamilyState {
  members: FamilyMember[];
  addMember: (member: Omit<FamilyMember, 'id'>) => void;
  updateMember: (id: string, data: Partial<Omit<FamilyMember, 'id'>>) => void;
  deleteMember: (id: string) => void;
  getMember: (id: string) => FamilyMember | undefined;
  getChildren: (parentId: string) => FamilyMember[];
}

const initialMembers: FamilyMember[] = [
  {
    id: 'root-1',
    firstName: 'John',
    lastName: 'Doe',
    age: 65,
    gender: 'male',
    spouseId: 'root-2',
    notes: 'Family patriarch',
  },
  {
    id: 'root-2',
    firstName: 'Jane',
    lastName: 'Doe',
    age: 62,
    gender: 'female',
    spouseId: 'root-1',
    notes: 'Family matriarch',
  },
  {
    id: 'child-1',
    firstName: 'Michael',
    lastName: 'Doe',
    age: 35,
    gender: 'male',
    fatherId: 'root-1',
    motherId: 'root-2',
  },
  {
    id: 'child-2',
    firstName: 'Sarah',
    lastName: 'Smith',
    age: 32,
    gender: 'female',
    fatherId: 'root-1',
    motherId: 'root-2',
  }
];

export const useFamilyStore = create<FamilyState>()(
  persist(
    (set, get) => ({
      members: initialMembers,
      
      addMember: (memberData) => {
        set((state) => ({
          members: [...state.members, { ...memberData, id: uuidv4() }],
        }));
      },
      
      updateMember: (id, data) => {
        set((state) => ({
          members: state.members.map((m) => 
            m.id === id ? { ...m, ...data } : m
          ),
        }));
      },
      
      deleteMember: (id) => {
        set((state) => ({
          // First remove the member
          members: state.members.filter((m) => m.id !== id).map(m => {
            // Also remove references to this member
            const updated = { ...m };
            if (updated.fatherId === id) updated.fatherId = null;
            if (updated.motherId === id) updated.motherId = null;
            if (updated.spouseId === id) updated.spouseId = null;
            return updated;
          }),
        }));
      },
      
      getMember: (id) => {
        return get().members.find((m) => m.id === id);
      },
      
      getChildren: (parentId) => {
        return get().members.filter(
          (m) => m.fatherId === parentId || m.motherId === parentId
        );
      },
    }),
    {
      name: 'family-tree-storage',
    }
  )
);
