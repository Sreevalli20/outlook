import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, ArrowLeft, GraduationCap } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-6 text-center">
      <div className="p-4 rounded-3xl bg-slate-100 text-slate-400 mb-4 border border-slate-200">
        <Compass className="w-12 h-12 stroke-[1.5]" />
      </div>
      <h1 className="text-3xl font-black text-slate-900 tracking-tight">404 - Page Not Found</h1>
      <p className="text-sm text-slate-500 max-w-sm mt-2 mb-6">
        The scholarship resource or workspace view you requested cannot be located.
      </p>
      <div className="flex items-center gap-3">
        <Link
          to="/"
          className="px-4 py-2 text-xs font-bold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors"
        >
          Landing Page
        </Link>
        <Link
          to="/dashboard"
          className="px-4 py-2 text-xs font-bold text-white bg-emerald-600 rounded-xl hover:bg-emerald-700 transition-colors"
        >
          Student Dashboard
        </Link>
      </div>
    </div>
  );
};
