export type ApiError = {
  status: number;
  message: string;
  detail?: unknown;
};

export function asApiError(e: unknown): ApiError {
  if (e && typeof e === "object" && "status" in e && "message" in e) {
    return e as ApiError;
  }
  return { status: 0, message: "Network or unexpected error", detail: e };
}
