import Head from "next/head";
import { Post } from "@/types/post.type";
import { getPostsList } from "@/pages/api/post";
import BlogList from "@/components/BlogList";

export const getStaticProps = async () => {
  const initialPosts = await getPostsList({ _page: 1, _limit: 9 });

  return {
    props: {
      initialPosts,
    },
    revalidate: 60,
  };
};

const BlogsPage = ({ initialPosts }: { initialPosts: Post[] }) => {
  return (
    <>
      <Head>
        <title>Xipat Blog</title>
        <meta name="description" content="Xipat Blog page" />
      </Head>

      <div className="relative bg-gradient-to-br from-purple-100 to-blue-50 py-14 mb-10">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
            Welcome to Xipat Blog
          </h2>
          <p className="text-lg md:text-xl text-gray-600 mb-6">
            Discover insightful articles, tips, and stories from our community.
          </p>
        </div>
      </div>

      <BlogList initialPosts={initialPosts} />
    </>
  );
};

export default BlogsPage;
