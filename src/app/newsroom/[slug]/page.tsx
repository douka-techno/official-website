
import { getAllArticleSlugs, getArticleData } from '@/lib/articles';
import type { NewsArticle } from '@/types';
import { Container } from '@/components/container';
import { MarkdownRenderer } from '@/components/markdown-renderer';
import Image from 'next/image';
import { Calendar, UserCircle, Tag } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface ArticlePageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const paths = getAllArticleSlugs();
  return paths;
}

export async function generateMetadata({ params }: ArticlePageProps) {
  const article = await getArticleData(params.slug);
  if (!article) {
    return { title: '文章未找到' };
  }
  return {
    title: article.title,
    description: article.summary, // 摘要通常是中文，来自markdown
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const article = await getArticleData(params.slug);

  if (!article) {
    notFound();
  }

  return (
    <Container className="max-w-3xl mx-auto">
      <article>
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-primary mb-3">{article.title}</h1>
          <div className="flex flex-wrap items-center space-x-4 text-sm text-muted-foreground mb-4">
            <div className="flex items-center">
              <Calendar className="mr-1.5 h-4 w-4" />
              {new Date(article.date).toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
            <div className="flex items-center">
              <UserCircle className="mr-1.5 h-4 w-4" />
              {article.author}
            </div>
          </div>
          {article.tags && article.tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <Tag className="mr-1.5 h-4 w-4 text-muted-foreground" />
              {article.tags.map(tag => (
                <Badge key={tag} variant="secondary">{tag}</Badge> // 标签通常也是中文，来自markdown
              ))}
            </div>
          )}
          {article.image && (
            <div className="relative aspect-video w-full rounded-lg overflow-hidden shadow-lg my-6">
              <Image
                src={article.image}
                alt={article.title} // alt 文本通常使用文章标题
                data-ai-hint={article.dataAiHint || "article cover"}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}
        </header>
        
        <MarkdownRenderer content={article.content} />

        <div className="mt-12 border-t pt-8 text-center">
            <Button asChild variant="outline">
                <Link href="/newsroom">
                    &larr; 返回新闻动态
                </Link>
            </Button>
        </div>
      </article>
    </Container>
  );
}
