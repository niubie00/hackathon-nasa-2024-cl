import { classNames } from "@/lib/utils";
import { Alternative, Props } from "./types";
import { useEffect, useState } from "react";
import Icon from "@/components/Icon";

function Select(props: Props) {
  const { title, alternatives = [], onChange } = props;
  const [selected, setSelected] = useState<Alternative>();

  useEffect(() => {
    setSelected(undefined);
  }, [title]);

  const isSelected = (alternative: Alternative) => {
    return selected?.text === alternative.text;
  };

  const renderAlternative = (alternative: Alternative, index: number) => {
    const bullets: any = {
      0: "A",
      1: "B",
      2: "C",
      3: "D",
    };

    return (
      <div
        key={index}
        onClick={() => {
          setSelected(alternative);
          onChange(alternative);
        }}
        className={classNames(
          "flex items-center justify-between space-x-2 rounded-full p-2 cursor-pointer transition duration-300",
          isSelected(alternative)
            ? "bg-gradient-to-r from-orange-600 to-orange-400"
            : "bg-stone-100 hover:bg-stone-200"
        )}
      >
        <div className="flex items-center space-x-3">
          <div
            className={classNames(
              "rounded-full h-8 w-8 min-w-8 min-h-8 flex items-center justify-center",
              isSelected(alternative)
                ? "bg-white"
                : "bg-gradient-to-r from-orange-600 to-orange-400"
            )}
          >
            <p
              className={classNames(
                "text-lg font-bold",
                isSelected(alternative) ? "text-orange-600" : "text-white"
              )}
            >
              {bullets[index]}
            </p>
          </div>
          <p
            className={classNames(
              "text-base",
              isSelected(alternative) ? "text-white font-medium" : ""
            )}
          >
            {alternative.text}
          </p>
        </div>
        <div className="pr-1">
          {isSelected(alternative) ? (
            <Icon name="HiOutlineCheckCircle" color="white" />
          ) : (
            <div className="border border-stone-300 h-4 w-4 rounded-full" />
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white space-y-6">
      <h2 className="text-xl text-black font-bold text-center">{title}</h2>
      <div className="space-y-3">{alternatives.map(renderAlternative)}</div>
    </div>
  );
}

export default Select;
