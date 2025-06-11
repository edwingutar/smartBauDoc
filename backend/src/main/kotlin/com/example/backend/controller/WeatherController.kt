package com.example.backend.controller

import com.example.backend.model.Weather
import com.example.backend.service.WeatherService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/weather")
class WeatherController(
    private val weatherService: WeatherService
) {

    @GetMapping
    fun getWeather(
        @RequestParam lat: Double,
        @RequestParam lon: Double
    ): ResponseEntity<Weather> {
        return try {
            val weather = weatherService.fetchCurrentWeather(lat, lon)
            ResponseEntity.ok(weather)
        } catch (ex: Exception) {
            println("Wetter-Fehler: ${ex.message}")
            ResponseEntity.status(502).build()
        }
    }
}