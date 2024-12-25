import { useAuthActions } from "@convex-dev/auth/react";

export function SignOut() {
    const { signOut } = useAuthActions();

    // Extracted click handler function
    const handleSignOut = () => {
        console.log("Signing out");
        void signOut();
    };

    return (
        <button
            onClick={handleSignOut} // Updated to use the new handler
            className="sign-in-button"
        >
            Sign out
        </button>
    );
}