const getPostTitle = (post: any) => {
  return post.properties["title"].title[0].plain_text;
};

const getPostDate = (post: any) => {
  return post.properties?.date.date.start;
};

const getPostTags = (post: any) => {
  return post.properties["tags"].multi_select.map((tag: any) => {
    return tag.name;
  });
};
const getPostLink = (post: any) => {
  return post.properties["link"].url;
};

const getPostVideo = (post: any) => {
  const fileUrl = post.properties["video"].files[0]?.file.url;
  return fileUrl ? fileUrl : null;
};

const getPostImage = (post: any) => {
  const fileUrl = post.properties["image"].files[0]?.file.url;
  return fileUrl ? fileUrl : null;
};

const getPostDescription = (post: any) => {
  return post.properties["description"].rich_text[0].plain_text;
};

export {
  getPostTitle,
  getPostDate,
  getPostTags,
  getPostLink,
  getPostVideo,
  getPostImage,
  getPostDescription,
};
