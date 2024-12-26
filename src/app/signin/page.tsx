'use client';

import { useAuthActions } from "@convex-dev/auth/react";

const providers = ["github", "yandex", "vk", "google"]

export default function SignIn() {
    const { signIn } = useAuthActions();

    // Extracted click handler function
    const handleSignIn = (provider: string) => {
        console.log(`Signing in with ${provider}`);
        void signIn(provider, { redirectTo: "/" });
    };

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            {providers.map((provider) => (
                <button
                    key={provider}
                    onClick={() => handleSignIn(provider)} // Updated to use the new handler
                    className="sign-in-button"
                >
                    Sign in with {provider}
                </button>
            ))}
        </main>
    );
}