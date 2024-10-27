import { KeenSliderOptions } from "keen-slider/react";

export interface Props extends KeenSliderOptions {
  children: JSX.Element[];
  dots?: boolean;
  dotColor?: string;
  slideIndex?: number;
  onCurrent?: (index: number) => void;
  className?: string;
  contentClassName?: string;
  containerClassName?: string;
}
