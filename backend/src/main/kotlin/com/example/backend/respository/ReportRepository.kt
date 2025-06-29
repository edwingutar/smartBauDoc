package com.example.backend.repository

import com.example.backend.model.DailyReport
import org.springframework.data.mongodb.repository.MongoRepository

interface DailyReportRepository : MongoRepository<DailyReport, String>