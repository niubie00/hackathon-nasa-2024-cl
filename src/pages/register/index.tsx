import useFetcher, { useRequester as requester } from "@/hooks/useRequest";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { classNames } from "@/lib/utils";

export default function Home() {
  // const { data: temp } = useFetcher("/eosdis");
  const router = useRouter();
  const [state, setState] = useState({
    username: "",
    email: "",
    level: levels[0].value,
    isReady: false,
    isLoading: false,
  });

  useEffect(() => {
    const config = window.localStorage.getItem("config");
    if (config) router.push("/courses/670237223054281bcdc4eb2b");

    setState({ ...state, isReady: true });
  }, []);

  const handleStart = async () => {
    try {
      const user = await requester("/users", {
        method: "POST",
        data: {
          name: state.username,
          email: state.email,
        },
      });
      window.localStorage.setItem("session", JSON.stringify(user));
      router.push("/courses/670237223054281bcdc4eb2b");
    } catch (error) {
      console.error(error);
    }
  };

  // useEffect(() => {
  //   handleCall();
  //   handleGetUser();
  // }, []);

  // const handleGetUser = async () => {
  //   try {
  //     await requester("/users?email=fcortezmaira@gmail.com");
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // const handleCall = async () => {
  //   try {
  //     await requester("/example");
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // const handleOnSave = async () => {
  //   try {
  //     await requester("/users", {
  //       method: "POST",
  //       data: {
  //         name: "Felipe Cortez",
  //         email: "fcortezmaira@gmail.com",
  //         age: 35,
  //         location: "CHL",
  //       },
  //     });
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const isDisabled = !state.isReady || !state.username || !state.email;

  return (
    <div className="w-screen h-dvh">
      <div
        className="h-1/5 w-full bg-cover bg-center"
        style={{ backgroundImage: "url(/onboarding.png)" }}
      />
      <div className="h-4/5 w-full flex flex-col justify-between p-4">
        <div className="space-y-6">
          <div className="space-y-3">
            <p>Nombre de usuario</p>
            <input
              placeholder="ej. John Doe"
              className="rounded-full w-full px-4 py-2 outline outline-gray-400 transition duration-250"
              onChange={e =>
                setState({ ...state, username: e.target.value as string })
              }
            />
          </div>
          <div className="space-y-3">
            <p>Correo electrónico</p>
            <input
              type="email"
              placeholder="ej. johndoe@gmail.com"
              className="rounded-full w-full px-4 py-2 outline outline-gray-400 transition duration-250"
              onChange={e =>
                setState({ ...state, email: e.target.value as string })
              }
            />
          </div>
          {/* <div className="space-y-3">
            <p>Expertise</p>
            <select
              defaultValue={state.level}
              className="rounded-full w-full px-4 py-2 outline outline-gray-400 transition duration-250"
            >
              {levels.map(level => (
                <option key={level.value} value={level.value}>
                  {level.name}
                </option>
              ))}
            </select>
          </div> */}
        </div>
        <button
          onClick={handleStart}
          disabled={isDisabled}
          className={classNames(
            "bg-green-700 text-white text-base text-center py-3 w-full rounded-full transition duration-300",
            isDisabled ? "opacity-50" : " cursor-pointer"
          )}
        >
          Regístrate
        </button>
      </div>
    </div>
  );

  // return (
  //   <div
  //     className="h-screen w-screen flex flex-col items-center justify-center bg-cover bg-center bg-gradient-to-b from-teal-600 to to-teal-100 space-y-8 text-black"
  //     // style={{ backgroundImage: `url('bg.jpeg')` }}
  //   >
  //     <Image
  //       alt="logo"
  //       src="/logo.jpeg"
  //       className="w-40 h-40 rounded-full border-4 border-white"
  //       width={300}
  //       height={300}
  //     />
  //     <div className="space-y-2 flex flex-col max-w-64 w-full">
  //       {/* <input
  //         placeholder="Ingresa tu nombre"
  //         className="rounded-full px-4 py-2 outline-none"
  //       /> */}
  //       <select
  //         defaultValue={state.location}
  //         onChange={e => setState({ ...state, location: e.target.value })}
  //         className="rounded-full px-4 py-2 !text-black outline-none"
  //       >
  //         {locations.map(location => (
  //           <option key={location.value} value={location.value}>
  //             {location.name}
  //           </option>
  //         ))}
  //       </select>
  //       <select
  //         defaultValue={state.level}
  //         onChange={e => setState({ ...state, level: e.target.value })}
  //         className="rounded-full px-4 py-2 !text-black outline-none "
  //       >
  //         {levels.map(level => (
  //           <option key={level.value} value={level.value}>
  //             {level.name}
  //           </option>
  //         ))}
  //       </select>
  //       <button
  //         onClick={handleStart}
  //         disabled={!state.isReady}
  //         className="bg-white rounded-full px-4 py-2 hover:bg-gray-200"
  //       >
  //         Comenzar
  //       </button>
  //     </div>
  //   </div>
  // );
}

const levels = [
  { name: "Beginner", value: "beginner" },
  { name: "Intermediate", value: "intermediate" },
  { name: "Advanced", value: "advanced" },
];

// const locations = [
//   { name: "Chile", value: "CHL" },
//   { name: "Argentina", value: "ARG" },
//   { name: "Perú", value: "PER" },
//   { name: "Colombia", value: "COL" },
//   { name: "México", value: "MEX" },
//   { name: "España", value: "ESP" },
//   { name: "Estados Unidos", value: "USA" },
//   { name: "Brasil", value: "BRA" },
// ];
