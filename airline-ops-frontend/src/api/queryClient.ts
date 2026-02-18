import { QueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error: unknown) => {
        if (failureCount >= 2) return false;
        if (error && typeof error === "object" && "status" in error) {
          const s = (error as any).status as number | undefined;
          if (s && s >= 400 && s < 500) return false;
        }
        return true;
      },
      refetchOnWindowFocus: false
    },
    mutations: {
      onError: (err: unknown) => {
        const msg =
          err && typeof err === "object" && "message" in err
            ? String((err as any).message)
            : "Something went wrong.";
        toast.error(msg);
      }
    }
  }
});
