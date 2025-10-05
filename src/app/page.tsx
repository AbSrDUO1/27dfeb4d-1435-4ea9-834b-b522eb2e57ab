"use client";
import { SiteThemeProvider } from '@/components/sections/ThemeProvider';
import NavbarBase from '@/components/navigation/NavbarBase';
import BillboardHero from '@/components/sections/layouts/hero/BillboardHero';
import CtaAbout from '@/components/sections/layouts/about/CtaAbout';
import HowToBuy3D from '@/components/sections/layouts/howtobuy/3DHTB';
import ExpandingGridTokenomics from '@/components/sections/layouts/tokenomics/ExpandingGridTokenomics';
import BentoFAQ from '@/components/sections/layouts/faq/BentoFAQ';
import FooterLogoEmphasisBackgroundGradient from '@/components/footer/FooterLogoEmphasisBackgroundGradient';

export default function Home() {
  return (
    <SiteThemeProvider theme={{
      styleVariant: "funAndTrendy",
      colorTemplate: 2,
      textAnimation: "slide"
    }}>
      <div id="nav" data-section="nav">
        <NavbarBase
          logoSrc="/images/logo.svg"
          logoAlt="VibeCoin Logo"
          leftButtonText="Menu"
          rightButtonText="Get Early Access"
          className="text-white"
          containerClassName="flex justify-between items-center p-4"
        />
      </div>

      <div id="hero" data-section="hero" className="scroll-mt-24 bg-hero-gradient">
        <BillboardHero
          title="Welcome to VibeCoin"
          subtitle="Join the revolution in cryptocurrency!"
        />
      </div>

      <div id="about" data-section="about" className="scroll-mt-24">
        <CtaAbout
          title="About VibeCoin"
          descriptions={["Discover the future of finance.", "VibeCoin is designed to empower users with decentralization and transparency."]}
        />
      </div>

      <div id="how-to-buy" data-section="how-to-buy" className="scroll-mt-24">
        <HowToBuy3D
          title="How to Buy VibeCoin"
          steps={[
            {title: "Step 1", description: "Create an account", image: "/images/placeholder1.avif", position: "left", isCenter: false},
            {title: "Step 2", description: "Get VibeCoin in your wallet", image: "/images/placeholder2.avif", position: "center", isCenter: true},
            {title: "Step 3", description: "Start trading", image: "/images/placeholder3.avif", position: "right", isCenter: false},
          ]}
        />
      </div>

      <div id="tokenomics" data-section="tokenomics" className="scroll-mt-24">
        <ExpandingGridTokenomics
          title="Tokenomics"
          description="Understand our token structure"
          cardItems={[
            { id: 1, title: "Total Supply", description: "1 Billion Coins" },
            { id: 2, title: "Circulating Supply", description: "500 Million Coins" },
            { id: 3, title: "Market Cap", description: "$25 Million" }
          ]}
        />
      </div>

      <div id="faq" data-section="faq" className="scroll-mt-24">
        <BentoFAQ
          items={[
            { title: "What is VibeCoin?", content: "VibeCoin is a digital currency tailored for modern transactions." },
            { title: "How to invest?", content: "Investing is straightforward; sign up and buy tokens." },
            { title: "Where can I use VibeCoin?", content: "You can use VibeCoin for diverse transactions and trades." }
          ]}
        />
      </div>

      <div id="footer" data-section="footer" className="scroll-mt-24">
        <FooterLogoEmphasisBackgroundGradient
          logoSrc="/images/logo.svg"
          logoAlt="VibeCoin Logo"
          logoText="VibeCoin"
          items={[
            { label: "Privacy Policy", onClick: () => {} },
            { label: "Terms of Service", onClick: () => {} }
          ]}
          className="text-white"
          containerClassName="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-4"
        />
      </div>
    </SiteThemeProvider>
  );
}