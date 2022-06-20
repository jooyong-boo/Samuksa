package com.samuksa.controller;

import com.samuksa.dto.fish.info.FishInfo;
import com.samuksa.dto.fish.price.FishPrice;
import com.samuksa.dto.fish.price.FishPriceRequest;
import com.samuksa.dto.fish.recommend.recommendRequest.FishRecommendRequest;
import com.samuksa.dto.fish.recommend.recommendResponse.FishRecommendResponse;
import com.samuksa.service.FishService;
import com.samuksa.service.Responsetest;
import com.samuksa.service.SchedulerService;
import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("fish")
@Api(tags = {"수산물 API"})
public class FishController {

    @Autowired
    FishService fishService;

    @Autowired
    SchedulerService schedulerService;

    @GetMapping("/info")
    @ApiOperation(value = "모든 수산물 정보 조회", response = FishInfo.class)
    public List<FishInfo> test() {
        return fishService.getAllFishInfo();
    }
    @GetMapping("/dummy")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "area", value = "area", required = true, dataType = "string", paramType = "query", defaultValue = "노량진"),
            @ApiImplicitParam(name = "money", value = "money", required = true, dataType = "int", paramType = "query", defaultValue = "600000"),
            @ApiImplicitParam(name = "person_number", value = "person_number", required = true, dataType = "int", paramType = "query", defaultValue = "12")
    })
    @ApiOperation(value = "테스트용 더미 데이터 조회", response = FishRecommendResponse.class)
    public FishRecommendResponse getDummy(@RequestParam(name = "person_number") int personNum, @RequestParam(name = "money") int money, @RequestParam(name = "area") String area) {
        FishRecommendRequest fishRecommendRequest = new FishRecommendRequest(personNum, money, area);
        Responsetest responsetest = new Responsetest(fishRecommendRequest);

        return responsetest.get();
    }

    @PostMapping("/data")
    @ApiOperation(value = "수산물 시가 API 호출 강제 트리거 (*주의)", response = FishRecommendResponse.class)
    public String postPrice() {
        schedulerService.register();
        return "S";
    }

    @GetMapping("/price/today")
    @ApiOperation(value = "오늘 수산물 시가 조회", response = FishRecommendResponse.class)
    public List<FishPrice> getTodayPrices() {
        return fishService.selectAllTodayFishPrice();
    }

}
