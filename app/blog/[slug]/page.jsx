import Heading from "@/components/Heading";
import ShareLinkButton from "@/components/ShareLinkButton";
import { getPost, getSlugs } from "@/lib/post";
import Image from "next/image";
import { notFound } from "next/navigation";

export const revalidate = 30;

export async function generateStaticParams() {
  const slugs = await getSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params: { slug } }) {
  const post = await getPost(slug);
  if (!post) {
    notFound();
  }
  return {
    title: post.title,
    description: post.description,
  };
}

export default async function PostPage({ params: { slug } }) {
  console.log("slug", slug);
  const post = await getPost(slug);
  if (!post) return notFound();
  return (
    <>
      <Heading>{post.title}</Heading>

      <div className="flex gap-3 pb-2 items-baseline">
        <p className="italic text-sm pb-2">
          {post.title} - {post.category}
        </p>
        <ShareLinkButton />
      </div>

      <div className="flex flex-col items-center text-center mx-2">
        {" "}
        <Image
          src={post.image}
          width={200}
          height={200}
          alt={post.category}
        ></Image>
        <article
          dangerouslySetInnerHTML={{ __html: post.body }}
          className="max-w-screen-sm prose prose-slate"
        ></article>
      </div>
    </>
  );
}
