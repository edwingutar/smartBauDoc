package com.example.backend.controller

import org.springframework.http.ResponseEntity

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

    @PutMapping("/{id}/done")
    fun markTicketDone(@PathVariable id: String): ResponseEntity<Void> {
        val ticketOpt = ticketRepository.findById(id)
        return if (ticketOpt.isPresent) {
            val ticket = ticketOpt.get()
            val updatedTicket = ticket.copy(
                done = true,
                status = "Erledigt" 
            )
            ticketRepository.save(updatedTicket)
            ResponseEntity.ok().build()
        } else {
            ResponseEntity.notFound().build()
        }
    }
}