import React, { memo, useMemo } from "react";

type BgRadialGradientProps = {
  color?: string;
  bgColor?: string;
};

const GradientCircle: React.FC<{
  className: string;
  background?: string;
}> = memo(({ className, background }) => (
  <div
    className={`sm:w-[95vh] sm:h-[105vh] w-96 h-96 rounded-full absolute blur-[140px] ${className}`}
    style={background ? { background } : undefined}
  />
));

GradientCircle.displayName = "GradientCircle";

const BgRadialGradient: React.FC<BgRadialGradientProps> = memo(
  ({ color = "rgb(29,73,218)" }) => {
    const { gradient } = useMemo(() => {
      return {
        gradient: `radial-gradient(circle,${color} 6%, #000 80%)`,
      };
    }, [color]);

    return (
      <div className="absolute inset-0 overflow-hidden size-full pointer-events-none">
        <GradientCircle
          className="-bottom-40 -right-40 sm:-bottom-[40vh] sm:-right-[40vh]"
          background={gradient}
        />
        <GradientCircle
          className="-top-42 -left-42 sm:-top-[44vh] sm:-left-[42vh]"
          background={gradient}
        />
      </div>
    );
  }
);

BgRadialGradient.displayName = "BgRadialGradient";

export default BgRadialGradient;
