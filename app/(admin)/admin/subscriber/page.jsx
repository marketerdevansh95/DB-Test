import AllSubscribers from "@/ACOMPS/AllSubscribers";
import { getAllSubscriber } from "@/functions/admin";

export default async function GAS() {
  const subscribers = await getAllSubscriber();
  return <AllSubscribers subscribers={subscribers.data} />;
}
