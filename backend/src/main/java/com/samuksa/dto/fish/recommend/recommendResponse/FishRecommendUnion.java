package com.samuksa.dto.fish.recommend.recommendResponse;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
@Setter
@Getter
public class FishRecommendUnion {
    private  List<String> combinationName;

    private int combinationSize;

    private List<FishRecommendCombination> fishRecommendCombinations;

    public FishRecommendUnion(List<String> combinationName, List<FishRecommendCombination> fishRecommendCombinations) {
        this.combinationName = combinationName;
        this.fishRecommendCombinations = fishRecommendCombinations;
    }
}
