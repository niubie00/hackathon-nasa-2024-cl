import Image from "next/image";

function Loading() {
  return (
    <div className="h-dvh w-screen flex items-center justify-center">
      <Image
        alt="loading"
        src="/loading.png"
        height={300}
        width={300}
        className="h-56 w-40"
      />
    </div>
  );
}

export default Loading;
