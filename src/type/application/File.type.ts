/**
 * 파일 업로더 설정
 */
export interface FileUploaderConfig {
  maxFiles?: number
  maxFileSize?: number
  maxTotalSize?: number
  acceptedTypes?: string[]
  disabled?: boolean
}
