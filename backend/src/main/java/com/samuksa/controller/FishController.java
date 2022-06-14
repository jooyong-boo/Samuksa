package com.samuksa.controller;

import com.samuksa.dto.FishInfo;
import com.samuksa.service.FishService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class FishController {

    @Autowired
    FishService fishService;

    @GetMapping("/test")
    public FishInfo test() {
        return fishService.getAllFishInfo();
    }

}
