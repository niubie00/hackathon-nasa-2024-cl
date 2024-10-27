import { MouseEvent } from "react";
import type ReactIcons from "./iconMap";
import { ColorType } from "@/lib/utils";

export type IconType = keyof typeof ReactIcons;

export interface Props {
  name: IconType;
  color?: ColorType;
  size?: number;
  strokeWidth?: number;
  className?: string;
  onClick?: (e: MouseEvent) => void;
  title?: string;
}
