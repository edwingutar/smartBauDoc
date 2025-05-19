package com.example.backend.model

import com.fasterxml.jackson.annotation.JsonProperty
import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document
import org.springframework.data.mongodb.core.mapping.Field

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

    @get:JsonProperty("street")
    @Field("street")
    val street: String,

    @get:JsonProperty("pCode")
    @Field("pCode")
    val pCode: String,

    @get:JsonProperty("sDate")
    @Field("sDate")
    val sDate: String,

    @get:JsonProperty("dDate")
    @Field("dDate")
    val dDate: String
)