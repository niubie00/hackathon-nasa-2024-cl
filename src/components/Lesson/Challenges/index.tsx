import { useEffect, useState } from "react";
import Select from "./Select";
import { Challenge, Lesson, Props, Result } from "./types";
import Icon from "../../Icon";
import { Alternative } from "./Select/types";
import { classNames } from "@/lib/utils";
import Sentence from "./Sentence";
import { useRequester as requester } from "@/hooks/useRequest";
import { useRouter } from "next/router";

function Challenges(props: Props) {
  const { course, lesson, onFinish } = props;
  const router = useRouter();
  const [progress, setProgress] = useState(2);
  const [results, setResults] = useState<Result[]>([]);
  const [alternative, setAlternative] = useState<Alternative>();
  const [challenge, setChallenge] = useState<Challenge>(lesson.challenges[0]);

  const handleOnSave = async (results: Result[]) => {
    try {
      const user = JSON.parse(window.localStorage.getItem("session") || "{}");
      const totalScore = results.reduce((acc, r) => acc + (r.score || 0), 0);
      const maxScore = lesson.challenges.reduce(
        (acc, c) => acc + (c.score || 0),
        0
      );
      const performance = (totalScore / maxScore) * 100;

      await requester("/lesson_sessions", {
        method: "POST",
        data: {
          lessonId: lesson.id,
          userId: user.id as string,
          performance,
          score: totalScore,
          maxScore: maxScore,
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleOnSet = () => {
    const newResults = [
      ...results,
      {
        challengeId: challenge.id,
        isCorrect: alternative?.correct,
        score: alternative?.correct ? challenge.score : 0,
      },
    ];

    setAlternative(undefined);
    setResults(newResults);

    const currentIndex = lesson.challenges.findIndex(
      c => JSON.stringify(c) === JSON.stringify(challenge)
    );

    const nextIndex = currentIndex + 1;

    if (!lesson.challenges[nextIndex]) {
      handleOnSave(newResults);
      return onFinish(newResults);
    }

    setProgress((nextIndex / lesson.challenges.length) * 100);
    return setChallenge(lesson.challenges[currentIndex + 1]);
  };

  const renderNavbar = () => (
    <div className="absolute top-5 w-full px-4">
      <div className="flex items-center space-x-4">
        <div className="h-2.5 rounded-full bg-white/50 flex-1 border">
          <div
            className="h-full rounded-full transition-all duration-300 bg-gradient-to-r from-orange-600 to-orange-400"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div
          onClick={() => router.push(`/courses/${course.id}`)}
          className="rounded-full w-8 h-8 flex items-center justify-center bg-white border hover:shadow-md transition duration-300 cursor-pointer"
        >
          <Icon name="HiX" size={5} />
        </div>
      </div>
    </div>
  );

  const challenges = {
    SELECT: Select,
    SENTENCE: Sentence,
  };

  const Challenge = challenges[challenge.type || "SELECT"];

  return (
    <div className="flex flex-col h-dvh	 relative">
      {renderNavbar()}
      <div
        className="h-2/5 w-full bg-center bg-cover"
        style={{ backgroundImage: `url(/bg-lesson-${lesson.level}.png)` }}
      />
      <div className="absolute bottom-0 h-[62%] bg-white w-full border-t rounded-t-3xl shadow-md p-4 space-y-8 flex flex-col justify-between overflow-auto">
        <Challenge {...challenge} onChange={setAlternative} />
        <button
          {...(alternative && { onClick: handleOnSet })}
          className={classNames(
            "rounded-full py-3 w-full bg-green-700 flex items-center justify-center space-x-2 transition duration-300",
            alternative ? "cursor-pointer" : "cursor-not-allowed opacity-50"
          )}
        >
          <p className="text-white text-base text-center font-semibold">
            Avanzar
          </p>
          <Icon name="HiOutlineArrowRight" color="white" size={4} />
        </button>
      </div>
    </div>
  );
}

export default Challenges;
