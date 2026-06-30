import React from 'react';
import { notFound } from 'next/navigation';
import { CheckCircle2 } from 'lucide-react';
import { servicesData } from '@/data/servicesData';
import InquiryForm from '@/components/InquiryForm';

export async function generateStaticParams() {
  return Object.keys(servicesData).map((slug) => ({
    slug: slug,
  }));
}

export async function generateMetadata({ params }) {
  const service = servicesData[params.slug];
  if (!service) {
    return {
      title: 'Service Not Found | Neural Noir Studios',
      description: 'The requested service could not be located.',
    };
  }
  return {
    title: service.seoTitle,
    description: service.seoDescription,
  };
}

export default function ServiceSlugPage({ params }) {
  const service = servicesData[params.slug];

  if (!service) {
    notFound();
  }

  const Icon = service.icon;

  return (
    <div className="relative min-h-screen bg-black/60 text-neutral-200 pt-32 pb-24 md:pt-44 md:pb-36 font-sans overflow-hidden">
      {/* Background radial effects */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-neutral-900/10 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-[20%] right-[-10%] w-[50%] h-[50%] bg-neutral-900/10 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-start">
          
          {/* Left Column: B2B SEO Value Proposition */}
          <div className="lg:col-span-7 space-y-10">
            <div>
              {/* Target Indicator */}
              <div className="inline-block px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-6">
                Target: {service.targetAudience}
              </div>

              {/* Service Icon & Title */}
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-white">
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-500">Service Portal</span>
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.1] mb-6">
                {service.header}
              </h1>

              {/* Value Proposition */}
              <p className="text-neutral-400 text-lg md:text-xl leading-relaxed font-light">
                {service.valueProp}
              </p>
            </div>

            {/* Performance Metrics Grid */}
            <div className="border-t border-neutral-900 pt-10">
              <h2 className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-6">Performance Metrics</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {service.metrics.map((metric, idx) => (
                  <div key={idx} className="p-6 rounded-2xl border border-neutral-800 bg-neutral-900/20">
                    <div className="text-3xl font-extrabold text-white mb-2">{metric.value}</div>
                    <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest leading-normal">
                      {metric.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Feature Points */}
            <div className="border-t border-neutral-900 pt-10">
              <h2 className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-6">Operational Scope</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {service.features.map((feature, i) => (
                  <li key={i} className="flex items-center text-sm text-neutral-400 font-light">
                    <CheckCircle2 className="w-4 h-4 text-neutral-500 mr-3 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column: Lead Form */}
          <div className="lg:col-span-5 lg:sticky lg:top-36">
            <InquiryForm serviceTitle={service.title} />
          </div>

        </div>
      </div>
    </div>
  );
}
