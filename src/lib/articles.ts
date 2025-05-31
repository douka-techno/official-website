import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { NewsArticle, NewsArticleMeta, LegalPageContent, LegalPageInfo } from '@/types';

const articlesDirectory = path.join(process.cwd(), 'src/content/articles');
const legalDirectory = path.join(process.cwd(), 'src/content/legal');

export function getSortedArticlesData(): NewsArticleMeta[] {
  const fileNames = fs.readdirSync(articlesDirectory);
  const allArticlesData = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, '');
    const fullPath = path.join(articlesDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    return {
      slug,
      ...(matterResult.data as { title: string; date: string; author: string; summary: string, tags?: string[], image?: string, dataAiHint?: string }),
    };
  });

  return allArticlesData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getAllArticleSlugs() {
  const fileNames = fs.readdirSync(articlesDirectory);
  return fileNames.map((fileName) => {
    return {
      params: {
        slug: fileName.replace(/\.md$/, ''),
      },
    };
  });
}

export async function getArticleData(slug: string): Promise<NewsArticle | null> {
  const fullPath = path.join(articlesDirectory, `${slug}.md`);
  try {
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    // For now, we don't have a markdown to HTML processor,
    // so content will be raw markdown string.
    // You might want to use 'remark' or 'unified' to process markdown to HTML.
    const content = matterResult.content;

    return {
      slug,
      content,
      ...(matterResult.data as { title: string; date: string; author: string; summary: string, tags?: string[], image?: string, dataAiHint?: string }),
    };
  } catch (error) {
    console.error(`Error reading article ${slug}:`, error);
    return null;
  }
}


// Legal Pages
export function getLegalPageSlugs() {
  const fileNames = fs.readdirSync(legalDirectory);
  return fileNames.map((fileName) => {
    return {
      slug: fileName.replace(/\.md$/, ''),
    };
  });
}

export async function getLegalPageData(slug: string): Promise<LegalPageContent | null> {
  const fullPath = path.join(legalDirectory, `${slug}.md`);
  try {
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);
    const content = matterResult.content;

    return {
      slug,
      title: (matterResult.data as { title: string }).title || slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      content,
    };
  } catch (error) {
    console.error(`Error reading legal page ${slug}:`, error);
    return null;
  }
}
