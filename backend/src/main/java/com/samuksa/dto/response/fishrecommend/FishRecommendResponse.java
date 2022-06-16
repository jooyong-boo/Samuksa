package com.samuksa.dto.response.fishrecommend;

import java.util.List;

public class FishRecommendResponse {
    private int recommendCount;

    private List<FishRecommendCombination> fishRecommendCombination;

    public FishRecommendResponse(int recommendCount, List<FishRecommendCombination> fishRecommendCombination) {
        this.recommendCount = recommendCount;
        this.fishRecommendCombination = fishRecommendCombination;
    }

    public int getRecommendCount() {
        return recommendCount;
    }

    public List<FishRecommendCombination> getFishRecommendCombination() {
        return fishRecommendCombination;
    }

    public void setRecommendCount(int recommendCount) {
        this.recommendCount = recommendCount;
    }

    public void setFishRecommendCombination(List<FishRecommendCombination> fishRecommendCombination) {
        this.fishRecommendCombination = fishRecommendCombination;
    }
}
