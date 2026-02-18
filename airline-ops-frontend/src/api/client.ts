import { z } from "zod";
import { ApiError } from "@/api/errors";

const BASE_URL = import.meta.env.VITE_API_BASE_URL as string | undefined;
const DEFAULT_LOCAL_API_URL = "http://localhost:8000";

if (!BASE_URL) {
  console.warn(
    `VITE_API_BASE_URL is not set. Falling back to ${DEFAULT_LOCAL_API_URL}. Create a .env based on .env.example`
  );
}

type Method = "GET" | "POST" | "PATCH" | "DELETE";

type RequestOptions<TSchema extends z.ZodTypeAny> = {
  method: Method;
  path: string;
  body?: unknown;
  schema?: TSchema;
  signal?: AbortSignal;
};

async function parseJsonSafe(res: Response) {
  const text = await res.text();
  try {
    return text ? JSON.parse(text) : null;
  } catch {
    return text;
  }
}

export async function request<TSchema extends z.ZodTypeAny>(
  opts: RequestOptions<TSchema>
): Promise<z.infer<TSchema>>;

export async function request<T = unknown>(opts: RequestOptions<z.ZodTypeAny>): Promise<T>;

export async function request<T>(opts: RequestOptions<z.ZodTypeAny>): Promise<T> {
  const resolvedBaseUrl = (BASE_URL ?? DEFAULT_LOCAL_API_URL).replace(/\/$/, "");
  const url = `${resolvedBaseUrl}${opts.path.startsWith("/") ? "" : "/"}${opts.path}`;
  const hasBody = opts.body != null;

  const res = await fetch(url, {
    method: opts.method,
    headers: hasBody
      ? {
          "Content-Type": "application/json"
        }
      : undefined,
    body: hasBody ? JSON.stringify(opts.body) : undefined,
    signal: opts.signal
  });

  const data = await parseJsonSafe(res);

  if (!res.ok) {
    const err: ApiError = {
      status: res.status,
      message:
        typeof data === "object" && data && "detail" in (data as any)
          ? String((data as any).detail)
          : `Request failed (${res.status})`,
      detail: data
    };
    throw err;
  }

  if (opts.schema) {
    return opts.schema.parse(data) as T;
  }

  return data as T;
}
