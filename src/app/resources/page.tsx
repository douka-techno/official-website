
'use client';

import { useState, useEffect } from 'react';
import type { FormEvent } from 'react';
import { summarizeArticles, type SummarizeArticlesInput, type SummarizeArticlesOutput } from '@/ai/flows/summarize-articles';
import { getArticlesForAI, type ArticleForAI } from './actions'; // Updated import
import { Container } from '@/components/container';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Loader2, Sparkles, Lightbulb } from 'lucide-react'; // Removed LinkIcon as it's not used
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
// Removed siteConfig import as it's not directly used here, but Link needs it if generalResources links were dynamic
import Link from 'next/link';

export default function ResourcesPage() {
  const [userProfile, setUserProfile] = useState('');
  const [recommendations, setRecommendations] = useState<SummarizeArticlesOutput>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [articlesForAI, setArticlesForAI] = useState<ArticleForAI[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    async function fetchInitialArticles() {
      try {
        const fetchedArticles = await getArticlesForAI();
        setArticlesForAI(fetchedArticles);
        if (fetchedArticles.length === 0) {
            toast({
                title: "文章列表为空",
                description: "目前没有可供AI分析的文章。请稍后再试。",
                variant: "default"
            });
        }
      } catch (error) {
        console.error("获取AI文章时出错:", error);
        toast({
          title: "获取文章失败",
          description: "无法加载用于推荐的文章数据。请刷新页面重试。",
          variant: "destructive",
        });
      }
    }
    fetchInitialArticles();
  }, [toast]); // Added toast to dependency array as it's used inside

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!userProfile.trim()) {
      toast({
        title: "需要提供个人资料",
        description: "请描述您的兴趣或需求以获取推荐。",
        variant: "destructive",
      });
      return;
    }
    if (articlesForAI.length === 0) {
      toast({
        title: "没有文章可供分析",
        description: "AI推荐所需的文章列表为空或加载失败。请稍后重试。",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setRecommendations([]);

    try {
      // Pass only title and content to the AI
      const articlesInputForAI = articlesForAI.map(a => ({ title: a.title, content: a.content }));
      const input: SummarizeArticlesInput = {
        userProfile,
        articles: articlesInputForAI,
      };
      const result = await summarizeArticles(input);
      
      // Map slugs back to recommendations by title matching
      const resultWithSlugs = result.map(rec => {
        const originalArticle = articlesForAI.find(art => art.title === rec.title);
        return { ...rec, slug: originalArticle?.slug };
      });

      setRecommendations(resultWithSlugs);

      if (resultWithSlugs.length === 0) {
        toast({
            title: "未找到匹配的推荐",
            description: "根据您的描述，我们暂时没有找到合适的文章推荐。请尝试调整您的描述。",
        });
      } else {
        toast({
            title: "推荐已准备好！",
            description: "我们为您量身定制了一些文章。",
        });
      }
    } catch (error) {
      console.error("获取推荐时出错:", error);
      toast({
        title: "错误",
        description: "获取推荐失败。请稍后再试。",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const generalResources = [
    { title: "理解阿斯伯格综合征", description: "一系列介绍性文章和视频。", icon: Lightbulb, link: "#" },
    { title: "ADHD 管理策略", description: "用于专注和组织的工具与技巧。", icon: Lightbulb, link: "#" },
    { title: "心理健康工具包", description: "管理压力和促进心理健康的资源。", icon: Lightbulb, link: "#" },
  ];


  return (
    <>
      <Container className="bg-secondary/30">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl">资源中心</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            发现文章、工具和见解。根据您的兴趣获取个性化推荐。
          </p>
        </div>
      </Container>

      <Container>
        <Card className="mb-12 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl text-primary">
              <Sparkles className="mr-2 h-6 w-6" /> 个性化文章推荐
            </CardTitle>
            <CardDescription>
              告诉我们一些关于您的兴趣或您正在寻找的内容，我们的人工智能将为您推荐相关文章并提供摘要。
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Textarea
                  id="userProfile"
                  value={userProfile}
                  onChange={(e) => setUserProfile(e.target.value)}
                  placeholder="例如：“我对提高社交技能和管理焦虑感兴趣。”或“寻找关于生产力和专注力的技巧。”"
                  rows={4}
                  className="w-full text-base"
                  aria-label="您的兴趣或需求"
                />
              </div>
              <Button type="submit" disabled={isLoading || articlesForAI.length === 0} className="w-full sm:w-auto">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    正在获取推荐...
                  </>
                ) : (
                  '获取推荐'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {isLoading && (
          <div className="text-center py-8">
            <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary" />
            <p className="mt-2 text-muted-foreground">我们的人工智能正在为您整理文章...</p>
          </div>
        )}

        {!isLoading && recommendations.length > 0 && (
          <div>
            <h2 className="text-2xl font-semibold mb-6 text-center text-primary">这是您的个性化推荐：</h2>
            <div className="space-y-6">
              {recommendations.map((rec, index) => (
                <Card key={index} className="shadow-md hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle>{rec.title}</CardTitle>
                    <CardDescription className="text-sm text-primary pt-1">相关性：{rec.relevance}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{rec.summary}</p>
                    {(rec as any).slug && (
                       <Button variant="link" asChild className="mt-2 p-0 text-primary">
                         <Link href={`/newsroom/${(rec as any).slug}`}>阅读全文 &rarr;</Link>
                       </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
        
        {!isLoading && !recommendations.length && userProfile && !isLoading && (
           <Alert>
             <Lightbulb className="h-4 w-4" />
             <AlertTitle>暂无推荐！</AlertTitle>
             <AlertDescription>
               请尝试调整您的个人资料描述，或在我们添加更多文章后再次查看。
             </AlertDescription>
           </Alert>
        )}
      </Container>
      
      <Container className="bg-secondary/30">
        <h2 className="text-3xl font-bold text-center mb-12 text-primary">通用资源</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {generalResources.map(item => (
             <Card key={item.title} className="flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="items-center text-center">
                <div className="p-3 rounded-full bg-accent mb-4">
                  <item.icon className="h-8 w-8 text-accent-foreground" />
                </div>
                <CardTitle className="text-xl">{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <CardDescription className="text-center">{item.description}</CardDescription>
              </CardContent>
              <CardContent className="text-center">
                <Button asChild variant="outline">
                    <a href={item.link} target="_blank" rel="noopener noreferrer">探索</a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        <p className="text-center mt-12 text-muted-foreground">
          本版块将定期更新有价值的文章、工具和链接。目前，请浏览我们的 <Link href="/newsroom" className="text-primary hover:underline">新闻动态</Link> 获取更多内容。
        </p>
      </Container>
    </>
  );
}
