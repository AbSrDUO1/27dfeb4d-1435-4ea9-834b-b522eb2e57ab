import React from 'react';
import type { TimelinePhoneViewItem } from './usePhoneAnimations';

interface ContentBlockProps {
  item: TimelinePhoneViewItem;
  titleRef: (el: HTMLHeadingElement | null) => void;
  descriptionRef: (el: HTMLParagraphElement | null) => void;
  containerClassName?: string;
  wrapperClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
}

const ContentBlock: React.FC<ContentBlockProps> = ({ 
  item, 
  titleRef, 
  descriptionRef, 
  containerClassName = '', 
  wrapperClassName = '', 
  titleClassName = '', 
  descriptionClassName = '' 
}) => (
  <div className={`${item.trigger} ${containerClassName}`}>
    <div className={`flex flex-col text-center items-center ${wrapperClassName}`}>
      <h2 className={`text-5xl font-semibold leading-[100%] ${titleClassName}`} ref={titleRef}>{item.title}</h2>
      <p className={`text-sm ${descriptionClassName}`} ref={descriptionRef}>{item.description}</p>
    </div>
  </div>
);

export default React.memo(ContentBlock);