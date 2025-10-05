"use client";

import { memo } from "react";
import Image from "next/image";
import ButtonPressDepth from "@/components/buttons/ButtonPressDepth";
import {
  Framer,
  Github,
  Instagram,
  Twitter,
  Copy,
  type LucideIcon,
} from "lucide-react";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";

interface WalletFooterProps {
  logoSrc?: string;
  logoAlt?: string;
  logoText?: string;
  walletAddress?: string;
  copyButtonText?: string;
  copiedText?: string;
  copyrightText?: string;
  socialIcons?: Array<LucideIcon>;
  className?: string;
  containerClassName?: string;
  logoClassName?: string;
  logoTextClassName?: string;
  walletContainerClassName?: string;
  walletAddressClassName?: string;
  copyButtonClassName?: string;
  copyIconClassName?: string;
  bottomContainerClassName?: string;
  copyrightTextClassName?: string;
  socialContainerClassName?: string;
  socialButtonClassName?: string;
  socialButtonChildClassName?: string;
  socialIconClassName?: string;
  onSocialClick?: (index: number) => void;
}

const WalletFooter = memo<WalletFooterProps>(function WalletFooter({
  logoSrc,
  logoAlt = "Logo",
  logoText = "Webild",
  walletAddress = "0x6982508145454ce325ddbe47a25d4ec3d2311933",
  copyButtonText = "Copy",
  copiedText = "Copied!",
  copyrightText = "© 2025 | Webild",
  socialIcons = [Github, Instagram, Framer, Twitter],
  className = "",
  containerClassName = "",
  logoClassName = "",
  logoTextClassName = "",
  walletContainerClassName = "",
  walletAddressClassName = "",
  copyButtonClassName = "",
  copyIconClassName = "",
  bottomContainerClassName = "",
  copyrightTextClassName = "",
  socialContainerClassName = "",
  socialButtonClassName = "",
  socialButtonChildClassName = "",
  socialIconClassName = "",
  onSocialClick,
}) {
  const { copied, copy } = useCopyToClipboard();

  const handleCopy = () => {
    if (walletAddress) {
      copy(walletAddress);
    }
  };

  return (
    <footer
      role="contentinfo"
      aria-label="Site footer"
      className={`relative w-full px-[var(--width-5)] py-6 ${className}`}
    >
      <div
        className={`w-full max-w-[var(--width-100)] mx-auto ${containerClassName}`}
      >
        <div className="flex items-center justify-between mb-6 flex-col sm:flex-row gap-6">
          <div className="flex items-center">
            {logoSrc ? (
              <Image
                src={logoSrc}
                alt={logoAlt}
                width={120}
                height={40}
                className={logoClassName}
              />
            ) : (
              <span className={`text-2xl font-bold ${logoTextClassName}`}>
                {logoText}
              </span>
            )}
          </div>

          <div
            className={`flex items-center gap-4 ${walletContainerClassName}`}
          >
            <span className={`font-mono text-sm ${walletAddressClassName}`}>
              {walletAddress}
            </span>
            <button
              type="button"
              onClick={handleCopy}
              className={`flex items-center gap-2 px-4 py-2 ${copyButtonClassName}`}
              aria-label="Copy wallet address"
            >
              <span className="relative inline-block">
                <span
                  className={`inline-block transition-all duration-300 ${
                    copied ? "opacity-0" : "opacity-100"
                  }`}
                >
                  {copyButtonText}
                </span>
                <span
                  className={`absolute left-0 inline-block transition-all duration-300 ${
                    copied ? "opacity-100" : "opacity-0"
                  }`}
                >
                  {copiedText}
                </span>
              </span>
              <Copy
                className={`h-4 w-4 ${copyIconClassName}`}
                strokeWidth={2}
              />
            </button>
          </div>
        </div>

        <div
          className={`flex items-center justify-between ${bottomContainerClassName}`}
        >
          <span className={`text-sm ${copyrightTextClassName}`}>
            {copyrightText}
          </span>

          <div className={`flex gap-3 ${socialContainerClassName}`}>
            {socialIcons.map((Icon, idx) => (
              <ButtonPressDepth
                key={idx}
                type="button"
                variant="side"
                className={socialButtonClassName}
                frontClassName={socialButtonChildClassName}
                ariaLabel={`Social icon ${idx + 1}`}
                onClick={() => onSocialClick?.(idx)}
              >
                <Icon
                  strokeWidth={1.25}
                  className={`h-5 w-5 ${socialIconClassName}`}
                />
              </ButtonPressDepth>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
});

export default WalletFooter;
