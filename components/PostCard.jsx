import Link from "next/link";
import Image from "next/image";

export default function PostCard({
  title,
  image,
  description,
  href,
  category,
}) {
  return (
    <>
      <div className=" flex flex-wrap p-4">
        <Link href={href}>
          {" "}
          <div className="rounded-lg overflow-hidden shadow-lg bg-white border border-gray-800 inline-block w-[150px]">
            <Image
              src={image}
              alt={category}
              width={150}
              height={150}
              className="object-cover p-1 rounded-lg"
            />
            <h1 className="text-gray-800 font-bold text-l px-1">{title}</h1>
            <p className="text-gray-700 text-xs px-1">{description}</p>
          </div>
        </Link>
      </div>
    </>
  );
}
