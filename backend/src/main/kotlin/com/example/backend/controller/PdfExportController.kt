package com.example.backend.controller

import com.example.backend.service.PdfExportService
import org.springframework.http.HttpHeaders
import org.springframework.http.MediaType
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/export")
class PdfExportController(
    private val pdfExportService: PdfExportService
) {
    @GetMapping("/pdf")
    fun exportPdf(): ResponseEntity<ByteArray> {
        val pdfBytes = pdfExportService.createSimplePdf()
        return ResponseEntity.ok()
            .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=export.pdf")
            .contentType(MediaType.APPLICATION_PDF)
            .body(pdfBytes)
    }
}
