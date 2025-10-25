import Image from "next/image";

export default function Banner() {
  return (
    <div className="flex items-center justify-center rounded-lg py-2 bg-blue-500 p-4 md:h-52 shadow-2xl shadow-blue-800/400">
      <Image
        src="/logowithText.png"
        width={500}
        height={360}
        alt="log image cctog"
      />
    </div>
  );
}
