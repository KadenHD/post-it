import PostCard from "@/components/PostCard";
import ExploreBtn from "@/components/ExploreBtn";
import { posts } from "@/lib/constants";

export default function Home() {
  return (
    <section>
      <h1 className="text-center">The Hub for Every <br /> Dev Posts You Can't Miss</h1>
      <p className="text-center mt-5">Struggles, Breakthroughs, and Victories, All in One Place</p>

      <ExploreBtn />

      <div className="mt-20 space-y-7">
        <h3>Featured Posts</h3>
        <ul className="posts">
          {posts.map((post) => (
            <li key={post.title}>
              <PostCard {...post} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
