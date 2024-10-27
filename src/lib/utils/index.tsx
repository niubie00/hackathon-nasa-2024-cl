export type ColorType =
  | "branding"
  | "nivelat"
  | "transparent"
  | "white"
  | "black"
  | "gray"
  | "red"
  | "sky"
  | "yellow"
  | "green"
  | "blue"
  | "purple"
  | "orange"
  | "indigo";

export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export function classColor(options: any) {
  const { color, variant = 500, type = "bg" } = options;

  const getSelectedColor = (color: ColorType): string => {
    const colorTypes: any = {
      white: `${type}-white`,
      black: `${type}-black`,
      gray: `${type}-gray-500`,
      indigo: `${type}-indigo-700`,
      transparent: `${type}-transparent`,
      branding: `${type}-brand-color`,
      nivelat: `${type}-nivelat-color`,
    };

    if (!colorTypes[color]) return `${type}-${color}-${variant}`;

    return colorTypes[color];
  };

  return getSelectedColor(color);
}
