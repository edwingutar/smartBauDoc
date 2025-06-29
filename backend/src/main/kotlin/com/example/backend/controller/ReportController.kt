package com.example.backend.controller

import com.example.backend.model.DailyReport
import com.example.backend.repository.DailyReportRepository
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/daily-reports")
class DailyReportController(
    private val dailyReportRepository: DailyReportRepository
) {

    @GetMapping
    fun getAllReports(): List<DailyReport> = dailyReportRepository.findAll()

    @PostMapping
    fun createReport(@RequestBody report: DailyReport): DailyReport =
        dailyReportRepository.save(report)

    @GetMapping("/{id}")
    fun getReportById(@PathVariable id: String): DailyReport? =
        dailyReportRepository.findById(id).orElse(null)

    @DeleteMapping("/{id}")
    fun deleteReport(@PathVariable id: String) =
        dailyReportRepository.deleteById(id)
}