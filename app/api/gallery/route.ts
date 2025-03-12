// import { createClient } from '@supabase/supabase-js'
// import { NextResponse } from 'next/server'
// import type { GalleryImage } from './types'

// const supabase = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL!,
//   process.env.SUPABASE_SERVICE_ROLE_KEY!
// )

// export async function GET() {
//   try {
//     const { data, error } = await supabase
//       .from('gallery_images')
//       .select('*')
//       .order('created_at', { ascending: false })

//     if (error) throw error

//     const images: GalleryImage[] = data.map(image => ({
//       id: image.id,
//       url: image.url,
//       width: image.width,
//       height: image.height,
//       caption: image.caption,
//       team_name: image.team_name,
//       location: image.location,
//       created_at: image.created_at
//     }))

//     return NextResponse.json({ images })
//   } catch (error) {
//     console.error('Failed to fetch gallery images:', error)
//     return NextResponse.json(
//       { error: 'Failed to fetch gallery images' },
//       { status: 500 }
//     )
//   }
// } 