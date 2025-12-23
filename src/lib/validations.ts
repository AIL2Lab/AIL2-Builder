import { z } from "zod"


export const createModelSchema = z.object({
  name: z.string().min(1, "Name is required.").max(20, "Name is too long."),
  symbol: z
    .string()
    .trim()
    .regex(/^[A-Z]{3,5}$/, "symbol must be 3-5 uppercase letters."),
  description: z.string().min(1, "description is required.").max(500, "Description is too long."),
  avatar: z.string(),
  twitterLink: z.string().optional(),
  telegramLink: z.string().optional()
})


export type CreateModelInput = z.infer<typeof createModelSchema>
