import { fetchAPI } from "../fetchAPI";
import { GetStaticProps } from "next";

export async function getPreviewPostBySlug() {
  const data = await fetchAPI(
    `
    query NewQuery {
  postBy(uri: "hello-world!") {
    test {
      testField
    }
  }
}
  `
  );
  return data.postBy;
}
