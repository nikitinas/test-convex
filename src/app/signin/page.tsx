'use client';

import { useAuthActions } from "@convex-dev/auth/react";

export default function SignIn() {
    const { signIn } = useAuthActions();

    // Extracted click handler function
    const handleSignIn = (provider: string) => {
        console.log(`Signing in with ${provider}`);
        void signIn(provider, { redirectTo: "/" });
    };

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <button
                onClick={() => handleSignIn("github")} // Updated to use the new handler
                className="sign-in-button"
            >
                Sign in with GitHub
            </button>
            <button
                onClick={() => handleSignIn("yandex")} // Updated to use the new handler
                className="sign-in-button"
            >
                Sign in with Yandex
            </button>
            <button
                onClick={() => handleSignIn("vk")} // Updated to use the new handler
                className="sign-in-button"
            >
                Sign in with VK
            </button>
        </main >
    );
}