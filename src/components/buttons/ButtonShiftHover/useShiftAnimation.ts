import { useEffect, RefObject } from 'react';

export const useShiftAnimation = (
    buttonRef: RefObject<HTMLButtonElement | null>,
    text: string | undefined,
    selector: string = '[data-button-animate-chars]'
) => {
    useEffect(() => {
        const buttonElement = buttonRef.current?.querySelector(selector);
        if (!buttonElement) return;

        const textContent = text || buttonElement.textContent || '';
        buttonElement.innerHTML = '';

        [...textContent].forEach((char) => {
            const span = document.createElement('span');
            span.textContent = char;

            if (char === ' ') {
                span.style.whiteSpace = 'pre';
            }

            buttonElement.appendChild(span);
        });
    }, [buttonRef, text, selector]);
};