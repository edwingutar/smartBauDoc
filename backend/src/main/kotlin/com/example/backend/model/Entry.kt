package com.example.backend.model

import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document
import java.time.LocalDateTime

@Document("entries")
data class Entry(
    @Id val id: String? = null,
    val title: String,
    val content: String,
    val imageFileName: String? = null,
    val projectId: String,
    val categoryId: String,
    val createdAt: LocalDateTime = LocalDateTime.now()
)