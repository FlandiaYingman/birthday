import Confetti from "@/components/confetti";
import WishArea from "@/app/(main)/main/wish-area";

export default function Main() {
  return (
    <>
      <Confetti />

      <main className="flex items-center justify-center min-h-screen p-4 text-center flex-col space-y-8">
        <h1 className="text-4xl font-extrabold tracking-tighter sm:text-6xl text-white">
          Happy Birthday, Janis! <br />
          🎉🎂🎈🎁🎊
        </h1>
        <p className="md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed text-white animate-scaling-110">
          Wishing you a fantastic day filled with the people and things you love
          the most.
        </p>
        <WishArea />
      </main>
    </>
  );
}
