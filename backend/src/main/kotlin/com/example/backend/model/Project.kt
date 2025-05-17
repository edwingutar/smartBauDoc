package com.example.backend.model

import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document
import java.time.LocalDateTime

@Document("projects")
data class Project(
    val title: String,
    val detail: String,
    val street: String,
    val pCode: String,
    val sDate: String,
    val dDate: String
)