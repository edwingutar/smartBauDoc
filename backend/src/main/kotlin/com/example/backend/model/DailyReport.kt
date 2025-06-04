package com.example.backend.model

import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document
import java.time.LocalDate

@Document(collection = "daily_reports")
data class DailyReport(
    @Id
    val id: String? = null,
    val date: LocalDate,
    val projectName: String,
    val projectAddress: String,
    val client: String,
    val creator: String,
    val reportNumber: String,
    val calendarWeek: String,
    val arrival: String,
    val departure: String,
    val companies: List<CompanyEntry>,
    val weather: String,
    val notes: String
)

data class CompanyEntry(
    val name: String,
    val strength: Int,
    val activity: String,
    val images: List<String>
)