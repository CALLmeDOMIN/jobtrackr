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
import { useToast } from "./ui/use-toast";

const formSchema = z.object({
  note: z.string(),
});

const NotesForm = ({ applicationId }: { applicationId: string }) => {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const newValues = { ...values, applicationId: applicationId[0] };

    try {
      const res = await fetch("/api/notes", {
        method: "POST",
        body: JSON.stringify(newValues),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        toast({
          title: "Success",
          description: "Interview created successfully",
          variant: "default",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to create interview",
          variant: "destructive",
        });
        console.error("Failed to create interview");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create interview",
        variant: "destructive",
      });
      console.error("An error occurred", error);
    }
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
          <Button type="submit">Save</Button>
        </form>
      </Form>
    </div>
  );
};

export default NotesForm;
