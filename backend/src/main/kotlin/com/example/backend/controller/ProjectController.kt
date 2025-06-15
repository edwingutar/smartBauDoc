package com.example.backend.controller

import com.example.backend.dto.EntryInput
import com.example.backend.model.Entry
import com.example.backend.model.Project
import com.example.backend.repository.ProjectRepository
import com.example.backend.service.WeatherService
import com.example.backend.security.JwtUtil
import jakarta.servlet.http.HttpServletRequest
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.time.LocalDateTime

@RestController
@RequestMapping("/api/projects")
class ProjectController(
    private val projectRepository: ProjectRepository,
    private val weatherService: WeatherService
) {

    @GetMapping
    fun getAllProjects(request: HttpServletRequest): List<Project> {
        val header = request.getHeader("Authorization")
        val token = header?.removePrefix("Bearer ")?.trim()
        val claims = token?.let { JwtUtil.validateToken(it) }
        val userEmail = claims?.get("email", String::class.java) ?: return emptyList()
        return projectRepository.findAll().filter { it.viewers.contains(userEmail) }
    }

    @PostMapping
    fun createProject(
        request: HttpServletRequest,
        @RequestBody project: Project
    ): ResponseEntity<Project> {
        val header = request.getHeader("Authorization")
        val token = header?.removePrefix("Bearer ")?.trim()
        val claims = token?.let { JwtUtil.validateToken(it) }
        val userEmail = claims?.get("email", String::class.java) ?: return ResponseEntity.status(401).build()
        val newProject = project.copy(
            viewers = (project.viewers + userEmail).distinct()
        )
        val saved = projectRepository.save(newProject)
        return ResponseEntity.ok(saved)
    }

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

    @PostMapping("{projectId}/add-viewer")
    fun addViewer(
        @PathVariable projectId: String,
        @RequestBody body: Map<String, String>
    ): ResponseEntity<Void> {
        println("addViewer aufgerufen für projectId=$projectId, body=$body")
        val email = body["email"] ?: return ResponseEntity.badRequest().build()
        println("E-Mail extrahiert: $email")
        val project = projectRepository.findById(projectId).orElse(null)
            ?: return ResponseEntity.notFound().build()
        println("Projekt gefunden: ${project.id}")
        if (!project.viewers.contains(email)) {
            val updatedViewers = project.viewers + email
            val updatedProject = project.copy(viewers = updatedViewers)
            projectRepository.save(updatedProject)
            println("Viewer hinzugefügt und Projekt gespeichert.")
        } else {
            println("Viewer bereits vorhanden.")
        }
        return ResponseEntity.ok().build()
    }
}