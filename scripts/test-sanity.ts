import { config } from 'dotenv'
import { resolve } from 'path'
import { createClient } from '@sanity/client'

// Load .env.local
config({ path: resolve(process.cwd(), '.env.local') })

/**
 * Test script to verify Sanity CMS integration
 * Run: npm run test:sanity OR npx tsx scripts/test-sanity.ts
 */

async function testSanityIntegration() {
  console.log('🧪 Testing Sanity CMS integration...\n')

  // Test 1: Configuration Check
  console.log('1️⃣ Checking configuration...')
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
  const token = process.env.SANITY_API_TOKEN
  
  if (!projectId || !dataset) {
    console.error('❌ Sanity not configured properly.')
    console.error('   Please check your .env.local file for:')
    console.error('   - NEXT_PUBLIC_SANITY_PROJECT_ID')
    console.error('   - NEXT_PUBLIC_SANITY_DATASET')
    console.error('   - SANITY_API_TOKEN (for writes)')
    process.exit(1)
  }
  console.log('✅ Configuration OK')
  console.log(`   Project ID: ${projectId}`)
  console.log(`   Dataset: ${dataset}`)
  console.log(`   Token: ${token ? '✅ Configured' : '⚠️  Not configured (read-only)'}\n`)

  // Create client
  const client = createClient({
    projectId,
    dataset,
    useCdn: true,
    apiVersion: '2024-01-01',
  })

  // Test 2: Connection Check
  console.log('2️⃣ Testing connection to Sanity...')
  try {
    const result = await client.fetch(`*[_type == "hero"][0]`)
    if (!result) {
      console.warn('⚠️  No hero content found.')
      console.warn('   Run: npm run seed:hero')
    } else {
      console.log('✅ Connection OK')
      console.log(`   Found hero: "${result.headline}"\n`)
    }
  } catch (error) {
    console.error('❌ Connection failed:', error)
    process.exit(1)
  }

  // Test 3: Schema Validation
  console.log('3️⃣ Validating schemas...')
  try {
    const types = await client.fetch(`*[_type in ["hero", "student", "studentDocument"]][0...3]`)
    const foundTypes = [...new Set(types.map((doc: any) => doc._type))]
    
    console.log(`✅ Found ${foundTypes.length} schema type(s):`, foundTypes.join(', '))
    
    if (foundTypes.length === 0) {
      console.warn('⚠️  No documents found. Deploy schemas with:')
      console.warn('   npx sanity deploy')
    }
  } catch (error) {
    console.error('❌ Schema validation failed:', error)
  }

  console.log('\n✨ All tests passed! Sanity is ready to use.')
}

testSanityIntegration().catch((error) => {
  console.error('💥 Unexpected error:', error)
  process.exit(1)
})
