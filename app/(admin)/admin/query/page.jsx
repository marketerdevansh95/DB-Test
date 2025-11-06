import AllQuery from "@/ACOMPS/AllQuery";
import { getAllQuery } from "@/functions/admin";

export const revalidate = 0;

export default async function GAQ() {
  const query = await getAllQuery();

  return <AllQuery query={query.data} />;
}
