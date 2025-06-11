package com.example.backend.controller


import com.example.backend.model.Ticket

import com.example.backend.repository.TicketRepository

import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/tickets")
class TicketController(
    private val ticketRepository: TicketRepository
) {

    @GetMapping
    fun getAllTickets(): List<Ticket> = ticketRepository.findAll()

    @PostMapping
    fun createTicket(@RequestBody ticket: Ticket): Ticket =
        ticketRepository.save(ticket)

    @GetMapping("/{id}")
    fun getTicketById(@PathVariable id: String): Ticket? =
        ticketRepository.findById(id).orElse(null)

    @DeleteMapping("/{id}")
    fun deleteTicket(@PathVariable id: String) =
        ticketRepository.deleteById(id)
}