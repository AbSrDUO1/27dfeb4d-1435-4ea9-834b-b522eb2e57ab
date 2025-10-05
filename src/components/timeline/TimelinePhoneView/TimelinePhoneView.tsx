'use client';

import React from 'react';
import ContentBlock from './ContentBlock';
import PhoneFrame from './TimelinePhoneViewFrame';
import { usePhoneAnimations, type TimelinePhoneViewItem } from './usePhoneAnimations';

interface TimelinePhoneViewProps {
  items: TimelinePhoneViewItem[];
}

const TimelinePhoneView: React.FC<TimelinePhoneViewProps> = ({ items }) => {
  const { imageRefs, mobileImageRefs, titleRefs, descriptionRefs } = usePhoneAnimations(items);

  return (
    <>
      <section className="hidden md:flex h-[200vh] relative">
        <div className="absolute top-0 left-0 flex flex-col h-[200vh] w-full px-[var(--width-10)] z-0">
          {items.map((item, index) => (
            <ContentBlock
              key={`content-${index}`}
              item={item}
              titleRef={(el: HTMLHeadingElement | null) => { titleRefs.current[index] = el; }}
              descriptionRef={(el: HTMLParagraphElement | null) => { descriptionRefs.current[index] = el; }}
              containerClassName="w-full h-screen flex justify-center"
              wrapperClassName="w-30 h-full gap-6 justify-center text-black"
              descriptionClassName="max-w-[80%]"
            />
          ))}
        </div>
        <div className="sticky top-0 left-0 h-screen w-full overflow-hidden">
          {items.map((item, itemIndex) => (
            <div key={`phones-${itemIndex}`} className="h-screen w-full p-[var(--width-10)] absolute top-0 left-0">
              <div className="w-full h-full flex flex-row justify-between items-center">
                {[item.image1, item.image2].map((imageSrc, imageIndex) => {
                  const refIndex = itemIndex * 2 + imageIndex;
                  return (
                    <PhoneFrame
                      key={`phone-${refIndex}`}
                      imageSrc={imageSrc}
                      imageRef={(el: HTMLDivElement | null) => { imageRefs.current[refIndex] = el; }}
                      className="w-20 2xl:w-25 h-[70vh]"
                      altText={`${item.title} showcase ${imageIndex + 1}`}
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="md:hidden flex flex-col gap-[var(--width-25)] px-[calc(var(--width-10)/2)] text-black overflow-hidden">
        {items.map((item, itemIndex) => (
          <div key={`mobile-item-${itemIndex}`} className="flex flex-col gap-[calc(var(--width-10)/2)]">
            <ContentBlock
              item={item}
              titleRef={(el: HTMLHeadingElement | null) => { titleRefs.current[itemIndex] = el; }}
              descriptionRef={(el: HTMLParagraphElement | null) => { descriptionRefs.current[itemIndex] = el; }}
              containerClassName=""
              wrapperClassName="gap-[calc(var(--width-10)/3)] text-black"
            />
            <div className="flex flex-row gap-6 justify-center">
              {[item.image1, item.image2].map((imageSrc, imageIndex) => {
                const refIndex = itemIndex * 2 + imageIndex;
                return (
                  <PhoneFrame
                    key={`mobile-phone-${refIndex}`}
                    imageSrc={imageSrc}
                    imageRef={(el: HTMLDivElement | null) => { mobileImageRefs.current[refIndex] = el; }}
                    className="w-45 h-100"
                    altText={`${item.title} showcase ${imageIndex + 1}`}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </section>
    </>
  );
};

export default React.memo(TimelinePhoneView);