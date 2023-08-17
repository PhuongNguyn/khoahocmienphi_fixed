import { getNewsBySlug } from "@/api/news";
import { GetServerSidePropsContext } from "next";
import Head from 'next/head'

//@ts-ignore
const PostDetail = ({ news, slug }) => {
  return (
    <>
        <Head>
      <link rel="canonical" href={`https://khoahocmienphi.net/khoahoc/${slug}`}/>
    </Head>
    <div className="row mt-4  new-list">
      <h1 className="text-center">{news?.title}</h1>
      <div
        className="mt-2"
        dangerouslySetInnerHTML={{ __html: news?.content }}
      ></div>
    </div>
    </>
  );
};

export default PostDetail;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  try {
    const slug = ctx.params?.slug?.toString();
    const news = await getNewsBySlug(slug || "");
    return {
      props: {
        news: news.data?.news || {},
        slug: slug,
      },
    };
  } catch (error) {
    return {
      props: {
        news: {},
      },
    };
  }
}
