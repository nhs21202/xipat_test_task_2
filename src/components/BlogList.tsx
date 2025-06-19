import React, { useEffect, useState, useCallback } from "react";
import { Post } from "@/types/post.type";
import { Pagination } from "antd";
import { getPostsList } from "@/pages/api/post";
import BlogListCard from "./BlogListCard";

const TOTAL = 100;

type Props = {
  initialPosts: Post[];
};

const BlogList = ({ initialPosts }: Props) => {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(9);

  const fetchPosts = useCallback(async () => {
    const res = await getPostsList({ _page: page, _limit: limit });
    setPosts(res);
  }, [page, limit]);

  useEffect(() => {
    if (page !== 1 || limit !== 9) fetchPosts();
  }, [fetchPosts, page, limit]);

  return (
    <div className="container mx-auto py-10">
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mb-10">
        {posts?.map((post) => (
          <BlogListCard key={post.id} {...post} />
        ))}
      </div>

      <div className="flex justify-center">
        <Pagination
          current={page}
          total={TOTAL}
          pageSize={limit}
          showSizeChanger
          pageSizeOptions={["6", "9", "12", "24"]}
          onChange={(p) => setPage(p)}
          onShowSizeChange={(_, size) => setLimit(size)}
        />
      </div>
    </div>
  );
};

export default BlogList;
