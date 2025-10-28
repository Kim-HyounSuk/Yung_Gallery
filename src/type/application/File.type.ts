/**
 * 업로드 파일 타입
 */
export interface FileDoc {
  name: string
  size: number
  type: string
  base64: string
  uploading?: boolean
  uploaded?: boolean
}

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
