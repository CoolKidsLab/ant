"use client";

import { nanoid } from "nanoid";
import { useSession, signIn } from "next-auth/react";
import { useCallback, useRef } from "react";

import { useAutoScrollToBottom } from "src/components/hooks/useAutoScrollToBottom";
import { Button } from "src/components/ui/button";
import { ScrollArea } from "src/components/ui/scroll-area";
import { TooltipProvider } from "src/components/ui/tooltip";
import { sendMessage, useInitTeamMembers, useStore } from "src/core/store";
import { cn } from "src/core/utils";

import { AppHeader } from "./_components/AppHeader";
import { InputBox } from "./_components/InputBox";
import { MessageHistoryView } from "./_components/MessageHistoryView";

export default function HomePage() {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const { data: session } = useSession();

  const messages = useStore((state) => state.messages);
  const responding = useStore((state) => state.responding);

  const handleSendMessage = useCallback(
    async (
      content: string,
      config: { deepThinkingMode: boolean; searchBeforePlanning: boolean },
    ) => {
      const abortController = new AbortController();
      abortControllerRef.current = abortController;
      await sendMessage(
        {
          id: nanoid(),
          role: "user",
          type: "text",
          content,
        },
        config,
        { abortSignal: abortController.signal },
      );
      abortControllerRef.current = null;
    },
    [],
  );

  useInitTeamMembers();
  useAutoScrollToBottom(scrollAreaRef, responding);

  return (
    <TooltipProvider delayDuration={150}>
      <ScrollArea 
        className="min-h-screen w-full" 
        ref={scrollAreaRef}
        type="auto"
      >
        <div className="flex min-h-screen flex-col items-center">
          <header className="sticky top-0 right-0 left-0 z-10 flex h-16 w-full items-center px-4 backdrop-blur-sm">
            <AppHeader />
          </header>
          <main className="w-full flex-1 px-4 pb-48">
            <MessageHistoryView
              className="mx-auto w-full max-w-[800px]"
              messages={messages}
              loading={responding}
            />
          </main>
          <footer
            className={cn(
              "fixed bottom-4 mx-auto w-full px-4 transition-transform duration-500 ease-in-out",
              messages.length === 0
                ? "max-w-[640px] translate-y-[-34vh]"
                : "max-w-[800px]",
            )}
          >
            {messages.length === 0 && (
              <div className="flex w-full flex-col px-4 md:w-[640px] md:translate-y-[-32px]">
                <h3 className="mb-2 text-center text-2xl font-medium md:text-3xl">
                  👋 Hello, {session?.user?.name?.split(' ')[0] ?? 'there'}!
                </h3>
                <div className="px-2 text-center text-base text-gray-400 md:text-lg">
                  <a
                    href="https://github.com/CoolKidsLabs/ant"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-blue-600"
                  >
                    Ant
                  </a>
                  , built on cutting-edge language models, helps you search on
                  web, browse information, and handle complex tasks.
                </div>
              </div>
            )}
              {session ? (
                <div className="flex flex-col overflow-hidden rounded-[24px] border bg-white shadow-lg">
                  <InputBox
                    size={messages.length === 0 ? "large" : "normal"}
                    responding={responding}
                    onSend={handleSendMessage}
                    onCancel={() => {
                      abortControllerRef.current?.abort();
                      abortControllerRef.current = null;
                    }}
                  />
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center">
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
                    Sign in with Google
                  </Button>
                </div>
              )}
            <div className="absolute bottom-[-32px] h-8 w-full backdrop-blur-xs" />
          </footer>
        </div>
      </ScrollArea>
    </TooltipProvider>
  );
}
