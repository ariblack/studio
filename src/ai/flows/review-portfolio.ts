'use server';

import {ai} from '@/ai/genkit';
import {z} from 'zod';

const ReviewPortfolioInputSchema = z.object({
  portfolioText: z.string(),
});
export type ReviewPortfolioInput = z.infer<typeof ReviewPortfolioInputSchema>;

const ReviewPortfolioOutputSchema = z.string();
export type ReviewPortfolioOutput = z.infer<typeof ReviewPortfolioOutputSchema>;

export async function reviewPortfolio(
  input: ReviewPortfolioInput
): Promise<ReviewPortfolioOutput> {
  return reviewPortfolioFlow(input);
}

const reviewPortfolioFlow = ai.defineFlow(
  {
    name: 'reviewPortfolioFlow',
    inputSchema: ReviewPortfolioInputSchema,
    outputSchema: ReviewPortfolioOutputSchema,
  },
  async ({portfolioText}) => {
    const llm = ai.getLlm('googleai/gemini-2.5-flash');
    const prompt = `You are an expert portfolio reviewer for software engineers and designers. 
    Analyze the following portfolio section and provide feedback on its strengths and weaknesses, with actionable steps for improvement. 
    Focus on clarity, impact, and presentation. Format the output as plain text with clear headings (e.g., 'STRENGTHS:', 'AREAS FOR IMPROVEMENT:') and lists using asterisks (*). Be concise but thorough.
    
    Portfolio Section:
    ---
    ${portfolioText}
    ---
    `;
    const result = await llm.generate({prompt});
    return result.text();
  }
);
