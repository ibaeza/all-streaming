package com.ibaeza.allstreamingbackend.controller;

import com.ibaeza.allstreamingbackend.model.Type;
import com.ibaeza.allstreamingbackend.service.TypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/type")
@CrossOrigin("http://localhost:3000")
public class TypeController {

    @Autowired
    private TypeService typeService;

    @PostMapping("/save")
    public String save(@RequestBody Type type ){
        typeService.saveType(type);
        return "Type of account successfully created";
    }

    @GetMapping("/getAll")
    public List<Type> getAll(){
        return typeService.getAllTypes();
    }
}
