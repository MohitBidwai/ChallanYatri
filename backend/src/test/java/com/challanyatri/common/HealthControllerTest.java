package com.challanyatri.common;

import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

class HealthControllerTest {

    @Test
    void returnsBackendHealth() throws Exception {
        var response = new HealthController().health();

        assertThat(response.getStatusCode().is2xxSuccessful()).isTrue();
        assertThat(response.getBody())
                .hasFieldOrPropertyWithValue("status", "UP")
                .hasFieldOrPropertyWithValue("service", "challanyatri-backend");
    }
}
