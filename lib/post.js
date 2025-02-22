import { marked } from "marked";
import qs from "qs";

export const CACHE_TAG_POSTS = "posts";

const BACKEND_URL = "http://localhost:1337";

export async function getPost(slug) {
  const { data } = await fetchPosts({
    filters: { slug: { $eq: slug } },
    fields: ["slug", "title", "category", "description", "body"],
    populate: {
      image: { fields: ["url"] },
    },
    pagination: { pageSize: 1, withCount: false },
  });
  if (data.length === 0) return null;
  const post = data[0];
  return {
    ...toPost(post),
    body: marked(post.body, { headerIds: false, mangle: false }),
  };
}

export async function getAllPosts(pageSize, page) {
  const { data, meta } = await fetchPosts({
    fields: ["slug", "title", "category", "description", "body"],
    populate: {
      image: { fields: ["url"] },
    },
    sort: "createdAt:desc",
    pagination: { pageSize, page },
  });
  return {
    posts: data.map(toPost),
    pageCount: meta.pagination.pageCount,
  };
}

export async function getSlugs() {
  const { data } = await fetchPosts({
    fields: ["slug"],
    sort: "createdAt:desc",
    pagination: { pageSize: 100 },
  });
  return data.map((post) => post.slug);
}

async function fetchPosts(parameters) {
  const url =
    `${BACKEND_URL}/api/posts?` +
    qs.stringify(parameters, { encodeValuesOnly: true });
  console.log(url);
  const response = await fetch(url, { next: { tags: [CACHE_TAG_POSTS] } });
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return await response.json();
}

function toPost(post) {
  return {
    title: post.title,
    slug: post.slug,
    category: post.category,
    description: post.description,
    body: post.body,
    image: BACKEND_URL + post.image.url,
  };
}
