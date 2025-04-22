import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "src/components/ui/button";

export function AppHeader() {
  const { data: session } = useSession();

  return (
    <div className="flex w-full items-center justify-between">
      <a
        className="font-serif text-2xl font-extralight text-gray-500"
        href="https://github.com/CoolKidsLabs/ant"
        target="_blank"
      >
        <div className="flex items-end space-x-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
            <text y="28" fontSize="28" textAnchor="middle" x="16">▞</text>
          </svg>
          <p className="leading-none">Ant</p>
        </div>
      </a>
      {session ? (
        <Button
          onClick={() => signOut()}
          className="flex items-center gap-2 bg-white text-gray-700 hover:bg-gray-100"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          Log Off
        </Button>
      ) : (
        <Button
          onClick={() => signIn("google")}
          className="flex items-center gap-2 bg-white text-gray-700 hover:bg-gray-100"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          Sign in
        </Button>
      )}
    </div>
  );
}
