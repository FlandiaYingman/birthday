import { Textarea } from "@/components/ui/textarea";
import Confetti from "@/components/confetti";

export default function Main() {
  return (
    <>
      <Confetti />

      <main className="flex items-center justify-center min-h-screen p-4 text-center">
        <div className="space-y-6">
          <h1 className="text-4xl font-extrabold tracking-tighter sm:text-6xl text-white">
            Happy Birthday, Janis! <br />
            🎉🎂🎈🎁🎊
          </h1>
          <p className=" md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400 text-white animate-scaling-110">
            Wishing you a fantastic day filled with the people and things you
            love the most.
          </p>
          <Textarea
            className="
            w-full
             max-w-md
             p-3
             mx-auto
             bg-opacity-25
             bg-black
             text-white
             placeholder:text-gray-200
             focus-visible:ring-0
             h-32
             hover:scale-110
             transition
             "
            placeholder="Make your heartfelt birthday wish here... "
          />
        </div>
      </main>
    </>
  );
}
