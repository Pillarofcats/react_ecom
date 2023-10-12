import { z } from "zod"

export const SchemaFormSignIn = z.object({
  email: z.string(),
  password: z.string()
})

export const SchemaFormSignUp = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string().min(8)
})