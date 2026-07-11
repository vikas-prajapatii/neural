import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle2, ArrowLeft } from 'lucide-react';
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
  const title = `${service.title} | Neural Noir Studios`;
  const description = service.description || service.seoDescription || 'Explore our ultra-premium global AI Video Production services at Neural Noir Studios.';
  const url = `https://neuralnoirstudio.com/services/${params.slug}`;
  const featuredImage = service.image || '/logo.png';
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      type: 'website',
      images: [
        {
          url: `https://neuralnoirstudio.com${featuredImage}`,
          width: 1200,
          height: 630,
          alt: service.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`https://neuralnoirstudio.com${featuredImage}`],
    },
  };
}

export default function ServiceSlugPage({ params }) {
  const service = servicesData[params.slug];

  if (!service) {
    notFound();
  }

  const Icon = service.icon;

  return (
    <div className="relative min-h-screen bg-[#02040c] text-neutral-200 pt-20 font-sans overflow-hidden">
      {/* Background radial effects */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-cyan-950/10 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-[20%] right-[-10%] w-[50%] h-[50%] bg-cyan-950/10 rounded-full blur-[150px] pointer-events-none"></div>

      {/* Breadcrumbs Header */}
      <div className="border-b border-neutral-900/60 bg-neutral-950/40 py-5 px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center space-x-2.5 text-[10px] font-bold text-neutral-500 uppercase tracking-widest">
            <Link href="/" className="hover:text-white transition-colors duration-200">Home</Link>
            <span className="text-neutral-700">/</span>
            <span className="text-neutral-400">Services</span>
            <span className="text-neutral-700">/</span>
            <span className="text-cyan-400 font-extrabold">{service.title}</span>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-neutral-400/80">
            Neural Noir Portal
          </span>
        </div>
      </div>

      {/* Hero Video Section */}
      <div className="relative w-full h-[55vh] min-h-[400px] flex items-center justify-center overflow-hidden border-b border-neutral-900/50">
        <div className="absolute inset-0 z-0">
          <iframe
            src="https://player.vimeo.com/video/1207651789?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&muted=1&loop=1&background=1"
            frameBorder="0"
            allow="autoplay; fullscreen"
            referrerPolicy="strict-origin-when-cross-origin"
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '100vw',
              height: '56.25vw',
              minHeight: '100%',
              minWidth: '177.77%',
              transform: 'translate(-50%, -50%) scale(1.01)',
              pointerEvents: 'none',
              opacity: 0.48
            }}
            title={`Neural Noir ${service.title} Background Video`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#02040c] via-[#02040c]/30 to-[#02040c]/10 z-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#02040c]/65 via-transparent to-[#02040c]/65 z-10" />
        </div>

        <div className="relative z-20 max-w-4xl mx-auto px-6 text-center space-y-6">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-neutral-900/80 border border-neutral-800 text-[9px] font-extrabold text-neutral-400 uppercase tracking-widest">
              Target: {service.targetAudience}
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-cyan-950/30 border border-cyan-800/40 text-[9px] font-extrabold text-cyan-400 uppercase tracking-widest">
              Studio Certified
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.1] max-w-3xl mx-auto">
            {service.header}
          </h1>

          <p className="text-neutral-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto font-light leading-relaxed">
            {service.valueProp}
          </p>

          <div className="pt-2">
            <a 
              href="#inquiry-portal" 
              className="inline-block bg-cyan-500 hover:bg-cyan-400 text-neutral-950 font-bold px-7 py-3 rounded-xl transition-all duration-300 transform hover:-translate-y-0.5 text-xs tracking-widest uppercase"
            >
              Request Portal Access
            </a>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-start">
          
          {/* Left Column: Stats & Features */}
          <div className="lg:col-span-7 space-y-16">
            
            {/* Performance Metrics */}
            <div className="space-y-6">
              <div className="flex items-center space-x-2">
                <div className="h-[2px] w-6 bg-cyan-500" />
                <h2 className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Performance Metrics</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {service.metrics.map((metric, idx) => (
                  <div key={idx} className="p-6 rounded-2xl border border-neutral-900/60 bg-neutral-900/10 hover:bg-neutral-900/20 hover:border-neutral-800/80 transition-all duration-300">
                    <div className="text-3xl font-extrabold text-white mb-2">{metric.value}</div>
                    <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest leading-normal">
                      {metric.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Operational Scope */}
            <div className="space-y-8 border-t border-neutral-900/60 pt-16">
              <div className="flex items-center space-x-2">
                <div className="h-[2px] w-6 bg-cyan-500" />
                <h2 className="text-xs font-bold text-neutral-400 uppercase tracking-widest">
                  {service.featureSectionTitle || 'Operational Scope'}
                </h2>
              </div>
              <ul className="list-none space-y-8">
                {service.features.map((feature, i) => {
                  const isObject = typeof feature === 'object';
                  const title = isObject ? feature.title : feature;
                  const desc = isObject ? feature.desc : null;
                  
                  return (
                    <li key={i} className="flex items-start text-sm font-light">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 mr-3.5 mt-1 flex-shrink-0 notranslate" translate="no" />
                      <div className="space-y-1.5">
                        <span className="font-bold text-white block text-sm uppercase tracking-wider">{title}</span>
                        {desc && (
                          <p 
                            className="text-neutral-400 text-xs sm:text-sm font-light leading-relaxed max-w-2xl"
                            dangerouslySetInnerHTML={{ __html: desc }}
                          />
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          {/* Right Column: Inquiry Lead Form */}
          <div id="inquiry-portal" className="lg:col-span-5 lg:sticky lg:top-32 bg-neutral-950/40 p-1 rounded-3xl border border-neutral-900/50">
            <InquiryForm serviceTitle={service.title} />
          </div>

        </div>
      </div>
    </div>
  );
}
