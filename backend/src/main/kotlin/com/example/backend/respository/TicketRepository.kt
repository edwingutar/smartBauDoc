package com.example.backend.repository

import com.example.backend.model.Ticket
import org.springframework.data.mongodb.repository.MongoRepository

interface TicketRepository : MongoRepository<Ticket, String>