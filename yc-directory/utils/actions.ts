"use server";

import { auth } from "@/auth";
import { writeClient } from "@/sanity/write-client";
import { Startup } from "../../studio-jsm-yc-directory/sanity.types";
import slugify from "slugify";

export const createPitch = async (formData: FormData, pitch: string) => {
  const session = await auth();
  if (!session) return { success: false, error: "Not singed in" };

  const {
    title,
    description,
    category,
    link: image,
  } = Object.fromEntries(
    Array.from(formData).filter(([key]) => key !== "pitch")
  );

  const slug = slugify(title as string, { lower: true, strict: true });

  try {
    const startup = {
      _type: "startup",
      title,
      description,
      category,
      image,
      pitch,
      slug: {
        _type: slug,
        current: slug,
      },
      author: {
        _ref: session.id,
        _type: "reference",
      },
    };
    const newStartup = (await writeClient.create(startup)) as Startup;

    return { id: newStartup._id, success: true, error: "" };
  } catch (error) {
    console.log(error);
    return { id: "", success: false, error: "Something went wrong" };
  }
};
