export interface ComparisonObject {
  img: string
  name: string
  items: ComparisonSubItem[]
}

export interface ComparisonSubItem {
  label: string
  value: string
  isHighlight: boolean
}
