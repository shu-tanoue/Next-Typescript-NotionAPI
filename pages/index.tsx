import Head from 'next/head';
import SinglePost from '../components/Post/SinglePost';
import Link from 'next/link';
import { GetStaticProps } from 'next';
import Tag from '../components/Tag/Tag';
import { getAllTags, getPostsForTopPage } from '../lib/notionAPI';

export const getStaticProps: GetStaticProps = async () => {
  const fourPosts = await getPostsForTopPage(4);
  const allTags = await getAllTags();
  return {
    props: {
      fourPosts,
      allTags,
    },
    revalidate: 10,
  };
};

export default function Home({ fourPosts, allTags }) {
  return (
    <div className="container h-full w-full mx-auto">
      <Head>
        <title>Shu-Blog</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container w-full mt-16">
        <h1 className="text-5x1 font-medium text-center mb-16">Shu Blog</h1>
        {fourPosts.map((post) => {
          return (
            <div className="mx-4" key={post.slug}>
              <SinglePost
                title={post.title}
                description={post.description}
                date={post.date}
                tags={post.tags}
                slug={post.slug}
                isPaginationPage={false}
              />
            </div>
          );
        })}
        <Link
          href="/posts/page/1"
          className="mb-6 lg:w-1/2 mx-auto rounded-md px-5 block text-right"
        >
          ...もっと見る
        </Link>
        <Tag tags={allTags} />
      </main>
    </div>
  );
}
