import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

export default function AIServiceToggle({ media, labels }) {
  const [selected, setSelected] = useState(0);
  const videoRef = useRef(null);
  
  useEffect(() => {
    if (videoRef.current && media[selected].includes('.mp4')) {
      videoRef.current.load(); // Reload the video to reset playback on switch
      videoRef.current.play(); // Ensure it plays when switching
    }
  }, [selected, media]);
  
  return (
    <div className="w-full">
      {/* Tabbed navigation */}
      <div className="flex justify-center border-b border-gray-300 dark:border-slate-700 mb-4">
        {labels.map((label, index) => (
          <button
            key={index}
            onClick={() => setSelected(index)}
            className={`px-6 py-3 transition-colors duration-300 font-medium focus:outline-none ${
              selected === index
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400'
            }`}
          >
            {label}
          </button>
        ))}
      </div>
      
      {/* Content container with smooth transition */}
      <div className="overflow-hidden rounded-lg shadow-lg">
        {media[selected].includes('.mp4') ? (
          <video
            ref={videoRef}
            key={selected} // Ensures reloading when switching
            src={media[selected]}
            loop
            muted
            playsInline
            autoPlay
            className="w-full aspect-video object-cover transition-all duration-500 ease-in-out"
          >
            Din nettleser støtter ikke videoavspilling.
          </video>
        ) : (
          <Image 
            src={media[selected]}
            alt={labels ? labels[selected] : `View ${selected + 1}`}
            width={600}
            height={400}
            className="w-full aspect-video object-cover transition-all duration-500 ease-in-out"
          />
        )}
      </div>
    </div>
  );
}