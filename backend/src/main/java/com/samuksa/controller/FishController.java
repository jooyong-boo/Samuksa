package com.samuksa.controller;

import com.samuksa.dto.fish.info.FishInfo;
import com.samuksa.dto.fish.price.FishPriceRequest;
import com.samuksa.dto.request.fishrecommend.FishRecommendRequest;
import com.samuksa.dto.response.fishrecommend.FishRecommendResponse;
import com.samuksa.service.FishService;
import com.samuksa.service.Responsetest;
import com.samuksa.service.SchedulerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("fish")
public class FishController {

    @Autowired
    FishService fishService;

    @Autowired
    SchedulerService schedulerService;

    @GetMapping("/test")
    public List<FishInfo> test() {
        return fishService.getAllFishInfo();
    }
    @GetMapping("/dummy")
    public FishRecommendResponse getDummy(@RequestParam(name = "person_number") int personNum,@RequestParam(name = "money") int money,@RequestParam(name = "area") String area) {
        FishRecommendRequest fishRecommendRequest = new FishRecommendRequest(personNum, money, area);
        Responsetest responsetest = new Responsetest(fishRecommendRequest);

        return responsetest.get();
    }

    @PostMapping("/price")
    public String postPrice(@RequestBody FishPriceRequest fishPriceRequest) {
        System.out.println(fishPriceRequest.getFishName());
        return fishService.setFishPrice(fishPriceRequest);
    }

    @PostMapping("/data")
    public String postPrice() {
        schedulerService.register();
        return "S";
    }
}
