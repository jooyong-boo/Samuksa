package com.samuksa.controller;

import com.samuksa.dto.FishInfo;
import com.samuksa.dto.request.fishrecommend.FishRecommendRequest;
import com.samuksa.dto.response.fishrecommend.FishRecommendList;
import com.samuksa.dto.response.fishrecommend.FishRecommendResponse;
import com.samuksa.service.FishService;
import com.samuksa.service.Responsetest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class FishController {

    @Autowired
    FishService fishService;

    @GetMapping("/test")
    public List<FishInfo> test() {
        return fishService.getAllFishInfo();
    }
    @GetMapping("/dummy")
    public FishRecommendResponse getDummy(@RequestParam(name = "person_number") int personNum, @RequestParam(name = "money") int money, @RequestParam(name = "area") String area) {
        FishRecommendRequest fishRecommendRequest = new FishRecommendRequest(personNum, money, area);
        Responsetest responsetest = new Responsetest(fishRecommendRequest);
        FishRecommendResponse fishRecommendResponse = responsetest.get();
        return fishRecommendResponse;
    }
}
