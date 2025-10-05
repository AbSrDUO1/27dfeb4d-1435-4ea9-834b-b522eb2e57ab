"use client";

import { memo } from "react";
import BaseMewFooter from "@/components/footer/MewFooter";
import { FooterStyle } from "../../styles/footer/types";
import { getFunAndTrendyFooterStyle } from "../../styles/footer/mew/funAndTrendy";
import { getFuturisticFooterStyle } from "../../styles/footer/mew/futuristicAndOutOfBox";
import { useSiteTheme, getThemeStyle } from "../../ThemeProvider";
import {
  Framer,
  Github,
  Instagram,
  Twitter,
} from "lucide-react";

interface MewFooterProps {
  title?: string;
}

const MewFooter = memo<MewFooterProps>(function MewFooter({ 
  title = "Let's come together and put an end to their tyranny… The dog days are done."
}) {
  const theme = useSiteTheme();
  const style: FooterStyle = getThemeStyle(
    theme,
    {
      funAndTrendy: getFunAndTrendyFooterStyle,
      futuristicAndOutOfBox: getFuturisticFooterStyle
    }
  );
  const socialIcons = [Github, Instagram, Framer, Twitter];

  return (
    <BaseMewFooter
      title={title}
      imageSrc="/sections/images/character2.webp"
      imageAlt="Mew Footer"
      socialIcons={socialIcons}
      className={style.className}
      titleClassName={style.titleClassName}
      gradient={style.gradient}
      button={style.button}
      section={style.section}
    />
  );
});

export default MewFooter;
