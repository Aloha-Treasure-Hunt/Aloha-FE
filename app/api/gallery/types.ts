export interface GalleryImage {
  id: string
  url: string
  width: number
  height: number
  caption?: string
  team_name?: string
  location?: string
  created_at: string
}

export interface GalleryResponse {
  images: GalleryImage[]
  error?: string
} 