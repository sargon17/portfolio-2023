"use client";
import { useRef } from "react";

import { motion, motionValue, useMotionValueEvent } from "framer-motion";

import Image from "next/image";

import { ReactLenis } from "@studio-freight/react-lenis";

export default function SinglePost({ post }: { post: any }) {
  const container = useRef<any>(null);
  const divider = useRef<HTMLDivElement>(null);
  const progress = motionValue(0);

  let cleanedContent = post.content.replace(/<p><br><\/p>/g, "");

  // add <p> to the beginning of the content
  cleanedContent = "<p>" + cleanedContent;

  // find all the <!-- wp:paragraph --> and replace them with <p> and <!-- /wp:paragraph --> to </p>
  cleanedContent = cleanedContent.replace(/<!-- wp:paragraph -->/g, "<p>");
  cleanedContent = cleanedContent.replace(/<!-- \/wp:paragraph -->/g, "</p>");

  // find all the a, get their content and replace them with <a href="content" >content</a>
  cleanedContent = cleanedContent.replace(
    /<a>(.*?)<\/a>/g,
    '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>'
  );

  const readingIndicatorHandler = (e: any) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    const percent = (scrollTop / (scrollHeight - clientHeight)) * 100;
    progress.set(percent);
    // const progress = document.querySelector(".reading-indicator__progress");
    // progress.style.width = percent + "%";
  };

  useMotionValueEvent(progress, "change", (latestProgress) => {
    console.log(latestProgress);
    if (!divider.current) return;
    divider.current.style.setProperty("--divider-height", latestProgress + "%");
  });

  return (
    <div className="single-post">
      <div className="single-post__side">
        <h1 className="single-post__side__title">{post.title}</h1>
        {post.featuredImage?.node.sourceUrl && (
          <div className="single-post__side__image">
            <Image
              src={post.featuredImage?.node.sourceUrl}
              alt={post.featuredImage?.node.altText}
              width={post.featuredImage?.node.mediaDetails.width}
              height={post.featuredImage?.node.mediaDetails.height}
              objectFit="cover"
            />
          </div>
        )}
      </div>
      <div
        className="single-post__content"
        data-lenis-prevent
      >
        <motion.div
          className="divider"
          ref={divider}
          style={
            {
              "--divider-height": progress.get() + "%",
            } as any
          }
        ></motion.div>
        <ReactLenis
          options={{
            smoothWheel: true,
            duration: 1.4,
            wheelMultiplier: 1.4,
          }}
          ref={container}
          // onScroll={(e: any) => {
          //   readingIndicatorHandler(e);
          // }}
        >
          <div dangerouslySetInnerHTML={{ __html: cleanedContent }} />
        </ReactLenis>
      </div>
    </div>
  );
}
