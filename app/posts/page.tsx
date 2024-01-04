import React from "react";

import { getPreviewPostBySlug } from "@/lib/graphql/api";

export default async function page() {
  const data = await getPreviewPostBySlug();

  console.log(data);

  return <div>page</div>;
}
