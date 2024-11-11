import React from "react";
import { createPortal } from "react-dom";

export const useTooltip = <T extends HTMLElement>(message: string) => {
    const ref = React.useRef<T>(null);
    const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);
    const [isVisible, setIsVisible] = React.useState(false);
    const [tooltipPosition, setTooltipPosition] = React.useState({ top: 0, left: 0 });
    
    const updateTooltipPosition = () => {
        if (ref.current) {
            const { top, left, height } = ref.current.getBoundingClientRect();
            setTooltipPosition({
                top: top + height + window.scrollY,
                left: left + window.scrollX + 25,
            });
        }
    };
    const showTooltip = () => {
        updateTooltipPosition();
        timeoutRef.current = setTimeout(() => setIsVisible(true), 500);
    };
    const hideTooltip = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
        setIsVisible(false);
    };
// update tooltip position to avoid it appearing at the center of the screen in the beginning
    React.useEffect(() => {
        if (ref.current) {
            window.addEventListener("scroll", updateTooltipPosition);
            window.addEventListener("resize", updateTooltipPosition);
        }
        return () => {
            window.removeEventListener("scroll", updateTooltipPosition);
            window.removeEventListener("resize", updateTooltipPosition);
        };
    }, []);

    const TooltipElement = isVisible  ? (
        createPortal(
            <div
                style={{
                    position: 'absolute',
                    top: tooltipPosition.top,
                    left: tooltipPosition.left,
                    backgroundColor: '#333',
                    color: '#fff',
                    textWrap: 'nowrap',
                    fontSize: '0.7rem',
                    padding: '5px 10px',
                    borderRadius: '4px',
                    zIndex: 1000,
                }}
            >
                {message}
            </div>,
            document.body
        )
    ) : null;
    return { ref, showTooltip, hideTooltip, TooltipElement };
};