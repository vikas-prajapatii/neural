'use client';

import React, { useState } from 'react';
import { useModal } from '@/context/ModalContext';
import { X, Send, CheckCircle2 } from 'lucide-react';
import { servicesData } from '@/data/servicesData';
import { supabase } from '@/lib/supabase';

export default function ContactModal() {
  const { isModalOpen, closeModal } = useModal();
  const [submitted, setSubmitted] = useState(false);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    types: [],
    philosophy: '',
    budget: '',
    customBudget: ''
  });

  const services = Object.values(servicesData);

  const handleCheckboxChange = (srvId) => {
    if (formState.types.includes(srvId)) {
      setFormState({
        ...formState,
        types: formState.types.filter((id) => id !== srvId)
      });
    } else {
      setFormState({
        ...formState,
        types: [...formState.types, srvId]
      });
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    // Validate corporate email
    const emailStr = formState.email.trim().toLowerCase();
    const publicDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'aol.com', 'icloud.com', 'protonmail.com', 'zoho.com', 'mail.com', 'yandex.com', 'gmx.com'];
    const emailParts = emailStr.split('@');
    if (emailParts.length === 2) {
      const domain = emailParts[1];
      if (publicDomains.includes(domain)) {
        alert('Please provide a corporate email address (standard email addresses like @gmail.com are not accepted).');
        return;
      }
    }

    const finalBudget = formState.budget === 'Custom Budget' ? formState.customBudget : formState.budget;
    try {
      const { error } = await supabase
        .from('neuralnoir')
        .insert([
          {
            name: formState.name,
            email: formState.email,
            mobile: formState.phone,
            project_types: formState.types,
            budget: finalBudget || 'Not specified',
            project_scope: formState.philosophy
          }
        ]);

      if (!error) {
        setSubmitted(true);
        setTimeout(() => {
          setFormState({ name: '', email: '', phone: '', types: [], philosophy: '', budget: '', customBudget: '' });
          setSubmitted(false);
          closeModal();
        }, 3000);
      } else {
        console.error('Failed to submit brief to Supabase:', error.message);
        alert(`Failed to deposit brief: ${error.message}`);
      }
    } catch (error) {
      console.error('Error submitting brief:', error);
      alert('Connection error occurred while submitting project brief.');
    }
  };

  if (!isModalOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center px-4 overflow-y-auto bg-slate-950/80 backdrop-blur-lg"
    >
      {/* Modal Box */}
      <div
        className="relative w-full max-w-4xl mx-auto md:w-[90vw] max-h-[95vh] md:max-h-[90vh] overflow-y-auto bg-slate-900 border border-white/10 rounded-3xl p-4 sm:p-8 shadow-[0_20px_50px_-10px_rgba(6,182,212,0.3)] my-8 animate-fade-in-up"
      >
        {/* Close Button */}
        <button
          onClick={closeModal}
          className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/5 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Form Content */}
        {!submitted ? (
          <form onSubmit={handleFormSubmit} className="space-y-6">
            <div>
              <h3 className="text-xl sm:text-3xl font-bold tracking-wider uppercase text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 mb-2">
                Let&apos;s Create the Insane Together
              </h3>
              <p className="text-xs text-slate-400">
                Submit your project details. We&apos;ll deploy custom AI weights specifically aligned to your brand.
              </p>
            </div>

            {/* Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-widest">Name / Company</label>
                <input
                  type="text"
                  required
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  placeholder="John Doe / Acme Corp"
                  className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-600 focus:border-cyan-500 focus:outline-none transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-widest">Email Address</label>
                <input
                  type="email"
                  required
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  placeholder="john@example.com"
                  className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-600 focus:border-cyan-500 focus:outline-none transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-widest">Mobile Number</label>
                <input
                  type="tel"
                  required
                  value={formState.phone}
                  onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                  placeholder="+1 (555) 000-0000"
                  className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-600 focus:border-cyan-500 focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Creation Types Checkboxes */}
            <div className="space-y-3">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-widest block">Project Types Needed</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {services.map((srv) => (
                  <label 
                    key={srv.id} 
                    className={`flex items-center space-x-3 p-3 rounded-xl border cursor-pointer select-none transition-all ${
                      formState.types.includes(srv.id)
                        ? 'bg-cyan-950/40 border-cyan-500/50 text-cyan-400'
                        : 'bg-slate-950 border-white/5 text-slate-400 hover:border-white/10'
                    }`}
                  >
                    <input
                      type="checkbox"
                      className="hidden"
                      checked={formState.types.includes(srv.id)}
                      onChange={() => handleCheckboxChange(srv.id)}
                    />
                    <div className={`w-4.5 h-4.5 rounded border flex items-center justify-center transition-all ${
                      formState.types.includes(srv.id) ? 'bg-cyan-500 border-cyan-400' : 'border-slate-700'
                    }`}>
                      {formState.types.includes(srv.id) && <CheckCircle2 className="w-3 h-3 text-black stroke-[3]" />}
                    </div>
                    <span className="text-xs font-medium">{srv.title}</span>
                  </label>
                ))}
              </div>
            </div>
            {/* Project Budget Select Dropdown */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-widest block">Project Budget</label>
              <div className="relative">
                <select
                  required
                  value={formState.budget}
                  onChange={(e) => setFormState({ ...formState, budget: e.target.value })}
                  className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-sm text-slate-200 focus:border-cyan-500 focus:outline-none transition-colors appearance-none cursor-pointer"
                >
                  <option value="" disabled className="text-slate-600">Select your project budget...</option>
                  <option value="Custom Budget" className="bg-slate-950 text-slate-200">Custom Budget</option>
                  <option value="$300 - $1,000" className="bg-slate-950 text-slate-200">$300 - $1,000</option>
                  <option value="$1,000 - $5,000" className="bg-slate-950 text-slate-200">$1,000 - $5,000</option>
                  <option value="$5,000 - $10,000" className="bg-slate-950 text-slate-200">$5,000 - $10,000</option>
                  <option value="$10,000+" className="bg-slate-950 text-slate-200">$10,000+</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
              </div>

              {formState.budget === 'Custom Budget' && (
                <div className="space-y-2 mt-3 animate-fade-in">
                  <label className="text-xs font-semibold text-slate-300 uppercase tracking-widest block">Specify Custom Budget</label>
                  <input
                    type="text"
                    required
                    value={formState.customBudget || ''}
                    onChange={(e) => setFormState({ ...formState, customBudget: e.target.value })}
                    placeholder="e.g. $450 or $1,500"
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-600 focus:border-cyan-500 focus:outline-none transition-colors"
                  />
                </div>
              )}
            </div>

            {/* Philosophy & Scope */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-widest">Brand Philosophy & Project Scope</label>
              <textarea
                required
                value={formState.philosophy}
                onChange={(e) => setFormState({ ...formState, philosophy: e.target.value })}
                placeholder="Outline your target visual themes, pacing requirements, custom assets to preserve, and conceptual targets..."
                className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-600 focus:border-cyan-500 focus:outline-none transition-colors resize-none h-24 md:h-32"
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full relative px-6 py-4 rounded-xl text-xs font-bold uppercase tracking-widest text-black bg-cyan-400 hover:bg-cyan-300 transition-all duration-300 shadow-[0_0_15px_rgba(6,182,212,0.2)] hover:scale-[1.01] flex items-center justify-center space-x-2"
            >
              <span>Submit Project Brief</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        ) : (
          <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
            <div
              className="w-16 h-16 rounded-full bg-cyan-950 border border-cyan-400 flex items-center justify-center text-cyan-400 mb-2 shadow-[0_0_20px_rgba(6,182,212,0.4)]"
            >
              <CheckCircle2 className="w-8 h-8 stroke-[1.5]" />
            </div>
            <h3 className="text-xl font-bold text-slate-100 uppercase tracking-wider">Brief Deposited Successfully</h3>
            <p className="text-sm text-slate-400 max-w-sm">
              Your insanity has been registered. Our directors are matching concept spaces. We will reach back within 24 hours.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
