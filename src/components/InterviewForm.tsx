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
import { CalendarIcon, Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { useState } from "react";
import { useToast } from "./ui/use-toast";

const formSchema = z.object({
  interviewer: z.string(),
  interviewDate: z.date(),
  interviewType: z.string(),
  application: z.string(),
  offerLink: z.string().optional(),
});

// type singleProps = {
//   single: true;
//   applicationId: string;
// };

type multipleProps = {
  single: false;
  applications: Application[];
};

// type Props = singleProps | multipleProps;

type Props = multipleProps;

type Application = {
  value: string;
  label: string;
};

const InterviewForm = (props: Props) => {
  const { toast } = useToast();

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const res = await fetch("/api/interviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
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
            name="interviewer"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Interviewer</FormLabel>
                <FormControl>
                  <Input placeholder="Interviewer" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="application"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Link Application</FormLabel>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-fit justify-between"
                      >
                        {value
                          ? props.applications.find(
                              (application) => application.value === value,
                            )?.label
                          : "Select application..."}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput placeholder="Search application..." />
                      <CommandEmpty>No application found.</CommandEmpty>
                      <CommandList>
                        <CommandGroup>
                          {props.applications.map((application) => (
                            <CommandItem
                              key={application.value}
                              value={application.value}
                              onSelect={(currentValue) => {
                                form.setValue(
                                  "application",
                                  currentValue === value ? "" : currentValue,
                                );
                                setValue(
                                  currentValue === value ? "" : currentValue,
                                );
                                setOpen(false);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  value === application.value
                                    ? "opacity-100"
                                    : "opacity-0",
                                )}
                              />
                              {application.label}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="interviewDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Interview Date</FormLabel>
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
                        date < new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                      className="flex items-center justify-center"
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="interviewType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Interview Type</FormLabel>
                <FormControl>
                  <Input placeholder="Interview Type" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="offerLink"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Offer Link</FormLabel>
                <FormControl>
                  <Input placeholder="Offer Link" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            disabled={!form.formState.isValid || form.formState.isSubmitting}
          >
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default InterviewForm;
