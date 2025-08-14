import { client } from "@/sanity/client";
import Ping from "./Ping";
import { STARTUP_VIEWS_QUERY } from "@/sanity/queries";
import { formateNumber } from "@/utils/formateNumber";
import { writeClient } from "@/sanity/write-client";
import { after } from "next/server";

export default async function View({ id }: { id: string }) {
  const { views: totalViews } = await client
    .withConfig({ useCdn: false })
    .fetch(STARTUP_VIEWS_QUERY, { id });

  // TODO: Update the number of views

  after(
    async () =>
      await writeClient
        .patch(id)
        .set({ views: totalViews + 1 })
        .commit()
  );

  return (
    <div className="view-container">
      <div className="absolute -top-2 -right-2">
        <Ping />
      </div>

      <p className="view-text">
        <span className="font-black">
          {formateNumber(totalViews || 0, "view")}
        </span>
      </p>
    </div>
  );
}
