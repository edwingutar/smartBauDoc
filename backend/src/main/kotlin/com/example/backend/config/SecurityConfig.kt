package com.example.backend.config

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.web.SecurityFilterChain

@Configuration
class SecurityConfig {

    @Bean
    fun filterChain(http: HttpSecurity): SecurityFilterChain {
        http
            .cors() // <- erlaubt CORS (wenn CorsConfig vorhanden ist)
            .and()
            .csrf().disable() // <- für REST-Entwicklung OK
            .authorizeHttpRequests {
                it.anyRequest().permitAll() // <- alle Endpunkte offen
            }

        return http.build()
    }
}
