package com.example.backend.controller

import com.example.backend.model.Entry
import com.example.backend.repository.EntryRepository
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/entries")
class EntryController(
    private val entryRepository: EntryRepository
) {

    @GetMapping
    fun getAll(): List<Entry> = entryRepository.findAll()

    @PostMapping
    fun create(@RequestBody entry: Entry): Entry =
        entryRepository.save(entry)

    @GetMapping("/project/{projectId}/category/{categoryId}")
    fun getByProjectAndCategory(
        @PathVariable projectId: String,
        @PathVariable categoryId: String
    ): List<Entry> =
        entryRepository.findByProjectIdAndCategoryId(projectId, categoryId)

    @DeleteMapping("/{id}")
    fun delete(@PathVariable id: String) =
        entryRepository.deleteById(id)
}