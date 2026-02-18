import { Toaster } from "react-hot-toast";

export function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        style: {
          background: "#0D0F16",
          color: "#E4E4E7",
          border: "1px solid rgba(255,255,255,0.08)"
        }
      }}
    />
  );
}
