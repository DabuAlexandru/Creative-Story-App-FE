import { z } from "zod"

export const editProfileFormSchema = z.object({
    penName: z
        .string({
            required_error: "Pen Name is required",
            invalid_type_error: "Pen Name must be a string"
        }),
    headline: z
        .string({
            required_error: "Headline is required",
            invalid_type_error: "Headline must be a string"
        }),
    fullName: z
        .string({
            required_error: "Full Name is required",
            invalid_type_error: "Full Name must be a string"
        }),
    bio: z
        .string({
            required_error: "Full Name is required",
            invalid_type_error: "Full Name must be a string"
        }),
    location: z
        .string({
            required_error: "Full Name is required",
            invalid_type_error: "Full Name must be a string"
        }),
    website: z
        .string({
            required_error: "Full Name is required",
            invalid_type_error: "Full Name must be a string"
        }),
});