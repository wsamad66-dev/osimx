import { NextRequest, NextResponse } from 'next/server'
import { client } from '@/lib/sanity/client'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, country } = body

    // Validation
    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Check if Sanity is configured
    if (!client) {
      return NextResponse.json(
        { error: 'Sanity CMS is not configured' },
        { status: 500 }
      )
    }

    // Save to Sanity
    const lead = await client.create({
      _type: 'lead',
      name,
      email,
      phone: phone || '',
      country: country || '',
      status: 'pending',
      source: 'appointment_form',
      appointmentBooked: false,
      createdAt: new Date().toISOString(),
    })

    console.log('Lead created:', lead._id)

    // Optional: Send email notification (you can add Resend, SendGrid, etc.)
    // await sendEmailNotification({ name, email, phone, country })

    return NextResponse.json(
      {
        success: true,
        leadId: lead._id,
        message: 'Lead saved successfully',
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error saving lead:', error)
    return NextResponse.json(
      { error: 'Failed to save lead', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

// Optional: GET endpoint to retrieve leads (for admin dashboard)
export async function GET(request: NextRequest) {
  try {
    // Check if Sanity is configured
    if (!client) {
      return NextResponse.json(
        { error: 'Sanity CMS is not configured' },
        { status: 500 }
      )
    }

    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')

    let query = '*[_type == "lead"]'
    if (status) {
      query = `*[_type == "lead" && status == "${status}"]`
    }
    query += ' | order(createdAt desc)'

    const leads = await client.fetch(query)

    return NextResponse.json({ leads, count: leads.length })
  } catch (error) {
    console.error('Error fetching leads:', error)
    return NextResponse.json(
      { error: 'Failed to fetch leads' },
      { status: 500 }
    )
  }
}
