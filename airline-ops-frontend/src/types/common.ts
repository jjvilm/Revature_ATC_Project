import { z } from "zod";

export const UUIDish = z.string().min(1);

export const DateTimeString = z.string().min(1);

export const UnknownRecord = z.record(z.unknown());
