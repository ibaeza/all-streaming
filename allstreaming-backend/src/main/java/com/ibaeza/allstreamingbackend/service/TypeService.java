package com.ibaeza.allstreamingbackend.service;

import com.ibaeza.allstreamingbackend.model.Type;

import java.util.List;


public interface TypeService {

    public Type saveType(Type type);
    public List<Type> getAllTypes();

}
