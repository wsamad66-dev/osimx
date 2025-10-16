import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'zfvjkkp0',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
})

const post = await client.fetch(`*[_type == "blogPost" && slug.current == "guide-complet-etudier-canada-2025"][0] {
  title,
  content
}`)

console.log('Type of content:', typeof post.content)
console.log('Is Array:', Array.isArray(post.content))
console.log('Content:', JSON.stringify(post.content, null, 2).substring(0, 500))
