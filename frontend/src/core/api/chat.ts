import { env } from "frontend/src/env";

import { type Message } from "../messaging";
import { fetchStream } from "../sse";

import { type TeamMember, type ChatEvent } from "./types";

export function chatStream(
  userMessage: Message,
  state: { messages: { role: string; content: string }[] },
  params: {
    deepThinkingMode: boolean;
    searchBeforePlanning: boolean;
    teamMembers: string[];
  },
  options: { abortSignal?: AbortSignal } = {},
) {
  return fetchStream<ChatEvent>(
    (env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api") + "/chat/stream",
    {
      body: JSON.stringify({
        // TODO: add `thread_id` in the future
        messages: [userMessage],
        deep_thinking_mode: params.deepThinkingMode,
        search_before_planning: params.searchBeforePlanning,
        debug:
          location.search.includes("debug") &&
          !location.search.includes("debug=false"),
        team_members: params.teamMembers,
      }),
      signal: options.abortSignal,
    },
  );
}

export async function queryTeamMembers() {
  try {
    const response = await fetch(
      (env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api") +
        "/team_members",
      { method: "GET" },
    );
    const { team_members } = (await response.json()) as {
      team_members: Record<string, TeamMember>;
    };
    const allTeamMembers = Object.values(team_members);
    return [
      ...allTeamMembers.filter((member) => !member.is_optional),
      ...allTeamMembers.filter((member) => member.is_optional),
    ];
  } catch (err) {
    console.warn(
      "🖐️️ [ant]\n\nError connecting to ant backend. Please ensure the latest version is running locally. See: https://github.com/CoolKidsLabs/ant.\n\nRaw network error: ",
    );
    console.error(err);
    return [];
  }
}
