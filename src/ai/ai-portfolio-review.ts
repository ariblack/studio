'use server';

/**
 * @fileOverview An AI-powered portfolio review tool.
 *
 * - reviewPortfolioSection - A function that reviews a section of a portfolio and provides feedback.
 * - ReviewPortfolioSectionInput - The input type for the reviewPortfolioSection function.
 * - ReviewPortfolioSectionOutput - The return type for the reviewPortfolioSection function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ReviewPortfolioSectionInputSchema = z.object({
  portfolioSection: z
    .string()
    .describe('The specific section of the portfolio to be reviewed.'),
});
export type ReviewPortfolioSectionInput = z.infer<
  typeof ReviewPortfolioSectionInputSchema
>;

const ReviewPortfolioSectionOutputSchema = z.object({
  feedback: z.string().describe('AI-generated feedback on the portfolio section.'),
  actionableSteps: z
    .string()
    .describe('Actionable steps to improve the portfolio section based on best practices.'),
});
export type ReviewPortfolioSectionOutput = z.infer<
  typeof ReviewPortfolioSectionOutputSchema
>;

export async function reviewPortfolioSection(
  input: ReviewPortfolioSectionInput
): Promise<ReviewPortfolioSectionOutput> {
  return reviewPortfolioSectionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'reviewPortfolioSectionPrompt',
  input: {schema: ReviewPortfolioSectionInputSchema},
  output: {schema: ReviewPortfolioSectionOutputSchema},
  prompt: `You are an AI-powered portfolio review tool. Analyze the following portfolio section and provide feedback and actionable steps to improve it based on industry best practices.

Portfolio Section:
{{{portfolioSection}}}

Provide specific and constructive feedback that can help the user enhance their portfolio.
Suggest actionable steps that the user can take to implement the feedback and improve their portfolio section.
Format the actionable steps as a numbered list.
`,
});

const reviewPortfolioSectionFlow = ai.defineFlow(
  {
    name: 'reviewPortfolioSectionFlow',
    inputSchema: ReviewPortfolioSectionInputSchema,
    outputSchema: ReviewPortfolioSectionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
