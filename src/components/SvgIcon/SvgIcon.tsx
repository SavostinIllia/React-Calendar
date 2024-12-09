import React from "react";

interface SvgIconProps {
  name: "add" | "arrow" | "trash" | "spinner" | "info"; 
  size?: number; 
  color?: string;
  className?: string;
}

const SvgIcon: React.FC<SvgIconProps> = ({
  name,
  size = 24,
  color = "currentColor",
  className = "",
}) => {

  const icons: Record<
    SvgIconProps["name"],
    { viewBox: string; path: JSX.Element }
  > = {
    add: {
      viewBox: "0 0 512 512",
      path: (
        <path d="M64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32zM200 344l0-64-64 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l64 0 0-64c0-13.3 10.7-24 24-24s24 10.7 24 24l0 64 64 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-64 0 0 64c0 13.3-10.7 24-24 24s-24-10.7-24-24z" />
      ),
    },
    arrow: {
      viewBox: "0 0 512 512",
      path: (
        <path d="M4.8003 9.11849C4.53403 9.38475 4.10233 9.38475 3.83606 9.11849L0.1997 5.48212C-0.0665664 5.21586 -0.0665664 4.78415 0.1997 4.51789L3.83606 0.881524C4.10233 0.615257 4.53403 0.615257 4.8003 0.881524C5.06657 1.14779 5.06657 1.57949 4.8003 1.84576L1.64605 5.00001L4.8003 8.15425C5.06657 8.42052 5.06657 8.85222 4.8003 9.11849Z" />
      ),
    },
    trash: {
      viewBox: "0 0 512 512",
      path: (
        <path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"/>     )
    },
    info: {
      viewBox: "0 0 512 512",
      path: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="512" height="512"><path d="M12,0A12,12,0,1,0,24,12,12.013,12.013,0,0,0,12,0Zm0,22A10,10,0,1,1,22,12,10.011,10.011,0,0,1,12,22Z"/><path d="M12,10H11a1,1,0,0,0,0,2h1v6a1,1,0,0,0,2,0V12A2,2,0,0,0,12,10Z"/><circle cx="12" cy="6.5" r="1.5"/></svg>
      )
    },
    spinner: {
      viewBox: "0 0 512 512",
      path: (
        <path d="M304 48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm0 416a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM48 304a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm464-48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM142.9 437A48 48 0 1 0 75 369.1 48 48 0 1 0 142.9 437zm0-294.2A48 48 0 1 0 75 75a48 48 0 1 0 67.9 67.9zM369.1 437A48 48 0 1 0 437 369.1 48 48 0 1 0 369.1 437z" />
      ),
    },
  };

  const icon = icons[name];

  if (!icon) {
    console.warn(`Icon "${name}" does not exist.`);
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        fill={color}
        className={className}

      >
        <rect width="100%" height="100%" fill="red" />
        <text x="50%" y="50%" fontSize="8" fill="white" textAnchor="middle" dy=".3em">
          ?
        </text>
      </svg>
    );
  }

  return (
    <svg
      className={`${className} w-full h-full `}
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox={icon.viewBox}
      fill={color}
      style={{maxHeight:`${size}`, maxWidth:`${size}`}}
    >
      {icon.path}
    </svg>
  );
};

export default SvgIcon;
