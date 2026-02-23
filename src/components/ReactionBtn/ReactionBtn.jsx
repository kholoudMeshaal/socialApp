import { useState } from "react";

const REACTIONS = [
  { emoji: '❤️', label: 'Love' },
  { emoji: '👍', label: 'Like' },
  { emoji: '😂', label: 'Haha' },
  { emoji: '😮', label: 'Wow' },
  { emoji: '😢', label: 'Sad' },
  { emoji: '😡', label: 'Angry' },
];
// بيستخدم ال on like عشان يربط الحركه بين ده والبوست كارد
export default function ReactionButton({ isLiked, onLike, isLiking }) {
  const [selectedReaction, setSelectedReaction] = useState(isLiked ? REACTIONS[0] : null);
  const [showReactions, setShowReactions] = useState(false);

  
  function handleSelectReaction(reaction) {
    setSelectedReaction(reaction); 
    onLike(); 
    setShowReactions(false); 
  }


  function handleMainButtonClick() {
    if (showReactions) {
      // لو القائمة مفتوحة، الدوسة دي تقفلها بس
      setShowReactions(false); 
    } else if (selectedReaction) {
      
      setSelectedReaction(null);
      onLike();
    } else {
      // لو مفيش رياكشن، نفتح القائمة عشان يختار
      setShowReactions(true);
    }
  }

  return (
    <div className="relative flex items-center gap-1">
     
      <button
        onClick={handleMainButtonClick}
        disabled={isLiking}
        className="flex items-center gap-1 hover:bg-gray-100 rounded-full px-3 py-1 transition-all"
      >
        <span className="text-xl">
          {selectedReaction ? selectedReaction.emoji : '🤍'}
        </span>
        <span className={`text-sm font-medium ${selectedReaction ? 'text-red-500' : 'text-gray-500'}`}>
          {selectedReaction ? selectedReaction.label : 'Like'}
        </span>
      </button>

  
      {showReactions && (
        <>
    {/* inset 0 عشان لو القائمه مفتوحه واليوزر داس في اي مكان يقفلها  */}
          <div className="fixed inset-0 z-40" onClick={() => setShowReactions(false)} />
          
          <div className="absolute bottom-12 left-0 flex gap-1 bg-white shadow-2xl rounded-full px-3 py-2 border border-gray-100 z-50 animate-in fade-in zoom-in duration-200">
            {REACTIONS.map((reaction) => (
              <button
                key={reaction.label}
                onClick={() => handleSelectReaction(reaction)} 
                className="text-2xl hover:scale-150 transition-transform duration-150 cursor-pointer p-1"
              >
                {reaction.emoji}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}