package com.example.backend.controller

import com.example.backend.model.Category
import com.example.backend.repository.CategoryRepository
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/categories")
class CategoryController(
    private val categoryRepository: CategoryRepository
) {

    @GetMapping
    fun getAll(): List<Category> = categoryRepository.findAll()

    @PostMapping
    fun create(@RequestBody category: Category): Category =
        categoryRepository.save(category)

    @GetMapping("/project/{projectId}")
    fun getByProjectId(@PathVariable projectId: String): List<Category> =
        categoryRepository.findByProjectId(projectId)

    @DeleteMapping("/{id}")
    fun delete(@PathVariable id: String) =
        categoryRepository.deleteById(id)
}