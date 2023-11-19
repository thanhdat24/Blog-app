export async function getStaticProps() {
  const res = await fetch(
    "https://q-force-wiki.hotanloc.xyz/flows/trigger/1cf2db70-b0cc-4deb-9563-29eadcc59108",
    {
      next: { revalidate: 60 },
    }
  );
  const posts = await res.json();
  console.log("posts", posts);
  return {
    props: {
      posts,
    },
    revalidate: 60,
  };
}

export default function BlogPosts({ posts }) {
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}
