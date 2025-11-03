'use client'

import { useState } from 'react'
import { Download, Loader2 } from 'lucide-react'
import { jsPDF } from 'jspdf'
import html2canvas from 'html2canvas'

interface PDFExportButtonProps {
  /** The page title for the PDF filename */
  pageTitle: string
  /** Optional className for custom styling */
  className?: string
}

export function PDFExportButton({ pageTitle, className = '' }: PDFExportButtonProps) {
  const [isGenerating, setIsGenerating] = useState(false)

  const handleExportPDF = async () => {
    setIsGenerating(true)

    try {
      // Get the main content element to export
      const element = document.body

      // Hide elements that shouldn't be in the PDF (header, footer, buttons)
      const elementsToHide = [
        ...document.querySelectorAll('header, nav, footer, button'),
      ]
      
      elementsToHide.forEach((el) => {
        (el as HTMLElement).style.display = 'none'
      })

      // Generate canvas from the HTML element
      const canvas = await html2canvas(element, {
        scale: 2, // Higher quality
        useCORS: true,
        logging: false,
        windowWidth: 1200, // Set consistent width
        onclone: (clonedDoc) => {
          // Ensure proper styling in the cloned document
          const clonedBody = clonedDoc.body
          clonedBody.style.width = '1200px'
          clonedBody.style.padding = '40px'
        },
      })

      // Restore hidden elements
      elementsToHide.forEach((el) => {
        (el as HTMLElement).style.display = ''
      })

      // Create PDF
      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      })

      const imgWidth = 210 // A4 width in mm
      const pageHeight = 297 // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width
      let heightLeft = imgHeight
      let position = 0

      // Add first page
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
      heightLeft -= pageHeight

      // Add more pages if content is longer than one page
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight
        pdf.addPage()
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
        heightLeft -= pageHeight
      }

      // Generate filename
      const filename = `${pageTitle.toLowerCase().replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.pdf`

      // Save the PDF
      pdf.save(filename)
    } catch (error) {
      console.error('Error generating PDF:', error)
      alert('Une erreur est survenue lors de la génération du PDF. Veuillez réessayer.')
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <button
      onClick={handleExportPDF}
      disabled={isGenerating}
      className={`
        inline-flex items-center gap-2 px-6 py-3 rounded-xl
        bg-black text-white
        font-semibold text-sm
        hover:bg-gray-800
        focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2
        disabled:opacity-60 disabled:cursor-not-allowed
        transition-all duration-300 shadow-lg hover:shadow-xl
        ${className}
      `}
      aria-label={`Télécharger ${pageTitle} en PDF`}
    >
      {isGenerating ? (
        <>
          <Loader2 className="w-5 h-5 animate-spin" />
          Génération en cours...
        </>
      ) : (
        <>
          <Download className="w-5 h-5" />
          Télécharger en PDF
        </>
      )}
    </button>
  )
}
