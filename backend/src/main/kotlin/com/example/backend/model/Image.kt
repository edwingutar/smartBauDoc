package com.example.backend.model

data class Image(
    val fileName: String,
    val url: String,
    val description: String? = null
)