import { type SchemaTypeDefinition } from "sanity";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    {
      type: "document",
      name: "post",
      title: "Post",
      fields: [
        {
          type: "string",
          name: "title",
          title: "Title",
        },
        {
          type: "text",
          name: "body",
          title: "Body",
        },
      ],
    },
    {
      type: "document",
      name: "project",
      title: "Project",
      fields: [
        {
          type: "string",
          name: "title",
          title: "Title",
        },
        {
          // year
          type: "number",
          name: "year",
          title: "Year",
          validation: (Rule) => Rule.required().min(2020).max(2100),
        },
        {
          //cover image
          type: "image",
          name: "coverImage",
          title: "Cover Image",
          options: {
            hotspot: true,
          },
        },
        {
          //tags
          type: "array",
          name: "tags",
          title: "Tags",
          of: [{ type: "string" }],
        },
        {
          //description
          type: "text",
          name: "description",
          title: "Description",
        },
      ],
    },
  ],
};
