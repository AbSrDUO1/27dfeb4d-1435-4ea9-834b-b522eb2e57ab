import React from 'react';
import Image from 'next/image';

interface PhoneFrameProps {
  imageSrc: string;
  imageRef: (el: HTMLDivElement | null) => void;
  className?: string;
  altText: string;
}

const PhoneFrame: React.FC<PhoneFrameProps> = ({ imageSrc, imageRef, className = '', altText }) => (
  <div 
    className={`rounded-4xl border-4 border-white shadow flex flex-col overflow-hidden ${className}`} 
    ref={imageRef}
  >
    <Image src={imageSrc} width={500} height={1000} alt={altText} className="w-full h-full object-cover" />
  </div>
);

export default React.memo(PhoneFrame);