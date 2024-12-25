"use client";

import { useQuery, Authenticated, Unauthenticated } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useRouter } from 'next/navigation'
import TaskList from './TaskList';
import TaskInput from './TaskInput';
import { SignOut } from "@/singout";

export default function Home() {
  const currentUser = useQuery(api.authFunctions.currentUser);
  const router = useRouter();

  const handleSignInRedirect = () => {
    router.push('/signin');
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Unauthenticated>
        <button
          onClick={handleSignInRedirect}
          className="sign-in-button"
        >
          Sign in
        </button>
      </Unauthenticated>
      <Authenticated>
        <div>
          {currentUser?.name}
        </div>
        <SignOut />
        <TaskInput />
        <TaskList />
      </Authenticated>
    </main>
  );
}
