export default function Message({ message, isOwn }) {
  return (
    <div className={`flex gap-3 ${isOwn ? 'flex-row-reverse' : ''}`}>
      <span className="text-2xl self-end">
        {isOwn ? '👤' : '🤖'}
      </span>
      <div className={`${
        isOwn 
          ? 'bg-blue-600/30 ml-12' 
          : 'bg-gray-800/50 mr-12'
        } rounded-lg p-3 max-w-[80%]`}
      >
        <p className="text-white">{message.content}</p>
        <span className="text-xs text-gray-400 mt-1 block">
          {new Date(message.timestamp).toLocaleTimeString()}
        </span>
      </div>
    </div>
  );
} 