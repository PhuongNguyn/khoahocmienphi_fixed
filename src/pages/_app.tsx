import Layout from "@/layouts";
import React from "react";
import "@/styles/styles.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { QueryClient, QueryClientProvider } from "react-query";
import Script from "next/script";
import { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      refetchOnWindowFocus: false,
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-ZF0WLLML25"
      ></Script>
      <Script
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-ZF0WLLML25');`,
        }}
      ></Script>
        <Script
        id='globalSchema'
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: `{
  "@context": "https://schema.org",
  "@type": "Article",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://khoahocmienphi.net/"
  },
  "headline": "Hệ Thống Khóa Học - Tài Liệu Miễn Phí",
  "image": "https://drive.google.com/file/d/1MjDy1OjTJQ1jr7OLVXoUKTdjNUtDHgpi/view?usp=share_link",  
  "author": {
    "@type": "Person",
    "name": "OKVIP",
    "url": "https://okvip.com/"
  },  
  "publisher": {
    "@type": "Organization",
    "name": "OKVIP",
    "logo": {
      "@type": "ImageObject",
      "url": "https://drive.google.com/file/d/1MjDy1OjTJQ1jr7OLVXoUKTdjNUtDHgpi/view?usp=share_link"
    }
  },
  "datePublished": ""
}
`,
        }}
      />
      <Head>
        <title>Hệ thống khóa học - Tài liệu miễn phí</title>
        <meta
          name="google-site-verification"
          content="Y7I_G6Ti54M0voEfDs3TcNlsB6IYttqqTQ1_ebhPr0g"
        />
      </Head>
      <QueryClientProvider client={queryClient}>
        <SkeletonTheme baseColor={"#eeeeee"} highlightColor={"#dddddd"}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </SkeletonTheme>
      </QueryClientProvider>
    </>
  );
}
