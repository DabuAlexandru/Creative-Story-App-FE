import { z } from "zod";

export const replyNoteSchema = z.object({
    content: z
        .string({
            required_error: "Content is required",
            invalid_type_error: "Content must be a string"
        })
        .min(1, { message: "Content must not be empty!" })
        .max(1000, { message: "Character limit exceeded! (1000)" }),
});

export const formFieldStyle: React.CSSProperties = {
    marginTop: '8px'
}