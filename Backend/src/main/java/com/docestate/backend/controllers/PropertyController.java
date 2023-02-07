package com.docestate.backend.controllers;

import com.docestate.backend.services.PropertyService;
import com.docestate.backend.models.Property;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/properties")
public class PropertyController {

    private final PropertyService propertyService;

    public PropertyController(PropertyService propertyService) {
        this.propertyService = propertyService;
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping
    public List<Property> findAll() {
        return propertyService.getAllProperties();
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/{id}")
    public Optional<Property> findPropertyById(@PathVariable String id) {
        return propertyService.findById(id);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping
    public Property save(@RequestBody Property property) {
        return propertyService.addProperty(property);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @PutMapping("/{id}")
    public Optional<Property> updateProperty(@PathVariable String id, @RequestBody Property updatedProperty) {
        return propertyService.updatePropertyById(id, updatedProperty);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @DeleteMapping("/{id}")
    public void deletedPropertyById(@PathVariable String id) {
        propertyService.deleteById(id);
    }

}
