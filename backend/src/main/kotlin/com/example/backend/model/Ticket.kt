package com.example.backend.model

import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document

@Document(collection = "tickets")
data class Ticket(
    @Id
    val id: String? = null,
    val shortText: String,
    val type: String,
    val category: String,
    val status: String,
    val description: String,
    val responsible: String,
    val created: String,
    val due: String,
    val done: Boolean = false
)