export default {
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Project Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "date",
      title: "Project Date",
      type: "date",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "description",
      title: "Project Description",
      type: "text",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "link",
      title: "Project Link",
      type: "url",
    },
    {
      name: "image",
      title: "Project Image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "video",
      title: "Project Video",
      type: "file",
    },
    {
      name: "secondaryImage",
      title: "Project Secondary Image",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "tags",
      title: "Project Tags",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
    },
  ],

  preview: {
    select: {
      title: "title",
      media: "image",
    },
  },
};
