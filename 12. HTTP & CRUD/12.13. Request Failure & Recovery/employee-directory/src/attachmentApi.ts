import type { AxiosProgressEvent } from "axios";
import { apiClient } from "./apiClient";
export type AttachmentReceipt = {
  employeeId: string;
  fileName: string;
  bytes: number;
};
export async function uploadAttachment(
  id: string,
  file: File,
  signal: AbortSignal,
  onUploadProgress: (event: AxiosProgressEvent) => void,
): Promise<AttachmentReceipt> {
  const body = new FormData();
  body.append("attachment", file);
  const response = await apiClient.post<unknown>(
    `/employees/${encodeURIComponent(id)}/attachment`,
    body,
    {
      signal,
      onUploadProgress,
      timeout: 30000,
    },
  );
  const data = response.data;
  if (
    typeof data !== "object" ||
    data === null ||
    !("employeeId" in data) ||
    !("fileName" in data) ||
    !("bytes" in data) ||
    data.employeeId !== id ||
    typeof data.fileName !== "string" ||
    typeof data.bytes !== "number"
  ) {
    throw new Error("The upload response has an unexpected shape.");
  }
  return { employeeId: id, fileName: data.fileName, bytes: data.bytes };
}
