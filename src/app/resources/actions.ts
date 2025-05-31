
'use server';

import { getSortedArticlesData, getArticleData } from '@/lib/articles';
import type { NewsArticleMeta, NewsArticle } from '@/types';

export interface ArticleForAI {
  title: string;
  content: string; // This will be the summary for the AI
  slug?: string;
}

export async function getArticlesForAI(): Promise<ArticleForAI[]> {
  const articleMetas: NewsArticleMeta[] = getSortedArticlesData();
  // Fetch full content or summaries for a limited number of articles
  const articlesToProcess = articleMetas.slice(0, 10); // Limiting to 10 for performance

  const fetchedArticles = await Promise.all(
    articlesToProcess.map(async (meta) => {
      // For the AI, we'll pass the summary as 'content' to keep it concise
      // If full content is needed, getArticleData(meta.slug) would be used for articleData.content
      return {
        title: meta.title,
        content: meta.summary, // Using summary for the AI as per existing logic
        slug: meta.slug
      };
    })
  );
  // Ensure we only return articles that have a title and content
  return fetchedArticles.filter(a => a.title && a.content);
}
