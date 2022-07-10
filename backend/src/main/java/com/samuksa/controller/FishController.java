package com.samuksa.controller;

import com.samuksa.dto.fish.info.FishInfo;
import com.samuksa.dto.fish.info.FishInfoResponse;
import com.samuksa.dto.fish.price.FishPrice;
import com.samuksa.dto.fish.recommend.recommendRequest.FishRecommendRequest;
import com.samuksa.dto.fish.recommend.recommendResponse.FishRecommendResponse;
import com.samuksa.service.FishService;
import com.samuksa.service.SchedulerService;
import com.samuksa.service.fishrecommend.FishRecommendService;
import io.swagger.annotations.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("fish")
@Api(tags = {"수산물 API"})
public class FishController {

    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    FishService fishService;

    @Autowired
    SchedulerService schedulerService;

    @GetMapping("/info")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "saleArea", value = "saleArea", required = true, dataType = "string", paramType = "query", example = "노량진"),
    })
    @ApiOperation(value = "모든 수산물 정보를 판매 지역으로 조회", response = FishInfo.class)
    public List<FishInfoResponse> getAllFishInfo(@RequestParam(name = "saleArea") String saleArea) {
        List<FishInfoResponse> result = fishService.getAllFishInfo(saleArea);

        logger.info("getAllFishInfo output >> result: {}", result);
        return fishService.getAllFishInfo(saleArea);
    }

    @GetMapping("/recommend")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "saleArea", value = "saleArea", required = true, dataType = "string", paramType = "query", example = "노량진"),
            @ApiImplicitParam(name = "money", value = "money", required = true, dataType = "int", paramType = "query", example = "100000"),
            @ApiImplicitParam(name = "personNumber", value = "personNumber", required = true, dataType = "int", paramType = "query", example = "3")
    })
    @ApiOperation(value = "수산물을 추천", response = FishRecommendResponse.class)
    public FishRecommendResponse getRecommend(@RequestParam(name = "personNumber") int personNumber, @RequestParam(name = "money") int money, @RequestParam(name = "saleArea") String saleArea) {
        List<FishPrice> fishPrices = fishService.getTodayFishPrice(saleArea);
        FishRecommendRequest fishRecommendRequest = new FishRecommendRequest(personNumber, money, saleArea);
        FishRecommendService fishRecommendService = new FishRecommendService(fishPrices,fishRecommendRequest);
        return fishRecommendService.getFishRecommendResponse();
    }

    @PostMapping("/api")
    @ApiOperation(value = "수산물 시가 API 호출 트리거 (*주의)", response = FishRecommendResponse.class)
    public String postPrice() {
        schedulerService.register();
        return "S";
    }

    @GetMapping("/price/all")
    @ApiOperation(value = "오늘 수산물 시가 전체를 조회", response = FishPrice.class)
    public List<FishPrice> getTodayPrices() {
        List<FishPrice> result = fishService.getAllTodayFishPrice();
        logger.info("getTodayPrices output >> result: {}", result);

        return result;
    }

    @GetMapping("/price/area")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "saleArea", value = "saleArea", required = true, dataType = "string", paramType = "query", example = "노량진"),
    })
    @ApiOperation(value = "오늘 수산물을 시가 판매 지역으로 조회", response = FishPrice.class)
    public List<FishPrice> getTodayFishPrice(@RequestParam(name = "saleArea") String saleArea) {
        List<FishPrice> result = fishService.getTodayFishPrice(saleArea);
        logger.info("getTodayFishPrice output >> result: {}", result);

        return result;
    }

    @GetMapping("/area")
    @ApiOperation(value = "수산물 판매지역 목록을 조회", response = String.class)
    public List<String> getAllSaleArea() {
        List<String> result = fishService.getAllSaleArea();
        logger.info("getAllSaleArea output >> result: {}", result);
        return result;
    }

}
