import React from 'react';

const MoodComponent = ({ mood }) => {
  return (
    // <div className="flex flex-col gap-4 w-1/2">
      <div className="bg-white rounded-xl shadow-md p-4 text-center h-auto flex flex-col items-center justify-center">
        <h3 className="text-lg font-semibold">Mood</h3>

        {['happy', 'sad', 'angry', 'calm'].map((moodType) => (
          <div key={moodType} className="w-full mb-2">
            <div className="flex items-center justify-start">
              <span className="text-xl mr-2">{getEmoji(moodType)}</span>
              <progress
                className="w-full h-2 bg-gray-300 rounded-full"
                value={mood[moodType]}
                max={100}
              />
            </div>
          </div>
        ))}
        <style jsx>{`
        progress::-webkit-progress-bar {
          background-color: #e0e0e0;
          border-radius: 999px;
        }

        progress::-webkit-progress-value {
          background-color: #3BDBE3;
          border-radius: 999px;
        }
    `}</style>
      </div>
    // </div>
  );
};

const getEmoji = (moodType) => {
  const moodEmojis = {
    happy: '😊',
    sad: '😢',
    angry: '😡',
    calm: '😌',
  };
  return moodEmojis[moodType] || '😊';
};

export default MoodComponent;
