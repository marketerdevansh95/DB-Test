import { revalidatePath, revalidateTag } from 'next/cache'

export function revalidateAllBrandPages() {
  try {
    // Revalidate home page
    revalidatePath('/')
    
    // Revalidate all brand listing pages
    revalidatePath('/brands/[pageNo]', 'page')
    
    // Revalidate individual brand pages
    revalidatePath('/brand/[brandName]', 'page')
    
    console.log('All brand-related pages revalidated successfully')
    return { success: true, message: 'Brand pages revalidated' }
  } catch (error) {
    console.error('Error revalidating brand pages:', error)
    return { success: false, error: error.message }
  }
}

export function revalidateAllCategoryPages() {
  try {
    // Revalidate home page
    revalidatePath('/')
    
    // Revalidate category pages
    revalidatePath('/category/[categorySlug]', 'page')
    
    console.log('All category-related pages revalidated successfully')
    return { success: true, message: 'Category pages revalidated' }
  } catch (error) {
    console.error('Error revalidating category pages:', error)
    return { success: false, error: error.message }
  }
}

export function revalidateAllBlogPages() {
  try {
    // Revalidate blog pages
    revalidatePath('/blog', 'page')
    revalidatePath('/blog/[slug]/[blogSlug]', 'page')
    
    console.log('All blog-related pages revalidated successfully')
    return { success: true, message: 'Blog pages revalidated' }
  } catch (error) {
    console.error('Error revalidating blog pages:', error)
    return { success: false, error: error.message }
  }
}

export function revalidateEntireApp() {
  try {
    // Clear all cached data
    revalidatePath('/', 'layout')
    
    console.log('Entire app cache cleared successfully')
    return { success: true, message: 'Entire app cache cleared' }
  } catch (error) {
    console.error('Error clearing app cache:', error)
    return { success: false, error: error.message }
  }
}
