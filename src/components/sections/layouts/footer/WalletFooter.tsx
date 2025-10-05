"use client";

import { memo } from "react";
import BaseWalletFooter from "@/components/footer/WalletFooter";
import { FooterStyle } from "../../styles/footer/types";
import { getFunAndTrendyWalletFooterStyle } from "../../styles/footer/wallet/funAndTrendy";
import { getFuturisticWalletFooterStyle } from "../../styles/footer/wallet/futuristicAndOutOfBox";
import { useSiteTheme, getThemeStyle } from "../../ThemeProvider";
import { Framer, Github, Instagram, Twitter } from "lucide-react";

interface WalletFooterProps {
  logoText?: string;
  walletAddress?: string;
  copyButtonText?: string;
  copiedText?: string;
  copyrightText?: string;
  onSocialClick?: (index: number) => void;
}

const WalletFooter = memo<WalletFooterProps>(function WalletFooter({
  logoText = "Webild",
  walletAddress = "0x6982508145454ce325ddbe47a25d4ec3d2311933",
  copyButtonText = "Copy",
  copiedText = "Copied!",
  copyrightText = "© 2025 | Webild",
  onSocialClick,
}) {
  const theme = useSiteTheme();
  const style: FooterStyle = getThemeStyle(theme, {
    funAndTrendy: getFunAndTrendyWalletFooterStyle,
    futuristicAndOutOfBox: getFuturisticWalletFooterStyle,
  });
  const socialIcons = [Github, Instagram, Framer, Twitter];

  return (
    <BaseWalletFooter
      logoSrc={style.logoSrc}
      logoText={logoText}
      walletAddress={walletAddress}
      copyButtonText={copyButtonText}
      copiedText={copiedText}
      copyrightText={copyrightText}
      socialIcons={socialIcons}
      className={style.className}
      containerClassName={style.containerClassName}
      logoClassName={style.logoClassName}
      logoTextClassName={style.logoTextClassName}
      walletContainerClassName={style.walletContainerClassName}
      walletAddressClassName={style.walletAddressClassName}
      copyButtonClassName={style.copyButtonClassName}
      copyIconClassName={style.copyIconClassName}
      bottomContainerClassName={style.bottomContainerClassName}
      copyrightTextClassName={style.copyrightTextClassName}
      socialContainerClassName={style.socialContainerClassName}
      socialButtonClassName={style.socialButtonClassName}
      socialButtonChildClassName={style.socialButtonChildClassName}
      socialIconClassName={style.socialIconClassName}
      onSocialClick={onSocialClick}
    />
  );
});

export default WalletFooter;
