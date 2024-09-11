export interface BaseGetList {
  meta: {
    currentPage: number
    firstPage: number
    firstPageUrl: string
    lastPage: number
    lastPageUrl: string
    nextPageUrl: string
    perPage: number
    previousPageUrl: string | null
    total: number
  }
}

export interface PageParam {
  page: number
  perPage: number
}
