
// Summarize Articles Flow
'use server';
/**
 * @fileOverview 一个个性化的文章推荐 AI 代理。
 *
 * - summarizeArticles - 处理文章摘要过程的函数。
 * - SummarizeArticlesInput - summarizeArticles 函数的输入类型。
 * - SummarizeArticlesOutput - summarizeArticles 函数的返回类型。
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeArticlesInputSchema = z.object({
  userProfile: z
    .string()
    .describe('用户画像描述，包括其兴趣和需求。'),
  articles: z
    .array(z.object({title: z.string(), content: z.string()}))
    .describe('待总结的文章数组。'),
});
export type SummarizeArticlesInput = z.infer<typeof SummarizeArticlesInputSchema>;

const SummarizeArticlesOutputSchema = z.array(
z.object({
    title: z.string().describe('文章标题。'),
    summary: z.string().describe('文章的简短摘要。'),
    relevance: z.string().describe('文章与用户画像的相关性。')
  })
);
export type SummarizeArticlesOutput = z.infer<typeof SummarizeArticlesOutputSchema>;

export async function summarizeArticles(input: SummarizeArticlesInput): Promise<SummarizeArticlesOutput> {
  return summarizeArticlesFlow(input);
}

const summarizeArticlesPrompt = ai.definePrompt({
  name: 'summarizeArticlesPrompt',
  input: {schema: SummarizeArticlesInputSchema},
  output: {schema: SummarizeArticlesOutputSchema},
  prompt: `你是一个AI助手，根据用户画像向用户推荐文章。\n\n用户画像：{{{userProfile}}}\n\n文章：\n{{#each articles}}\n标题：{{{this.title}}}\n内容：{{{this.content}}}\n{{/each}}\n\n请根据用户画像为每篇文章提供摘要和相关性评分。返回一个JSON对象数组，包含文章的标题、摘要和相关性评分。\n`, 
});

const summarizeArticlesFlow = ai.defineFlow(
  {
    name: 'summarizeArticlesFlow',
    inputSchema: SummarizeArticlesInputSchema,
    outputSchema: SummarizeArticlesOutputSchema,
  },
  async input => {
    const {output} = await summarizeArticlesPrompt(input);
    return output!;
  }
);
