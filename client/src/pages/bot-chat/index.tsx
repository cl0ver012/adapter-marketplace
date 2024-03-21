import { useState, useCallback } from "react";
import { useParams } from "react-router";
import { Icon } from "@iconify/react";
import { Container, setConfiguration } from "react-grid-system";
import { bots } from "../../data.json";

setConfiguration({
  gridColumns: 24,
  gutterWidth: 32,
  breakpoints: [640, 768, 1024, 1280, 1536, 1920],
});

type BotProps = {
  avatarUrl: string;
  botName: string;
  botId: string;
  botType: string;
  chatType: string;
  bio: string;
  totalSubscribers: number;
  currentSubscribers: number;
};

type Role = "user" | "assistant" | "system";

type Message = {
  id: string;
  content: string;
  role: Role;
};

const Chat: React.FC = () => {
  const { botId } = useParams();
  const bot =
    (bots.find((bot) => bot.botId === botId) as BotProps) || ({} as BotProps);

  const [chatHistory, setChatHistory] = useState<Message[]>([
    {
      id: "system",
      role: "system",
      content: "You are connected with a powerful AI assistant.",
    },
    {
      id: "initial-bio",
      content: bot.bio,
      role: "assistant",
    },
  ]);

  const [userPrompt, setUserPrompt] = useState("");

  const getAssistantMessage = useCallback((history: Message[]) => {
    setChatHistory([
      ...history,
      {
        id: `assistant-msg-${history.length}`,
        role: "assistant",
        content: "Hi, there! How can I help you?",
      },
    ]);
  }, []);

  const sendMessage = useCallback(() => {
    if (userPrompt.trim() === "") return;
    const newMessage = {
      id: `user-msg-${chatHistory.length}`,
      role: "user" as Role,
      content: userPrompt,
    };
    const updatedHistory = [...chatHistory, newMessage];
    setChatHistory(updatedHistory);
    setUserPrompt("");

    setTimeout(() => {
      getAssistantMessage(updatedHistory);
    }, 1000);
  }, [chatHistory, getAssistantMessage, userPrompt]);

  const handleTextAreaKeyDown = (
    event: React.KeyboardEvent<HTMLTextAreaElement>,
  ) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="h-[90vh] w-[100vw] overflow-y-auto dark:bg-neutral-700">
      <Container className="min-h-full bg-gray-100 dark:bg-neutral-900 py-8 flex flex-col justify-between">
        <div className="overflow-y-auto px-8">
          {chatHistory
            .filter((chat) => chat.role !== "system")
            .map((message) => (
              <div
                key={message.id}
                className={`flex items-center my-2 ${
                  message.role === "assistant" ? "flex-row" : "flex-row-reverse"
                }`}
              >
                {message.role === "user" && (
                  <Icon
                    icon="basil:user-solid"
                    className="w-6 h-6 ml-2 icon-with-theme"
                  />
                )}
                {message.role === "assistant" && (
                  <Icon
                    icon="fluent:bot-sparkle-24-regular"
                    className="w-6 h-6 mr-2 icon-with-theme"
                  />
                )}
                <div
                  className={`p-2 rounded-lg dark:text-white ${
                    message.role === "assistant"
                      ? "bg-blue-100 dark:bg-neutral-800"
                      : "bg-green-100 dark:bg-neutral-800"
                  }`}
                >
                  <p>{message.content}</p>
                </div>
              </div>
            ))}
        </div>
        <div className="w-full relative mt-4 px-8">
          <textarea
            value={userPrompt}
            onChange={(event) => setUserPrompt(event.target.value)}
            onKeyDown={handleTextAreaKeyDown}
            rows={2}
            placeholder="Enter your message here..."
            className="w-full py-2 pl-4 pr-8 rounded-lg outline-none ring-1 ring-gray-400 dark:ring-neutral-800 dark:bg-neutral-800 dark:text-white focus:ring-gray-500"
          />
          <button
            className="absolute m-2 right-8 bottom-0 outline-none text-[#0099ff] hover:text-[#00eeff] focus:text-[#00eeff]"
            type="button"
            onClick={sendMessage}
          >
            <Icon icon="fa-brands:telegram-plane" width={24} height={24} />
          </button>
        </div>
      </Container>
    </div>
  );
};

export default Chat;
