import { use } from "react";
import EditBlogContainer from "@/modules/blog/presentation/containers/EditBlogContainer";

interface EditBlogPageProps {
  params: Promise<{ slug: string }>;
}

export default function EditBlogPage({ params }: EditBlogPageProps) {
  const resolvedParams = use(params);
  return <EditBlogContainer slug={resolvedParams.slug} />;
}
