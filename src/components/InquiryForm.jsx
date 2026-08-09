'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function InquiryForm({ serviceTitle = 'General Inquiry' }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    philosophy: '',
    budget: '',
    customBudget: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    


    const finalBudget = form.budget === 'Custom Budget' ? form.customBudget : form.budget;
    try {
      const { error: insertError } = await supabase
        .from('neuralnoir')
        .insert([
          {
            name: form.name,
            email: form.email,
            mobile: form.phone,
            project_types: [serviceTitle],
            budget: finalBudget || 'Not specified',
            project_scope: form.philosophy
          }
        ]);

      if (!insertError) {
        setSubmitted(true);
        setForm({ name: '', email: '', phone: '', philosophy: '', budget: '', customBudget: '' });
      } else {
        setError(`Failed to submit brief to Supabase: ${insertError.message}`);
      }
    } catch (err) {
      setError('Connection failed. Please check your network connection.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="py-12 flex flex-col items-center justify-center text-center space-y-4 border border-neutral-800 bg-neutral-900/10 rounded-3xl p-8">
        <div className="w-16 h-16 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-white shadow-lg">
          <CheckCircle2 className="w-8 h-8 stroke-[1.5]" />
        </div>
        <h4 className="text-lg font-bold text-white uppercase tracking-wider">Brief Deposited</h4>
        <p className="text-xs text-neutral-400 max-w-sm font-light leading-relaxed">
          Your request has been mapped to our {serviceTitle} pipeline. Our AI directors will match concept spaces and contact you within 24 hours.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-4 px-6 py-2.5 rounded-full text-xs font-semibold text-neutral-400 hover:text-white border border-neutral-800 hover:border-neutral-600 transition-colors"
        >
          Submit Another Brief
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 border border-slate-800/80 bg-[#0c152b]/40 backdrop-blur-md rounded-3xl p-8 md:p-10 shadow-[0_15px_35px_rgba(0,0,0,0.4)]">
      <div>
        <h4 className="text-lg font-bold text-white mb-1">Brief Your Project</h4>
        <p className="text-xs text-neutral-400 leading-relaxed font-light">
          Fill out the specifications below. Our team will configure custom weights tuned for your brand goals.
        </p>
      </div>

      {error && (
        <div className="p-3 rounded-lg bg-red-950/20 border border-red-900/30 text-xs text-red-400">
          {error}
        </div>
      )}

      {/* Name */}
      <div className="space-y-1.5">
        <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">Name / Company</label>
        <input
          type="text"
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="John Doe / Acme Corp"
          className="w-full bg-[#070d1a]/60 border border-slate-800/60 rounded-xl px-4 py-3 text-sm text-slate-250 placeholder-neutral-700 focus:border-cyan-500/50 focus:outline-none transition-colors"
        />
      </div>

      {/* Email */}
      <div className="space-y-1.5">
        <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">Email Address</label>
        <input
          type="email"
          required
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          placeholder="john@example.com"
          className="w-full bg-[#070d1a]/60 border border-slate-800/60 rounded-xl px-4 py-3 text-sm text-slate-250 placeholder-neutral-700 focus:border-cyan-500/50 focus:outline-none transition-colors"
        />
      </div>

      {/* Phone */}
      <div className="space-y-1.5">
        <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">Mobile Number</label>
        <input
          type="tel"
          required
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          placeholder="+1 (555) 000-0000"
          className="w-full bg-[#070d1a]/60 border border-slate-800/60 rounded-xl px-4 py-3 text-sm text-slate-250 placeholder-neutral-700 focus:border-cyan-500/50 focus:outline-none transition-colors"
        />
      </div>

      {/* Project Budget Select Dropdown */}
      <div className="space-y-1.5">
        <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">Project Budget</label>
        <div className="relative">
          <select
            required
            value={form.budget}
            onChange={(e) => setForm({ ...form, budget: e.target.value })}
            className="w-full bg-[#070d1a]/60 border border-slate-800/60 rounded-xl px-4 py-3 text-sm text-slate-200 focus:border-cyan-500/50 focus:outline-none transition-colors appearance-none cursor-pointer"
          >
            <option value="" disabled className="text-neutral-700">Select your project budget...</option>
            <option value="Custom Budget" className="bg-[#070d1a] text-slate-200">Custom Budget</option>
            <option value="$300 - $1,000" className="bg-[#070d1a] text-slate-200">$300 - $1,000</option>
            <option value="$1,000 - $5,000" className="bg-[#070d1a] text-slate-200">$1,000 - $5,000</option>
            <option value="$5,000 - $10,000" className="bg-[#070d1a] text-slate-200">$5,000 - $10,000</option>
            <option value="$10,000+" className="bg-[#070d1a] text-slate-200">$10,000+</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-neutral-500">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
          </div>
        </div>

        {form.budget === 'Custom Budget' && (
          <div className="space-y-1.5 mt-3 animate-fade-in">
            <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">Specify Custom Budget</label>
            <input
              type="text"
              required
              value={form.customBudget || ''}
              onChange={(e) => setForm({ ...form, customBudget: e.target.value })}
              placeholder="e.g. $450 or $1,500"
              className="w-full bg-[#070d1a]/60 border border-slate-800/60 rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-neutral-700 focus:border-cyan-500/50 focus:outline-none transition-colors"
            />
          </div>
        )}
      </div>

      {/* Brief */}
      <div className="space-y-1.5">
        <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">Project Philosophy / Brief</label>
        <textarea
          required
          value={form.philosophy}
          onChange={(e) => setForm({ ...form, philosophy: e.target.value })}
          placeholder="Outline visual themes, pacing parameters, and brand assets to preserve..."
          className="w-full bg-[#070d1a]/60 border border-slate-800/60 rounded-xl px-4 py-3 text-sm text-slate-250 placeholder-neutral-700 focus:border-cyan-500/50 focus:outline-none transition-colors h-28 resize-none"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-4 rounded-xl text-xs font-bold uppercase tracking-widest text-black bg-cyan-400 hover:bg-cyan-300 disabled:opacity-50 transition-all duration-300 flex items-center justify-center space-x-2 shadow-[0_0_15px_rgba(6,182,212,0.15)] hover:scale-[1.01]"
      >
        {loading ? (
          <span>Deploying Weights...</span>
        ) : (
          <>
            <span>Submit Project Brief</span>
            <Send className="w-3.5 h-3.5" />
          </>
        )}
      </button>
    </form>
  );
}
