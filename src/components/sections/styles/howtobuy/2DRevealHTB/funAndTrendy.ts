import { HowToBuyStyle2D } from "../types";
import { funAndTrendyTheme as theme } from "../../shared/themes";
import { ColorTemplate } from "../../shared/themeConfig";
import { getRetroTextConfig } from '../../shared/styleHelpers';
import { getFunAndTrendyColors } from "../../shared/themeConfig";

export function getFunAndTrendyHowToBuyStyle2D(
  colorTemplate: ColorTemplate = 1
): HowToBuyStyle2D {
  const colors = getFunAndTrendyColors(colorTemplate);

  return {
    componentType: "reveal" as const,
    section: {
      className: theme.spacing.sectionPadding,
      backgroundColor: colors.primary,
      backgroundPattern: theme.backgrounds.texture,
    },
    title: {
      text: "How to Buy",
      className: `text-6xl md:text-8xl text-center ${theme.text.headingClass} leading-[1.1] py-2 ${theme.fonts.heading.className} ${theme.text.white}`,
      ...getRetroTextConfig(),
    },
    bento: {
      items: [
        {
          id: "01",
          title: "Create Wallet",
          description:
            "Download and set up MetaMask or your preferred crypto wallet to store your tokens securely.",
          imageSrc: "/sections/images/character1.webp",
        },
        {
          id: "02",
          title: "Get ETH",
          description:
            "Purchase Ethereum from an exchange and transfer it to your wallet address.",
          imageSrc: "/sections/images/character2.webp",
        },
        {
          id: "03",
          title: "Swap for $PUDGY",
          description:
            "Connect to Uniswap decentralized exchange and swap your ETH for tokens.",
          imageSrc: "/sections/images/character3.webp",
        },
      ],
      enableHoverAnimation: true,
      showImages: true,
      className: "",
      gridClassName: "",
      itemClassName:
        "bg-white rounded-2xl shadow-[4px_4px_0px_rgba(0,0,0)] border-4 border-white overfow-hidden",
    },
  };
}

export const funandtrendy2dStyle = getFunAndTrendyHowToBuyStyle2D(1);
