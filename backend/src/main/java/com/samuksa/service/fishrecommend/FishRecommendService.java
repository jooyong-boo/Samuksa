package com.samuksa.service.fishrecommend;

import com.samuksa.dto.fish.price.FishPrice;
import com.samuksa.dto.fish.recommend.recommendEntity.FishRecommendAlgoNeed;
import com.samuksa.dto.fish.recommend.recommendEntity.FishRecommendResponseFlagImp;
import com.samuksa.dto.fish.recommend.recommendRequest.FishRecommendRequest;
import com.samuksa.dto.fish.recommend.recommendResponse.FishRecommendCombination;
import com.samuksa.dto.fish.recommend.recommendResponse.FishRecommendInfo;
import com.samuksa.dto.fish.recommend.recommendResponse.FishRecommendResponse;
import com.samuksa.dto.fish.recommend.recommendResponse.FishRecommendUnion;
import com.samuksa.dto.fish.recommend.recommendEntity.FishRecommendBtDto;
import com.samuksa.entity.fish.recommend.FishRecommendAlgo;
import com.samuksa.entity.fish.recommend.FishRecommendFlagToResponse;
import com.samuksa.entity.fish.recommend.FishRecommendRequestToAlgoNeed;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;


public class FishRecommendService {

    private List<FishPrice> fishPrices;

    private FishRecommendRequest fishRecommendRequest;

    private FishRecommendResponse fishRecommendResponse;

    public FishRecommendService(List<FishPrice> fishPrices, FishRecommendRequest fishRecommendRequest) {
        this.fishPrices = fishPrices;
        this.fishRecommendRequest = fishRecommendRequest;
    }

    public FishRecommendResponse getFishRecommendResponse() {
        FishRecommendRequestToAlgoNeed fishRecommendRequestToAlgoNeed;
        FishRecommendAlgoNeed fishRecommendAlgoNeed;
        FishRecommendAlgo fishRecommendAlgo;
        List<List<FishRecommendResponseFlagImp>> fishRecommendResponseFlagImpsList;
        FishRecommendFlagToResponse fishRecommendFlagToResponse;

        fishRecommendRequestToAlgoNeed = new FishRecommendRequestToAlgoNeed(fishRecommendRequest, fishPrices);
        fishRecommendAlgoNeed = fishRecommendRequestToAlgoNeed.getFishRecommendAlgoNeed();

        fishRecommendAlgo = new FishRecommendAlgo(fishRecommendAlgoNeed);
        fishRecommendResponseFlagImpsList = fishRecommendAlgo.getFishRecommendResponseFlagImpsList();

        fishRecommendFlagToResponse = new FishRecommendFlagToResponse(fishRecommendResponseFlagImpsList, fishPrices);
        this.fishRecommendResponse = fishRecommendFlagToResponse.getFishRecommendResponse();

        return fishRecommendResponse;
    }
}
