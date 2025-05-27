package com.example.backend.controller

import com.example.backend.model.Project
import com.example.backend.repository.ProjectRepository
import org.springframework.web.bind.annotation.*
import com.example.backend.model.Entry

@RestController
@RequestMapping("/api/projects")
class ProjectController(
    private val projectRepository: ProjectRepository
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
        @RequestBody entry: Entry
    ): Project? {
        val project = projectRepository.findById(id).orElse(null) ?: return null
        val updatedProject = project.copy(entries = project.entries + entry)
        return projectRepository.save(updatedProject)
    }

    @GetMapping("/{id}/entries")
    fun getEntriesForProject(@PathVariable id: String): List<Entry>? {
        return projectRepository.findById(id).orElse(null)?.entries
    }
}