package com.samuksa.dto.fish.recommend.recommendEntity;

import com.samuksa.dto.fish.recommend.recommendResponse.FishRecommendInfo;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.util.List;


@Getter
@Setter
@AllArgsConstructor
public class FishRecommendBtDto {
    private String  fishName;

    private List<FishRecommendAlgoWeight> fishRecommendAlgoWeights;

    private int     weightPerServing;

    private int     Serving;

    private int     totalMoney;
}
