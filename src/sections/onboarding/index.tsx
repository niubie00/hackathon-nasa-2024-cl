import Carousel from "@/components/Carousel";
import LearnStep from "./steps/Learn";
import ContributeStep from "./steps/Contributes";
import { useState } from "react";
import FunStep from "./steps/Fun";
import { useRouter } from "next/router";

function OnboardingSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const router = useRouter();

  const steps: any = {
    learn: LearnStep,
    contribute: ContributeStep,
    fun: FunStep,
  };

  const handleForward = () => {
    const newSlideIndex = currentSlide + 1;

    if (currentSlide >= Object.keys(steps).length - 1)
      return router.push("/register");

    return setCurrentSlide(newSlideIndex);
  };

  return (
    <div className="h-dvh w-screen">
      <div
        className="h-1/2 w-full bg-cover bg-center"
        style={{ backgroundImage: "url(/onboarding.png)" }}
      />
      <div className="h-1/2 w-full bg-green-50 p-6 flex flex-col justify-between">
        <Carousel
          dots={true}
          dotColor="green"
          slideIndex={currentSlide}
          onCurrent={setCurrentSlide}
        >
          {Object.keys(steps).map((step, index) => {
            const Step = steps[step];
            return <Step key={index} />;
          })}
        </Carousel>
        <button
          onClick={handleForward}
          className="bg-green-700 text-white text-base text-center py-3 w-full rounded-full"
        >
          {currentSlide >= Object.keys(steps).length - 1
            ? "Comenzar"
            : "Continuar"}
        </button>
      </div>
    </div>
  );
}

export default OnboardingSection;
