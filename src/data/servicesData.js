import { Video, Smartphone, BarChart3, Film, Music, Camera, Image as ImageIcon } from 'lucide-react';

export const servicesData = {
  'ai-cinematic-video-production': {
    id: 'ai-video',
    slug: 'ai-cinematic-video-production',
    title: 'AI Video Production',
    description: 'Lock-in character consistency, photorealistic lighting synthesis, and custom world-building environments.',
    icon: Video,
    image: '/assets/services/hover-ai-video.jpg',
    featureSectionTitle: 'The Neural Noir Production Standard',
    features: [
      { 
        title: 'AI is the Raw Material; Cinematic Compositing is the Polish', 
        desc: 'We do not just click "generate" and deliver. AI generation is merely step one in our pipeline. Our team of digital compositors, motion designers, and neural editors take that raw generative material and meticulously refine, mask, and temporally stabilize it into a flawless, Hollywood-grade final cut.' 
      },
      { 
        title: 'Uncompromising 4K Cinematic Fidelity', 
        desc: 'We upscale, enhance, and color-grade every sequence to true 4K resolution. You receive crisp, breathtakingly detailed cinematic quality that looks indistinguishable from a high-budget live-action commercial shoot.' 
      },
      { 
        title: 'Strict Brand & Visual Lock-In', 
        desc: 'Using advanced reference-driven AI training (<a href="/blog/character-consistency-diffusion-models" class="text-cyan-400 hover:underline">custom LoRAs</a> and deterministic character weights), we guarantee your physical product—down to the exact light refraction on glass and metallic textures—remains mathematically consistent across every scene, angle, and environment.' 
      },
      { 
        title: 'The 80% Economic Edge', 
        desc: 'Achieve blockbuster visual scale while slashing traditional commercial production budgets by up to 80%. By replacing physical sets and bloated crews with a streamlined team of generative video experts, we deliver your digital assets faster and far more cost-effectively.' 
      }
    ],
    targetAudience: 'Hollywood Indies, UK/US Creative Agencies, Enterprise Brand Directors',
    header: 'Next-Gen Cinematic Video Production',
    valueProp: 'Eliminate $50,000+ in logistics overhead. No location scouting, no massive crew management, no scheduling bottlenecks. We leverage generative diffusion networks to engineer photorealistic lighting synthesis and custom world-building environments within hours—not months.',
    metrics: [
      { value: '80%', label: 'Cost Reduction' },
      { value: '10x', label: 'Production Velocity' },
      { value: 'Frame-by-Frame', label: 'Asset Consistency' }
    ],
    seoTitle: 'AI Cinematic Video Production | Neural Noir Studios',
    seoDescription: 'Eliminate massive production overhead. We engineer 4K photorealistic AI commercial videos with strict brand and character consistency. Request a project brief.'
  },
  'short-form-video': {
    id: 'short-form',
    slug: 'short-form-video',
    title: 'Short-Form Video Content',
    description: 'Engineered for viral velocity with 2-second visual hooks, vertical layout optimizations, and high-volume iterations.',
    icon: Smartphone,
    image: '/assets/services/hover-short-form.jpg',
    featureSectionTitle: 'The Short-Form Architecture',
    features: [
      { 
        title: 'The 2-Second Hook Framework', 
        desc: 'The battle is won or lost in the first 48 frames. We deploy intense, "thumb-stopping" visual hooks—surreal transitions, dynamic camera drops, and striking color contrast—designed entirely to break scroll fatigue and force the viewer to stop.' 
      },
      { 
        title: 'Algorithmic Native Formatting', 
        desc: 'Every video is built natively for the vertical feed. We map out UI "safe zones," optimize visual pacing for short attention spans, and ensure the core brand message is delivered before the viewer has a chance to swipe.' 
      },
      { 
        title: 'High-Volume Multivariate Testing', 
        desc: 'Stop guessing what works. Because our AI pipeline is incredibly fast, we don\'t just give you one ad—we provide rapid, high-volume variations of hooks, scripts, and visuals so you can A/B test in real-time and scale the winning variable.' 
      },
      { 
        title: 'Audio-Reactive Pacing', 
        desc: 'A visual hook is only half the equation. We sync our edits flawlessly to high-retention audio tracks, mapping cuts, speed-ramps, and visual impacts directly to the frequency and rhythm of the sound design to maximize viewer retention.' 
      }
    ],
    targetAudience: 'Premium Direct-to-Consumer (DTC) Brands, FinTech Startups, Global Content Creators',
    header: 'Engineered for Viral Velocity',
    valueProp: 'Attention is the most expensive currency on the internet. We don\'t just make vertical videos; we engineer high-converting visual assets specifically designed to manipulate platform algorithms and dominate TikTok, Reels, and YouTube Shorts.',
    metrics: [
      { value: '300%', label: 'Engagement Surge' },
      { value: 'Zero', label: 'Editing Retainers' },
      { value: '24-Hour', label: 'Deployment' }
    ],
    seoTitle: 'High-Volume Short-Form AI Editing Engine | TikTok, Reels, Shorts',
    seoDescription: 'Deploy hyper-targeted short-form video pipelines across US/UK markets. Automate visual variations and integrate 2-second psychological hooks with AI.'
  },
  'video-ads-production': {
    id: 'video-ads',
    slug: 'video-ads-production',
    title: 'Video Ads Production',
    description: 'Direct-Response psychological marketing layouts blended with premium material texture rendering and persona-targeted color grading.',
    icon: BarChart3,
    image: '/assets/services/hover-video-ads.jpg',
    featureSectionTitle: 'The Neural Noir Ad Framework',
    features: [
      {
        title: 'Photorealistic Material Textures',
        desc: 'Crucial for luxury goods, jewelry, and cosmetics. Our specialized rendering process guarantees that the glint of gold, the refraction of glass, and the texture of liquid are rendered with flawless, high-end realism.'
      },
      {
        title: 'Direct-Response Psychological Marketing Layouts',
        desc: 'We don’t just make art; we engineer sales. Every frame is composed to guide the viewer’s eye toward the product, utilizing strategic color theory, visual hierarchy, and persona-targeted color grading.'
      },
      {
        title: 'Human-Led VFX Integration',
        desc: 'AI provides the foundational assets, but our human compositors step in to perfect the reflections, adjust the lighting flares, and ensure the product integrates seamlessly into the digital environment.'
      },
      {
        title: 'Massive Budget Reduction for A/B Testing',
        desc: 'Eliminate the cost of physical reshoots. We provide rapid, cost-effective variations of different environments, lighting setups, and angles so your marketing team can aggressively A/B test and find the winning creative.'
      }
    ],
    targetAudience: 'High-Growth E-Commerce Brands, Performance Marketers in London/New York',
    header: 'Precision-Targeted Commercial Campaigns',
    valueProp: 'Ads that don’t just look cinematic—they convert. We merge Direct-Response psychological marketing frameworks with hyper-realistic AI generation to create high-performing, high-fidelity ad creatives.',
    metrics: [
      { value: '+45%', label: 'Click-Through Rate (CTR)' },
      { value: 'Infinite', label: 'Creative Variations' },
      { value: 'Maximized', label: 'ROAS' }
    ],
    seoTitle: 'Performance-Driven AI Video Ads | Scale Ad Creative & ROAS',
    seoDescription: 'Beat ad creative fatigue. Rapid material texture rendering and persona-targeted color grading variants to continuously A/B test hooks and boost CTR.'
  },
  'branded-film-production': {
    id: 'branded-film',
    slug: 'branded-film-production',
    title: 'Branded Film Production',
    description: 'Unified visual bibles, complex emotional storytelling pacing, and deep "noir" cinematic atmospheres.',
    icon: Film,
    image: '/assets/services/hover-branded-film.jpg',
    featureSectionTitle: 'The Cinematic Standard',
    features: [
      {
        title: 'Unified Visual Bibles',
        desc: 'Consistency is everything in film. We establish strict visual rulebooks—locking in specific lenses, film grain, and color palettes—so that minute one of your film looks identical in style to minute ten.'
      },
      {
        title: 'Deep "Noir" Atmospheres',
        desc: 'We specialize in premium, high-contrast aesthetics. Expect deep cinematic shadows, dramatic rim lighting, and volumetric mist that elevate your brand\'s perceived value to Hollywood levels.'
      },
      {
        title: 'Director-Driven Emotional Pacing',
        desc: 'AI cannot pace a story. Our team of veteran film directors and editors orchestrate the AI-generated assets, dictating the rhythm of the cuts, the emotional swell of the music, and the physical weight of the camera movement.'
      },
      {
        title: 'Blockbuster Scale, 80% Less Overhead',
        desc: 'Tell stories that were previously impossible on a standard budget. Want your product featured on a snowy mountain peak or a neon-drenched cyberpunk rooftop? We build it digitally, saving you tens of thousands in location fees.'
      }
    ],
    targetAudience: 'Fortune 500 Corporate Communications, Luxury Brands in Europe/US',
    header: 'High-Fidelity Branded Cinema',
    valueProp: 'Long-form storytelling requires absolute atmospheric control and emotional resonance. We replace massive, expensive film crews with specialized AI pipelines and human directors to forge deep, cinematic worlds for forward-thinking brands.',
    metrics: [
      { value: 'Blockbuster', label: 'Scale Fidelity' },
      { value: 'Custom', label: 'Trained Model Property' },
      { value: 'Global', label: 'Distribution Ready' }
    ],
    seoTitle: 'Cinematic Branded AI Films & Storytelling | Neural Noir Studios',
    seoDescription: 'Blend human director vision with custom trained AI hyper-realism models. Ensure character lock-in and high-end cinematic atmosphere on budget.'
  },
  'music-ai-video': {
    id: 'music-video',
    slug: 'music-ai-video',
    title: 'Music AI Video Content',
    description: 'Audio-reactive frequency mapping with rhythmic continuity transitions and surreal digital art direction.',
    icon: Music,
    image: '/assets/services/hover-music-video.jpg',
    featureSectionTitle: 'The Audio-Visual Pipeline',
    features: [
      {
        title: 'Audio-Reactive Frequency Mapping',
        desc: 'We don\'t just cut to the beat. Our visual effects team links the specific frequencies of your music (the kick drum, the sub-bass, the synth lines) directly to the visual parameters, making the environment physically react to the sound.'
      },
      {
        title: 'Continuous Rhythmic Transitions',
        desc: 'We eliminate jarring, disjointed cuts, replacing them with fluid, physics-based motion and seamless morphing transitions that keep the viewer entirely entranced.'
      },
      {
        title: 'Surreal Art Direction',
        desc: 'Break free from physical limitations. If you want a digital world that bends gravity or shifts through dimensions, our AI researchers and 3D animators can build environments that cannot be filmed in reality.'
      },
      {
        title: 'High-Speed Output for the Music Industry',
        desc: 'The music industry moves fast. Our AI-driven pipeline allows us to deliver highly complex, visually stunning lyric videos, visualizers, or full music videos in a fraction of traditional timelines.'
      }
    ],
    targetAudience: 'Record Labels, Independent Artists in Los Angeles/London/Berlin',
    header: 'Audio-Reactive Digital Artistry',
    valueProp: 'Synchronizing sight and sound to create hypnotic visual experiences. We build surreal, rhythmic digital art that breathes, moves, and shifts in perfect mathematical harmony with your audio tracks.',
    metrics: [
      { value: 'Seamless', label: 'Audio-Visual Sync' },
      { value: 'Immersive', label: 'Surreal Aesthetics' },
      { value: 'Independent', label: 'Budget Friendly' }
    ],
    seoTitle: 'Audio-Reactive AI Music Videos | Surreal Digital Art Visuals',
    seoDescription: 'Generate audio-reactive rhythmic continuity transitions and dreamscape music videos tuned perfectly to sonic frequencies for chart-topping songs.'
  },
  'product-photoshoots': {
    id: 'product-photoshoots',
    slug: 'product-photoshoots',
    title: 'Product Photoshoots',
    description: 'AI Commercial Photography delivering flawless macro precision with infinite virtual lighting setups and structural integrity masking.',
    icon: Camera,
    image: '/assets/services/hover-photoshoots.jpg',
    featureSectionTitle: 'The Virtual Studio Advantage',
    features: [
      {
        title: 'Flawless Macro Precision',
        desc: 'We generate imagery at absolute true-to-life 4K resolutions, allowing for extreme close-up macro shots where every detail, facet, and texture of your product is razor-sharp.'
      },
      {
        title: 'Strict Structural Integrity',
        desc: 'The biggest risk with AI is product mutation. We utilize advanced control networks and rigid masking techniques to guarantee the shape, branding, and text of your product remain 100% accurate to real life.'
      },
      {
        title: 'Infinite Lighting & Environments',
        desc: 'Want your perfume bottle bathed in golden hour light in Paris, and then immediately under harsh studio strobes in a modern concrete room? We swap lighting setups and backgrounds in minutes, not days.'
      },
      {
        title: 'Cost-Effective Campaign Scaling',
        desc: 'Generate 50 unique, hyper-realistic lifestyle photos for your website and social feeds for the cost of one traditional physical photoshoot.'
      }
    ],
    targetAudience: 'Luxury Apparel, Premium Cosmetics, Hardware Tech Brands',
    header: 'Infinite Virtual Photography',
    valueProp: 'Eliminate the need for expensive studio rentals, physical lighting rigs, and weather delays. We deliver AI Commercial Photography offering flawless, photorealistic product imagery using advanced digital masking and infinite virtual environments.',
    metrics: [
      { value: 'Zero', label: 'Shipping/Studio Fees' },
      { value: '100% Scalable', label: 'Commercial Imagery' },
      { value: '1-Click', label: 'Retake Portal' }
    ],
    seoTitle: 'Virtual AI Product Photoshoots | Infinite Environments & Studio Lighting',
    seoDescription: 'Scale cosmetic and tech commercial photography with virtual staging. Send 3 images or a 3D asset to render infinite studio lighting setups.'
  },
  'brand-poster-creation': {
    id: 'brand-poster',
    slug: 'brand-poster-creation',
    title: 'Brand Poster Creation',
    description: 'High-resolution print canvas upscaling, impactful graphic composition, and unified campaign styling.',
    icon: ImageIcon,
    image: '/assets/services/hover-brand-poster.jpg',
    featureSectionTitle: 'The Key Art Process',
    features: [
      {
        title: 'Print-Ready Canvas Upscaling',
        desc: 'Standard AI generation is too low-resolution for physical print. We utilize cutting-edge AI upscaling networks to push our final composite images to true 8K+ resolution, ensuring they look immaculate on a 40-foot billboard or a high-end magazine spread.'
      },
      {
        title: 'Impactful Graphic Composition',
        desc: 'Beautiful imagery requires beautiful design. Our expert human graphic designers take the high-fidelity AI renders and apply premium typography, layout hierarchy, and logo placement.'
      },
      {
        title: 'Unified Campaign Styling',
        desc: 'We ensure your static posters flawlessly match the color grading, lighting, and characters of your video ads, creating a cohesive, omnichannel brand presence.'
      },
      {
        title: 'Rapid Turnaround for Agile Marketing',
        desc: 'Need to launch a massive Out-Of-Home (OOH) marketing campaign by next week? Our hybrid AI-to-Design workflow allows us to deliver premium key art at unprecedented speeds.'
      }
    ],
    targetAudience: 'Hollywood Indies, Brand Advertisers, Luxury Print Campaigns',
    header: 'Cinematic Print & Digital Key Art',
    valueProp: 'Impactful graphic composition designed to dominate both digital feeds and physical billboards. We craft striking, unified campaign posters that demand attention.',
    metrics: [
      { value: 'Print-Ready', label: 'Canvas Upscaling' },
      { value: 'Unified', label: 'Campaign Styling' },
      { value: '100%', label: 'Aesthetic Consistency' }
    ],
    seoTitle: 'Cinematic Brand Poster Creation | High-Res Print Upscaling',
    seoDescription: 'Scale conceptual designs to infinite print-ready canvases using neural upscaling networks. Create high-resolution campaign assets.'
  }
};
