package com.example.backend.controller

import com.example.backend.dto.EntryInput
import com.example.backend.model.Entry
import com.example.backend.model.Project
import com.example.backend.repository.ProjectRepository
import com.example.backend.service.WeatherService
import org.springframework.web.bind.annotation.*
import java.time.LocalDateTime

@RestController
@RequestMapping("/api/projects")
class ProjectController(
    private val projectRepository: ProjectRepository,
    private val weatherService: WeatherService
) {

    @GetMapping
    fun getAllProjects(): List<Project> = projectRepository.findAll()

    @PostMapping
    fun createProject(@RequestBody project: Project): Project =
        projectRepository.save(project)

    @GetMapping("/{id}")
    fun getProjectById(@PathVariable id: String): Project? =
        projectRepository.findById(id).orElse(null)

    @DeleteMapping("/{id}")
    fun deleteProject(@PathVariable id: String) =
        projectRepository.deleteById(id)

    @PatchMapping("/{id}/entries")
    fun addEntryToProject(
        @PathVariable id: String,
        @RequestBody entryInput: EntryInput
    ): Project? {
        val project = projectRepository.findById(id).orElse(null) ?: return null

        val weather = weatherService.fetchCurrentWeather(entryInput.latitude, entryInput.longitude)

        val entry = Entry(
            creatorName = entryInput.creatorName,
            createdAt = LocalDateTime.now(),
            calendarWeek = entryInput.calendarWeek,
            companyName = entryInput.companyName,
            onSitePersonnelCount = entryInput.onSitePersonnelCount,
            taskDescription = entryInput.taskDescription,
            notes = entryInput.notes,
            image = entryInput.image,
            weather = weather
        )

        val updatedProject = project.copy(entries = project.entries + entry)
        return projectRepository.save(updatedProject)
    }

    @GetMapping("/{id}/entries")
    fun getEntriesForProject(@PathVariable id: String): List<Entry>? {
        return projectRepository.findById(id).orElse(null)?.entries
    }
}