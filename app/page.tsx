import PostCard from "@/components/PostCard";
import ExploreBtn from "@/components/ExploreBtn";
import { IPost } from "@/database";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
export default async function Page() {
  const response = await fetch(`${BASE_URL}/api/posts`);
  const {posts} = await response.json()

  return (
    <section>
      <h1 id="home" className="text-center scroll-offset-navbar">The Hub for Every <br /> Dev Posts You Can't Miss</h1>
      <p className="text-center mt-5">Struggles, Breakthroughs, and Victories, All in One Place</p>

      <ExploreBtn />

      <div className="mt-20 space-y-7">
        <h2 id="posts" className="scroll-offset-navbar">Featured Posts</h2>
        <ul className="posts">
          {posts && posts.length > 0 && posts.map((post: IPost) => (
            <li key={post.title}>
              <PostCard {...post} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
