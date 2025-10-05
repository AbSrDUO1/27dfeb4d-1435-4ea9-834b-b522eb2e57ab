'use client';

import { useRef, useEffect, useState } from 'react';

interface UseSvgTextLogoReturn {
    svgRef: React.RefObject<SVGSVGElement | null>;
    textRef: React.RefObject<SVGTextElement | null>;
    viewBox: string;
    aspectRatio: number;
}

export default function useSvgTextLogo(logoText: string, hasLogoSrc: boolean): UseSvgTextLogoReturn {
    const svgRef = useRef<SVGSVGElement>(null);
    const textRef = useRef<SVGTextElement>(null);
    const [viewBox, setViewBox] = useState('0 0 100 20');
    const [aspectRatio, setAspectRatio] = useState(5);

    useEffect(() => {
        if (!hasLogoSrc && textRef.current && svgRef.current) {
            const bbox = textRef.current.getBBox();
            setViewBox(`${bbox.x} ${bbox.y} ${bbox.width} ${bbox.height}`);
            setAspectRatio(bbox.width / bbox.height);
        }
    }, [hasLogoSrc, logoText]);

    return {
        svgRef,
        textRef,
        viewBox,
        aspectRatio
    };
}