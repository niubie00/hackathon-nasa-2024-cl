import { classColor } from "@/lib/utils";
import ReactIcons from "./iconMap";

import { IconType, Props } from "./types";
import { memo } from "react";

function Icon(props: Props): JSX.Element {
  const { name, color = "black", className = "", size = 5, ...rest } = props;

  let RIcon = ReactIcons[name as IconType];

  let textClass: string = color
    ? classColor({ color, variant: 500, type: "text" })
    : "";

  return (
    <RIcon
      role="icon"
      aria-hidden="true"
      className={`
        h-${size}
        w-${size}
        ${className}
        ${textClass}
        ${props.onClick ? "cursor-pointer" : ""}
      `}
      {...rest}
    />
  );
}

export default memo(Icon);
