import Sidebar from "@/components/dashboard/Sidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session || !(session.user as any)?.isAdmin) {
    redirect("/en/login");
  }

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="dashboard-main-content">
        <DashboardHeader />
        <main className="dashboard-scroll">
          {children}
        </main>
      </div>
    </div>
  );
}
