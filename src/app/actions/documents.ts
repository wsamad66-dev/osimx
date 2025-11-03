'use server'

import { revalidatePath } from 'next/cache'
import { writeClient } from '@/lib/sanity/writeClient'
import { getUserRole } from '@/lib/clerk/roles'

// Verify document
export async function verifyDocument(
  documentId: string,
  verifiedBy: string
) {
  try {
    const role = await getUserRole()
    if (!role || (role !== 'admin' && role !== 'fr')) {
      return { success: false, error: 'Unauthorized - admin or FR role required' }
    }

    await writeClient
      .patch(documentId)
      .set({
        isVerified: true,
        status: 'approved',
        verifiedBy,
        verifiedAt: new Date().toISOString(),
      })
      .commit()

    revalidatePath('/admin/documents')
    
    return { success: true }
  } catch (error) {
    console.error('Error verifying document:', error)
    return { success: false, error: 'Failed to verify document' }
  }
}

// Reject document
export async function rejectDocument(
  documentId: string,
  reason: string,
  verifiedBy: string
) {
  try {
    const role = await getUserRole()
    if (!role || (role !== 'admin' && role !== 'fr')) {
      return { success: false, error: 'Unauthorized - admin or FR role required' }
    }

    await writeClient
      .patch(documentId)
      .set({
        isVerified: false,
        status: 'rejected',
        rejectionReason: reason,
        verifiedBy,
        verifiedAt: new Date().toISOString(),
      })
      .commit()

    revalidatePath('/admin/documents')
    
    return { success: true }
  } catch (error) {
    console.error('Error rejecting document:', error)
    return { success: false, error: 'Failed to reject document' }
  }
}

// Mark document as needs correction
export async function markDocumentNeedsCorrection(
  documentId: string,
  reason: string,
  verifiedBy: string
) {
  try {
    const role = await getUserRole()
    if (!role || (role !== 'admin' && role !== 'fr')) {
      return { success: false, error: 'Unauthorized - admin or FR role required' }
    }

    await writeClient
      .patch(documentId)
      .set({
        status: 'needs_correction',
        rejectionReason: reason,
        verifiedBy,
        verifiedAt: new Date().toISOString(),
      })
      .commit()

    revalidatePath('/admin/documents')
    
    return { success: true }
  } catch (error) {
    console.error('Error marking document:', error)
    return { success: false, error: 'Failed to update document' }
  }
}

// Add note to document
export async function addDocumentNote(
  documentId: string,
  note: string
) {
  try {
    const role = await getUserRole()
    if (!role) {
      return { success: false, error: 'Unauthorized' }
    }

    await writeClient
      .patch(documentId)
      .set({ notes: note })
      .commit()

    revalidatePath('/admin/documents')
    
    return { success: true }
  } catch (error) {
    console.error('Error adding document note:', error)
    return { success: false, error: 'Failed to add note' }
  }
}

// Delete document (admin only)
export async function deleteDocument(documentId: string) {
  try {
    const role = await getUserRole()
    if (role !== 'admin') {
      return { success: false, error: 'Unauthorized - admin role required' }
    }

    await writeClient.delete(documentId)

    revalidatePath('/admin/documents')
    
    return { success: true }
  } catch (error) {
    console.error('Error deleting document:', error)
    return { success: false, error: 'Failed to delete document' }
  }
}
