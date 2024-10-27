import { Props } from "./types";
import { useEffect, useState } from "react";
import { classNames } from "@/lib/utils";
import Icon from "@/components/Icon";
import ReactConfetti from "react-confetti";
import { useRouter } from "next/router";
import Image from "next/image";
import { useRequester as requester } from "@/hooks/useRequest";
import Carousel from "@/components/Carousel";

function LessonResult(props: Props) {
  const { results, course, lesson, onRestart } = props;
  const router = useRouter();
  const [progress, setProgress] = useState(10);
  const [insights, setInsights] = useState([]);

  useEffect(() => {
    handleProgress();
    handleInsight();
  }, []);

  const handleInsight = async () => {
    try {
      const response = await requester("/insights", {
        method: "POST",
        data: {
          results,
          lesson,
        },
      });

      return setInsights(response.insights);
    } catch (error) {
      console.error(error);
    }
  };

  const getScores = () => {
    const maxScore = lesson.challenges.reduce(
      (acc, challenge) => acc + (challenge?.score || 0),
      0
    );
    const totalScore = results.reduce(
      (acc, result) => acc + (result?.score || 0),
      0
    );

    return {
      maxScore,
      totalScore,
    };
  };

  const handleProgress = () => {
    const { maxScore, totalScore } = getScores();

    const newProgres = (totalScore / maxScore) * 100 || 10;
    setTimeout(() => setProgress(newProgres), 1000);
  };

  const handleSubmit = () => {
    if (progress > 70) {
      return router.push(`/courses/${course.id}`);
    }

    return onRestart();
  };

  const currentLessonIndex = course.lessons.findIndex(
    (l: any) => l.id === lesson.id
  );

  const nextLesson = course.lessons[currentLessonIndex + 1];

  return (
    <div className="flex flex-col items-center justify-center relative space-y-4 h-dvh bg-gradient-to-b from-orange-50 to-orange-200">
      {progress > 70 && <ReactConfetti recycle={false} />}
      <h1 className="text-2xl text-center font-semibold">
        {progress > 70 ? "Felicitaciones" : "Inténtalo de nuevo"}
      </h1>
      {progress > 70 && (
        <p className="text-lg font-medium text-purple-600 text-center px-6">
          {nextLesson
            ? `Lección desbloqueada: ${nextLesson.name}`
            : `Curso completad`}
        </p>
      )}
      <Image
        alt="medal"
        src="/medal.png"
        height={300}
        width={300}
        className={classNames("h-44 w-40", progress > 70 ? "" : " grayscale")}
      />
      <div className="space-y-2">
        <h3 className="text-xl font-semibold text-center">{lesson.name}</h3>
      </div>
      <div className="px-12 w-full">
        <div className="rounded-full h-8 w-full bg-stone-100">
          <div
            className="flex items-center justify-end bg-gradient-to-r from-orange-300 to-orange-400 transition-all duration-1000 h-full rounded-full px-1.5"
            style={{ width: `${progress}%` }}
          >
            <div className="rounded-full h-6 w-6 bg-white flex items-center justify-center">
              <Icon name="HiStar" color="orange" size={4} />
            </div>
          </div>
        </div>
      </div>
      <p className="text-base text-center">
        <span className="font-semibold">{getScores().totalScore}</span> /{" "}
        {getScores().maxScore} CO2 Reducido
      </p>
      <div className="w-full px-4">
        <div className="rounded-2xl bg-orange-50 w-full p-4">
          <h2 className="text-xl font-semibold space-y-2">Revelaciones</h2>
          {!insights.length ? (
            <p>Generando...</p>
          ) : (
            <Carousel dots dotColor="orange" slides={{ perView: 1 }}>
              {insights.map((insight: any, index: number) => (
                <p
                  key={index}
                  className="text-base max-h-[10rem] overflow-auto"
                >
                  {insight}
                </p>
              ))}
            </Carousel>
          )}
        </div>
      </div>
      <div className="pt-5">
        <button
          onClick={handleSubmit}
          className="rounded-full py-3.5 px-10 border border-orange-500 text-lg text-orange-600 font-semibold bg-white"
        >
          {progress > 70 ? "Continuar" : "Reintentar"}
        </button>
      </div>
    </div>
  );
}

export default LessonResult;
