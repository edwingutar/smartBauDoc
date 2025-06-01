package com.example.backend.security

import io.jsonwebtoken.Jwts
import io.jsonwebtoken.SignatureAlgorithm
import io.jsonwebtoken.security.Keys
import java.util.*
import javax.crypto.SecretKey

object JwtUtil {
    private val secretKey: SecretKey = Keys.hmacShaKeyFor("supergeheimespasswortsupergeheimespasswort".toByteArray()) // Mind. 32 Zeichen!

    fun generateToken(email: String): String {
        val now = Date()
        val expiry = Date(now.time + 1000 * 60 * 60) // 1 Stunde gültig
        return Jwts.builder()
            .setSubject(email)
            .setIssuedAt(now)
            .setExpiration(expiry)
            .signWith(secretKey, SignatureAlgorithm.HS256)
            .compact()
    }

    fun validateToken(token: String): String? {
        return try {
            val claims = Jwts.parserBuilder()
                .setSigningKey(secretKey)
                .build()
                .parseClaimsJws(token)
            claims.body.subject
        } catch (e: Exception) {
            null
        }
    }
}