import { Barlow, Antonio, DM_Sans, Inter, Luckiest_Guy, Press_Start_2P,Audiowide } from 'next/font/google';


export const antonio = Antonio({
    weight: ['100', '200', '300', '400', '500', '600', '700'],
    subsets: ['latin'],
});

export const barlow = Barlow({
    weight: ['400', '500', '600', '700', '800', '900'],
    subsets: ['latin'],
});

export const dmSans = DM_Sans({
    weight: ['300', '400', '500', '600', '700', '800', '900'],
    subsets: ['latin'],
});

export const inter = Inter({
    weight: ['300', '400', '500', '600', '700', '800', '900'],
    subsets: ['latin'],
});

export const luckiestGuy = Luckiest_Guy({
    weight: ['400'],
    subsets: ['latin'],
});

export const pressStart2P = Press_Start_2P({
    weight: ['400'],
    subsets: ['latin'],
});

export const audiowide = Audiowide({
    weight: ['400'],
    subsets: ['latin'],
});

export const funAndTrendyTheme = {
    fonts: {
        heading: antonio,
        body: barlow
    },
    text: {
        headingClass: 'font-extrabold uppercase',
        bodyClass: 'font-bold uppercase',
        white: 'text-white'
    },
    animations: {
        duration: 1,
        stagger: 0.02,
        variant: 'trigger' as const,
        scrollTrigger: {
            start: 'top 80%',
            end: 'top 20%'
        }
    },
    backgrounds: {
        texture: "bg-[url('/sections/images/funandtrendytexture.png')]",
        heroImage: "/sections/images/funandtrendyherobackground.jpeg"
    },
    spacing: {
        sectionPadding: 'py-20 md:py-30',
        gap: 'gap-4 md:gap-10',
        containerGap: 'flex flex-col gap-4 md:gap-6'
    },
    borders: {
        button: 'border-2 border-black',
        section: 'border-y-3 border-black',
        thick: 'border-4 border-black',
        rounded: 'rounded-sm',
        roundedLarge: 'rounded-2xl'
    },
    shadows: {
        retro: {
            offset: '0.045em',
            color: 'black'
        },
        small: 'shadow-[2px_2px_0px_rgba(0,0,0)]',
        medium: 'shadow-[4px_4px_0px_rgba(0,0,0)]',
        large: 'shadow-[6px_6px_0px_rgba(0,0,0)]',
        border: 'shadow-[3px_3px_0px_#000]',
        hover: 'hover:shadow-[6px_6px_0px_rgba(0,0,0)]'
    },
    buttons: {
        primary: {
            base: '',
            hover: '',
            text: 'text-white',
            hoverText: '',
            className: `h-12 px-8 border-2 border-black rounded-sm`,
            contentClassName: `!text-base md:!text-xl font-extrabold uppercase ${barlow.className}`
        },
        secondary: {
            base: 'bg-white',
            hover: '',
            text: 'text-black',
            hoverText: '',
            className: `h-12 px-8 border-2 border-black rounded-sm`,
            contentClassName: `!text-base md:!text-xl font-extrabold uppercase ${barlow.className}`
        }
    },
    description: {
        className: `text-base md:text-xl font-bold uppercase leading-[1.1] ${barlow.className}`
    },
    heading: {
        className: `${antonio.className}`,
        sizes: {
            hero: 'text-6xl md:text-7xl lg:text-8xl',
            large: 'text-5xl md:text-6xl lg:text-7xl',
            medium: 'text-4xl md:text-5xl lg:text-6xl',
            small: 'text-3xl md:text-4xl lg:text-5xl',
            year: 'text-8xl md:text-9xl lg:text-[10rem]'
        }
    },
    navbar: {
        logoSrc: "/sections/images/funandtrendylogo.svg",
        className: "top-12",
        logoClassName: "h-18",
        buttonClassName: `h-13 px-8 border-2 border-black rounded-sm`,
        buttonContentClassName: `!text-2xl font-extrabold uppercase ${barlow.className}`
    },
    layout: {
        halfWidth: "md:!w-[50%]",
        alignStart: true
    },
    tokenomics: {
        value: {
            small: 'text-2xl sm:text-4xl',
            large: 'text-5xl sm:text-6xl'
        },
        description: {
            small: 'text-base',
            medium: 'text-lg sm:text-2xl',
            large: 'text-xl sm:text-2xl'
        }
    },
    timeline: {
        spacing: {
            timelineGap: "gap-[var(--width-10)] md:gap-10",
        },
        radius: "rounded-2xl",
    }
};

export const futuristicTheme = {
    fonts: {
        heading: inter,
        body: inter
    },
    text: {
        headingClass: 'font-medium leading-[1.15] tracking-tight',
        bodyClass: 'tracking-tight',
        white: 'text-white',
        muted: 'text-white/75'
    },
    animations: {
        duration: 1.2,
        stagger: 0.05,
        variant: 'trigger' as const,
        scrollTrigger: {
            start: 'top 80%',
            end: 'top 20%'
        }
    },
    backgrounds: {
        gradient: {
            radialColor: '#030014',
            linearColor: '#7538c2',
            radialOpacity: '0%',
            linearOpacity: '70%'
        }
    },
    spacing: {
        sectionPadding: 'py-20 md:py-30',
        gap: 'gap-4 md:gap-6',
        containerGap: 'flex flex-col gap-4 md:gap-6'
    },
    borders: {
        button: '!border !border-white/10'
    },
    gradients: {
        text: {
            from: '#fff',
            to: 'rgba(255,255,255,0.5)'
        }
    },
    buttons: {
        primary: {
            base: 'bg-white/10 backdrop-blur-md',
            hover: 'after:bg-white',
            text: 'text-white',
            hoverText: 'after:text-black',
            className: 'h-10 px-6 !border !border-white/10 rounded-sm',
            contentClassName: `!text-base ${inter.className}`
        },
        secondary: {
            base: 'bg-white',
            hover: '',
            text: 'text-black',
            hoverText: 'after:text-white',
            className: 'h-10 px-6 !border !border-white/10 rounded-sm',
            contentClassName: `!text-base ${inter.className}`
        }
    },
    description: {
        className: `text-base md:text-xl text-white/75 ${inter.className}`
    },
    heading: {
        className: `${inter.className}`,
        sizes: {
            hero: 'text-6xl md:text-7xl lg:text-8xl',
            large: 'text-5xl md:text-6xl lg:text-7xl',
            medium: 'text-4xl md:text-5xl lg:text-6xl',
            small: 'text-3xl md:text-4xl lg:text-5xl',
            year: 'text-8xl md:text-9xl lg:text-[10rem]'
        }
    },
    navbar: {
        logoSrc: "/images/logowhite.svg",
        className: "top-8",
        logoClassName: "h-8"
    },
    layout: {
        halfWidth: "md:!w-[50%]",
        alignStart: true
    },
    tokenomics: {
        value: {
            small: 'text-2xl sm:text-4xl',
            large: 'text-5xl sm:text-6xl'
        },
        description: {
            small: 'text-base',
            medium: 'text-lg sm:text-2xl',
            large: 'text-xl sm:text-2xl'
        }
    },
    timeline: {
        spacing: {
            timelineGap: "gap-6 md:gap-8",
        },
        radius: "rounded-lg",
    },
    effects: {
        backdrop: "backdrop-blur-md",
        glow: "shadow-lg shadow-purple-500/20",
        glass: "bg-white/5 backdrop-blur-md border border-white/10",
    }
};