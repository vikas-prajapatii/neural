'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';

export default function InquiryForm({ serviceTitle = 'General Inquiry' }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    philosophy: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:8080/api/inquiries/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          philosophy: form.philosophy,
          projectTypes: serviceTitle, // Auto-bound to the active service
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        setForm({ name: '', email: '', phone: '', philosophy: '' });
      } else {
        setError('Server returned an error. Please try again.');
      }
    } catch (err) {
      setError('Connection failed. Please ensure the backend server is running.');
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
    <form onSubmit={handleSubmit} className="space-y-5 border border-neutral-800 bg-neutral-900/10 rounded-3xl p-8 md:p-10">
      <div>
        <h4 className="text-lg font-bold text-white mb-1">Brief Your Project</h4>
        <p className="text-xs text-neutral-500 leading-relaxed font-light">
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
        <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block">Name / Company</label>
        <input
          type="text"
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="John Doe / Acme Corp"
          className="w-full bg-neutral-900/40 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-neutral-200 placeholder-neutral-800 focus:border-neutral-500 focus:outline-none transition-colors"
        />
      </div>

      {/* Email */}
      <div className="space-y-1.5">
        <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block">Email Address</label>
        <input
          type="email"
          required
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          placeholder="john@example.com"
          className="w-full bg-neutral-900/40 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-neutral-200 placeholder-neutral-800 focus:border-neutral-500 focus:outline-none transition-colors"
        />
      </div>

      {/* Phone */}
      <div className="space-y-1.5">
        <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block">Mobile Number</label>
        <input
          type="tel"
          required
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          placeholder="+1 (555) 000-0000"
          className="w-full bg-neutral-900/40 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-neutral-200 placeholder-neutral-800 focus:border-neutral-500 focus:outline-none transition-colors"
        />
      </div>

      {/* Brief */}
      <div className="space-y-1.5">
        <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block">Project Philosophy / Brief</label>
        <textarea
          required
          value={form.philosophy}
          onChange={(e) => setForm({ ...form, philosophy: e.target.value })}
          placeholder="Outline visual themes, pacing parameters, and brand assets to preserve..."
          className="w-full bg-neutral-900/40 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-neutral-200 placeholder-neutral-800 focus:border-neutral-500 focus:outline-none transition-colors h-28 resize-none"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-4 rounded-xl text-xs font-bold uppercase tracking-widest text-black bg-white hover:bg-neutral-200 disabled:opacity-50 transition-all duration-300 flex items-center justify-center space-x-2"
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
