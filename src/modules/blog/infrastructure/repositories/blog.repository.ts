import { BlogRecord } from "../../domain/entities/blog.entity";
import { BlogFormValues } from "../../domain/validation/blog.schema";

export async function fetchBlogs(category?: string): Promise<BlogRecord[]> {
  const url = category && category !== "ALL" ? `/api/blogs?category=${category}` : "/api/blogs";
  const res = await fetch(url);
  const json = await res.json();
  if (!json.success || !Array.isArray(json.data)) {
    throw new Error(json.error || "Failed to fetch blog posts");
  }
  return json.data;
}

export async function fetchBlogDetail(slug: string): Promise<BlogRecord> {
  const res = await fetch(`/api/blogs/${slug}`);
  const json = await res.json();
  if (!json.success || !json.data) {
    throw new Error(json.error || "Failed to fetch blog article");
  }
  return json.data;
}

export async function createBlogApi(payload: BlogFormValues): Promise<BlogRecord> {
  const res = await fetch("/api/blogs", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const json = await res.json();
  if (!res.ok || !json.success) {
    throw new Error(json.error || json.message || "Failed to create blog post");
  }
  return json.data;
}

export async function updateBlogApi(payload: BlogFormValues & { id?: string }): Promise<BlogRecord> {
  const res = await fetch("/api/blogs", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const json = await res.json();
  if (!res.ok || !json.success) {
    throw new Error(json.error || json.message || "Failed to update blog post");
  }
  return json.data;
}

export async function deleteBlogApi(id: string): Promise<void> {
  const res = await fetch(`/api/blogs?id=${id}`, {
    method: "DELETE",
  });
  const json = await res.json();
  if (!res.ok || !json.success) {
    throw new Error(json.error || "Failed to delete blog post");
  }
}
