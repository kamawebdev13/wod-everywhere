import { User, Settings, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { IUser } from '@/types';

/**
 * Representación visual de la identidad del atleta.
 */
export const ProfileHero = ({ user }: { user: IUser }) => (
    <section className="px-6 pt-12 pb-8">
        <div className="flex justify-between items-start mb-6">
            <div className="relative">
                <div className="w-24 h-24 bg-zinc-950 rounded-2xl flex items-center justify-center border-2 border-white shadow-xl text-white">
                    <User size={48} strokeWidth={1.5} />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-red-800 text-white p-1.5 rounded-lg shadow-lg">
                    <Zap size={16} fill="currentColor" />
                </div>
            </div>
            <Button variant="ghost" className="bg-gray-50 rounded-xl text-zinc-950 w-10 h-10 p-0">
                <Settings size={20} />
            </Button>
        </div>

        <div className="text-left">
            <h1 className="text-3xl font-black text-zinc-950 uppercase tracking-tighter italic">
                {user.name}
            </h1>
            <p className="text-[12px] font-bold text-red-800 uppercase tracking-[0.2em] mt-1 italic">
                {user.level} ENGINE
            </p>
        </div>
        
        <div className="flex flex-wrap gap-2 mt-4">
            {user.tags?.map((tag) => (
                <span key={tag} className="text-[9px] font-black bg-gray-100 text-gray-500 px-3 py-1.5 rounded-sm uppercase tracking-widest">
                    {tag}
                </span>
            ))}
        </div>
    </section>
);