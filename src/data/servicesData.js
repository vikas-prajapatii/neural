import { Video, Smartphone, BarChart3, Film, Music, Camera } from 'lucide-react';

export const servicesData = {
  'ai-video-production': {
    id: 'ai-video',
    slug: 'ai-video-production',
    title: 'AI Video Production',
    description: 'Lock-in character consistency, multi-angle lighting synthesis, and custom world-building environments.',
    icon: Video,
    image: '/hover-ai-video.jpg',
    features: ['Character lock-in consistency', 'Multi-angle lighting synthesis', 'Infinite custom world-building'],
    targetAudience: 'Hollywood Indies, UK/US Creative Agencies, Enterprise Brand Directors',
    header: 'Next-Gen AI Cinematic Video Production Studio',
    valueProp: 'Eliminate $50,000+ logistics overhead. No location scouting, no massive crew management, no scheduling bottlenecks. We leverage generative diffusion networks to engineer multi-angle lighting synthesis and custom world-building environments within hours—not months.',
    metrics: [
      { value: '85%', label: 'Cost Reduction' },
      { value: '10x', label: 'Production Velocity' },
      { value: 'Frame-by-Frame', label: 'Asset Consistency' }
    ],
    seoTitle: 'Next-Gen AI Cinematic Video Production | Neural Noir Studios',
    seoDescription: 'Eliminate logistics overhead and schedule bottlenecks. Leverage generative diffusion networks to build multi-angle lighting and cinematic worlds in hours.'
  },
  'short-form-video': {
    id: 'short-form',
    slug: 'short-form-video',
    title: 'Short-Form Video Content',
    description: 'Engineered for viral velocity with 2-second visual hooks, vertical layout optimizations, and high-volume iterations.',
    icon: Smartphone,
    image: '/hover-short-form.jpg',
    features: ['2-second visual hooks', 'Vertical layout optimization', 'High-volume rapid asset variations'],
    targetAudience: 'Premium Direct-to-Consumer (DTC) Brands, FinTech Startups, Global Content Creators',
    header: 'High-Volume Viral Short-Form Engine (TikTok, Reels, Shorts)',
    valueProp: 'Scaling social presence across US/UK markets requires insane volume. Traditional editing teams take days per video. Our AI framework automates asset variations, engineers data-backed 2-second psychological hooks, and optimizes vertical layout tracking. We deploy hyper-targeted content pipelines that bypass creative fatigue.',
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
    description: 'Psychological marketing layout blended with premium material texture rendering and persona-targeted color grading.',
    icon: BarChart3,
    image: '/hover-video-ads.jpg',
    features: ['Psychological marketing layout', 'Material texture rendering', 'Persona-targeted color grading'],
    targetAudience: 'High-Growth E-Commerce Brands, Performance Marketers in London/New York',
    header: 'Psychological Performance-Driven AI Video Ads',
    valueProp: 'Stop losing ROAS to ad fatigue. Our AI workflows allow rapid material texture rendering and persona-targeted color grading variants to A/B test hooks continuously. We combine psychological marketing frameworks with scalable AI asset manipulation to trigger direct-response actions from western buyers.',
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
    image: '/hover-branded-film.jpg',
    features: ['Unified visual bibles', 'Emotional storytelling pacing', 'Deep "noir" cinematic atmospheres'],
    targetAudience: 'Fortune 500 Corporate Communications, Luxury Brands in Europe/US',
    header: 'High-Fidelity Branded AI Cinematic Films',
    valueProp: 'Brand storytelling requires premium visual bibles and a deep "noir" cinematic atmosphere. We blend raw human directorial vision with custom trained AI hyper-realism models. This ensures absolute character lock-in consistency and complex emotional pacing without the multi-million dollar traditional studio budget constraints.',
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
    image: '/hover-music-video.jpg',
    features: ['Audio-reactive frequency mapping', 'Rhythmic continuity transitions', 'Surreal art direction'],
    targetAudience: 'Record Labels, Independent Artists in Los Angeles/London/Berlin',
    header: 'Audio-Reactive Frequency-Mapped AI Music Videos',
    valueProp: 'Turn sonic frequencies into high-art visuals. Our infrastructure utilizes advanced audio-reactive frequency mapping to generate rhythmic continuity transitions, dreamscape sequences, and surreal digital art assets that move perfectly to the beat. High-end visuals for international charts at zero production overhead.',
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
    description: 'Flawless macro precision with infinite virtual lighting setups and structural integrity masking.',
    icon: Camera,
    image: '/hover-photoshoots.jpg',
    features: ['Flawless macro precision', 'Infinite virtual lighting setups', 'Structural integrity masking'],
    targetAudience: 'Luxury Apparel, Premium Cosmetics, Hardware Tech Brands',
    header: 'Virtual Infinite-Environment Product Photoshoots',
    valueProp: 'Shipping inventory to physical studios for commercial photography is an archaic bottleneck. Send us 3 clean images or a 3D asset model of your product. Our AI engine generates flawless macro precision styling, structural integrity masking, and maps it across infinite virtual lighting setups and global backgrounds effortlessly.',
    metrics: [
      { value: 'Zero', label: 'Shipping/Studio Fees' },
      { value: '100% Scalable', label: 'Commercial Imagery' },
      { value: '1-Click', label: 'Retake Portal' }
    ],
    seoTitle: 'Virtual AI Product Photoshoots | Infinite Environments & Studio Lighting',
    seoDescription: 'Scale cosmetic and tech commercial photography with virtual staging. Send 3 images or a 3D asset to render infinite studio lighting setups.'
  }
};
