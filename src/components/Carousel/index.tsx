import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

import { Props } from "./types";
import { Children, useEffect, useState } from "react";
import { classNames } from "@/lib/utils";

function Carousel(props: Props) {
  const {
    dots,
    children,
    slideIndex = 0,
    onCurrent,
    dotColor = "stone",
    className = "",
    containerClassName = "",
    contentClassName = "",
    ...rest
  } = props;

  const [currentSlide, setCurrentSlide] = useState(slideIndex);
  const [loaded, setLoaded] = useState(false);

  const [ref, instanceRef] = useKeenSlider<any>({
    slides: {
      origin: "center",
      perView: 1,
    },
    slideChanged(s) {
      setCurrentSlide(s.track.details.rel);

      onCurrent && onCurrent(s.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
    ...rest,
  });

  useEffect(() => {
    if (slideIndex !== currentSlide) {
      instanceRef.current?.moveToIdx(slideIndex);
      setCurrentSlide(slideIndex);
    }
  }, [slideIndex]);

  const isCurrent = (index: number) => currentSlide === index;

  return (
    <div className={classNames("relative", className)}>
      <div ref={ref} className={classNames("keen-slider", containerClassName)}>
        {Children.map(props.children, (child, index) => (
          <div
            key={index}
            className={classNames(
              "keen-slider__slide flex flex-col items-center justify-center",
              contentClassName
            )}
          >
            {child}
          </div>
        ))}
      </div>
      {dots && loaded && instanceRef.current && (
        <div className="space-x-4 flex items-center justify-center w-full mt-4">
          {Array.from({
            length: instanceRef.current.track.details.slides.length,
          }).map((_, index: number) => {
            return (
              <button
                key={index}
                onClick={() => {
                  instanceRef.current?.moveToIdx(index);
                }}
                // className={"dot" + (currentSlide === idx ? " active" : "")}
                className={classNames(
                  "w-3 h-3 rounded-full cursor-pointer",
                  isCurrent(index) ? `bg-${dotColor}-700` : `bg-${dotColor}-200`
                )}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Carousel;
