import axios from "axios";
import { CONFIG } from "../constants/config";

const api = axios.create({
  baseURL: CONFIG.BACKEND_URL,
  timeout: 120000,
});

export const uploadFrames = async (
  photos: string[],
  onProgress?: (percent: number) => void
) => {
  const formData = new FormData();

  photos.forEach((photoPath, index) => {
    formData.append("frames", {
      uri: `file://${photoPath}`,
      name: `frame_${index}.jpg`,
      type: "image/jpeg",
    } as any);
  });

  const response = await api.post("/api/video/scan", formData, {
    headers: { "Content-Type": "multipart/form-data" },
    onUploadProgress: (e) => {
      if (e.total && onProgress) {
        const percent = Math.round((e.loaded * 100) / e.total);
        onProgress(percent);
      }
    },
  });

  return response.data;
};