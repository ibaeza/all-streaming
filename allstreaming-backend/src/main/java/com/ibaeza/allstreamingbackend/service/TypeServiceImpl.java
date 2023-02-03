package com.ibaeza.allstreamingbackend.service;

import com.ibaeza.allstreamingbackend.model.Type;
import com.ibaeza.allstreamingbackend.repository.TypeRespository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TypeServiceImpl implements TypeService{

    @Autowired
    private TypeRespository typeRespository;
    @Override
    public Type saveType(Type type) {
        return typeRespository.save(type);
    }

    @Override
    public List<Type> getAllTypes() {
        return typeRespository.findAll();
    }
}
