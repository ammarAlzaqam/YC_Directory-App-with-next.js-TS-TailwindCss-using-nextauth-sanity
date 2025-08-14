import { StartupCardType } from "@/components/StartupCard";
import { client } from "@/sanity/client";
import { STARTUP_BY_ID_QUERY } from "@/sanity/queries";
import { notFound } from "next/navigation";
import formatDate from "@/utils/formatDate";
import Link from "next/link";
import Image from "next/image";
import MarkdownIt from "markdown-it";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import View from "@/components/View";

export const ppr = true;

export default async function StartupById({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const post = (await client.fetch(STARTUP_BY_ID_QUERY, {
    id,
  })) as StartupCardType;

  if (!post) notFound();

  const parsedContent = MarkdownIt().render(post.pitch || "");

  return (
    <>
      {/*//TODO: Header */}
      <section className="pink_container !min-h-[230px]">
        <p className="tag">{formatDate(post?._createdAt)}</p>
        <h1 className="heading">{post.title}</h1>
        <p className="sub-heading !max-w-5xl">{post.description}</p>
      </section>

      {/*//TODO: Startup info */}
      <section className="section_container">
        {/*//*: Startup Image */}
        <img
          src={post.image}
          alt="thumbnail"
          className="w-full h-auto rounded-xl"
        />

        <div className="space-y-5 mt-10 max-w-4xl mx-auto">
          {/*//*: Author info & category */}
          <div className="flex-between gap-5">
            {/*//*: Author info */}
            <Link
              href={`/user/${post.author?._id}`}
              className="flex gap-2 items-center mb-3"
            >
              <Image
                src={post.author?.image!}
                alt="avatar"
                width={64}
                height={64}
                className="rounded-full drop-shadow-lg"
              />

              <div>
                <p className="text-20-medium">{post.author?.name}</p>
                <p className="text-16-medium !text-black-300">
                  @{post.author?.username}
                </p>
              </div>
            </Link>

            {/*//*: Startup category */}
            <p className="category-tag">{post.category}</p>
          </div>

          {/*//*: Startup pitch details */}
          <h3 className="text-30-bold">Pitch Details</h3>
          {parsedContent ? (
            <article
              className="prose max-w-4xl font-work-sans break-all"
              dangerouslySetInnerHTML={{ __html: parsedContent }}
            />
          ) : (
            <p className="no-result">No details provided</p>
          )}
        </div>

        <hr className="divider" />

        {/*//TODO: EDITOR SELECTED STARTUPS */}

        <Suspense fallback={<Skeleton className="view_skeleton" />}>
          <View id={id} />
        </Suspense>
      </section>
    </>
  );
}
