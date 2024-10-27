import Loading from "@/components/Lesson/Loading";
import useFetcher from "@/hooks/useRequest";
import Image from "next/image";
import { useRouter } from "next/router";

function CoursePage() {
  const router = useRouter();

  const { data: courses = [], isLoading } = useFetcher("/courses");

  const handleForward = (course: any) => {
    if (course.disabled) return null;

    router.push(`/courses/${course.id}`);
  };

  const renderCourse = (course: any) => (
    <div
      key={course.id}
      onClick={() => handleForward(course)}
      className={`flex items-center justify-between space-x-4 rounded-lg px-4 py-2 bg-gradient-to-r from-${
        course.color || "blue"
      }-600 to-${course.color || "blue"}-300 cursor-pointer ${
        course.disabled ? "opacity-50" : ""
      }`}
    >
      <div className="flex-1">
        <h3 className="text-white font-bold text-xl">{course.name}</h3>
        <p className="text-white font-semibold text-base">
          {course.description}
        </p>
      </div>
      {course.disabled && (
        <div className="rounded-full px-4 py-1 bg-stone-100">
          <p className="text-stone-600 text-base text-center">Pronto</p>
        </div>
      )}
    </div>
  );

  if (isLoading) return <Loading />;

  return (
    <div className="flex flex-col space-y-3 bg-white h-dvh w-screen p-4">
      {courses.map(renderCourse)}
    </div>
  );
}

export default CoursePage;
