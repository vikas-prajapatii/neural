import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, Clock, BookOpen } from 'lucide-react';
import { blogData } from '@/data/blogData';
import BlogCTA from '@/components/BlogCTA';
import SpotlightHeading from '@/components/SpotlightHeading';

export async function generateStaticParams() {
  return Object.keys(blogData).map((slug) => ({
    slug: slug,
  }));
}

export async function generateMetadata({ params }) {
  const post = blogData[params.slug];
  if (!post) {
    return {
      title: 'Article Not Found | Neural Noir Studios',
      description: 'The requested article could not be located.',
    };
  }
  const title = `${post.title} | Neural Noir Studios`;
  const description = post.summary || post.seoDescription || 'Read the latest technical insights on high-fidelity AI video pipelines and generative studio engineering from Neural Noir Studios.';
  const url = `https://neuralnoirstudio.com/blog/${params.slug}`;
  const featuredImage = post.image || '/logo.png';
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      type: 'article',
      publishedTime: post.date,
      authors: ['Neural Noir Studios'],
      images: [
        {
          url: `https://neuralnoirstudio.com${featuredImage}`,
          width: 1200,
          height: 630,
          alt: post.title,
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

const getSectionId = (title) => {
  if (!title) return '';
  return title.toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
};

export default function BlogPostPage({ params }) {
  const post = blogData[params.slug];

  if (!post) {
    notFound();
  }

  return (
    <div className="relative min-h-screen bg-black/60 text-neutral-200 pt-32 pb-24 md:pt-44 md:pb-36 font-sans overflow-hidden">
      {/* Background radial effects */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-neutral-900/10 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-[20%] right-[-10%] w-[50%] h-[50%] bg-neutral-900/10 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Back button */}
        <Link 
          href="/blog" 
          className="inline-flex items-center text-xs font-semibold uppercase tracking-widest text-neutral-400 hover:text-white transition-colors duration-200 group mb-10"
        >
          <ArrowLeft className="w-3.5 h-3.5 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Blog
        </Link>

        <div className="max-w-4xl mx-auto">
          
          {/* Main Article Content */}
          <article className="space-y-12">
            {post.schema && (
              <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(post.schema) }}
              />
            )}
            
            {/* Meta Headers */}
            <header className="space-y-6">
              <div className="inline-flex items-center space-x-2 text-cyan-400 text-xs font-semibold uppercase tracking-[0.25em]">
                <BookOpen className="w-3.5 h-3.5" />
                <span>{post.category}</span>
              </div>
              <SpotlightHeading title={post.title} />
              
              <div className="flex items-center space-x-6 text-xs text-neutral-500 font-mono border-y border-neutral-900 py-4">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  {post.date}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  {post.readingTime}
                </span>
              </div>
            </header>

            {post.image && (
              <div className="w-full rounded-2xl overflow-hidden border border-neutral-900 bg-neutral-950/40 shadow-[0_20px_50px_rgba(0,0,0,0.8)] my-8">
                <Image 
                  src={post.image || '/assets/placeholder/default-placeholder.png'} 
                  alt={`Neural Noir Blog - ${post.title} - AI generated photorealistic infographic`}
                  width={1200}
                  height={630}
                  priority
                  className="w-full h-auto max-h-[600px] object-contain mx-auto block"
                />
              </div>
            )}

            {/* Article Sections */}
            <div className="space-y-12 text-neutral-400 font-light leading-relaxed text-sm md:text-base">
              {post.content.map((sec, sIdx) => (
                <section 
                  key={sIdx} 
                  id={sec.sectionTitle ? getSectionId(sec.sectionTitle) : undefined} 
                  className="space-y-6 scroll-mt-28"
                >
                  {sec.sectionTitle && (
                    <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                      {sec.sectionTitle}
                    </h2>
                  )}

                  {sec.sectionImage && (
                    <div className="w-full rounded-xl overflow-hidden border border-neutral-900/60 bg-neutral-950/20 my-6">
                      <Image 
                        src={sec.sectionImage} 
                        alt={sec.sectionImageAlt || 'Neural Noir Diagram'} 
                        width={800}
                        height={450}
                        className="w-full h-auto max-h-[400px] object-contain mx-auto"
                      />
                    </div>
                  )}
                  
                  {sec.paragraphs && sec.paragraphs.length > 0 && (
                    <div className="space-y-4">
                      {sec.paragraphs.map((pText, pIdx) => (
                        <p key={pIdx} dangerouslySetInnerHTML={{ __html: pText }} />
                      ))}
                    </div>
                  )}

                  {sec.bullets && sec.bullets.length > 0 && (
                    <ul className="space-y-4 my-6">
                      {sec.bullets.map((b, bIdx) => (
                        <li key={bIdx} className="flex items-start text-sm md:text-base text-neutral-300">
                          <span className="text-cyan-400 mr-3 mt-1.5 w-1.5 h-1.5 rounded-full bg-cyan-400 flex-shrink-0" />
                          <span dangerouslySetInnerHTML={{ __html: b }} />
                        </li>
                      ))}
                    </ul>
                  )}

                  {sec.afterParagraphs && sec.afterParagraphs.length > 0 && (
                    <div className="space-y-4 mt-4">
                      {sec.afterParagraphs.map((pText, pIdx) => (
                        <p key={pIdx} dangerouslySetInnerHTML={{ __html: pText }} />
                      ))}
                    </div>
                  )}

                  {sec.codeBlock && (
                    <pre className="p-6 rounded-xl border border-neutral-900 bg-neutral-950/60 font-mono text-xs md:text-sm text-cyan-400 overflow-x-auto my-6 leading-relaxed">
                      <code>{sec.codeBlock}</code>
                    </pre>
                  )}

                  {sec.table && (
                    <div className="overflow-x-auto my-8 rounded-xl border border-neutral-900 bg-neutral-950/40">
                      <table className="w-full text-left border-collapse text-xs md:text-sm">
                        <thead>
                          <tr className="border-b border-neutral-900 bg-neutral-900/20 text-neutral-400 font-mono">
                            {sec.table.headers.map((h, hIdx) => (
                              <th key={hIdx} className="p-4 font-semibold uppercase tracking-wider">{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-900/50 text-neutral-300">
                          {sec.table.rows.map((row, rIdx) => (
                            <tr key={rIdx} className="hover:bg-neutral-900/10 transition-colors">
                              {row.map((cell, cIdx) => (
                                <td key={cIdx} className="p-4 font-light">{cell}</td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {sec.ctaText && (
                    <BlogCTA text={sec.ctaText} />
                  )}
                </section>
              ))}
            </div>

          </article>
        </div>
      </div>
    </div>
  );
}
