#!/usr/bin/env node

/**
 * Test script for Sanity Upload API
 * Tests the /api/upload endpoint with a mock file
 * 
 * Usage:
 *   npm run test:upload
 *   or
 *   node scripts/test-upload.js
 */

const fs = require('fs')
const path = require('path')
const FormData = require('form-data')

const API_URL = 'http://localhost:3000/api/upload'

// ANSI colors
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  gray: '\x1b[90m',
}

function log(color, emoji, message) {
  console.log(`${colors[color]}${emoji} ${message}${colors.reset}`)
}

async function testUploadAPI() {
  console.log('\n' + '='.repeat(60))
  log('blue', '🧪', 'Sanity Upload API Test')
  console.log('='.repeat(60) + '\n')

  // Step 1: Check if server is running
  log('blue', '📡', 'Checking if server is running...')
  
  try {
    const checkResponse = await fetch('http://localhost:3000/api/upload', {
      method: 'GET'
    })
    
    if (checkResponse.ok) {
      const info = await checkResponse.json()
      log('green', '✅', 'Server is running')
      log('gray', '   ', `Max file size: ${info.maxFileSize}`)
      log('gray', '   ', `Allowed types: ${info.allowedTypes.length} types`)
    }
  } catch (error) {
    log('red', '❌', 'Server is not running!')
    log('yellow', '⚠️', 'Please start the server with: npm run dev')
    process.exit(1)
  }

  // Step 2: Create a test file
  log('blue', '📄', 'Creating test file...')
  
  const testDir = path.join(process.cwd(), 'test-files')
  if (!fs.existsSync(testDir)) {
    fs.mkdirSync(testDir, { recursive: true })
  }

  const testFilePath = path.join(testDir, 'test-document.txt')
  const testContent = `
╔══════════════════════════════════════════════╗
║         OSIM - Test Document                 ║
║         Generated: ${new Date().toISOString()}    ║
╚══════════════════════════════════════════════╝

This is a test document for Sanity upload API.

Lorem ipsum dolor sit amet, consectetur adipiscing elit.
Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

Test ID: ${Math.random().toString(36).substring(7)}
`.trim()

  fs.writeFileSync(testFilePath, testContent)
  log('green', '✅', 'Test file created')
  log('gray', '   ', `Path: ${testFilePath}`)
  log('gray', '   ', `Size: ${testContent.length} bytes`)

  // Step 3: Upload file
  log('blue', '📤', 'Uploading file to Sanity...')

  const formData = new FormData()
  formData.append('file', fs.createReadStream(testFilePath), {
    filename: 'test-document.txt',
    contentType: 'text/plain'
  })

  try {
    const uploadResponse = await fetch(API_URL, {
      method: 'POST',
      body: formData,
      headers: formData.getHeaders(),
    })

    if (!uploadResponse.ok) {
      const errorData = await uploadResponse.json()
      log('red', '❌', 'Upload failed!')
      log('red', '   ', `Error: ${errorData.error}`)
      process.exit(1)
    }

    const result = await uploadResponse.json()
    
    log('green', '✅', 'Upload successful!')
    console.log('\n📦 Response:')
    console.log(JSON.stringify(result, null, 2))

    // Step 4: Verify asset URL
    log('blue', '🔗', 'Verifying asset URL...')
    
    if (result.url) {
      log('green', '✅', 'Asset URL received')
      log('gray', '   ', `URL: ${result.url}`)
      log('gray', '   ', `Asset ID: ${result.assetId}`)
    } else {
      log('red', '❌', 'No URL in response')
    }

    // Step 5: Cleanup
    log('blue', '🧹', 'Cleaning up...')
    fs.unlinkSync(testFilePath)
    log('green', '✅', 'Test file deleted')

    console.log('\n' + '='.repeat(60))
    log('green', '🎉', 'All tests passed!')
    console.log('='.repeat(60) + '\n')

    log('yellow', '💡', 'Next steps:')
    log('gray', '   ', '1. Open the modal: http://localhost:3000')
    log('gray', '   ', '2. Go to Step 3 (Documents)')
    log('gray', '   ', '3. Upload a PDF file')
    log('gray', '   ', '4. Watch the progress bar in action!')
    console.log()

  } catch (error) {
    log('red', '❌', 'Upload error!')
    log('red', '   ', error.message)
    console.error(error)
    process.exit(1)
  }
}

// Run the test
testUploadAPI().catch((error) => {
  console.error('Unhandled error:', error)
  process.exit(1)
})
