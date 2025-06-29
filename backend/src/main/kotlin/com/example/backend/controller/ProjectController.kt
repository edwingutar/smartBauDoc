package com.example.backend.controller

import com.example.backend.dto.EntryInput
import com.example.backend.model.Entry
import com.example.backend.model.Project
import com.example.backend.repository.ProjectRepository
import com.example.backend.service.WeatherService
import com.example.backend.security.JwtUtil
import com.example.backend.model.Ticket
import com.example.backend.model.DailyReport
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

    //----------Anbindung Tickets----------
    //Tickets abrufen
        @GetMapping("/{id}/tickets")
    fun getTicketsForProject(@PathVariable id: String): List<Ticket> {
        val project = projectRepository.findById(id).orElse(null) ?: return emptyList()
        return project.tickets
    }

    //Ticket hinzufügen

    @PostMapping("/{id}/tickets")
    fun addTicketToProject(
        @PathVariable id: String,
        @RequestBody ticket: Ticket
    ): ResponseEntity<Ticket> {
        val project = projectRepository.findById(id).orElse(null)
            ?: return ResponseEntity.notFound().build()
        val newTicket = ticket.copy(id = java.util.UUID.randomUUID().toString())
        val updatedProject = project.copy(tickets = project.tickets + newTicket)
        projectRepository.save(updatedProject)
        return ResponseEntity.ok(newTicket)
    }

    //Ticket Erledigt markieren
    @PutMapping("/{projectId}/tickets/{ticketId}/done")
    fun markProjectTicketDone(
        @PathVariable projectId: String,
        @PathVariable ticketId: String
    ): ResponseEntity<Project> {
        val project = projectRepository.findById(projectId).orElse(null) ?: return ResponseEntity.notFound().build()
        val updatedTickets = project.tickets.map {
            if (it.id == ticketId) it.copy(done = true, status = "Erledigt") else it
        }
        val updatedProject = project.copy(tickets = updatedTickets)
        projectRepository.save(updatedProject)
        return ResponseEntity.ok(updatedProject)
    }

    //Ticket Unerledigt markieren

    @PutMapping("/{projectId}/tickets/{ticketId}/undone")
    fun markProjectTicketUndone(
        @PathVariable projectId: String,
        @PathVariable ticketId: String
    ): ResponseEntity<Project> {
        val project = projectRepository.findById(projectId).orElse(null) ?: return ResponseEntity.notFound().build()
        val updatedTickets = project.tickets.map {
            if (it.id == ticketId) it.copy(done = false, status = "Offen") else it
        }
        val updatedProject = project.copy(tickets = updatedTickets)
        projectRepository.save(updatedProject)
        return ResponseEntity.ok(updatedProject)
    }

    //Ticket löschen
    @DeleteMapping("/{projectId}/tickets/{ticketId}")
    fun deleteProjectTicket(
        @PathVariable projectId: String,
        @PathVariable ticketId: String
    ): ResponseEntity<Project> {
        val project = projectRepository.findById(projectId).orElse(null) ?: return ResponseEntity.notFound().build()
        val updatedTickets = project.tickets.filterNot { it.id == ticketId }
        val updatedProject = project.copy(tickets = updatedTickets)
        projectRepository.save(updatedProject)
        return ResponseEntity.ok(updatedProject)
    }

    //----------Anbindung Tagebuch----------

    // Alle Reports eines Projekts abrufen
    @GetMapping("/{id}/daily-reports")
    fun getDailyReportsForProject(@PathVariable id: String): List<DailyReport> {
        val project = projectRepository.findById(id).orElse(null) ?: return emptyList()
        return project.dailyReports
    }

    // Einen Report zu einem Projekt hinzufügen
    @PostMapping("/{id}/daily-reports")
    fun addDailyReportToProject(
        @PathVariable id: String,
        @RequestBody report: DailyReport
    ): ResponseEntity<DailyReport> {
        val project = projectRepository.findById(id).orElse(null)
            ?: return ResponseEntity.notFound().build()
        val newReport = report.copy(id = java.util.UUID.randomUUID().toString())
        val updatedProject = project.copy(dailyReports = project.dailyReports + newReport)
        projectRepository.save(updatedProject)
        return ResponseEntity.ok(newReport)
    }

    // Einen bestimmten Report eines Projekts abrufen
    @GetMapping("/{projectId}/daily-reports/{reportId}")
    fun getDailyReportById(
        @PathVariable projectId: String,
        @PathVariable reportId: String
    ): ResponseEntity<DailyReport> {
        val project = projectRepository.findById(projectId).orElse(null)
            ?: return ResponseEntity.notFound().build()
        val report = project.dailyReports.find { it.id == reportId }
            ?: return ResponseEntity.notFound().build()
        return ResponseEntity.ok(report)
    }

    // Einen Report aus einem Projekt löschen
    @DeleteMapping("/{projectId}/daily-reports/{reportId}")
    fun deleteDailyReportFromProject(
        @PathVariable projectId: String,
        @PathVariable reportId: String
    ): ResponseEntity<Project> {
        val project = projectRepository.findById(projectId).orElse(null)
            ?: return ResponseEntity.notFound().build()
        val updatedReports = project.dailyReports.filterNot { it.id == reportId }
        val updatedProject = project.copy(dailyReports = updatedReports)
        projectRepository.save(updatedProject)
        return ResponseEntity.ok(updatedProject)
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