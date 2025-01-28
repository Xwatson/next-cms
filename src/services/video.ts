import { DataResult, PaginationResult } from "@/types/api";
import {
  Video,
  VideoCreateInput,
  VideoListParams,
  VideoUpdateInput,
} from "@/types/video";
import request from "@/utils/request";

// 获取视频列表
export const getVideos = (params: VideoListParams) => {
  return request.get<DataResult<PaginationResult<Video>>>("/admin/videos", {
    params,
  });
};

// 创建视频
export const createVideo = (data: VideoCreateInput) => {
  return request.post<Video>("/admin/videos", data);
};

// 更新视频
export const updateVideo = (data: VideoUpdateInput) => {
  return request.put<Video>(`/admin/videos/${data.id}`, data);
};

// 删除视频
export const deleteVideo = (id: number) => {
  return request.delete<void>(`/admin/videos/${id}`);
};
