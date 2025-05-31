
import Link from 'next/link';
import Image from 'next/image';
import { getSortedArticlesData } from '@/lib/articles';
import type { NewsArticleMeta } from '@/types';
import { Container } from '@/components/container';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, UserCircle } from 'lucide-react';
import { siteConfig } from '@/config/site';

export async function generateMetadata() {
  return {
    title: '新闻动态',
    description: `来自 ${siteConfig.name} 的最新新闻、文章和更新。`,
  };
}

export default function NewsroomPage() {
  const articles = getSortedArticlesData();

  return (
    <>
      <Container className="bg-secondary/30">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl">新闻动态</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            随时了解我们的最新文章、项目新闻和见解。
          </p>
        </div>
      </Container>

      <Container>
        {articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article: NewsArticleMeta) => (
              <Card key={article.slug} className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                {article.image && (
                  <Link href={`/newsroom/${article.slug}`} className="block">
                    <div className="aspect-video relative w-full">
                      <Image
                        src={article.image}
                        alt={article.title} // alt 文本通常使用文章标题
                        data-ai-hint={article.dataAiHint || "article image"}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </Link>
                )}
                <CardHeader>
                  <Link href={`/newsroom/${article.slug}`}>
                    <CardTitle className="text-xl hover:text-primary transition-colors">{article.title}</CardTitle>
                  </Link>
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground mt-2">
                    <div className="flex items-center">
                      <Calendar className="mr-1 h-3 w-3" />
                      {new Date(article.date).toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </div>
                    <div className="flex items-center">
                      <UserCircle className="mr-1 h-3 w-3" />
                      {article.author}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <CardDescription>{article.summary}</CardDescription>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="link" className="text-primary p-0">
                    <Link href={`/newsroom/${article.slug}`}>阅读更多 &rarr;</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground">暂无已发表文章。请稍后查看！</p>
        )}
      </Container>
    </>
  );
}
