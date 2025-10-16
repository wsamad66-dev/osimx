import { client } from './src/lib/sanity.client'

async function checkContent() {
  try {
    const post = await client.fetch(`*[_type == "blogPost" && slug.current == "guide-complet-etudier-canada-2025"][0] {
      title,
      content[0..2]
    }`)
    
    console.log('Title:', post.title)
    console.log('Content type:', typeof post.content)
    console.log('Is Array:', Array.isArray(post.content))
    if (Array.isArray(post.content)) {
      console.log('First block:', JSON.stringify(post.content[0], null, 2))
    } else {
      console.log('Content:', post.content?.substring(0, 200))
    }
  } catch (error) {
    console.error('Error:', error)
  }
}

checkContent()
