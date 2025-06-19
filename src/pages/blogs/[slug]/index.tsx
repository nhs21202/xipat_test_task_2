import { GetStaticPaths, GetStaticProps } from "next";
import { Post } from "@/types/post.type";
import React from "react";
import { getPostsList, getPostById } from "@/pages/api/post";
import { useRouter } from "next/router";
import Head from "next/head";

export const getStaticPaths: GetStaticPaths = async () => {
  const posts: Post[] = await getPostsList();
  const paths = posts.map((post) => ({ params: { slug: post.id.toString() } }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const slug = context.params?.slug as string;
  const data = await getPostById(Number(slug));
  return {
    props: { data },
  };
};

const BlogDetailPage = ({ data }: { data: Post }) => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>{data.title}</title>
        <meta name="description" content={data.body} />
        <meta property="og:title" content={data.title} />
        <meta property="og:description" content={data.body} />
      </Head>
      <div className="min-h-screen bg-slate-50">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <button
            onClick={() => router.push("/blogs")}
            className="flex justify-center hover:scale-105 cursor-pointer transition-all  items-center px-4 py-2 mb-8 text-gray-600 hover:text-gray-900  duration-200"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            Go Back
          </button>
          <article className="bg-white rounded-xl shadow-lg border border-gray-100 p-10">
            <header className="mb-10 text-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
                {data.title}
              </h1>
              <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
            </header>

            <div className="prose prose-xl max-w-none">
              <p className="text-gray-700 leading-relaxed text-lg whitespace-pre-wrap">
                {data.body}
              </p>
            </div>

            <footer className="mt-12 pt-6 border-t border-gray-100 text-center">
              <div className="inline-flex items-center px-4 py-2 bg-gray-50 rounded-full text-sm text-gray-600">
                Post ID: {data.id}
              </div>
            </footer>
          </article>
        </div>
      </div>
    </>
  );
};

export default BlogDetailPage;
