import React from "react";

type TagProps = {
  children: React.ReactNode;
  className?: string;
};
export default function Tag(props: TagProps) {
  return <div className={"tag" + (props.className ? " " + props.className : "")}>{props.children}</div>;
}
