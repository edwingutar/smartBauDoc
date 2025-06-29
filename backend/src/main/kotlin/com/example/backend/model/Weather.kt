package com.example.backend.model

import java.time.LocalDateTime

data class Weather(
    val temperature: Double,
    val windSpeed: Double,
    val weatherCode: Int,
    val observationTime: LocalDateTime
)