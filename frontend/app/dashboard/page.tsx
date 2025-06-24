import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { InfoIcon } from "lucide-react";
import { SubscriptionForm } from "./subscription-form";
import { SubscriptionList } from "./subscription-list";
import { CompanyInfoForm } from "./company-info-form";
import DashboardNavigation from "@/components/layout/DashboardNavigation";

export default async function ProtectedPage() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/auth/login");
  }

  return (
    <div className="flex-1 w-full flex flex-col gap-8 p-4 md:p-8">
      <DashboardNavigation />
      
      <div className="space-y-8">
        <div className="bg-card p-6 rounded-lg border">
          <CompanyInfoForm />
        </div>
        
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Your Subscriptions</h1>
          <p className="text-muted-foreground">
            Manage your subreddit subscriptions
          </p>
        </div>

        <div className="space-y-6">
          <div className="bg-card p-6 rounded-lg border">
            <h2 className="text-lg font-medium mb-4">Add a Subreddit</h2>
            <SubscriptionForm 
              userId={data.user.id}
            />
            <p className="text-sm text-muted-foreground mt-2">
              Enter the name of a subreddit (without the r/)
            </p>
          </div>

          <div>
            <h2 className="text-lg font-medium mb-4">Your Subscriptions</h2>
            <SubscriptionList userId={data.user.id} />
          </div>
        </div>
      </div>
    </div>
  );
}
