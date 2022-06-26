package com.samuksa.entity.fish.recommend;

import com.samuksa.dto.fish.price.FishPrice;
import com.samuksa.dto.fish.recommend.recommendEntity.FishRecommendAlgoNeed;
import com.samuksa.dto.fish.recommend.recommendEntity.FishRecommendBtDto;
import com.samuksa.dto.fish.recommend.recommendRequest.FishRecommendRequest;

import java.util.ArrayList;
import java.util.List;

public class FishRecommendRequestToAlgoNeed {
    private FishRecommendRequest fishRecommendRequest;

    private List<FishPrice> fishPrices;

    private FishRecommendAlgoNeed fishRecommendAlgoNeed;

    public FishRecommendRequestToAlgoNeed(FishRecommendRequest fishRecommendRequest, List<FishPrice> fishPrices) {
        this.fishRecommendRequest = fishRecommendRequest;
        this.fishPrices = fishPrices;
    }

    public FishRecommendAlgoNeed getFishRecommendAlgoNeed() {
        List<FishRecommendBtDto> fishRecommendBtDtos = new ArrayList<>();
        FishRecommendBtDto fishRecommendBtDto;
        int num = 0;
        int filletWeight = 0;
        int filletPrice = 0;

        for (FishPrice fishPrice : fishPrices)
        {
            if (fishPrice.getMinWeight() == 0)
                filletWeight = fishPrice.getMaxWeight();
            else if (fishPrice.getMaxWeight() == 0)
                filletWeight = fishPrice.getMinWeight();
            else
                filletWeight = (fishPrice.getMaxWeight() + fishPrice.getMinWeight()) / 2;
            filletPrice = (fishPrice.getPrice() / 1000 ) * filletWeight + 5000; //5000 = fishServingMoney
            filletWeight = filletWeight / 100 * fishPrice.getYield();
            fishRecommendBtDto = new FishRecommendBtDto(num++ ,filletPrice , fishPrice.getYield(), 0, filletWeight);
            fishRecommendBtDtos.add(fishRecommendBtDto);
        }

        int totalServingWeight = fishRecommendRequest.getPersonNum() * 250;
        fishRecommendAlgoNeed = new FishRecommendAlgoNeed(fishRecommendBtDtos, totalServingWeight, fishRecommendRequest.getMoney());
        return fishRecommendAlgoNeed;
    }
}
