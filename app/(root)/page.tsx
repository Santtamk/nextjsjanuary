import SearchForm from "@/components/SearchForm";
import StartupCard from "@/components/StartupCard";
import { client } from "@/sanity/lib/client";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";
import { title } from "process";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query;

  const posts = await client.fetch(STARTUPS_QUERY)
  console.log(JSON.stringify(posts, null, 2))

  // const posts = [
  //   {
  //     _createdAt: new Date(),
  //     views: 55,
  //     author: { _id: 1, name: "Adrion" },
  //     description: "This is a description",
  //     image: "https://picsum.photos/200",
  //     category: "Robots",
  //     title: "We Robots",
  //   },
  // ];
  
  return (
    <>
      <section className="pink_container">
        <h1 className="heading">
          Pitch Your startup, <br /> Connect with Entrepreneurs
        </h1>
        <p className="sub-heading !max-w-3xl">
          Submit Ideas, Vote on Pitches, and Get Notices in Virtual
          Competitions.
        </p>

        <SearchForm query={query} />
      </section>

      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Search result for "${query}"` : "All Startups"}
        </p>
        <ul className="mt-7 card_grid">
          {posts?.length > 0 ? (
            posts.map((post: StartupCardType, index: number) => (
              <StartupCard key={post?._id || index} post={post} />
            ))
          ) : (
            <p className="no-results">No startups found</p>
          )}
        </ul>
      </section>
    </>
  );
}
