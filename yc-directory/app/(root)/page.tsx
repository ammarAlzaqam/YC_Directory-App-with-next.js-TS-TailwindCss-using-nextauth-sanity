import SearchForm from "@/components/SearchForm";
import StartupCard from "@/components/StartupCard";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query: string }>;
}) {
  const { query } = await searchParams;

  const posts = [
    {
      _createdAt: new Date(),
      views: 55,
      author: { _id: 1 },
      _id: 1,
      description: "This is a description",
      image:
        "https://tse1.mm.bing.net/th/id/OIP.YySJd0gQ7n6YXfxCDxTjEgHaEl?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
      category: "Robots",
      title: "We Robots",
    },
    {
      _createdAt: new Date(),
      views: 55,
      author: { _id: 1 },
      _id: 2,
      description: "This is a description",
      image:
        "https://tse1.mm.bing.net/th/id/OIP.YySJd0gQ7n6YXfxCDxTjEgHaEl?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
      category: "Robots",
      title: "We Robots",
    },
    {
      _createdAt: new Date(),
      views: 55,
      author: { _id: 1 },
      _id: 3,
      description: "This is a description",
      image:
        "https://tse1.mm.bing.net/th/id/OIP.YySJd0gQ7n6YXfxCDxTjEgHaEl?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
      category: "Robots",
      title: "We Robots",
    },
    {
      _createdAt: new Date(),
      views: 55,
      author: { _id: 1 },
      _id: 4,
      description: "This is a description",
      image:
        "https://tse1.mm.bing.net/th/id/OIP.YySJd0gQ7n6YXfxCDxTjEgHaEl?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
      category: "Robots",
      title: "We Robots",
    },
  ];

  return (
    <>
      <section className="pink_container">
        <h1 className="heading">
          Pitch Your Startup, Connect with Entrepreneurs
        </h1>
        <p className="sub-heading !max-w-3xl">
          Submit Ideas, Vote on Pitches, and Get Noticed in Virtual Competitions
        </p>
        <SearchForm query={query} />
      </section>

      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Search result for "${query}"` : "All Startups"}
        </p>
        <ul className="mt-7 card_grid">
          {posts?.length > 0 ? (
            posts.map((post) => <StartupCard key={post._id} post={post} />)
          ) : (
            <p className="no-results">No startups found</p>
          )}
        </ul>
      </section>
    </>
  );
}
