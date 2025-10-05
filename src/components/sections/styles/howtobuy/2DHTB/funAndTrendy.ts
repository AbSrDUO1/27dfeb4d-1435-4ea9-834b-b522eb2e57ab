import { HowToBuyStyle2D } from "../types";
import { funAndTrendyTheme as theme } from "../../shared/themes";
import { ColorTemplate } from "../../shared/themeConfig";
import { getFunAndTrendyColors } from "../../shared/themeConfig";
import { getRetroTextConfig } from "../../shared/styleHelpers";
import { Wallet, Coins, ArrowLeftRight } from "lucide-react";

export function getFunAndTrendyMinimalHowToBuyStyle2D(
  colorTemplate: ColorTemplate = 1
): HowToBuyStyle2D {
  const colors = getFunAndTrendyColors(colorTemplate);

  return {
    componentType: "simple" as const,
    section: {
      className: theme.spacing.sectionPadding,
      backgroundColor: colors.secondary,
      backgroundPattern: theme.backgrounds.texture,
    },
    title: {
      text: "How to Buy",
      className: `text-6xl md:text-8xl text-center ${theme.text.headingClass} leading-[1.1] py-2 ${theme.fonts.heading.className} ${theme.text.white}`,
      ...getRetroTextConfig(),
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
      itemClassName: `bg-white ${theme.borders.button} shadow-[4px_4px_0px_rgba(0,0,0)]`,
      iconClassName:
        "text-black p-6 border rounded shadow-[2px_2px_0px_rgba(0,0,0)]",
      titleClassName: `${theme.fonts.heading.className} ${theme.text.headingClass} text-black`,
      descriptionClassName: `${theme.fonts.body.className} ${theme.text.bodyClass} text-black`,
    },
  };
}

export const funandtrendyminimal2dStyle =
  getFunAndTrendyMinimalHowToBuyStyle2D(1);
