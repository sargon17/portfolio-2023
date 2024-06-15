import { Client } from "@notionhq/client";
import { cache } from "react";

// do not revalidate the data

export const revalidate = 0;

const notionKey = process.env.NEXT_NOTION_KEY;
const dbId = process.env.NEXT_NOTION_DB_ID;

const notion = new Client({ auth: notionKey });

const getDataFromDatabase = cache(async () => {
  if (!dbId) {
    throw new Error("Missing database ID, please add it to your environment variables");
  }

  const numberOfProjects = 10;

  const response = await notion.databases.query({
    database_id: dbId,
    page_size: numberOfProjects,
    sorts: [
      {
        property: "order",
        direction: "ascending",
      },
    ],
  });
  let data = response.results;

  return data;
});

const getPage = async (pageId: string) => {
  return await notion.pages.retrieve({ page_id: pageId });
};

export { getDataFromDatabase, getPage };
