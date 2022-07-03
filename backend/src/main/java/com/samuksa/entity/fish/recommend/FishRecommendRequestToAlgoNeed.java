package com.samuksa.entity.fish.recommend;

import com.samuksa.dto.fish.price.FishPrice;
import com.samuksa.dto.fish.recommend.recommendEntity.FishRecommendAlgoNeed;
import com.samuksa.dto.fish.recommend.recommendEntity.FishRecommendAlgoWeight;
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
        List<FishRecommendBtDto> fishRecommendBtDtos;

        fishRecommendBtDtos = new ArrayList<>();
        Loop1:
        for (FishPrice fishPrice : fishPrices)
        {
            for (FishRecommendBtDto fishRecommendBtDto : fishRecommendBtDtos)
            {
                if (fishPrice.getFishName().equals(fishRecommendBtDto.getFishName()))
                {
                    fishRecommendBtDto.getFishRecommendAlgoWeights().add(new FishRecommendAlgoWeight(fishPrice.getFishSize(),
                                                                                                    fishPrice.getSaleArea(),
                                                                                                    fishPrice.getFisheryArea(),
                                                                                                    fishPrice.getFarmType(),
                                                                                                    fishPrice.getMinWeight(),
                                                                                                    fishPrice.getMaxWeight(),
                                                                                                    fishPrice.getPrice() / 1000));
                    continue Loop1;
                }
            }
            List<FishRecommendAlgoWeight> fishRecommendAlgoWeights = new ArrayList<>();
            fishRecommendAlgoWeights.add(new FishRecommendAlgoWeight(fishPrice.getFishSize(),
                    fishPrice.getSaleArea(),
                    fishPrice.getFisheryArea(),
                    fishPrice.getFarmType(),
                    fishPrice.getMinWeight(),
                    fishPrice.getMaxWeight(),
                    fishPrice.getPrice() / 1000));

            fishRecommendBtDtos.add(new FishRecommendBtDto(fishPrice.getFishName(),
                    fishRecommendAlgoWeights,
                    250 / fishPrice.getYield() * 100,
                    0,
                    0));
        }
        this.fishRecommendAlgoNeed = new FishRecommendAlgoNeed(fishRecommendBtDtos, fishRecommendRequest.getMoney(), fishRecommendRequest.getPersonNum());
        return this.fishRecommendAlgoNeed;
    }
}
