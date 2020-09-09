import React, { useMemo } from "react";
import { useTheme, Row, Text, Col, Spacer } from "@zeit-ui/react";
import Link from "next/link";
import BLOG from "../../blog.config";
import { msToString } from "../date-transform";
import metadata from "../data/metadata.json";
import PostItem from "./post-item";

const getLatest = (data: any) => {
  const postNode = data.find((item: any) => item.name === "posts");
  const posts = (postNode || {}).children || [];
  return posts;
};

const time = (date: string) => {
  const t = Date.now() - new Date(date).getTime();
  return msToString(t);
};

const List = () => {
  const posts = useMemo(() => getLatest(metadata), []);
  const theme = useTheme();
  return (
    <section>
      <h2>{BLOG.labels.list || "All Posts"}</h2>
      <div className="content">
        {posts.map((post: any, index: any) => (
          <PostItem post={post} key={`${post.url}-${index}`} />
        ))}
      </div>

      <style jsx>{`
        section {
          margin-top: calc(${theme.layout.gap} * 2);
        }

        section h2 {
          font-size: 0.8rem;
          color: ${theme.palette.accents_6};
          text-transform: uppercase;
          letter-spacing: 2px;
          border-bottom: 2px solid ${theme.palette.accents_6};
          padding: 2px ${theme.layout.gapQuarter} 0 0;
          display: inline-block;
          margin: 0;
        }

        .content {
          margin: ${theme.layout.gap} 0;
        }

        .more {
          display: block;
        }

        @media only screen and (max-width: ${theme.layout.breakpointMobile}) {
          section {
            margin-top: ${theme.layout.gapQuarter};
          }

          section h2 {
            margin-top: calc(1.5 * ${theme.layout.gap});
          }
        }
      `}</style>
    </section>
  );
};

export default List;
