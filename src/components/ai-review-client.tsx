"use client";

import { useFormState, useFormStatus } from "react-dom";
import { useEffect, useRef } from "react";
import { reviewPortfolioAction } from "@/app/actions";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Card, CardContent } from "./ui/card";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Bot, Sparkles } from "lucide-react";
import { Skeleton } from "./ui/skeleton";

const initialState: {
  message: string;
  data: string | null;
  errors: { portfolioText?: string[], _server?: string[] } | null;
} = {
  message: "",
  data: null,
  errors: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" aria-disabled={pending} className="w-full sm:w-auto">
      {pending ? "Reviewing..." : <>Get Feedback <Sparkles className="ml-2 h-4 w-4" /></>}
    </Button>
  );
}

function ReviewResult({ state }: { state: typeof initialState }) {
  const { pending } = useFormStatus();

  if (pending) {
    return (
      <div className="mt-6 space-y-2">
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    )
  }

  if (state.message === "Success" && state.data) {
    return (
      <div className="mt-6">
        <Alert>
          <Bot className="h-4 w-4" />
          <AlertTitle>AI Feedback</AlertTitle>
          <AlertDescription>
            <div className="whitespace-pre-wrap font-mono text-sm text-foreground/80">
              {state.data}
            </div>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const errorMessage = state.errors?.portfolioText?.join(", ") || state.errors?._server?.join(", ");

  if (errorMessage) {
    return (
      <Alert variant="destructive" className="mt-4">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          {errorMessage}
        </AlertDescription>
      </Alert>
    );
  }

  return null;
}


export function AiReviewClient() {
  const [state, formAction] = useFormState(reviewPortfolioAction, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (state.message === "Success") {
      resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [state.message]);


  return (
    <Card>
      <CardContent className="p-4 sm:p-6">
        <form ref={formRef} action={formAction} className="space-y-4">
          <Textarea
            name="portfolioText"
            placeholder="e.g., I'm a product designer with a passion for creating intuitive user experiences that solve complex user problems. I have 5 years of experience leading design at tech startups..."
            rows={6}
            required
            className="bg-white dark:bg-card"
            aria-describedby={state.errors?.portfolioText ? "review-error" : undefined}
          />
          <SubmitButton />
          <div ref={resultRef}>
            <ReviewResult state={state} />
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
