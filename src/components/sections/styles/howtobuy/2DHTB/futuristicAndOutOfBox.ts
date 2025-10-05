import { HowToBuyStyle2D } from "../types";
import { futuristicTheme as theme } from "../../shared/themes";
import { ColorTemplate } from "../../shared/themeConfig";
import { getFuturisticColors } from "../../shared/themeConfig";
import {
  getTextFillGradientConfig,
  getStandardSpotlight,
  getFuturisticCardStyle,
} from "../../shared/styleHelpers";
import { Wallet, Coins, ArrowLeftRight } from "lucide-react";

export function getFuturisticMinimalHowToBuyStyle2D(
  colorTemplate: ColorTemplate = 1
): HowToBuyStyle2D {
  const colors = getFuturisticColors(colorTemplate);

  return {
    componentType: "simple" as const,
    section: {
      className: theme.spacing.sectionPadding,
      backgroundColor: colors.primary,
      spotlight: getStandardSpotlight(colorTemplate),
    },
    title: {
      text: "How to Buy",
      className: `text-6xl md:text-8xl text-center ${theme.text.headingClass} leading-[1.1] py-2 ${theme.fonts.heading.className}`,
      ...getTextFillGradientConfig(),
    },
    simpleBento: {
      items: [
        {
          title: "Create Wallet",
          description:
            "Download and set up MetaMask or your preferred crypto wallet to store your tokens securely.",
          icon: Wallet,
        },
        {
          title: "Get ETH",
          description:
            "Purchase Ethereum from an exchange and transfer it to your wallet address.",
          icon: Coins,
        },
        {
          title: "Swap for $PUDGY",
          description:
            "Connect to Uniswap decentralized exchange and swap your ETH for tokens.",
          icon: ArrowLeftRight,
        },
      ],
      className: "",
      gridClassName: "",
      itemClassName: `${getFuturisticCardStyle(colorTemplate)} ${
        theme.text.white
      }`,
      iconClassName:
        "text-white p-6 futuristic-card-border futuristic-template-1-card-bg",
      titleClassName: `${theme.fonts.heading.className} text-white`,
      descriptionClassName: `${theme.fonts.body.className} text-white/80`,
    },
  };
}

export const futuristicminimal2dStyle = getFuturisticMinimalHowToBuyStyle2D(1);
