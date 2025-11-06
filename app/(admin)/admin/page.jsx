import AdminHome from "@/ACOMPS/AdminHome";
import { getAdminHomeData } from "@/functions/admin";

export default async function AHP() {
  const data = await getAdminHomeData();
  return <AdminHome data={data} />;
}
