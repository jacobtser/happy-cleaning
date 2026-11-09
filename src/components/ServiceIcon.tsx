import type { Service } from "@/lib/services";
import { Hanger, Iron, Rug, Washer, type IconProps } from "./Icons";

export function ServiceIcon({
  icon,
  ...props
}: IconProps & { icon: Service["icon"] }) {
  if (icon === "hanger") return <Hanger {...props} />;
  if (icon === "rug") return <Rug {...props} />;
  if (icon === "iron") return <Iron {...props} />;
  return <Washer {...props} />;
}
