import React, { createContext, useContext, useState } from 'react';
import ReactDOM from 'react-dom';


interface TooltipContextType {
  showTooltip: (content: React.ReactNode, targetElement: HTMLElement, targetMainParent: HTMLElement) => void;
  hideTooltip: () => void;
};

const TooltipContext = createContext<TooltipContextType | undefined>(undefined);

export const TooltipProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [tooltip, setTooltip] = useState<{ 
        content?: React.ReactNode;
        coords: { x: number; y: number } 
    } | null>(null);
    const [isVisible, setIsVisible] = useState(false);
    const tooltipRef = React.useRef<HTMLDivElement>(null);
    
    const showTooltip = (content: React.ReactNode, targetElement: HTMLElement, targetMainParent: HTMLElement) => {
      setTooltip({ content, coords: { x: 0, y: 0 } });
      setIsVisible(true);
  
    
        if (tooltipRef.current) {
          
          const tooltipRect = tooltipRef.current.getBoundingClientRect();
          const targetRect = targetElement.getBoundingClientRect();
          const targetMainParentRect = targetMainParent.getBoundingClientRect();
  
          if (targetMainParent) {
            const spaceRight = targetMainParentRect.right - targetRect.right;
            const spaceLeft = targetRect.left - targetMainParentRect.left;
            const spaceTop = targetRect.top - targetMainParentRect.top;
            const spaceBottom = targetMainParentRect.bottom - targetRect.bottom;

            let x, y;
            debugger
            if (spaceRight >= tooltipRect.width) {
              x = targetRect.right;
              y = targetRect.top - tooltipRect.height;
            } else if (spaceLeft >= tooltipRect.width) {
              x = targetRect.left - tooltipRect.width;
              y = targetRect.top - tooltipRect.height;
            } else if (spaceBottom >= tooltipRect.height) {
              x = targetRect.left;
              y = targetRect.bottom;
            } else if (spaceTop >= tooltipRect.height) {
              x = targetRect.left;
              y = targetRect.top - tooltipRect.height;
            } else {
              x = targetRect.right;
              y = Math.max(targetMainParentRect.top, targetRect.top);
            }
  
            setTooltip(prev => prev ? { ...prev, coords: { x, y } } : null);
          }
        }
    
    };

  const hideTooltip = () => {
    setIsVisible(false); 

  };

  return (
    <TooltipContext.Provider value={{ showTooltip, hideTooltip }}>
      {children}
      {
        ReactDOM.createPortal(
          <div
            className={`tooltip ${isVisible  ? 'show' : 'hide'} absolute bg-black text-white rounded-md p-[10px] z-10`}
            style={{
                top: `${tooltip && tooltip.coords.y}px`,
                left: `${tooltip &&tooltip.coords.x}px`,
              }}
              ref={tooltipRef}
          >
            {tooltip &&tooltip.content}
          </div>,
          document.body
        )}
    </TooltipContext.Provider>
  );
};

export const useToolipContext = (): TooltipContextType => {
  const context = useContext(TooltipContext);
  if (!context) {
    throw new Error('useTooltip must be used within a TooltipProvider');
  }
  return context;
};
