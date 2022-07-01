package com.samuksa.dto.fish.recommend.recommendResponse;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@AllArgsConstructor
@Setter
@Getter
public class FishRecommendCombination {
    private int totalPrice;

    private String combinationName;

    private List<FishRecommendInfo> fishRecommendInfos;

}
