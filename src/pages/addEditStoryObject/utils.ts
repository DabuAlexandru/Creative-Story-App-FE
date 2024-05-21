import { z } from "zod"

export const storyFormSchema = z.object({
  title: z
    .string({
      required_error: "Title is required",
      invalid_type_error: "Title must be a string"
    })
    .min(1, { message: "Title must not be empty!" })
    .max(128, { message: "Title can have at most 128 characters!" }),
  description: z
    .string({
      required_error: "Description is required",
      invalid_type_error: "Description must be a string"
    })
    .min(1, { message: "Description must not be empty!" })
    .max(255, {message: "The Description should not exceed 255 characters!"}),
  preview: z
    .string({
      required_error: "Description is required",
      invalid_type_error: "Description must be a string"
    })
    .min(1, { message: "Description must not be empty!" })
    .max(2048, { message: "The Preview should not exceed 2048 characters!"}),
});