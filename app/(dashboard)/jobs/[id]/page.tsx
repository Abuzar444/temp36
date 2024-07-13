import EditJobForm from "@/components/EditJobForm";
import { getSingleJobAction } from "@/utils/actions";

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

async function JobDetailPage({ params }: { params: { id: string } }) {
  const queryClient = new QueryClient();

  try {
    await queryClient.prefetchQuery({
      queryKey: ["job", params.id],
      queryFn: () => getSingleJobAction(params.id),
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    // Handle unexpected error (e.g., display generic error message)
  }
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <EditJobForm jobId={params.id} />
    </HydrationBoundary>
  );
}
export default JobDetailPage;
