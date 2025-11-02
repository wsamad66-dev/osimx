/**
 * Script to update hero content with student count fields
 * Run with: npm run update-hero-stats
 */

import { client } from '../src/lib/sanity/client'

async function updateHeroStats() {
  try {
    if (!client) {
      console.error('❌ Sanity client not initialized')
      process.exit(1)
    }
    
    console.log('🔍 Searching for active hero document...')
    
    // Find the active hero document
    const query = '*[_type == "hero" && isActive == true][0]'
    const hero = await client.fetch(query)
    
    if (!hero) {
      console.log('❌ No active hero document found')
      return
    }
    
    console.log(`✅ Found hero document: ${hero._id}`)
    
    // Update the hero document with new fields
    const result = await client
      .patch(hero._id)
      .set({
        studentsCount: '500+',
        studentsCountText: 'étudiants déjà accompagnés',
      })
      .commit()
    
    console.log('✅ Hero document updated successfully!')
    console.log('📊 New values:')
    console.log(`   - studentsCount: ${result.studentsCount}`)
    console.log(`   - studentsCountText: ${result.studentsCountText}`)
    console.log('\n🎉 Done! You can now edit these values in Sanity Studio at http://localhost:3000/studio')
    
  } catch (error) {
    console.error('❌ Error updating hero:', error)
    process.exit(1)
  }
}

updateHeroStats()
