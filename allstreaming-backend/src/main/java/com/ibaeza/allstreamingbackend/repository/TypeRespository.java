package com.ibaeza.allstreamingbackend.repository;

import com.ibaeza.allstreamingbackend.model.Type;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TypeRespository extends JpaRepository<Type, Integer> {
}
