package com.example.backend.controller

import com.example.backend.service.WeatherService
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.databind.SerializationFeature


@RestController
class WeatherController(
    private val weatherService: WeatherService
) {
    @GetMapping("/api/weather")
    fun getWeather(
        @RequestParam lat: Double,
        @RequestParam lon: Double,
        @RequestParam date: String
    ): String {
         val rawJson = weatherService.getWeather(lat, lon, date)
        val mapper = ObjectMapper().enable(SerializationFeature.INDENT_OUTPUT)
        val jsonNode = mapper.readTree(rawJson)
        return mapper.writerWithDefaultPrettyPrinter().writeValueAsString(jsonNode)
    }
}