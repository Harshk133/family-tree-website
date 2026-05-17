import { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { FamilyMember } from '../../store/useFamilyStore';
import { User, UserIcon } from 'lucide-react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

interface FamilyNodeProps {
  data: {
    member: FamilyMember;
  };
}

const FamilyNode = ({ data }: FamilyNodeProps) => {
  const { member } = data;
  
  const isMale = member.gender === 'male';
  const isFemale = member.gender === 'female';

  const cardClasses = twMerge(
    clsx(
      "w-[220px] h-[120px] bg-white rounded-xl shadow-lg border-2 flex flex-col p-3 transition-transform hover:scale-105",
      isMale ? "border-blue-300" : isFemale ? "border-pink-300" : "border-emerald-300"
    )
  );

  const headerBg = twMerge(
    clsx(
      "w-full h-2 absolute top-0 left-0 rounded-t-xl",
      isMale ? "bg-blue-400" : isFemale ? "bg-pink-400" : "bg-emerald-400"
    )
  );

  return (
    <div className={cardClasses}>
      <Handle type="target" position={Position.Top} className="!bg-slate-400 !w-3 !h-3" />
      
      <div className={headerBg} />
      
      <div className="flex items-center gap-3 h-full pt-2">
        <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center overflow-hidden border border-slate-200 shrink-0">
          {member.photoUrl ? (
            <img src={member.photoUrl} alt={member.firstName} className="w-full h-full object-cover" />
          ) : (
            <UserIcon className="text-slate-400" size={24} />
          )}
        </div>
        
        <div className="flex flex-col justify-center flex-1 overflow-hidden">
          <h3 className="font-bold text-slate-800 text-sm truncate">
            {member.firstName} {member.lastName}
          </h3>
          <p className="text-xs text-slate-500 capitalize">
            {member.age ? `${member.age} yrs • ` : ''}{member.gender}
          </p>
          {member.notes && (
            <p className="text-[10px] text-slate-400 truncate mt-1">
              {member.notes}
            </p>
          )}
        </div>
      </div>

      <Handle type="source" position={Position.Bottom} className="!bg-slate-400 !w-3 !h-3" />
    </div>
  );
};

export default memo(FamilyNode);
