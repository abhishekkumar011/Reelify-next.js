"use client";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { IKVideo } from "imagekitio-next";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { apiClient } from "@/lib/api-client";
import { IVideo } from "@/models/Video.model";
import { useNotification } from "@/app/components/Notification";

export default function VideoPage() {
  const params = useParams();
  const videoId = params?.id as string;
  const { showNotification } = useNotification();

  const [video, setVideo] = useState<IVideo | null>(null);

  useEffect(() => {
    if (!videoId) {
      return;
    }

    const fetchAVideo = async () => {
      try {
        const data = await apiClient.getAvideo(videoId);
        setVideo(data);
      } catch (error) {
        showNotification(
          error instanceof Error ? error.message : "Failed to fetch video",
          "error"
        );
      }
    };
    fetchAVideo();
  }, [videoId, showNotification]);

  return (
    <div>
      <div className="hidden lg:flex px-4 mb-2">
        <Link href={"/"}>
          <ArrowLeft className="size-8" />
        </Link>
      </div>
      {video ? (
        <div className="max-w-4xl mx-auto p-4 border border-gray-300 rounded-lg md:flex gap-5 shadow-md">
          <div
            className="rounded-xl overflow-hidden"
            style={{ aspectRatio: "9/16" }}
          >
            <IKVideo
              path={video.videoUrl}
              transformation={[
                {
                  height: "1920",
                  width: "1080",
                },
              ]}
              controls={video.controls}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="">
            <h1 className="text-2xl font-bold mt-4">{video.title}</h1>
            <p className="text-gray-600 mt-2">{video.description}</p>
          </div>
        </div>
      ) : (
        <div className="text-2xl justify-center mt-10 flex gap-5">
          <h2>Loading Video...</h2>
          <span className="loading loading-spinner loading-xs"></span>
        </div>
      )}
    </div>
  );
}
