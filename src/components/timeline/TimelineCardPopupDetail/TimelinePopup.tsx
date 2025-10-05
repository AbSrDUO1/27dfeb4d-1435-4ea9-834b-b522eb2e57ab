'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';

interface TimelineItem {
  title: string;
  description: string;
  video?: string;
  image?: string;
}

interface TimelinePopupProps {
  isOpen: boolean;
  item: TimelineItem | null;
  onClose: () => void;
}

const TimelinePopup = ({ isOpen, item, onClose }: TimelinePopupProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  
  React.useEffect(() => {
    setImageLoaded(false);
  }, [item]);
  
  return (
    <div
      className={`fixed top-0 left-0 w-full h-full flex flex-col gap-3 items-center justify-center z-40 backdrop-blur-md bg-white/20 transition-all duration-300 ${
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
      onClick={onClose}
    >
      {isOpen && item && (
        <>
          <div
            className="bg-white shadow rounded p-6 w-70 md:w-30 flex flex-col gap-6"
            onClick={(e) => e.stopPropagation()}
          >
            {item.image && (
              <div className="relative w-full">
                {!imageLoaded && (
                  <div className="absolute inset-0 h-50 rounded animate-pulse" />
                )}
                <Image
                  src={item.image}
                  alt={item.title}
                  width={600}
                  height={400}
                  className={`w-full h-auto rounded transition-opacity duration-1000 ${
                    imageLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                  onLoad={() => setImageLoaded(true)}
                />
              </div>
            )}
            <div className="flex flex-col gap-1 px-6 mb-3">
              <h2 className="text-2xl font-bold leading-[110%]">{item.title}</h2>
              <p className="text-base leading-[110%]">{item.description}</p>
            </div>
          </div>
          <div 
            className="cursor-pointer h-8 aspect-square rounded-full bg-white shadow flex items-center justify-center"
            onClick={onClose}
          >
            <X className="w-[35%] aspect-square text-black" />
          </div>
        </>
      )}
    </div>
  );
};

TimelinePopup.displayName = 'TimelinePopup';

export default React.memo(TimelinePopup);