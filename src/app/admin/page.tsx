import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/auth";
import { getGallery, isBlobConfigured } from "@/lib/gallery";
import { AdminDashboard } from "./AdminDashboard";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  if (!(await isAdmin())) redirect("/admin/login");
  const items = await getGallery();
  return <AdminDashboard initialItems={items} blobReady={isBlobConfigured()} />;
}
