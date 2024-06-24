"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { applicationSchema } from "./applicationSchema";
import { useEffect, useRef } from "react";
import { useFormState } from "react-dom";
import { onSubmitAction } from "./applicationSubmit";
import { toast, useToast } from "@/components/ui/use-toast";

const ApplicationForm = () => {
  const session = useSession();
  const { toast } = useToast();

  const formRef = useRef<HTMLFormElement>(null);

  const [state, formAction] = useFormState(onSubmitAction, {
    status: "idle",
    message: "",
  });

  const form = useForm<z.output<typeof applicationSchema>>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      companyName: "",
      position: "",
      status: "",
      dateApplied: new Date(),
      ...(state?.fields ?? {}),
    },
  });

  useEffect(() => {
    if (state.status === "submitted") {
      toast({
        title: "Success",
        description: "Application created successfully",
        variant: "default",
      });
    } else if (state.status === "error") {
      toast({
        title: "Error",
        description: "Failed to create application",
        variant: "destructive",
      });
    }
  }, [state.status, toast]);

  if (!session || !session.data) {
    return null;
  }

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
              formData.append("userId", session.data.user?.id as string);

              state.status = "submitting";
              formAction(formData);
            })(evt);
          }}
        >
          <FormField
            control={form.control}
            name="companyName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Name</FormLabel>
                <FormControl>
                  <Input placeholder="Google" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="position"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Position</FormLabel>
                <FormControl>
                  <Input placeholder="Software Engineer" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dateApplied"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date Applied</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent>
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Application Status</FormLabel>
                <FormControl>
                  <Input placeholder="Sent" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};

export default ApplicationForm;
