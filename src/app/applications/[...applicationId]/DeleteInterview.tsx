"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import React from "react";

const DeleteInterview = ({ interviewId }: { interviewId: string }) => {
  const { toast } = useToast();

  const deleteInterview = async (interviewId: string) => {
    try {
      const res = await fetch(`/api/delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ interviewId }),
      });

      if (res.ok) {
        toast({
          title: "Success",
          description: "Interview deleted successfully",
          variant: "default",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to delete interview",
          variant: "destructive",
        });
        console.error("Failed to delete interview");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete interview",
        variant: "destructive",
      });
      console.error("An error occurred", error);
    }
  };

  return (
    <>
      <Button type="button" variant="secondary">
        Cancel
      </Button>
      <Button
        onClick={() => deleteInterview(interviewId)}
        variant="destructive"
      >
        Remove
      </Button>
    </>
  );
};

export default DeleteInterview;
