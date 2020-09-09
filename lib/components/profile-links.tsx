import React, { useMemo } from "react";
import Link from "next/link";
import { useTheme } from "@zeit-ui/react";
import metadata from "../data/metadata.json";
import BLOG from "../../blog.config";

const getFixes = (metas: any) => {
  const data = metas.find((item: any) => item.name === "fixed");
  return (data || {}).children || [];
};

const fillSpace = (name: string) => {
  return name.replace(/ /g, "_").replace(".mdx", "");
};

const makeLink = (data: any) => {
  return (
    <Link href={data.url} key={data.url}>
      <a>{fillSpace(data.name)}</a>
    </Link>
  );
};

const ProfileLinks = () => {
  const theme = useTheme();
  const links = useMemo(() => getFixes(metadata), []);
  return (
    <div className="link">
      {makeLink({ url: "/posts", name: BLOG.labels.default || "posts" })}
      {links.map((link: string) => makeLink(link))}

      <style jsx>{`
        .link :global(a) {
          color: ${theme.palette.accents_5};
          text-transform: uppercase;
          font-size: 0.8rem;
          margin-right: ${theme.layout.gapHalf};
        }

        .link :global(a:last-of-type) {
          margin-right: 0;
        }
      `}</style>
    </div>
  );
};

export default ProfileLinks;
