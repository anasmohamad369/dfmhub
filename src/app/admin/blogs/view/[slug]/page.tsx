import { use } from "react";
import ViewBlogContainer from "@/modules/blog/presentation/containers/ViewBlogContainer";

interface ViewBlogPageProps {
  params: Promise<{ slug: string }>;
}

export default function ViewBlogPage({ params }: ViewBlogPageProps) {
  const resolvedParams = use(params);
  return <ViewBlogContainer slug={resolvedParams.slug} />;
}
