'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const parseFAQ = (pText) => {
  // Match <strong>...</strong> followed by a br tag and then the rest of the text
  const match = pText.match(/<strong>(.*?)<\/strong>\s*<br\s*\/?>\s*([\s\S]*)/i);
  if (match) {
    return {
      question: match[1].replace(/^\d+\.\s*/, '').trim(), // Strip "1. " number prefix
      answer: match[2].trim()
    };
  }
  // Alternate match: split on <br/>
  const brMatch = pText.split(/<br\s*\/?>/i);
  if (brMatch.length >= 2) {
    return {
      question: brMatch[0].replace(/<[^>]+>/g, '').replace(/^\d+\.\s*/, '').trim(),
      answer: brMatch.slice(1).join('<br/>').trim()
    };
  }
  return {
    question: pText.replace(/<[^>]+>/g, '').trim(),
    answer: ''
  };
};

function AccordionItem({ question, answer, isOpen, onToggle }) {
  return (
    <div 
      className="border border-neutral-950 bg-[#070708]/80 rounded-xl overflow-hidden transition-all duration-300 hover:border-neutral-900 shadow-[0_4px_30px_rgba(0,0,0,0.4)] my-3"
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-5 md:p-6 text-left focus:outline-none group"
      >
        <span className="text-sm md:text-base font-semibold text-neutral-200 group-hover:text-white transition-colors duration-200 pr-4">
          {question}
        </span>
        <div 
          className="flex-shrink-0 w-8 h-8 rounded-full border border-neutral-900 bg-black flex items-center justify-center text-orange-500 group-hover:text-white group-hover:border-neutral-800 transition-all duration-300"
        >
          <ChevronDown 
            className={`w-4 h-4 transform transition-transform duration-300 ${
              isOpen ? 'rotate-180 text-white' : ''
            }`} 
          />
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div 
              className="px-5 pb-5 md:px-6 md:pb-6 text-xs md:text-sm text-neutral-400 font-light border-t border-neutral-900/40 pt-4 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: answer }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQAccordion({ paragraphs }) {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = paragraphs.map(parseFAQ).filter(faq => faq.question && faq.answer);

  if (faqs.length === 0) return null;

  return (
    <div className="space-y-4 max-w-4xl mx-auto my-12">
      {faqs.map((faq, idx) => (
        <AccordionItem
          key={idx}
          question={faq.question}
          answer={faq.answer}
          isOpen={openIndex === idx}
          onToggle={() => setOpenIndex(openIndex === idx ? null : idx)}
        />
      ))}
    </div>
  );
}
