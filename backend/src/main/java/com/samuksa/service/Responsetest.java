package com.samuksa.service;

import com.samuksa.dto.fish.recommend.recommendRequest.FishRecommendRequest;
import com.samuksa.dto.fish.recommend.recommendResponse.FishRecommendCombination;
import com.samuksa.dto.fish.recommend.recommendResponse.FishRecommendInfo;
import com.samuksa.dto.fish.recommend.recommendResponse.FishRecommendResponse;
import com.samuksa.dto.fish.recommend.recommendService.FishRecommendBtDto;
import com.samuksa.service.fishrecommend.FishRecommendService;

import java.util.ArrayList;
import java.util.List;

public class Responsetest {
    private FishRecommendRequest fishRecommendRequest;

    public Responsetest(FishRecommendRequest fishRecommendRequest) {
        this.fishRecommendRequest = fishRecommendRequest;
    }

    public FishRecommendResponse get()
    {
        FishRecommendInfo fishRecommendInfo1 = new FishRecommendInfo("광어", "노량진", "제주","자연", "중", 20000,1000,2000,0);
        FishRecommendInfo fishRecommendInfo2 = new FishRecommendInfo("연어", "노량진", "국산","양식", "대", 30000,2000,3000,0);
        FishRecommendInfo fishRecommendInfo3 = new FishRecommendInfo("숭어", "노량진", "해외","양식", "특대", 40000,3000,4000,0);
        FishRecommendBtDto fishRecommendBtDto1 = new FishRecommendBtDto(0, 35, 0,fishRecommendInfo1);
        FishRecommendBtDto fishRecommendBtDto2 = new FishRecommendBtDto(0, 40, 0,fishRecommendInfo2);
        FishRecommendBtDto fishRecommendBtDto3 = new FishRecommendBtDto(0, 20, 0,fishRecommendInfo3);
        List<FishRecommendBtDto> fishRecommendBtDtos = new ArrayList<>();
        fishRecommendBtDtos.add(fishRecommendBtDto1);
        fishRecommendBtDtos.add(fishRecommendBtDto2);
        fishRecommendBtDtos.add(fishRecommendBtDto3);
        FishRecommendService fishRecommendService = new FishRecommendService(fishRecommendRequest,fishRecommendBtDtos);

        return fishRecommendService.getFishRecommendResponse();
    }

}
