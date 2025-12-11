import { z } from "zod"


export const createAgentSchema = z.object({
  name: z.string().min(1, "Name is required.").max(20, "Name is too long."),
  symbol: z.string().min(3, "symbol is required.").max(5, "代币名 is too long."),
  description: z.string().min(1, "description is required.").max(500, "代币名 is too long."),
  avatar: z.string(),
  twitterLink: z.string().optional(),
  telegramLink: z.string().optional()
})


export type CreateAgentInput = z.infer<typeof createAgentSchema>
