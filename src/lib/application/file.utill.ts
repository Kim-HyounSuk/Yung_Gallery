import { FormData } from '@/type/application'

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
  currentFiles: File[],
  newFiles: File[],
  maxTotalSize: number,
  getTotalSize: (files: File[]) => number,
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
 * FormData 객체를 재귀적으로 탐색하여 File 객체를 분리
 */
export function extractFiles(data: FormData) {
  const files: File[] = []

  const recurse = (curData: FormData): FormData | null => {
    // 1. File 객체인 경우
    if (curData instanceof File) {
      files.push(curData)
      return null
    }

    // 2. 배열인 경우
    if (Array.isArray(curData)) {
      return curData.map(recurse).filter((item) => item !== null)
    }

    // 3. 순수 객체인 경우
    if (
      curData &&
      typeof curData === 'object' &&
      Object.prototype.toString.call(curData) === '[object Object]'
    ) {
      const newData: FormData = {}
      for (const key in curData) {
        newData[key] = recurse(curData[key])
      }
      return newData
    }

    return curData
  }

  const cleanData = recurse(data)
  return { cleanData, files }
}
