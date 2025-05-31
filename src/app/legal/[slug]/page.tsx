
import { getLegalPageSlugs, getLegalPageData } from '@/lib/articles';
import type { LegalPageContent } from '@/types';
import { MarkdownRenderer } from '@/components/markdown-renderer';
import { notFound } from 'next/navigation';
import { siteConfig, navItems } from '@/config/site'; // Updated import

interface LegalPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const paths = getLegalPageSlugs();
  return paths.map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: LegalPageProps) {
  const page = await getLegalPageData(params.slug);
  if (!page) {
    return { title: '页面未找到' };
  }
  // Use the directly imported navItems
  const legalNavItem = navItems.find(item => item.href.startsWith('/legal'));
  const sectionTitle = legalNavItem?.title || '法律声明';

  return {
    title: `${page.title} | ${sectionTitle}`,
    description: `阅读 ${siteConfig.name} 的 ${page.title}。`,
  };
}

export default async function LegalPage({ params }: LegalPageProps) {
  const pageData = await getLegalPageData(params.slug);

  if (!pageData) {
    notFound();
  }

  return (
    <div className="prose dark:prose-invert max-w-none bg-card p-6 sm:p-8 rounded-lg shadow">
      <h1 className="text-3xl font-bold text-primary mb-6">{pageData.title}</h1>
      <MarkdownRenderer content={pageData.content} />
    </div>
  );
}
