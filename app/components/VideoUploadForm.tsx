"use client";
import { useState } from "react";
import FileUpload from "./FileUpload";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { apiClient } from "@/lib/api-client";
import { useNotification } from "./Notification";
import { IKUploadResponse } from "imagekitio-next/dist/types/components/IKUpload/props";
import { useRouter } from "next/navigation";

interface IVideoFormData {
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
}

export default function VideoUploadForm() {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [uploadKey, setUploadKey] = useState(0);
  const { showNotification } = useNotification();

  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IVideoFormData>({
    defaultValues: {
      title: "",
      description: "",
      videoUrl: "",
      thumbnailUrl: "",
    },
  });

  const handleUploadSuccess = (response: IKUploadResponse) => {
    setValue("videoUrl", response.filePath);
    setValue("thumbnailUrl", response.thumbnailUrl || response.filePath);
    showNotification("Video uploaded successfully!", "success");
  };

  const handleUploadProgress = (progress: number) => {
    setUploadProgress(progress);
  };

  const onSubmit = async (data: IVideoFormData) => {
    if (!data.videoUrl) {
      showNotification("Please upload a video first", "error");
      return;
    }

    setLoading(true);

    try {
      await apiClient.createVideo(data);
      showNotification("Video publish successfully", "success");

      setValue("title", "");
      setValue("videoUrl", "");
      setValue("description", "");
      setValue("thumbnailUrl", "");
      setUploadProgress(0);
      setUploadKey((prev) => prev + 1);
      router.push("/");
    } catch (error) {
      showNotification(
        error instanceof Error ? error.message : "Failed to publish video",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="label block mb-1 text-lg">Title</label>
        <input
          type="text"
          className={`input w-full ${errors.title ? "input-error" : ""}`}
          placeholder="enter your title"
          {...register("title", { required: "Title is required" })}
        />
        {errors.title && (
          <span className="text-error text-sm mt-1">
            {errors.title.message}
          </span>
        )}
      </div>

      <div>
        <label className="label block mb-1 text-lg">Description</label>
        <textarea
          className={`textarea w-full h-24 ${
            errors.description ? "textarea=error" : ""
          }`}
          placeholder="enter your description"
          {...register("description", { required: "Description is required" })}
        />
        {errors.description && (
          <span className="text-error text-sm mt-1">
            {errors.description.message}
          </span>
        )}
      </div>

      <div>
        <label className="label block mb-1 text-lg">Upload Video</label>
        <FileUpload
          key={uploadKey}
          fileType="video"
          onSuccess={handleUploadSuccess}
          onProgress={handleUploadProgress}
        />
        {uploadProgress > 0 && (
          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
            <div
              className="bg-primary h-full rounded-full transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
        )}
      </div>

      <button
        type="submit"
        className="btn btn-primary btn-block cursor-pointer"
        disabled={loading || !uploadProgress}
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Publishing Video...
          </>
        ) : (
          "Publish Video"
        )}
      </button>
    </form>
  );
}
