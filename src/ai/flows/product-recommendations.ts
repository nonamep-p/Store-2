'use server';

/**
 * @fileOverview AI-powered product recommendations based on viewed or carted products.
 *
 * - getProductRecommendations - A function to retrieve product recommendations.
 * - ProductRecommendationsInput - The input type for the getProductRecommendations function.
 * - ProductRecommendationsOutput - The return type for the getProductRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProductRecommendationsInputSchema = z.object({
  productIds: z.array(z.string()).describe('The IDs of the products currently viewed or in the cart.'),
  numberOfRecommendations: z.number().default(3).describe('The number of product recommendations to return.'),
});
export type ProductRecommendationsInput = z.infer<typeof ProductRecommendationsInputSchema>;

const ProductRecommendationsOutputSchema = z.object({
  recommendedProductIds: z.array(z.string()).describe('The IDs of the recommended products.'),
});
export type ProductRecommendationsOutput = z.infer<typeof ProductRecommendationsOutputSchema>;

export async function getProductRecommendations(input: ProductRecommendationsInput): Promise<ProductRecommendationsOutput> {
  return productRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'productRecommendationsPrompt',
  input: {schema: ProductRecommendationsInputSchema},
  output: {schema: ProductRecommendationsOutputSchema},
  prompt: `You are a helpful shopping assistant. Given a list of product IDs, you will respond with a list of recommended product IDs that the user might also be interested in.

  Product IDs: {{productIds}}

  Return {{numberOfRecommendations}} recommended product IDs.
  Do not repeat any of the original product IDs in the recommendation.
  Respond with ONLY a JSON array of product IDs.
  `,
});

const productRecommendationsFlow = ai.defineFlow(
  {
    name: 'productRecommendationsFlow',
    inputSchema: ProductRecommendationsInputSchema,
    outputSchema: ProductRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
