"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { useEffect, useRef } from "react";
import { sendContactMessage } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Card, CardContent } from "./ui/card";

const initialState: {
  message: string;
  errors: { name?: string[], email?: string[], message?: string[] } | null;
} = {
  message: "",
errors: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" aria-disabled={pending}>
      {pending ? "Sending..." : "Send Message"}
    </Button>
  );
}

export function ContactForm() {
  const [state, formAction] = useActionState(sendContactMessage, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.message === "Your message has been sent successfully!") {
      toast({
        title: "Success!",
        description: state.message,
      });
      formRef.current?.reset();
    }
  }, [state, toast]);

  return (
    <Card>
      <CardContent className="p-4 sm:p-6">
        <form ref={formRef} action={formAction} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" required aria-describedby={state.errors?.name ? "name-error" : undefined} />
            {state.errors?.name && <p id="name-error" className="text-sm font-medium text-destructive">{state.errors.name[0]}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" required aria-describedby={state.errors?.email ? "email-error" : undefined} />
            {state.errors?.email && <p id="email-error" className="text-sm font-medium text-destructive">{state.errors.email[0]}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea id="message" name="message" required rows={4} aria-describedby={state.errors?.message ? "message-error" : undefined} />
            {state.errors?.message && <p id="message-error" className="text-sm font-medium text-destructive">{state.errors.message[0]}</p>}
          </div>
          <SubmitButton />
        </form>
      </CardContent>
    </Card>
  );
}
