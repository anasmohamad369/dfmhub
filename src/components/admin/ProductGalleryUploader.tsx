"use client";

import React, { useState, useRef } from "react";
import { 
  UploadCloud, 
  Trash2, 
  Star, 
  Loader2, 
  Plus, 
  ImageIcon, 
  CheckCircle2, 
  AlertCircle 
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProductGalleryUploaderProps {
  mainImage: string;
  galleryImages: string[];
  onMainImageChange: (url: string) => void;
  onGalleryImagesChange: (urls: string[]) => void;
  disabled?: boolean;
}

export default function ProductGalleryUploader({
  mainImage,
  galleryImages = [],
  onMainImageChange,
  onGalleryImagesChange,
  disabled = false,
}: ProductGalleryUploaderProps) {
  const [isUploadingMain, setIsUploadingMain] = useState(false);
  const [isUploadingGallery, setIsUploadingGallery] = useState(false);
  const [isDraggingMain, setIsDraggingMain] = useState(false);
  const [isDraggingGallery, setIsDraggingGallery] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const mainFileInputRef = useRef<HTMLInputElement>(null);
  const galleryFileInputRef = useRef<HTMLInputElement>(null);

  // Upload single file via backend API
  const uploadSingleFile = async (file: File): Promise<string> => {
    if (!file.type.startsWith("image/")) {
      throw new Error("Only image files (PNG, JPG, WEBP, GIF, SVG) are allowed.");
    }
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/uploads/image", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || "Failed to upload image.");
    }

    const data = await res.json();
    if (!data.url) throw new Error("No URL returned from server.");
    return data.url;
  };

  // Main image file selection handler
  const handleMainFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setErrorMessage(null);
    setIsUploadingMain(true);
    try {
      const url = await uploadSingleFile(file);
      onMainImageChange(url);
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to upload main image.");
    } finally {
      setIsUploadingMain(false);
      if (mainFileInputRef.current) mainFileInputRef.current.value = "";
    }
  };

  // Gallery multi-file selection handler
  const handleGalleryFilesChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setErrorMessage(null);
    setIsUploadingGallery(true);
    try {
      const uploadPromises = Array.from(files).map((f) => uploadSingleFile(f));
      const uploadedUrls = await Promise.all(uploadPromises);
      onGalleryImagesChange([...galleryImages, ...uploadedUrls]);
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to upload one or more gallery images.");
    } finally {
      setIsUploadingGallery(false);
      if (galleryFileInputRef.current) galleryFileInputRef.current.value = "";
    }
  };

  // Drag & drop for Main Image
  const handleMainDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingMain(false);
    if (disabled || !e.dataTransfer.files?.[0]) return;
    setErrorMessage(null);
    setIsUploadingMain(true);
    try {
      const url = await uploadSingleFile(e.dataTransfer.files[0]);
      onMainImageChange(url);
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to upload main image.");
    } finally {
      setIsUploadingMain(false);
    }
  };

  // Drag & drop for Gallery Images
  const handleGalleryDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingGallery(false);
    if (disabled || !e.dataTransfer.files || e.dataTransfer.files.length === 0) return;
    setErrorMessage(null);
    setIsUploadingGallery(true);
    try {
      const uploadPromises = Array.from(e.dataTransfer.files).map((f) => uploadSingleFile(f));
      const uploadedUrls = await Promise.all(uploadPromises);
      onGalleryImagesChange([...galleryImages, ...uploadedUrls]);
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to upload gallery images.");
    } finally {
      setIsUploadingGallery(false);
    }
  };

  // Remove main image
  const removeMainImage = () => {
    if (galleryImages.length > 0) {
      // Promote the first gallery image to main
      const [first, ...rest] = galleryImages;
      onMainImageChange(first);
      onGalleryImagesChange(rest);
    } else {
      onMainImageChange("");
    }
  };

  // Remove gallery image at index
  const removeGalleryImage = (index: number) => {
    const updated = galleryImages.filter((_, i) => i !== index);
    onGalleryImagesChange(updated);
  };

  // Promote a gallery image to be main
  const setGalleryImageAsMain = (index: number) => {
    const selectedUrl = galleryImages[index];
    const newGallery = galleryImages.filter((_, i) => i !== index);
    if (mainImage) {
      newGallery.unshift(mainImage);
    }
    onMainImageChange(selectedUrl);
    onGalleryImagesChange(newGallery);
  };

  return (
    <div className="space-y-6">
      {errorMessage && (
        <div className="p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 rounded-xl text-red-700 dark:text-red-400 text-xs font-semibold flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Primary / Main Image Section */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
            <span>Main Display Image</span>
            <span className="text-red-500">*</span>
            <span className="text-[11px] font-normal text-slate-400">(Primary hero image for catalog)</span>
          </label>
        </div>

        <input
          type="file"
          ref={mainFileInputRef}
          onChange={handleMainFileChange}
          accept="image/*"
          className="hidden"
          disabled={disabled || isUploadingMain}
        />

        {mainImage ? (
          <div className="relative group rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 p-4 flex flex-col items-center justify-center min-h-[220px]">
            <div className="relative w-full max-h-64 flex items-center justify-center">
              <img
                src={mainImage}
                alt="Main Product"
                className="max-h-56 max-w-full object-contain rounded-xl"
              />
              {isUploadingMain && (
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center text-white space-y-2 rounded-xl">
                  <Loader2 className="w-8 h-8 animate-spin text-amber-400" />
                  <span className="text-xs font-medium">Updating main image...</span>
                </div>
              )}
            </div>

            <div className="mt-3 flex items-center gap-2">
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Active Main Image
              </span>
              {!disabled && (
                <>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => mainFileInputRef.current?.click()}
                    disabled={isUploadingMain}
                    className="h-8 text-xs font-semibold border-slate-200 hover:bg-slate-100"
                  >
                    Replace
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={removeMainImage}
                    disabled={isUploadingMain}
                    className="h-8 text-xs font-semibold text-rose-600 hover:bg-rose-50 border-rose-200"
                  >
                    Remove
                  </Button>
                </>
              )}
            </div>
          </div>
        ) : (
          <div
            onDragOver={(e) => { e.preventDefault(); setIsDraggingMain(true); }}
            onDragLeave={() => setIsDraggingMain(false)}
            onDrop={handleMainDrop}
            onClick={() => !disabled && mainFileInputRef.current?.click()}
            className={`flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-2xl cursor-pointer transition-all ${
              isDraggingMain
                ? "border-amber-500 bg-amber-50/50 dark:bg-amber-950/20"
                : "border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 hover:bg-amber-50/30 hover:border-amber-500"
            } ${disabled ? "opacity-50 pointer-events-none" : ""}`}
          >
            <div className="flex flex-col items-center justify-center text-center px-4">
              {isUploadingMain ? (
                <Loader2 className="w-10 h-10 text-amber-500 animate-spin mb-3" />
              ) : (
                <UploadCloud className="w-10 h-10 text-slate-400 mb-3" />
              )}
              <p className="mb-1 text-sm font-semibold text-slate-700 dark:text-slate-300">
                <span className="text-amber-600">Click to upload</span> or drag and drop main image
              </p>
              <p className="text-xs text-slate-400">SVG, PNG, JPG, WEBP, GIF (Mandatory)</p>
            </div>
          </div>
        )}
      </div>

      {/* Additional Gallery Images Section */}
      <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
        <div className="flex items-center justify-between">
          <div>
            <label className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
              <span>Product Gallery</span>
              <span className="text-[11px] font-normal text-slate-400">(Additional product angles & views)</span>
            </label>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Upload multiple images. You can set any image as the main hero photo.
            </p>
          </div>

          {!disabled && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => galleryFileInputRef.current?.click()}
              disabled={isUploadingGallery}
              className="h-8 text-xs font-semibold text-amber-600 border-amber-200 bg-amber-50/50 hover:bg-amber-100 flex items-center gap-1"
            >
              {isUploadingGallery ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Plus className="w-3.5 h-3.5" />
              )}
              <span>Add Images</span>
            </Button>
          )}
        </div>

        <input
          type="file"
          ref={galleryFileInputRef}
          onChange={handleGalleryFilesChange}
          accept="image/*"
          multiple
          className="hidden"
          disabled={disabled || isUploadingGallery}
        />

        {/* Gallery Thumbnails Grid */}
        {galleryImages.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3.5">
            {galleryImages.map((imgUrl, index) => (
              <div
                key={index}
                className="relative group rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 p-2 flex flex-col items-center justify-between aspect-square"
              >
                <div className="w-full h-full flex items-center justify-center overflow-hidden">
                  <img
                    src={imgUrl}
                    alt={`Gallery ${index + 1}`}
                    className="w-full h-full object-contain rounded-lg"
                  />
                </div>

                {!disabled && (
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-2 rounded-xl backdrop-blur-xs">
                    <button
                      type="button"
                      onClick={() => setGalleryImageAsMain(index)}
                      className="px-2.5 py-1 bg-amber-500 hover:bg-amber-600 text-white rounded-md text-[11px] font-semibold flex items-center gap-1 shadow-sm transition-transform active:scale-95"
                      title="Set as Main Hero Image"
                    >
                      <Star className="w-3 h-3" />
                      Set as Main
                    </button>
                    <button
                      type="button"
                      onClick={() => removeGalleryImage(index)}
                      className="px-2.5 py-1 bg-rose-600 hover:bg-rose-700 text-white rounded-md text-[11px] font-semibold flex items-center gap-1 shadow-sm transition-transform active:scale-95"
                      title="Delete this image"
                    >
                      <Trash2 className="w-3 h-3" />
                      Remove
                    </button>
                  </div>
                )}
              </div>
            ))}

            {/* Extra dropzone inside grid */}
            {!disabled && (
              <div
                onDragOver={(e) => { e.preventDefault(); setIsDraggingGallery(true); }}
                onDragLeave={() => setIsDraggingGallery(false)}
                onDrop={handleGalleryDrop}
                onClick={() => galleryFileInputRef.current?.click()}
                className={`flex flex-col items-center justify-center border-2 border-dashed rounded-xl cursor-pointer aspect-square transition-all ${
                  isDraggingGallery
                    ? "border-amber-500 bg-amber-50/50"
                    : "border-slate-300 dark:border-slate-700 hover:border-amber-500 hover:bg-amber-50/20"
                }`}
              >
                <Plus className="w-6 h-6 text-slate-400 mb-1" />
                <span className="text-[11px] font-semibold text-slate-600">Add More</span>
              </div>
            )}
          </div>
        ) : (
          <div
            onDragOver={(e) => { e.preventDefault(); setIsDraggingGallery(true); }}
            onDragLeave={() => setIsDraggingGallery(false)}
            onDrop={handleGalleryDrop}
            onClick={() => !disabled && galleryFileInputRef.current?.click()}
            className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-2xl cursor-pointer transition-all ${
              isDraggingGallery
                ? "border-amber-500 bg-amber-50/50"
                : "border-slate-200 dark:border-slate-800 bg-slate-50/50 hover:bg-slate-100/60"
            } ${disabled ? "opacity-50 pointer-events-none" : ""}`}
          >
            {isUploadingGallery ? (
              <div className="flex items-center gap-2 text-xs font-semibold text-amber-600">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Uploading gallery images...</span>
              </div>
            ) : (
              <div className="text-center px-4">
                <ImageIcon className="w-6 h-6 text-slate-400 mx-auto mb-1.5" />
                <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  <span className="text-amber-600">Click to add</span> or drag additional photos
                </p>
                <p className="text-[11px] text-slate-400">Multiple images supported</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
