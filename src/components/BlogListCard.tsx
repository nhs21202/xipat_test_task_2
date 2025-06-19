import Link from "next/link";
import React from "react";

type BlogListCardProps = {
  title: string;
  body: string;
  id: number;
};

const BlogListCard = ({ title, body, id }: BlogListCardProps) => {
  return (
    <div
      key={id}
      className="bg-white rounded-2xl shadow-md hover:shadow-2xl hover:scale-[1.02] transition-all border border-gray-100 group flex flex-col h-full"
    >
      <div className="p-6 flex flex-col flex-grow">
        <h2 className="text-2xl font-bold mb-2 text-blue-700 group-hover:underline line-clamp-2">
          <Link href={`/blogs/${id}`}>{title}</Link>
        </h2>
        <p className="text-gray-600 mb-4 line-clamp-3">{body}</p>
        <div className="mt-auto">
          <Link
            href={`/blogs/${id}`}
            className="inline-block bg-blue-500 text-white px-4 py-2 rounded-full font-semibold shadow hover:bg-blue-600"
          >
            Read more →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogListCard;
