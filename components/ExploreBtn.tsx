import Image from "next/image";

export default function ExploreBtn() {
  return (
    <a href="#posts" id="explore-btn" className="mt-7 mx-auto">
      <span className="flex items-center justify-center gap-2 w-full">
        Explore Posts
        <Image
          src="/icons/arrow-down.svg"
          alt="arrow-down"
          width={24}
          height={24}
        />
      </span>
    </a>
  );
}