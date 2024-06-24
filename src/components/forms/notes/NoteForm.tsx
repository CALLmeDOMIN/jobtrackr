"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "../../ui/use-toast";
import { noteSchema } from "./noteSchema";
import { onSubmitAction } from "./noteSubmit";
import { useFormState } from "react-dom";
import { Loader2 } from "lucide-react";
import { useEffect, useRef } from "react";

const NotesForm = ({ applicationId }: { applicationId: string }) => {
  const { toast } = useToast();

  const formRef = useRef<HTMLFormElement>(null);

  const [state, formAction] = useFormState(onSubmitAction, {
    status: "idle",
    message: "",
  });

  const form = useForm<z.output<typeof noteSchema>>({
    resolver: zodResolver(noteSchema),
    defaultValues: {
      note: "",
      ...(state?.fields ?? {}),
    },
  });

  useEffect(() => {
    if (state.status === "submitted") {
      toast({
        title: "Success",
        description: "Note created successfully",
        variant: "default",
      });
    } else if (state.status === "error") {
      toast({
        title: "Error",
        description: "Failed to create note",
        variant: "destructive",
      });
    }
  }, [state.status, toast]);

  return (
    <div>
      <Form {...form}>
        {state?.issues && (
          <div className="text-red-500">
            <ul>
              {state.issues.map((issue) => (
                <li key={issue} className="flex gap-1">
                  {issue}
                </li>
              ))}
            </ul>
          </div>
        )}
        <form
          className="space-y-4"
          action={formAction}
          ref={formRef}
          onSubmit={(evt) => {
            evt.preventDefault();
            form.handleSubmit(() => {
              const formData = new FormData(formRef.current!);
              formData.append("applicationId", applicationId);

              state.status = "submitting";
              formAction(formData);
            })(evt);
          }}
        >
          <FormField
            control={form.control}
            name="note"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Note</FormLabel>
                <FormControl>
                  <Textarea placeholder="Note" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={state.status === "submitting"} type="submit">
            {state.status === "submitting" ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default NotesForm;
