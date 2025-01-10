import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const domain = process.env.NEXT_PUBLIC_APP_URL;

export const sendPasswordResetEmail = async (
    email: string,
    token: string,
) => {
    const resetLink = `${domain}/auth/new-password?token=${token}`;

    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Reset your password",
        html: `<p>Reset your password for Cerebral Solutions account. <a href="${resetLink}">Click</a> to reset your password</p><br><p>If the link above doesn't work, copy and paste the following link into your browser: ${resetLink}</p>`,
    });
};

export const sendVerificationEmail = async (email: string, token: string) => {
    const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`;

    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Verify your email",
        html: `<p>Verify your email to complete onboarding of Cerebral Solutions. <a href="${confirmLink}">Click</a> to verify your email</p><br><p>If the link above doesn't work, copy and paste the following link into your browser: ${confirmLink}</p>`,
    })
}

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "2FA Code",
        html: `<p>Your 2FA code for Cerebral Solutions: ${token}</p>`,
    })
}