import { HowToBuyStyle2D } from "../types";
import { futuristicTheme as theme } from "../../shared/themes";
import { ColorTemplate } from "../../shared/themeConfig";
import { getTextFillGradientConfig } from "../../shared/styleHelpers";
import { getFuturisticColors } from "../../shared/themeConfig";

export function getFuturisticHowToBuyStyle2D(
  colorTemplate: ColorTemplate = 1
): HowToBuyStyle2D {
  const colors = getFuturisticColors(colorTemplate);

  return {
    componentType: "reveal" as const,
    section: {
      className: theme.spacing.sectionPadding,
      backgroundColor: colors.primary,
      spotlight: {
        width: "25%",
        height: "150%",
        left: "0%",
        top: "-30%",
        rotate: "-60deg",
        color: colors.spotlight,
        blur: "100px",
        opacity: 1,
        mobileWidth: "55%",
        mobileHeight: "70%",
        mobileLeft: "-10%",
        mobileTop: "-60%",
        mobileRotate: "-30deg",
      },
    },
    title: {
      text: "How to Buy",
      className: `text-6xl md:text-8xl text-center ${theme.text.headingClass} leading-[1.1] ${theme.fonts.heading.className}`,
      ...getTextFillGradientConfig(),
    },
    bento: {
      items: [
        {
          id: "01",
          title: "Create Wallet",
          description:
            "Download and set up MetaMask or your preferred crypto wallet to store your tokens securely.",
          imageSrc: "/images/placeholder3.avif",
        },
        {
          id: "02",
          title: "Get ETH",
          description:
            "Purchase Ethereum from an exchange and transfer it to your wallet address.",
          imageSrc: "/images/placeholder2.avif",
        },
        {
          id: "03",
          title: "Swap for $PUDGY",
          description:
            "Connect to Uniswap decentralized exchange and swap your ETH for tokens.",
          imageSrc: "/images/placeholder1.avif",
        },
      ],
      enableHoverAnimation: true,
      showImages: true,
      className: "",
      gridClassName: "",
      itemClassName:
        "futuristic-template-1-card-bg futuristic-card-border rounded-2xl",
    },
  };
}

export const futuristicandoutofbox2dStyle = getFuturisticHowToBuyStyle2D(1);
