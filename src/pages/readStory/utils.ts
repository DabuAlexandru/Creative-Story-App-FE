import { z } from "zod";

export const reviewSchema = z.object({
  title: z
    .string({
      required_error: "Title is required",
      invalid_type_error: "Title must be a string"
    })
    .min(1, { message: "Title must not be empty!" })
    .max(250, { message: "Title must not exceed 250 characters!"}),

  content: z
    .string({
      required_error: "Content is required",
      invalid_type_error: "Content must be a string"
    })
    .min(1, { message: "Content must not be empty!" })
    .max(1000, { message: "Content must not exceed 1000 characters!"}),
  characterScore: z
    .number({
      required_error: "Character Score is required",
      invalid_type_error: "Character Score must be a number"
    })
    .min(1, { message: "Character Score must be at least 1!" })
    .max(5, { message: "Character Score must be at most 5!" }),

  conflictScore: z
    .number({
      required_error: "Conflict Score is required",
      invalid_type_error: "Conflict Score must be a number"
    })
    .min(1, { message: "Conflict Score must be at least 1!" })
    .max(5, { message: "Conflict Score must be at most 5!" }),

  plotScore: z
    .number({
      required_error: "Plot Score is required",
      invalid_type_error: "Plot Score must be a number"
    })
    .min(1, { message: "Plot Score must be at least 1!" })
    .max(5, { message: "Plot Score must be at most 5!" }),

  settingScore: z
    .number({
      required_error: "Setting Score is required",
      invalid_type_error: "Setting Score must be a number"
    })
    .min(1, { message: "Setting Score must be at least 1!" })
    .max(5, { message: "Setting Score must be at most 5!" }),

  themeScore: z
    .number({
      required_error: "Theme Score is required",
      invalid_type_error: "Theme Score must be a number"
    })
    .min(1, { message: "Theme Score must be at least 1!" })
    .max(5, { message: "Theme Score must be at most 5!" })
});