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

export async function getPostBySlug(slug: string) {
  const data = await fetchAPI(
    `
    query GetPost {
  postBy(
    uri: "${slug}"
  ) {
    date
    content
    title
    featuredImage {
      node {
        altText
        sourceUrl
        mediaDetails {
          width
          height
        }
      }
    }
  }
}
  `
  );
  return data.postBy;
}
