import React from "react";

import Providers from "@/app/Providers";
import PostPage from "./PostPage";

import { getPostBySlug } from "@/lib/graphql/api";

type DataType = {
  title: string;
  content: string;
};

export default async function page({ params }: { params: { slug: string } }) {
  const data: DataType = await getPostBySlug(params.slug);

  return (
    <>
      <Providers>
        <PostPage post={data} />
      </Providers>
    </>
  );
}
