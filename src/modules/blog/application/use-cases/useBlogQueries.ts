import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchBlogs,
  fetchBlogDetail,
  createBlogApi,
  updateBlogApi,
  deleteBlogApi,
} from "../../infrastructure/repositories/blog.repository";

export function useBlogsQuery(category?: string) {
  return useQuery({
    queryKey: ["blogs", category || "ALL"],
    queryFn: () => fetchBlogs(category),
  });
}

export function useBlogDetailQuery(slug: string) {
  return useQuery({
    queryKey: ["blogDetail", slug],
    queryFn: () => fetchBlogDetail(slug),
    enabled: !!slug,
  });
}

export function useCreateBlogMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createBlogApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });
}

export function useUpdateBlogMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateBlogApi,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      if (data?.slug) {
        queryClient.invalidateQueries({ queryKey: ["blogDetail", data.slug] });
      }
    },
  });
}

export function useDeleteBlogMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteBlogApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });
}
