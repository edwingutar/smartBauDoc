package com.example.backend.controller

import com.example.backend.model.Image
import org.springframework.http.MediaType
import org.springframework.web.bind.annotation.*
import org.springframework.web.multipart.MultipartFile
import java.nio.file.Files
import java.nio.file.Paths
import java.nio.file.StandardCopyOption
import java.util.*

@RestController
@RequestMapping("/api/images")
class ImageUploadController {

    private val uploadDir = Paths.get("/uploads/images")

    @PostMapping(consumes = [MediaType.MULTIPART_FORM_DATA_VALUE])
    fun uploadImage(@RequestParam("file") file: MultipartFile): Image {
        // 1. Sicherstellen, dass das Upload-Verzeichnis existiert
        Files.createDirectories(uploadDir)

        // 2. Dateinamen erzeugen
        val originalFilename = file.originalFilename ?: "image"
        val extension = originalFilename.substringAfterLast('.', "")
        val uniqueFileName = "${UUID.randomUUID()}.$extension"

        // 3. Datei speichern
        val targetPath = uploadDir.resolve(uniqueFileName)
        Files.copy(file.inputStream, targetPath, StandardCopyOption.REPLACE_EXISTING)

        // 4. URL zurückgeben
        val fileUrl = "/uploads/images/$uniqueFileName"

        return Image(
            fileName = uniqueFileName,
            url = fileUrl,
            description = null
        )
    }
}