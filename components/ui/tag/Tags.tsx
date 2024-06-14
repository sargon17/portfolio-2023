import React from "react";

import Tag from "./Tag";

type TagsProps = {
  children: React.ReactNode | React.ReactNode[];
  className: string;
};
function Tags(props: TagsProps) {
  return <div className={"tags" + (props.className ? " " + props.className : "")}>{props.children}</div>;
}

Tags.Item = Tag;

export default Tags;
