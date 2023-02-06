package com.docestate.backend.services;
import com.docestate.backend.repositories.PropertyRepository;
import com.docestate.backend.models.Property;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PropertyService {

    private final PropertyRepository propertyRepository;

    public PropertyService(PropertyRepository propertyRepository) {
        this.propertyRepository = propertyRepository;
    }

    public List<Property> getAllProperties() {
        return propertyRepository.findAll();
    }

    public Property addProperty(Property property) {
        return propertyRepository.save(property);
    }

    public Optional<Property> findById(String id) {
        return propertyRepository.findById(id);
    }

    public Optional<Property> updatePropertyById(String id, Property updatedProperty) {
        return propertyRepository.findById(id)
                .map(existingProperty -> {
                    existingProperty.setDescription(updatedProperty.getDescription());
                    existingProperty.setAddress(updatedProperty.getAddress());
                    return propertyRepository.save(existingProperty);
                });
    }

    public void deleteById(String id) {
        propertyRepository.deleteById(id);
    }
}
