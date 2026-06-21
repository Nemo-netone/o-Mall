import type { SVGProps } from "react";

export type AppIconName =
  | "arrow-up-right"
  | "book"
  | "building"
  | "cart"
  | "check"
  | "clock"
  | "droplet"
  | "flask"
  | "gift"
  | "grid"
  | "headset"
  | "heart"
  | "heart-filled"
  | "home"
  | "leaf"
  | "package"
  | "pin"
  | "search"
  | "shield"
  | "sparkle"
  | "stethoscope"
  | "ticket"
  | "truck"
  | "user"
  | "wallet"
  | "wheat";

interface AppIconProps extends SVGProps<SVGSVGElement> {
  name: AppIconName;
  size?: number;
}

export function AppIcon({ name, size = 20, ...props }: AppIconProps) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": props["aria-label"] ? undefined : true,
    focusable: false as const,
    ...props,
    className: props.className ? `app-icon ${props.className}` : "app-icon",
  };

  switch (name) {
    case "arrow-up-right":
      return (
        <svg {...common}>
          <path d="M7 17 17 7" />
          <path d="M8 7h9v9" />
        </svg>
      );
    case "book":
      return (
        <svg {...common}>
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5z" />
          <path d="M8 6h8" />
        </svg>
      );
    case "building":
      return (
        <svg {...common}>
          <path d="M4 21h16" />
          <path d="M6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16" />
          <path d="M9 7h1" />
          <path d="M14 7h1" />
          <path d="M9 11h1" />
          <path d="M14 11h1" />
          <path d="M10 21v-5h4v5" />
        </svg>
      );
    case "cart":
      return (
        <svg {...common}>
          <circle cx="9" cy="20" r="1.5" />
          <circle cx="18" cy="20" r="1.5" />
          <path d="M3 4h2l2.2 10.3a2 2 0 0 0 2 1.7h7.9a2 2 0 0 0 2-1.6L20.5 8H7" />
        </svg>
      );
    case "check":
      return (
        <svg {...common}>
          <path d="m5 12 4 4L19 6" />
        </svg>
      );
    case "clock":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" />
        </svg>
      );
    case "droplet":
      return (
        <svg {...common}>
          <path d="M12 3.5S6.5 10 6.5 14a5.5 5.5 0 0 0 11 0C17.5 10 12 3.5 12 3.5z" />
        </svg>
      );
    case "flask":
      return (
        <svg {...common}>
          <path d="M10 2v6.5L5.2 17a3 3 0 0 0 2.6 4.5h8.4a3 3 0 0 0 2.6-4.5L14 8.5V2" />
          <path d="M8 2h8" />
          <path d="M7 16h10" />
        </svg>
      );
    case "gift":
      return (
        <svg {...common}>
          <path d="M20 12v8H4v-8" />
          <path d="M2 7h20v5H2z" />
          <path d="M12 7v13" />
          <path d="M12 7H8.5A2.5 2.5 0 1 1 11 4.5L12 7z" />
          <path d="M12 7h3.5A2.5 2.5 0 1 0 13 4.5L12 7z" />
        </svg>
      );
    case "grid":
      return (
        <svg {...common}>
          <rect x="4" y="4" width="6" height="6" rx="1.5" />
          <rect x="14" y="4" width="6" height="6" rx="1.5" />
          <rect x="4" y="14" width="6" height="6" rx="1.5" />
          <rect x="14" y="14" width="6" height="6" rx="1.5" />
        </svg>
      );
    case "headset":
      return (
        <svg {...common}>
          <path d="M4 13a8 8 0 0 1 16 0" />
          <path d="M4 13v4a2 2 0 0 0 2 2h1v-6H6a2 2 0 0 0-2 2" />
          <path d="M20 13v4a2 2 0 0 1-2 2h-1v-6h1a2 2 0 0 1 2 2" />
          <path d="M14 21h2a3 3 0 0 0 3-3" />
        </svg>
      );
    case "heart":
      return (
        <svg {...common}>
          <path d="M20.5 8.5c0 5.4-8.5 10.5-8.5 10.5S3.5 13.9 3.5 8.5A4.5 4.5 0 0 1 12 6a4.5 4.5 0 0 1 8.5 2.5z" />
        </svg>
      );
    case "heart-filled":
      return (
        <svg {...common}>
          <path
            d="M20.5 8.5c0 5.4-8.5 10.5-8.5 10.5S3.5 13.9 3.5 8.5A4.5 4.5 0 0 1 12 6a4.5 4.5 0 0 1 8.5 2.5z"
            fill="currentColor"
          />
        </svg>
      );
    case "home":
      return (
        <svg {...common}>
          <path d="m3 11 9-7 9 7" />
          <path d="M5 10v10h14V10" />
          <path d="M10 20v-6h4v6" />
        </svg>
      );
    case "leaf":
      return (
        <svg {...common}>
          <path d="M5 19c8 0 14-6 14-14-8 0-14 6-14 14z" />
          <path d="M5 19 19 5" />
        </svg>
      );
    case "package":
      return (
        <svg {...common}>
          <path d="m12 3 8 4-8 4-8-4 8-4z" />
          <path d="M4 7v10l8 4 8-4V7" />
          <path d="M12 11v10" />
        </svg>
      );
    case "pin":
      return (
        <svg {...common}>
          <path d="M12 21s7-5.1 7-11a7 7 0 1 0-14 0c0 5.9 7 11 7 11z" />
          <circle cx="12" cy="10" r="2.3" />
        </svg>
      );
    case "search":
      return (
        <svg {...common}>
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
      );
    case "shield":
      return (
        <svg {...common}>
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="m9 12 2 2 4-5" />
        </svg>
      );
    case "sparkle":
      return (
        <svg {...common}>
          <path d="M12 3 9.8 8.8 4 11l5.8 2.2L12 19l2.2-5.8L20 11l-5.8-2.2L12 3z" />
          <path d="M5 4v3" />
          <path d="M3.5 5.5h3" />
          <path d="M19 17v3" />
          <path d="M17.5 18.5h3" />
        </svg>
      );
    case "stethoscope":
      return (
        <svg {...common}>
          <path d="M6 3v5a4 4 0 0 0 8 0V3" />
          <path d="M10 12v2a5 5 0 0 0 10 0v-2" />
          <circle cx="20" cy="10" r="2" />
          <path d="M4 3h4" />
          <path d="M12 3h4" />
        </svg>
      );
    case "ticket":
      return (
        <svg {...common}>
          <path d="M4 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3a2 2 0 0 0 0 4v3a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-3a2 2 0 0 0 0-4V7z" />
          <path d="M9 8h6" />
          <path d="M9 16h6" />
        </svg>
      );
    case "truck":
      return (
        <svg {...common}>
          <path d="M3 6h11v10H3z" />
          <path d="M14 10h4l3 3v3h-7" />
          <circle cx="7" cy="18" r="2" />
          <circle cx="17" cy="18" r="2" />
        </svg>
      );
    case "user":
      return (
        <svg {...common}>
          <circle cx="12" cy="8" r="4" />
          <path d="M4 21a8 8 0 0 1 16 0" />
        </svg>
      );
    case "wallet":
      return (
        <svg {...common}>
          <path d="M4 7h15a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h12" />
          <path d="M16 13h5" />
          <circle cx="17.5" cy="13" r=".8" fill="currentColor" />
        </svg>
      );
    case "wheat":
      return (
        <svg {...common}>
          <path d="M12 21V5" />
          <path d="M8 7c-2 0-3-1-3-3 2 0 3 1 3 3z" />
          <path d="M16 7c2 0 3-1 3-3-2 0-3 1-3 3z" />
          <path d="M8 12c-2 0-3-1-3-3 2 0 3 1 3 3z" />
          <path d="M16 12c2 0 3-1 3-3-2 0-3 1-3 3z" />
          <path d="M8 17c-2 0-3-1-3-3 2 0 3 1 3 3z" />
          <path d="M16 17c2 0 3-1 3-3-2 0-3 1-3 3z" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <path d="M12 3 9.8 8.8 4 11l5.8 2.2L12 19l2.2-5.8L20 11l-5.8-2.2L12 3z" />
        </svg>
      );
  }
}
