import * as z from "zod";

export const userSchema = z.object({
  name: z.string().min(1, "name is required"),
  email: z.string().min(1, "email is required").email(),
  gender: z.string().min(1, "gender is required"),
  status: z.string().min(1, "status is required"),
});
