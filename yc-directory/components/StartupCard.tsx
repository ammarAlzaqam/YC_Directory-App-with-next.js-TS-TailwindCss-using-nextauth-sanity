import formatDate from "@/utils/formatDate";
import { EyeIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { Startup, Author } from "@/sanity.types";
import { cn } from "@/lib/utils";
import { Skeleton } from "./ui/skeleton";

export type StartupCardType = Omit<Startup, "author"> & { author?: Author };

export default function StartupCard({ post }: { post: StartupCardType }) {
  const {
    _createdAt,
    views,
    author,
    _id,
    description,
    image,
    category,
    title,
  } = post;
  return (
    <div className="overflow-hidden startup-card group ">
      <li className="animate-top">
        {/*//! Data & views */}
        <div className="flex-between">
          <p className="startup_card_data">{formatDate(_createdAt)}</p>
          <div className="flex gap-1.5">
            <EyeIcon className="size-6 text-primary" />
            <span className="text-16-medium">{views}</span>
          </div>
        </div>

        {/*//! user Info & post title */}
        <div className="flex-between mt-5 gap-5">
          {/*//* username & postTitle */}
          <div className="flex-1">
            <Link href={`/user/${author?._id}`}>
              <p className="text-16-medium line-clamp-1">{author?.name}</p>
            </Link>
            <Link href={`/startup/${_id}`}>
              <h3 className="text-26-semibold line-clamp-1">{title}</h3>
            </Link>
          </div>
          {/*//* userImage */}
          <Link href={`/user/${author?._id}`}>
            <Image
              src={author?.image!}
              alt="placeholder"
              width={48}
              height={48}
              className="rounded-full"
            />
          </Link>
        </div>

        {/*//! des & img */}
        <Link href={`/startup/${_id}`}>
          <p className="startup-card_desc">{description}</p>

          <img src={image} alt="placeholder" className="startup-card_img" />
        </Link>

        {/*//! Category & details button */}
        <div className="flex-between gap-3 mt-5">
          <Link href={`/?query=${category?.toLowerCase()}`}>
            <p className="text-16-medium">{category}</p>
          </Link>
          <Button className="startup-card_btn" asChild>
            <Link href={`startup/${_id}`}>Details</Link>
          </Button>
        </div>
      </li>
    </div>
  );
}

export const StartupCardSkeleton = () => (
  <>
    {[0, 1, 2, 3, 4].map((index: number) => (
      <li key={cn("skelton", index)}>
        <Skeleton className="startup-card_skeleton" />
      </li>
    ))}
  </>
);
