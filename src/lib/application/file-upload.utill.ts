import { FileDoc } from '@/type/application'

/**
 * 파일 검증 함수
 */
export function validateFile(
  file: File,
  maxFileSize: number,
  acceptedTypes: string[],
  formatFileSize: (bytes: number) => string,
): string | null {
  // 파일 크기 체크
  if (file.size > maxFileSize) {
    return `${file.name}의 크기가 ${formatFileSize(maxFileSize)}를 초과합니다`
  }

  // 파일 타입 체크
  if (!acceptedTypes.includes(file.type)) {
    return `${file.name}은(는) 지원하지 않는 파일 형식입니다`
  }

  return null
}

/**
 * 전체 용량 체크
 */
export function validateTotalSize(
  currentFiles: FileDoc[],
  newFiles: FileDoc[],
  maxTotalSize: number,
  getTotalSize: (files: FileDoc[]) => number,
  formatFileSize: (bytes: number) => string,
): string | null {
  const currentTotalSize = getTotalSize(currentFiles)
  const newTotalSize = getTotalSize(newFiles)

  if (currentTotalSize + newTotalSize > maxTotalSize) {
    return `전체 파일 용량이 ${formatFileSize(maxTotalSize)}를 초과합니다`
  }

  return null
}

/**
 * 파일 개수 체크
 */
export function validateFileCount(
  currentCount: number,
  newCount: number,
  maxFiles: number,
): string | null {
  if (currentCount + newCount > maxFiles) {
    return `최대 ${maxFiles}개까지 첨부 가능합니다`
  }

  return null
}

/**
 * 파일 크기를 읽기 쉬운 형식으로 변환
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

/**
 * 파일 목록의 총 크기 계산
 */
export function getTotalSize(files: { size: number }[]): number {
  return files.reduce((acc, file) => acc + file.size, 0)
}

/**
 * 파일을 base64로 변환
 */
export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}
