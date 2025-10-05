import { useEffect, RefObject } from 'react';

export const useStaggerAnimation = (
    buttonRef: RefObject<HTMLButtonElement | null>,
    text: string | undefined,
    selector: string = '[data-button-animate-chars]',
    offsetIncrement: number = 0.01
) => {
    useEffect(() => {
        const buttonElement = buttonRef.current?.querySelector(selector);
        if (!buttonElement) return;

        const textContent = text || buttonElement.textContent || '';
        buttonElement.innerHTML = '';

        [...textContent].forEach((char, index) => {
            const span = document.createElement('span');
            span.textContent = char;
            span.style.transitionDelay = `${index * offsetIncrement}s`;

            if (char === ' ') {
                span.style.whiteSpace = 'pre';
            }

            buttonElement.appendChild(span);
        });
    }, [buttonRef, text, selector, offsetIncrement]);
};