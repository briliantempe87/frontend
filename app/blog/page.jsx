import Heading from "@/components/Heading";
import Pagination from "@/components/Pagination";
import PostCard from "@/components/PostCard";
import { getAllPosts } from "@/lib/post";

export const revalidate = 30;

export default async function BlogPage({ searchParams }) {
  const page = parsePageParams(searchParams.page);
  const { posts, pageCount } = await getAllPosts(3, page);
  return (
    <>
      {" "}
      <Heading>Blog</Heading>
      <h2 className="text-2xl mb-3">List of posts</h2>
      <Pagination href={"/blog"} pageCount={pageCount} page={page} />
      {posts.map((post, index) => (
        <PostCard
          key={index}
          title={post.title}
          image={post.image}
          href={`/blog/${post.slug}`}
          description={post.description}
          category={post.category}
        />
      ))}
    </>
  );
}

function parsePageParams(paramValue) {
  if (paramValue) {
    const page = parseInt(paramValue);
    if (isFinite(page) && page > 0) {
      return page;
    }
  }
  return 1;
}
