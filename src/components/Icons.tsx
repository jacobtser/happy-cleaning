import type { SVGProps } from "react";

export type IconProps = SVGProps<SVGSVGElement>;

function IconBase({ children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export function ArrowUpRight(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </IconBase>
  );
}

export function ArrowRight(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M4 12h16" />
      <path d="m14 6 6 6-6 6" />
    </IconBase>
  );
}

export function ArrowLeft(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M20 12H4" />
      <path d="m10 18-6-6 6-6" />
    </IconBase>
  );
}

export function Check(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="m5 12.5 4.2 4.2L19 6.8" />
    </IconBase>
  );
}

export function CheckCircle(props: IconProps) {
  return (
    <IconBase {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="m8 12.2 2.7 2.7L16.3 9" />
    </IconBase>
  );
}

export function ChevronDown(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="m6 9 6 6 6-6" />
    </IconBase>
  );
}

export function Menu(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
    </IconBase>
  );
}

export function Close(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="m6 6 12 12" />
      <path d="M18 6 6 18" />
    </IconBase>
  );
}

export function Sparkle(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M12 3c.7 5.5 3.5 8.3 9 9-5.5.7-8.3 3.5-9 9-.7-5.5-3.5-8.3-9-9 5.5-.7 8.3-3.5 9-9Z" />
      <path d="M19 3.5v3" />
      <path d="M20.5 5h-3" />
    </IconBase>
  );
}

export function WhatsApp(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      <path d="M12.04 2a9.84 9.84 0 0 0-8.4 14.94L2.4 21.6l4.78-1.25a9.84 9.84 0 1 0 4.86-18.35Zm0 1.8a8.04 8.04 0 0 1 6.8 12.32 8.06 8.06 0 0 1-10.83 2.62l-.38-.23-2.83.74.75-2.76-.25-.4A8.04 8.04 0 0 1 12.04 3.8Zm-3.2 4.02c-.18 0-.47.07-.72.34-.25.27-.95.93-.95 2.27 0 1.34.97 2.64 1.1 2.82.14.18 1.88 3 4.64 4.08 2.3.9 2.77.72 3.27.67.5-.05 1.62-.66 1.85-1.3.23-.64.23-1.19.16-1.3-.07-.12-.25-.19-.52-.33-.27-.13-1.62-.8-1.87-.9-.25-.09-.43-.13-.61.14-.18.27-.7.9-.86 1.08-.16.18-.32.2-.6.07-.27-.13-1.12-.41-2.14-1.32-.79-.7-1.32-1.57-1.48-1.84-.16-.27-.02-.41.12-.55.12-.12.27-.32.41-.48.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.13-.6-1.47-.83-2.01-.22-.53-.44-.46-.61-.47l-.53-.01Z" />
    </svg>
  );
}

export function Phone(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M6.6 3.5h2.1l1.1 4.2-2 1.3a13.9 13.9 0 0 0 7.2 7.2l1.3-2 4.2 1.1v2.1a2.6 2.6 0 0 1-2.8 2.6A17.8 17.8 0 0 1 4 6.3a2.6 2.6 0 0 1 2.6-2.8Z" />
    </IconBase>
  );
}

export function Mail(props: IconProps) {
  return (
    <IconBase {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="m4 7 8 6 8-6" />
    </IconBase>
  );
}

export function MapPin(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M20 10.5c0 5.2-8 11-8 11s-8-5.8-8-11a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10.5" r="2.6" />
    </IconBase>
  );
}

export function Truck(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M3 6.5h10.5v10H3z" />
      <path d="M13.5 10H18l3 3v3.5h-7.5" />
      <circle cx="7" cy="18" r="1.7" />
      <circle cx="17" cy="18" r="1.7" />
    </IconBase>
  );
}

export function Bag(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M6 8h12l1 12H5L6 8Z" />
      <path d="M9 9V6a3 3 0 0 1 6 0v3" />
    </IconBase>
  );
}

export function ShieldCheck(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M12 3 5 5.7v5.4c0 4.3 2.8 7.7 7 9.9 4.2-2.2 7-5.6 7-9.9V5.7L12 3Z" />
      <path d="m8.6 12 2.3 2.2 4.5-4.4" />
    </IconBase>
  );
}

export function Leaf(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M20 4C11 4 4 8.5 4 16c0 2.2.8 4 2 4 7.5 0 12-7 14-16Z" />
      <path d="M4.5 19.5C8 14.5 12 11 17.5 8.5" />
    </IconBase>
  );
}

export function Heart(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M20.5 5.8a5 5 0 0 0-7.1 0L12 7.2l-1.4-1.4a5 5 0 1 0-7.1 7.1L12 21l8.5-8.1a5 5 0 0 0 0-7.1Z" />
    </IconBase>
  );
}

export function Star(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-2.9-5.6 2.9 1.1-6.2L3 9.6l6.2-.9L12 3Z" />
    </IconBase>
  );
}

export function Quote(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M9.5 6C6 7 4 9.7 4 13.2V18h5v-5H6.8c.2-2.2 1.1-3.6 3.2-4.4L9.5 6Z" />
      <path d="M19 6c-3.5 1-5.5 3.7-5.5 7.2V18h5v-5h-2.2c.2-2.2 1.1-3.6 3.2-4.4L19 6Z" />
    </IconBase>
  );
}

export function Washer(props: IconProps) {
  return (
    <IconBase {...props}>
      <rect x="4" y="3" width="16" height="18" rx="3" />
      <circle cx="12" cy="13" r="4.2" />
      <path d="M8 6.5h.01M11 6.5h.01" />
    </IconBase>
  );
}

export function Hanger(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M12 8.5a2 2 0 1 1 2-2" />
      <path d="m12 8.5 8 5.5a1.8 1.8 0 0 1-1 3.3H5a1.8 1.8 0 0 1-1-3.3l8-5.5Z" />
    </IconBase>
  );
}

export function Rug(props: IconProps) {
  return (
    <IconBase {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M6 8h12M6 16h12M9 5v14M15 5v14" />
    </IconBase>
  );
}

export function Iron(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M4 16h15.5a1.5 1.5 0 0 0 1.5-1.5V13a3 3 0 0 0-3-3H8.5A4.5 4.5 0 0 0 4 14.5V16Z" />
      <path d="M8 10V7.5A2.5 2.5 0 0 1 10.5 5H20" />
      <path d="M5 20h15" />
    </IconBase>
  );
}

export function Copy(props: IconProps) {
  return (
    <IconBase {...props}>
      <rect x="8" y="8" width="12" height="12" rx="2" />
      <path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" />
    </IconBase>
  );
}

export function AlertCircle(props: IconProps) {
  return (
    <IconBase {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5.5" />
      <path d="M12 16.5h.01" />
    </IconBase>
  );
}

export function Send(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="m21 3-7.2 18-3.2-7.6L3 10.2 21 3Z" />
      <path d="M10.6 13.4 21 3" />
    </IconBase>
  );
}
