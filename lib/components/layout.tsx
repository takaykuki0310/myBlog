import React, { useMemo } from "react";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useRouter } from "next/router";
import {
  Spacer,
  Text,
  useTheme,
  Image,
  useToasts,
  Button,
  Link,
} from "@zeit-ui/react";
import Profile from "./profile";
import { msToString } from "../date-transform";
import BLOG from "../../blog.config";

const ContactsWithNoSSR = dynamic(() => import("./contacts"), { ssr: false });

const getDate = (date: string) => {
  const d = new Date(date);
  if (`${d}` === "Invalid Date") return "";
  const time = Date.now() - new Date(date).getTime();
  return `${d.toLocaleString()} - ${msToString(time)}`;
};

const encodeCharacterForLink = (str: string | undefined) => {
  if (!str) return "";
  return str.replace(/#/g, "%23").replace(/\+/g, "%2B");
};

const Layout = ({ children, meta }: any) => {
  const theme = useTheme();
  const { asPath } = useRouter();
  const inDetailPage = useMemo(() => meta?.title, []);
  const date = useMemo(() => getDate((meta || {}).date), []);
  const url = useMemo(() => {
    const suffix = BLOG.cn ? " 阅读" : " views";
    return `https://views.show/svg?key=${asPath}&fill=666666&suffix=${encodeURI(
      suffix
    )}&size=13`;
  }, [asPath]);
  const showViews = useMemo(() => BLOG.enableViews, []);

  const normalizedTitle = encodeCharacterForLink(meta?.title);
  const tweetlink = `https://twitter.com/intent/tweet?text=${normalizedTitle}%20-%20Yu%20note%0a&url=https://${BLOG.domain}${asPath}`;
  const hatenalink = `https://b.hatena.ne.jp/add?mode=confirm&url=https://${BLOG.domain}${asPath}&title=${normalizedTitle}"`;

  const [toasts, setToast] = useToasts();
  const click = () =>
    setToast({ text: "Thank you for sharing!", delay: 10000 });

  return (
    <section>
      <Head>
        {meta?.title && (
          <title>
            {meta?.title} - {BLOG.title}
          </title>
        )}
        {meta?.description && (
          <meta name="description" content={meta?.description} />
        )}
        {meta?.description && (
          <meta property="og:description" content={meta?.description} />
        )}
        {meta?.title && <meta property="og:title" content={meta?.title} />}
        {meta?.image && <meta property="og:image" content={meta?.image} />}
        {meta?.image && <meta property="twitter:image" content={meta?.image} />}
        {inDetailPage && (
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/katex@0.11.0/dist/katex.min.css"
          />
        )}
      </Head>
      <div className="container">
        {inDetailPage && <Spacer />}
        <Profile />
        {inDetailPage && <Spacer y={1} />}
        {inDetailPage && <Text h1>{meta?.title}</Text>}
        {inDetailPage && (
          <div className="date-box">
            <Text p className="date">
              {date}
            </Text>
            {showViews && <Image width={100} height={24} src={url} />}
          </div>
        )}
        {inDetailPage && <Spacer y={1} />}
        {children}
        {inDetailPage && (
          <div className="share-sns">
            <Spacer y={0.5} />
            <Button type="secondary" onClick={click} ghost>
              <Link href={hatenalink} target="_blank">
                Share on Hatena
              </Link>
            </Button>
            <Spacer y={0.5} />
            <Button type="success" onClick={click} ghost>
              <Link href={tweetlink} target="_blank">
                Share on Twitter
              </Link>
            </Button>
          </div>
        )}
        <Spacer y={5} />
        <ContactsWithNoSSR />
      </div>

      <style jsx>{`
        section {
          width: 100vw;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .container {
          width: 100%;
          max-width: 750px;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          text-spacing: none;
        }

        .container :global(h1) {
          font-size: 2rem;
        }

        .container :global(h2) {
          font-size: 1.7rem;
        }

        .container :global(h3) {
          font-size: 1.4rem;
        }

        .container :global(h4) {
          font-size: 1.2rem;
        }

        .date-box {
          display: flex;
          width: fit-content;
          align-items: center;
          height: 30px;
          margin: -0.5rem 0 0 0;
          position: relative;
        }

        .date-box > :global(.date) {
          color: ${theme.palette.accents_5};
          font-size: 0.85rem;
        }

        .date-box :global(.image) {
          position: absolute;
          left: 100%;
          top: 50%;
          transform: translateY(-50%);
          display: inline-flex;
          align-items: center;
          margin: 0 0 0 10px;
        }

        .date-box :global(img) {
          object-fit: unset;
        }

        @media only screen and (max-width: 767px) {
          .container {
            max-width: 91vw;
            min-height: 100vh;
          }

          .container :global(h1) {
            text-align: center;
          }

          .container > :global(.date) {
            text-align: center;
          }

          .date-box {
            justify-content: center;
            margin: 0 auto;
          }

          .date-box :global(.image) {
            display: none;
          }
        }

        .share-sns {
          text-align: right;
        }
      `}</style>
    </section>
  );
};

export default Layout;
