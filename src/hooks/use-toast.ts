
import { toast as sonnerToast, type Toast } from "sonner";

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
  // Create a mock toasts array to satisfy the Toaster component
  const toasts: Toast[] = [];
  
  return {
    toast: ({ title, description, variant }: ToastProps) => {
      toast({ title, description, variant });
    },
    toasts,
  };
};
