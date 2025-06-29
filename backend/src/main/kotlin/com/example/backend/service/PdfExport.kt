package com.example.backend.service

import org.apache.pdfbox.pdmodel.PDDocument
import org.apache.pdfbox.pdmodel.PDPage
import org.apache.pdfbox.pdmodel.PDPageContentStream
import org.apache.pdfbox.pdmodel.font.PDType1Font
import org.springframework.stereotype.Service
import java.io.ByteArrayOutputStream

@Service
class PdfExportService {
    fun createSimplePdf(): ByteArray {
        val document = PDDocument()
        val page = PDPage()
        document.addPage(page)
        

        val contentStream = PDPageContentStream(document, page)
        contentStream.beginText()
        contentStream.setFont(PDType1Font.HELVETICA_BOLD, 18f)
        contentStream.newLineAtOffset(100f, 700f)
        contentStream.showText("Hallo aus PDFBox!")
        contentStream.endText()
        contentStream.close()

        val out = ByteArrayOutputStream()
        document.save(out)
        document.close()
        return out.toByteArray()
    }
}
