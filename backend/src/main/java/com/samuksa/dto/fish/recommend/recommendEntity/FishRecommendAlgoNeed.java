package com.samuksa.dto.fish.recommend.recommendEntity;

import com.samuksa.dto.fish.price.FishPrice;
import com.samuksa.dto.fish.price.FishPriceRequest;
import com.samuksa.dto.fish.recommend.recommendRequest.FishRecommendRequest;
import com.samuksa.dto.fish.recommend.recommendResponse.FishRecommendInfo;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@AllArgsConstructor
@Setter
@Getter
public class FishRecommendAlgoNeed {

    private List<FishRecommendBtDto> fishRecommendBtDtos;

    private int totalServingWeight;

    private int LimitMoney;
}
