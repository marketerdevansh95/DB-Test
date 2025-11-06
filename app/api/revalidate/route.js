import { revalidatePath } from 'next/cache'
import { NextRequest } from 'next/server'

export async function POST(request) {
  try {
    const { path, secret } = await request.json()
    
    // Add a secret for security (optional but recommended)
    if (secret !== process.env.REVALIDATION_SECRET) {
      return Response.json({ message: 'Invalid secret' }, { status: 401 })
    }

    if (path) {
      // Revalidate specific path
      revalidatePath(path)
      return Response.json({ 
        revalidated: true, 
        path,
        timestamp: new Date().toISOString() 
      })
    } else {
      // Revalidate all main pages
      revalidatePath('/')
      revalidatePath('/brands/[pageNo]', 'page')
      revalidatePath('/brand/[brandName]', 'page')
      revalidatePath('/category/[categorySlug]', 'page')
      revalidatePath('/blog/[slug]', 'page')
      
      return Response.json({ 
        revalidated: true, 
        message: 'All main pages revalidated',
        timestamp: new Date().toISOString() 
      })
    }
  } catch (err) {
    return Response.json({ 
      message: 'Error revalidating', 
      error: err.message 
    }, { status: 500 })
  }
}
