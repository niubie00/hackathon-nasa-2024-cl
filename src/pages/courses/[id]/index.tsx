import Icon from "@/components/Icon";
import { Lesson } from "@/components/Lesson/Challenges/types";
import Loading from "@/components/Lesson/Loading";
import useFetcher from "@/hooks/useRequest";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function CourseLessonPage() {
  const router = useRouter();
  const courseId = router.query.id;
  const [user, setUser] = useState<any>(null);

  const { data: course = {}, isLoading } = useFetcher(
    `/courses/${courseId}?userId=${user?.id}`,
    {
      waitFor: !!user && !!courseId,
    }
  );

  useEffect(() => {
    const session = window.localStorage.getItem("session");
    if (session) setUser(JSON.parse(session));
  }, []);

  if (isLoading) return <Loading />;

  const islandLevel = course.lessons.reduce((acc: number, l: Lesson) => {
    if (
      (l.sessions || []).some(
        (session: any) => session && session.performance > 70
      )
    )
      return acc + 1;

    return acc;
  }, 0);

  const lessonIndex = islandLevel >= 3 ? 2 : islandLevel;

  const lesson = course.lessons[lessonIndex];

  const bestSessions = course.lessons.reduce((acc: any, l: Lesson) => {
    if (l.sessions && l.sessions.length > 0) {
      const maxSession = l.sessions.reduce((acc: any, session: any) => {
        if (acc.performance > session.performance) return acc;
        return session;
      }, {});

      return [...acc, maxSession];
    }

    return acc;
  }, []);

  const sumScore = bestSessions.reduce(
    (acc: any, session: any) => acc + session.score,
    0
  );

  return (
    <div
      style={{ backgroundImage: "url(/bg-lesson.jpeg)" }}
      className={`h-dvh w-screen flex flex-col items-center justify-between relative p-6 bg-cover bg-center`}
    >
      <div className="flex items-center justify-between space-x-4 w-full bg-white/85 rounded-full p-2">
        <div className="flex-1 rounded-full flex items-center space-x-2 w-full">
          <Icon name="RiFootprintFill" size={6} color="green" />
          <p className="text-base">
            <span className="font-semibold text-xl">{sumScore}</span> CO2
            reducidos
          </p>
        </div>
        <div
          onClick={() => router.push("/ranking")}
          className="bg-white rounded-full h-10 w-10 flex items-center justify-center"
        >
          <Icon name="FaTrophy" color="yellow" />
        </div>
      </div>
      <Image
        alt="lesson"
        src={`/island-${islandLevel >= 3 ? 3 : islandLevel + 1}.png`}
        width={300}
        height={300}
        className="w-96 h-80"
      />
      <div className="rounded-3xl bg-white/85 p-4 flex flex-col space-y-4 shadow border">
        <div className="flex items-center space-x-4 flex-1">
          <Image
            alt="medal"
            src="/medal.png"
            height={300}
            width={300}
            className="h-24 w-20"
          />
          <div className="space-y-1">
            <h3 className="text-lg font-semibold">{lesson?.name}</h3>
            <p className="text-sm">{lesson?.description}</p>
          </div>
        </div>
        <button
          onClick={() =>
            router.push(`/courses/${courseId}/lessons/${lesson.id}`)
          }
          className={`rounded-full cursor-pointer bg-gradient-to-r from-orange-400 to-orange-600 text-base text-white text-center px-3 py-2.5`}
        >
          Comenzar lección
        </button>
      </div>
    </div>
  );
}

export default CourseLessonPage;

const availableAvatars = ["/cocodrile.png", "/chicken.png"];
