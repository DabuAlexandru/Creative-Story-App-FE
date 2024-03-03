import { z } from "zod"

export const registerFormSchema = z.object({
    username: z
        .string({
            required_error: "Username is required",
            invalid_type_error: "Username must be a string"
        })
        .min(2, {
            message: "Username must be at least 2 characters.",
        })
        .max(50, {
            message: "Username must be at most 50 characters.",
        }),
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
        .min(6, {
            message: "The password must be at least 6 characters.",
        }),
    confirmPassword: z.string().min(6)
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirm"],
});

export const formFieldStyle: React.CSSProperties = {
    marginTop: '8px'
}