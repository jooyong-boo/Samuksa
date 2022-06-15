package com.samuksa.dto.response.fishrecommend;

import java.util.List;

public class FishRecommendCombination {
    private int totalPrice;

    private String combinationName;

    private List<FishRecommendList> fishRecommendLists;

    public FishRecommendCombination(int totalPrice, String combinationName, List<FishRecommendList> fishRecommendLists) {
        this.totalPrice = totalPrice;
        this.combinationName = combinationName;
        this.fishRecommendLists = fishRecommendLists;
    }

    public int getTotalPrice() {
        return totalPrice;
    }

    public String getCombinationName() {
        return combinationName;
    }

    public List<FishRecommendList> getFishRecommendLists() {
        return fishRecommendLists;
    }

    public void setTotalPrice(int totalPrice) {
        this.totalPrice = totalPrice;
    }

    public void setCombinationName(String combinationName) {
        this.combinationName = combinationName;
    }

    public void setFishRecommendLists(List<FishRecommendList> fishRecommendLists) {
        this.fishRecommendLists = fishRecommendLists;
    }
}
