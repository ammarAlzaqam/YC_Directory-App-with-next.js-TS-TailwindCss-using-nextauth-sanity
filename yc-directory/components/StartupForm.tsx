"use client";

import { useActionState, useState } from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

import MDEditor from "@uiw/react-md-editor";
import { Button } from "./ui/button";
import { Send } from "lucide-react";
import { startupSchema } from "@/utils/validation";
import { z } from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { createPitch } from "@/utils/actions";

type Errors = {
  title?: string[];
  description?: string[];
  category?: string[];
  link?: string[];
  pitch?: string[];
};

interface InitialState {
  errors: Errors;
}

export default function StartupForm() {
  const [pitch, setPitch] = useState("");
  const router = useRouter();
  const initialState: InitialState = { errors: {} };
  const handleFormSubmit = async (_prevState: any, formData: FormData) => {
    try {
      const formValues = {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        category: formData.get("category") as string,
        link: formData.get("link") as string,
        pitch: pitch,
      };
      await startupSchema.parseAsync(formValues);

      const result = await createPitch(formData, pitch);

      if (!result.success) {
        toast.warning(result.error);
        return;
      }

      toast.success("Your startup pitch has been created successfully");
      router.push(`/startup/${result?.id}`);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = error.flatten().fieldErrors;
        toast.error("Please check your inputs and try again");
        return { errors: fieldErrors };
      }
      toast.error("An unexpected error has occurred");
    }
  };

  const [state, formAction, isPending] = useActionState(
    handleFormSubmit,
    initialState
  );
  return (
    <form action={formAction} className="startup-form">
      <div>
        <label htmlFor="title" className="startup-form_label">
          title
        </label>
        <Input
          type="text"
          className="startup-form_input"
          name="title"
          id="title"
          required
          placeholder="Startup Title"
        />
        {state?.errors.title && (
          <p className="startup-form_error animate-top">
            {state.errors.title[0]}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="description" className="startup-form_label">
          description
        </label>
        <Textarea
          className="startup-form_textarea"
          required
          placeholder="Startup Description"
          name="description"
          id="description"
        />
        {state?.errors.description && (
          <p className="startup-form_error animate-top">
            {state.errors.description[0]}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="category" className="startup-form_label">
          category
        </label>
        <Input
          type="text"
          className="startup-form_input"
          name="category"
          id="category"
          required
          placeholder="Startup Category (Tech, Health, Education...)"
        />
        {state?.errors.category && (
          <p className="startup-form_error animate-top">
            {state.errors.category[0]}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="link" className="startup-form_label">
          link
        </label>
        <Input
          type="text"
          className="startup-form_input"
          id="link"
          name="link"
          required
          placeholder="Startup Image URL"
        />
        {state?.errors.link && (
          <p className="startup-form_error animate-top">
            {state.errors.link[0]}
          </p>
        )}
      </div>

      <div data-color-mode="light">
        <MDEditor
          value={pitch}
          onChange={(value) => setPitch(value as string)}
          preview="edit"
          height="300px"
          style={{ borderRadius: 20, overflow: "hidden" }}
          textareaProps={{
            placeholder:
              "Briefly describe your idea and what problem it solves",
          }}
          previewOptions={{
            disallowedElements: ["style"],
          }}
        />
        {state?.errors.pitch && (
          <p className="startup-form_error animate-top">
            {state.errors.pitch[0]}
          </p>
        )}
      </div>
      <Button
        type="submit"
        disabled={isPending}
        className="startup-form_btn text-white"
      >
        {isPending ? "Submitting..." : "Submit your pitch"}
        <Send className="size-6 ml-2" />
      </Button>
    </form>
  );
}
