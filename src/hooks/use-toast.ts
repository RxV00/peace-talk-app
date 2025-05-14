
// This file is required to maintain compatibility with existing components
// but we'll implement Swift native notifications

import { toast as sonnerToast } from "sonner";

type ToastProps = {
  title?: string;
  description?: string;
  variant?: "default" | "destructive";
};

export const toast = ({ title, description, variant }: ToastProps) => {
  return sonnerToast(title, {
    description: description,
    className: variant === "destructive" ? "bg-red-500" : "",
  });
};

export const useToast = () => {
  return {
    toast: ({ title, description, variant }: ToastProps) => {
      toast({ title, description, variant });
    },
  };
};
