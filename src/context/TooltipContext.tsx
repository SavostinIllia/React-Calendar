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
        coords: { x: number; y: number };
        direction?: 'right' | 'left' | string ;
    } | null>(null);
    const [isVisible, setIsVisible] = useState(false);
    const tooltipRef = React.useRef<HTMLDivElement>(null);
    
    const showTooltip = (content: React.ReactNode, targetElement: HTMLElement, targetMainParent: HTMLElement) => {
      setTooltip({ content, coords: { x: -999, y: -999 }});
      setIsVisible(true);

      setTimeout(() => {
        
        if (tooltipRef.current) {

          const tooltipRect = tooltipRef.current.getBoundingClientRect();
          const targetRect = targetElement.getBoundingClientRect();
          const targetMainParentRect = targetMainParent.getBoundingClientRect();
          
          if (targetMainParent) {
            const spaceRight = targetMainParentRect.right - targetRect.left;
            const spaceLeft = targetRect.left - targetMainParentRect.left;

            let x, y;
            let direction;

            if (spaceRight >= tooltipRect.width) {
              x = targetRect.left;
              y = targetRect.top - (tooltipRect.height + 10 );
              direction = 'right'
            } else if (spaceLeft >= tooltipRect.width) {
              x = targetRect.right - tooltipRect.width;
              y = targetRect.top - (tooltipRect.height + 10);
              direction = 'left'
            }else {``
              x = targetRect.left;
              y = targetRect.top - (tooltipRect.height + 10);
              direction = 'right';
            }

            setTooltip(prev => prev ? { 
              ...prev, 
              coords: { x, y }, 
              direction} 
              : null);
          }
        }
      }, 0)

    
    };

  const hideTooltip = () => {
    setIsVisible(false); 

  };

  return (
    <TooltipContext.Provider value={{ showTooltip, hideTooltip }}>
      {children}
      { tooltip?.content &&
        ReactDOM.createPortal(
          <div
            className={`tooltip absolute bg-black text-white rounded-md p-[10px]  transition-opacity duration-[.4s] max-w-[400px]
                        ${isVisible  ? 'show opacity-100 z-20' : 'hide opacity-0 -z-10 '} 
                        ${tooltip?.direction}`}
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
