'use client';

import { useAuthActions } from "@convex-dev/auth/react";

export default function SignIn() {
    const { signIn } = useAuthActions();

    // Extracted click handler function
    const handleSignIn = () => {
        console.log("Signing in with GitHub");
        void signIn("github", { redirectTo: "/" });
    };

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <button
                onClick={handleSignIn} // Updated to use the new handler
                className="sign-in-button"
            >
                Sign in with GitHub
            </button>
        </main>
    );
}