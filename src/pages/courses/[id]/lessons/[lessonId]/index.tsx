import Challenges from "@/components/Lesson/Challenges";
import {
  Lesson as LessonType,
  Result,
} from "@/components/Lesson/Challenges/types";
import Loading from "@/components/Lesson/Loading";
import LessonResult from "@/components/Lesson/Result";
import useFetcher from "@/hooks/useRequest";
import { classNames } from "@/lib/utils";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function Lesson() {
  const router = useRouter();
  const courseId = router.query.id;
  const lessonId = router.query.lessonId;
  const [results, setResults] = useState<Result[]>([]);

  // const { data: lesson, isLoading } = useFetcher(`/lessons/${lessonId}`);
  const { data: course, isLoading } = useFetcher(`/courses/${courseId}`, {
    waitFor: !!courseId,
  });

  useEffect(() => {
    setResults([]);
  }, []);

  const handleFinish = (results: Result[]) => {
    setResults(results);
  };

  const handleRestart = () => {
    setResults([]);
  };

  const currentLesson = (course?.lessons || []).find(
    (lesson: LessonType) => lesson.id === lessonId
  );

  if (isLoading && !currentLesson) return <Loading />;

  return (
    <div
      className={classNames(
        "h-dvh w-screen",
        results.length > 0 ? "overflow-auto" : ""
      )}
    >
      {results.length > 0 ? (
        <LessonResult
          lesson={currentLesson}
          course={course}
          results={results}
          onRestart={handleRestart}
        />
      ) : (
        <Challenges
          course={course}
          lesson={currentLesson}
          onFinish={handleFinish}
        />
      )}
    </div>
  );
}

export default Lesson;
