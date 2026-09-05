export interface UploadSingleResponse {
  url: string;
  path: string;
  fileName: string;
}

export interface UploadMultipleResponseItem {
  url: string;
  path: string;
  fileName: string;
}

export type UploadMultipleResponse = UploadMultipleResponseItem[];

export interface UploadFilePreview {
  file: File;
  url: string;
}

export interface UploadOptions {
  folder?: string;
}
