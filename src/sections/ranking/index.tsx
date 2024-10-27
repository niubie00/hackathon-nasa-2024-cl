import Icon from "@/components/Icon";
import Loading from "@/components/Lesson/Loading";
import useFetcher from "@/hooks/useRequest";
import { classNames } from "@/lib/utils";
import Image from "next/image";
import { useRouter } from "next/router";

function RankingSection() {
  const { data: users = [], isLoading } = useFetcher("/ranking");
  const router = useRouter();

  const renderUser = (user: any, index: number) => (
    <div
      key={index}
      className="rounded-2xl bg-stone-100 p-4 flex items-center space-x-3"
    >
      <div className="rounded-full flex items-center justify-center h-12 w-12 min-w-12 min-h-12 bg-white">
        <p className="text-xl font-semibold">{index + 1}</p>
      </div>
      <Image
        alt="avatar"
        src={availableAvatars[index % availableAvatars.length]}
        height={200}
        width={200}
        className="h-14 w-14 min-w-14 min-h-14"
      />
      <div className="">
        <h3 className="text-xl font-semibold">{user.name}</h3>
        <div className="flex items-center space-x-2">
          <Icon name="RiFootprintFill" size={4} color="green" />
          <p className="text-base">{user.score} CO2 reducido</p>
        </div>
      </div>
    </div>
  );

  const renderLeaderShipUser = (user: any, index: number) => (
    <div
      className={classNames(
        "absolute flex flex-col items-center justify-center space-y-2",
        !index ? "bottom-[8.5rem] left-[10.8rem]" : "",
        index === 1 ? "bottom-[6.5rem] left-[6.5rem]" : "",
        index === 2 ? "bottom-[6.5rem] right-[7rem]" : ""
      )}
    >
      <p className="text-base font-semibold text-center">{user.name}</p>
      <Image
        alt="avatar"
        src={availableAvatars[index % availableAvatars.length]}
        height={200}
        width={200}
        className={classNames("h-14 w-14 min-w-14 min-h-14")}
      />
    </div>
  );

  if (isLoading) return <Loading />;

  return (
    <div className="h-dvh w-screen">
      <div
        className="h-2/5 bg-center bg-cover relative"
        style={{ backgroundImage: "url(/ranking.png)" }}
      >
        <div
          onClick={() => router.push("/courses/670237223054281bcdc4eb2b")}
          className="rounded-full flex items-center justify-center h-10 w-10 absolute top-5 left-5 bg-white cursor-pointer"
        >
          <Icon name="HiX" />
        </div>
        {/* {users.slice(0, 3).map(renderLeaderShipUser)} */}
      </div>
      <div className="absolute bottom-0 left-0 rounded-3xl border bg-white p-6 w-full h-3/5 overflow-auto space-y-3">
        <h1 className="text-xl font-semibold">Tabla de clasificaciones</h1>
        {users.map(renderUser)}
      </div>
    </div>
  );
}

export default RankingSection;

const availableAvatars = ["/cocodrile.png", "/chicken.png"];
