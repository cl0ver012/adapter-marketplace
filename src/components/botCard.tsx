import { useNavigate } from "react-router";
import { Icon } from "@iconify/react";

type BotCardProps = {
  avatarUrl: string;
  botName: string;
  botId: string;
  botType: string;
  chatType: string;
  bio: string;
  totalSubscribers: number;
  currentSubscribers: number;
};

const getChatTypeAvatar = (type: string) => {
  if (type === "Audio" || type === "Voice")
    return <Icon icon="ant-design:audio-twotone" width={16} height={16} />;
  if (type === "Video")
    return (
      <Icon icon="material-symbols:video-chat-outline" width={16} height={16} />
    );
  if (type === "Picture")
    return <Icon icon="ant-design:picture-filled" width={16} height={16} />;
  if (type === "Text")
    return <Icon icon="humbleicons:chat" width={16} height={16} />;
  return <Icon icon="fluent-mdl2:unknown" width={16} height={16} />;
};

const BotCard: React.FC<BotCardProps> = ({
  avatarUrl,
  botName,
  botId,
  botType,
  chatType,
  bio,
  totalSubscribers,
  currentSubscribers,
}) => {
  const navigate = useNavigate();

  return (
    <div className="group relative rounded-lg mx-auto w-full max-w-80 overflow-hidden cursor-pointer hover:shadow-xl bg-gray-300 dark:bg-neutral-800">
      <div className="flex justify-between px-4 py-4 z-10">
        <span className="rounded-full bg-blue-200 dark:bg-neutral-900 px-3 py-1 text-sm font-semibold text-blue-700 dark:text-gray-300">
          {botType}
        </span>
        <div className="rounded-full bg-green-200 dark:bg-neutral-900 px-3 py-1 text-sm font-semibold text-green-700 dark:text-gray-300 flex justify-center items-center">
          {getChatTypeAvatar(chatType)}
        </div>
      </div>
      <img
        className="w-full h-48 object-cover"
        src={avatarUrl}
        alt="Bot Avatar"
      />
      <div className="px-4 py-2 z-10">
        <div className="font-bold text-xl dark:text-white">{botName}</div>
        <p className="text-gray-700 text-base dark:text-gray-300">@{botId}</p>
      </div>
      <div className="flex justify-between items-center px-4 pb-4 z-10">
        <div className="text-gray-600 text-sm flex dark:text-gray-300">
          <Icon icon="mdi:history" width={16} height={16} className="h-6" />
          <span className="h-6 leading-6">{totalSubscribers}</span>
          <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <Icon
            icon="material-symbols:play-circle"
            width={16}
            height={16}
            className="h-6"
          />
          <span className="h-6 leading-6">{currentSubscribers}</span>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gray-800 bg-opacity-75 dark:bg-neutral-700 dark:bg-opacity-75 transform translate-y-full group-hover:translate-y-1 transition-transform duration-300 ease-in-out">
        <h3 className="text-white text-lg">{botName}</h3>
        <p className="text-gray-300 text-sm">{bio}</p>
        <button
          type="button"
          className="mt-2 px-4 py-2 bg-blue-500 dark:bg-neutral-900 text-white text-sm rounded hover:bg-blue-600 hover:dark:bg-neutral-800 transition-colors duration-200"
          onClick={() => navigate(`/bot/${botId}`)}
        >
          Start Chat
        </button>
      </div>
    </div>
  );
};

export default BotCard;
