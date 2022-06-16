package com.samuksa.service;

import com.samuksa.dto.request.fishrecommend.FishRecommendRequest;
import com.samuksa.dto.response.fishrecommend.FishRecommendCombination;
import com.samuksa.dto.response.fishrecommend.FishRecommendList;
import com.samuksa.dto.response.fishrecommend.FishRecommendResponse;

import java.util.ArrayList;
import java.util.List;

public class Responsetest {
    private FishRecommendRequest fishRecommendRequest;

    public Responsetest(FishRecommendRequest fishRecommendRequest) {
        this.fishRecommendRequest = fishRecommendRequest;
    }

    public FishRecommendResponse get()
    {
        FishRecommendList fishRecommendList1 = new FishRecommendList("광어", 10000,"소",50,500,1000, 1);
        FishRecommendList fishRecommendList2 = new FishRecommendList("광어", 15000,"중",60,1000,2000, 1);
        List<FishRecommendList> fishRecommendLists1 = new ArrayList<FishRecommendList>();
        fishRecommendLists1.add(fishRecommendList1);
        List<FishRecommendList> fishRecommendLists2 = new ArrayList<FishRecommendList>();
        fishRecommendLists2.add(fishRecommendList1);
        fishRecommendLists2.add(fishRecommendList2);

        FishRecommendCombination fishRecommendCombination1 = new FishRecommendCombination(10000,"광어", fishRecommendLists1);
        FishRecommendCombination fishRecommendCombination2 = new FishRecommendCombination(25000, "광어 소 중", fishRecommendLists2);
        List<FishRecommendCombination> fishRecommendCombinations = new ArrayList<FishRecommendCombination>();
        fishRecommendCombinations.add(fishRecommendCombination1);
        fishRecommendCombinations.add(fishRecommendCombination2);
        FishRecommendResponse fishRecommendResponse = new FishRecommendResponse(2, fishRecommendCombinations);
        return fishRecommendResponse;
    }
}
