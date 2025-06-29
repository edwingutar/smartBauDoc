package com.example.backend.model

import com.fasterxml.jackson.annotation.JsonProperty
import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document
import org.springframework.data.mongodb.core.mapping.Field
import java.time.LocalDate

@Document("projects")
data class Project(
    @Id
    val id: String? = null,

    @get:JsonProperty("title")
    @Field("title")
    val title: String,

    @get:JsonProperty("detail")
    @Field("detail")
    val detail: String,

    @get:JsonProperty("ansprechpartner")
    @Field("ansprechpartner")
    val ansprechpartner: String,

    @get:JsonProperty("street")
    @Field("street")
    val street: String,

    @get:JsonProperty("pCode")
    @Field("pCode")
    val pCode: String,

    @get:JsonProperty("sDate")
    @Field("sDate")
    val sDate: LocalDate,

    @get:JsonProperty("dDate")
    @Field("dDate")
    val dDate: LocalDate,

    @get:JsonProperty("entries")
    @Field("entries")
    val entries: List<Entry> = listOf(),

    @get:JsonProperty("viewers")
    @Field("viewers")
    val viewers: List<String> = listOf(),

    @get:JsonProperty("dailyReports")
    @Field("dailyReports")
    val dailyReports: List<DailyReport> = listOf(),
    
    @get:JsonProperty("tickets")
    @Field("tickets")
    val tickets: List<Ticket> = listOf()
)