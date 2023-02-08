package com.docestate.backend;

import com.docestate.backend.models.Address;
import com.docestate.backend.models.Property;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpStatus;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class ApiRoutesTest {

    @Value(value="${local.server.port}")
    private int port;

    private final Property prop1 = new Property("Unit Test Property",
            new Address(
                    "Unit Test Street",
                    "42",
                    "Testingen",
                    "TEST",
                    "T6"
            )
    );
    private final Property prop2 = new Property("Unit Test Property",
            new Address(
                    "Unit Test Street",
                    "42",
                    "UPDATED",
                    "TEST",
                    "T6"
            )
    );

    @Autowired
    private TestRestTemplate restTemplate;

    @Test
    public void getShouldNotReturnAnythingWithoutAuthHeader() throws Exception {
        assertThat(this.restTemplate.getForObject("http://localhost:" + port + "/", Property.class)).isNull();
    }

    @Test
    public void getAllPropertiesWithAuthentication() throws Exception {
        assertThat(this.restTemplate.withBasicAuth("Frontend", "PatheticAuthentication")
                .getForEntity("http://localhost:" + port + "/api/v1/properties", Property[].class)
                .getStatusCode()).isEqualTo(HttpStatus.OK);
    }

    @Test
    public void postUpdateCheckAndDeleteNewPropertyById() throws Exception {
        Property fetchedProperty = this.restTemplate.withBasicAuth("Frontend", "PatheticAuthentication")
                .postForEntity("http://localhost:" + port + "/api/v1/properties", this.prop1, Property.class)
                .getBody();

        assertThat(fetchedProperty.getDescription()).isEqualTo(this.prop1.getDescription());

        this.restTemplate.withBasicAuth("Frontend", "PatheticAuthentication")
                .put("http://localhost:" + port + "/api/v1/properties/"+ fetchedProperty.getId(), this.prop2);

        Property updatedProp = this.restTemplate.withBasicAuth("Frontend", "PatheticAuthentication")
                .getForEntity("http://localhost:" + port + "/api/v1/properties/"+ fetchedProperty.getId(), Property.class)
                .getBody();

        assertThat(updatedProp.getAddress().getCity()).isEqualTo(this.prop2.getAddress().getCity());

        this.restTemplate.withBasicAuth("Frontend", "PatheticAuthentication")
                .delete("http://localhost:" + port + "/api/v1/properties/"+ fetchedProperty.getId());

        assertThat(this.restTemplate.withBasicAuth("Frontend", "PatheticAuthentication")
                .getForObject("http://localhost:" + port + "/api/v1/properties/"+ fetchedProperty.getId(), Property.class)).isNull();
    }
}
