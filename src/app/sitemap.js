import { blogData } from '@/data/blogData';
import { servicesData } from '@/data/servicesData';

export default function sitemap() {
  const baseUrl = 'https://neuralnoirstudio.com';

  // Base static routes
  const routes = [
    '',
    '/blog',
    '/work',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'daily',
    priority: route === '' ? 1.0 : 0.8,
  }));

  // Dynamic services routes (mapping custom URL paths appropriately)
  const serviceRoutes = Object.values(servicesData).map((service) => {
    const path = service.slug === 'ai-cinematic-video-production'
      ? `/${service.slug}`
      : `/services/${service.slug}`;

    return {
      url: `${baseUrl}${path}`,
      lastModified: new Date().toISOString().split('T')[0],
      changeFrequency: 'weekly',
      priority: 0.7,
    };
  });

  // Dynamic blog post routes
  const blogRoutes = Object.values(blogData).map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  // Dynamic blog categories routes
  const categories = Array.from(new Set(Object.values(blogData).map((post) => post.category)));
  const categoryRoutes = categories.map((cat) => {
    const slug = cat.toLowerCase()
      .replace(/ & /g, '-and-')
      .replace(/[^a-z0-9]+/g, '-');
    return {
      url: `${baseUrl}/blog/category/${slug}`,
      lastModified: new Date().toISOString().split('T')[0],
      changeFrequency: 'weekly',
      priority: 0.5,
    };
  });

  return [...routes, ...serviceRoutes, ...blogRoutes, ...categoryRoutes];
}
