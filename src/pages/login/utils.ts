import { z } from "zod"

export const loginFormSchema = z.object({
    email: z
        .string({
            required_error: "Email is required",
            invalid_type_error: "Email must be a string"
        })
        .email({
            message: "Invalid email address"
        }),
    password: z
        .string({
            required_error: "Password is required",
            invalid_type_error: "Password must be a string"
        })
});

export const formFieldStyle: React.CSSProperties = {
    marginTop: '8px'
}