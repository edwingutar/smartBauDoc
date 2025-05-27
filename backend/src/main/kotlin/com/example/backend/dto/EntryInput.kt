package com.example.backend.dto

import com.example.backend.model.Image

data class EntryInput(
    val creatorName: String,
    val calendarWeek: Int? = null,
    val arrivalTime: String,
    val departureTime: String,
    val companyName: String,
    val onSitePersonnelCount: Int,
    val taskDescription: String,
    val notes: String,
    val image: Image,
    val latitude: Double,
    val longitude: Double
)