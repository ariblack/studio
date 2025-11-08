"use server";

import { reviewPortfolio } from "@/ai/flows/review-portfolio";
import { z } from "zod";

export async function reviewPortfolioAction(prevState: any, formData: FormData) {
  const schema = z.object({
    portfolioText: z.string().min(50, "Please enter at least 50 characters to get a meaningful review."),
  });

  const validatedFields = schema.safeParse({
    portfolioText: formData.get("portfolioText"),
  });

  if (!validatedFields.success) {
    return {
      message: "Validation failed",
      errors: validatedFields.error.flatten().fieldErrors,
      data: null,
    };
  }

  try {
    const result = await reviewPortfolio({ portfolioText: validatedFields.data.portfolioText });
    return { message: "Success", data: result, errors: null };
  } catch (e) {
    console.error(e);
    return { message: "An error occurred during portfolio review.", errors: { _server: [(e as Error).message] }, data: null };
  }
}

const contactSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

export async function sendContactMessage(prevState: any, formData: FormData) {
  const validatedFields = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  });

  if (!validatedFields.success) {
    return {
      message: "Validation failed",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // Simulate sending the message
  console.log("New contact message:", validatedFields.data);

  return { message: "Your message has been sent successfully!", errors: null, data: validatedFields.data };
}
