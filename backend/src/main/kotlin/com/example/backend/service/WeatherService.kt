package com.example.backend.service

import org.springframework.stereotype.Service
import org.springframework.web.client.RestTemplate
import org.springframework.web.util.UriComponentsBuilder

@Service
class WeatherService {
    fun getWeather(lat: Double, lon: Double, date: String): String {
        val url = UriComponentsBuilder.fromHttpUrl("https://api.open-meteo.com/v1/forecast")
            .queryParam("latitude", lat)
            .queryParam("longitude", lon)
            .queryParam("start_date", date)
            .queryParam("end_date", date)
            .queryParam("hourly", "temperature_2m,precipitation")
            .build()
            .toUriString()

        val restTemplate = RestTemplate()
        return restTemplate.getForObject(url, String::class.java) ?: "{}"
    }
}