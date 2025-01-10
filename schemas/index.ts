import * as z from "zod"

export const SettingsSchema = z.object({
    name: z.string().min(1, {
        message: "Name is required",
    }),
    isTwoFactorEnabled: z.optional(z.boolean()),
    email: z.optional(z.string().email({
        message: "Email is required"
    })),
    password: z.optional(z.string().min(8)),
    newPassword: z.optional(z.string({
        required_error: "Password is required",
    }).min(8, {
        message: "Password must be at least 8 characters",
    }).refine((value) => /[A-Z]/.test(value), {
        message: "Password must contain at least one uppercase letter",
    }).refine((value) => /[0-9]/.test(value), {
        message: "Password must contain at least one number",
    }).refine((value) => /[!@#$%^&*]/.test(value), {
        message: "Password must contain at least one special character (!@#$%^&*)",
    })),
})
    .refine((data) => {
        if (data.password && !data.newPassword) {
            return false;
        }

        return true;
    }, {
        message: "New password is required",
        path: ["newPassword"]
    })
    .refine((data) => {
        if (data.newPassword && !data.password) {
            return false;
        }

        return true;
    }, {
        message: "Password is required",
        path: ["password"]
    })

export const LoginSchema = z.object({
    email: z.string().email({
        message: "Email is required"
    }),

    password: z.string().min(8, {
        message: "Password is required"
    }),

    code: z.optional(z.string()),
});

export const NewPasswordSchema = z.object({
    password: z.string({
        required_error: "Password is required",
    }).min(8, {
        message: "Password must be at least 8 characters",
    }).refine((value) => /[A-Z]/.test(value), {
        message: "Password must contain at least one uppercase letter",
    }).refine((value) => /[0-9]/.test(value), {
        message: "Password must contain at least one number",
    }).refine((value) => /[!@#$%^&*]/.test(value), {
        message: "Password must contain at least one special character (!@#$%^&*)",
    }),
});

export const ResetSchema = z.object({
    email: z.string().email({
        message: "Email is required"
    }),
});


export const RegisterSchema = z.object({
    email: z.string({
        required_error: "Email is required",
    }).email({
        message: "Invalid email address",
    }),

    password: z.string({
        required_error: "Password is required",
    }).min(8, {
        message: "Password must be at least 8 characters",
    }).refine((value) => /[A-Z]/.test(value), {
        message: "Password must contain at least one uppercase letter",
    }).refine((value) => /[0-9]/.test(value), {
        message: "Password must contain at least one number",
    }).refine((value) => /[!@#$%^&*]/.test(value), {
        message: "Password must contain at least one special character (!@#$%^&*)",
    }),
    name: z.string().min(1, {
        message: "Name is required",
    })
});

