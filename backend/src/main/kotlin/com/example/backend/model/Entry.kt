package com.example.backend.model

import java.time.LocalDateTime

data class Entry(
    val creatorName: String,
    val createdAt: LocalDateTime = LocalDateTime.now(),
    val calendarWeek: Int? = null,
    val arrivalTime: String,
    val departureTime: String,
    val companyName: String,
    val onSitePersonnelCount: Int,
    val taskDescription: String,
    val notes: String,
    val weather: Weather,
    val image: Image
)