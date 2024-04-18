import { z } from "zod"

export const editProfileFormSchema = z.object({
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