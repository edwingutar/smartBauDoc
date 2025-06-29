package com.example.backend.service

import com.example.backend.model.Weather
import org.springframework.stereotype.Service
import org.springframework.web.client.RestTemplate
import java.time.LocalDateTime
import java.time.format.DateTimeFormatter

@Service
class WeatherService {

    private val restTemplate = RestTemplate()

    fun fetchCurrentWeather(latitude: Double, longitude: Double): Weather {
        val url =
            "https://api.open-meteo.com/v1/forecast?latitude=$latitude&longitude=$longitude&current=temperature_2m,weathercode,windspeed_10m"

        val response = restTemplate.getForObject(url, Map::class.java)

        val current = response?.get("current") as? Map<*, *> ?: throw RuntimeException("No weather data found")

        val temperature = (current["temperature_2m"] as Number).toDouble()
        val windSpeed = (current["windspeed_10m"] as Number).toDouble()
        val weatherCode = (current["weathercode"] as Number).toInt()
        val timeString = current["time"] as String
        val observationTime = LocalDateTime.parse(timeString, DateTimeFormatter.ISO_DATE_TIME)

        return Weather(
            temperature = temperature,
            windSpeed = windSpeed,
            weatherCode = weatherCode,
            observationTime = observationTime
        )
    }
}