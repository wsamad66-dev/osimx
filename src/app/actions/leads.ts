'use server'

import { revalidatePath } from 'next/cache'
import { writeClient } from '@/lib/sanity/writeClient'
import { getUserRole } from '@/lib/clerk/roles'

// Update lead status
export async function updateLeadStatus(leadId: string, status: string) {
  try {
    const role = await getUserRole()
    if (!role) {
      return { success: false, error: 'Unauthorized' }
    }

    await writeClient
      .patch(leadId)
      .set({ status, updatedAt: new Date().toISOString() })
      .commit()

    revalidatePath('/admin/leads')
    revalidatePath('/admin')
    
    return { success: true }
  } catch (error) {
    console.error('Error updating lead status:', error)
    return { success: false, error: 'Failed to update lead status' }
  }
}

// Assign lead to team
export async function assignLead(leadId: string, assignedTo: string) {
  try {
    const role = await getUserRole()
    if (!role || (role !== 'admin' && role !== 'cm')) {
      return { success: false, error: 'Unauthorized - admin or CM role required' }
    }

    await writeClient
      .patch(leadId)
      .set({ assignedTo, updatedAt: new Date().toISOString() })
      .commit()

    revalidatePath('/admin/leads')
    revalidatePath('/admin')
    
    return { success: true }
  } catch (error) {
    console.error('Error assigning lead:', error)
    return { success: false, error: 'Failed to assign lead' }
  }
}

// Add note to lead
export async function addLeadNote(
  leadId: string,
  note: string,
  author: string
) {
  try {
    const role = await getUserRole()
    if (!role) {
      return { success: false, error: 'Unauthorized' }
    }

    const newNote = {
      _key: `note-${Date.now()}`,
      note,
      author,
      createdAt: new Date().toISOString(),
    }

    await writeClient
      .patch(leadId)
      .setIfMissing({ notes: [] })
      .append('notes', [newNote])
      .set({ updatedAt: new Date().toISOString() })
      .commit()

    revalidatePath('/admin/leads')
    
    return { success: true }
  } catch (error) {
    console.error('Error adding note:', error)
    return { success: false, error: 'Failed to add note' }
  }
}

// Create new lead
export async function createLead(data: {
  firstName: string
  lastName: string
  email: string
  phone: string
  country: string
  destination?: string
  program?: string
  field?: string
  message?: string
  source?: string
}) {
  try {
    const role = await getUserRole()
    if (!role) {
      return { success: false, error: 'Unauthorized' }
    }

    const now = new Date().toISOString()

    const newLead = await writeClient.create({
      _type: 'lead',
      ...data,
      status: 'new',
      assignedTo: 'unassigned',
      createdAt: now,
      updatedAt: now,
    })

    revalidatePath('/admin/leads')
    revalidatePath('/admin')
    
    return { success: true, data: newLead }
  } catch (error) {
    console.error('Error creating lead:', error)
    return { success: false, error: 'Failed to create lead' }
  }
}

// Delete lead (admin only)
export async function deleteLead(leadId: string) {
  try {
    const role = await getUserRole()
    if (role !== 'admin') {
      return { success: false, error: 'Unauthorized - admin role required' }
    }

    await writeClient.delete(leadId)

    revalidatePath('/admin/leads')
    revalidatePath('/admin')
    
    return { success: true }
  } catch (error) {
    console.error('Error deleting lead:', error)
    return { success: false, error: 'Failed to delete lead' }
  }
}

// Set meeting date
export async function setMeetingDate(leadId: string, meetingDate: string) {
  try {
    const role = await getUserRole()
    if (!role) {
      return { success: false, error: 'Unauthorized' }
    }

    await writeClient
      .patch(leadId)
      .set({
        meetingDate,
        status: 'meeting',
        updatedAt: new Date().toISOString(),
      })
      .commit()

    revalidatePath('/admin/leads')
    revalidatePath('/admin/appointments')
    revalidatePath('/admin')
    
    return { success: true }
  } catch (error) {
    console.error('Error setting meeting date:', error)
    return { success: false, error: 'Failed to set meeting date' }
  }
}

// Mark as converted
export async function convertLead(leadId: string) {
  try {
    const role = await getUserRole()
    if (!role) {
      return { success: false, error: 'Unauthorized' }
    }

    await writeClient
      .patch(leadId)
      .set({
        status: 'converted',
        convertedDate: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      })
      .commit()

    revalidatePath('/admin/leads')
    revalidatePath('/admin')
    
    return { success: true }
  } catch (error) {
    console.error('Error converting lead:', error)
    return { success: false, error: 'Failed to convert lead' }
  }
}
