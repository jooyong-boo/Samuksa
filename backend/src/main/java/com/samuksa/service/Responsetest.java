package com.samuksa.service;

import com.samuksa.dto.request.fishrecommend.FishRecommendRequest;
import com.samuksa.dto.response.fishrecommend.FishRecommendCombination;
import com.samuksa.dto.response.fishrecommend.FishRecommendList;
import com.samuksa.dto.response.fishrecommend.FishRecommendResponse;
import com.samuksa.dto.testDto.FishMarketPriceRefine;
import com.samuksa.dto.testDto.FishRecommendResultInfo;
import com.samuksa.service.fishrecommend.FishRecommendRefineTable;

import java.util.ArrayList;
import java.util.List;

public class Responsetest {
    private FishRecommendRequest fishRecommendRequest;

    public Responsetest(FishRecommendRequest fishRecommendRequest) {
        this.fishRecommendRequest = fishRecommendRequest;
    }

    public FishRecommendResponse get()
    {
        FishMarketPriceRefine fishMarketPriceRefine1 = new FishMarketPriceRefine(1,10000,this.fishRecommendRequest.getMoney(),250,0);
        FishMarketPriceRefine fishMarketPriceRefine2 = new FishMarketPriceRefine(2,15000,this.fishRecommendRequest.getMoney(),600,0);
        FishMarketPriceRefine fishMarketPriceRefine3 = new FishMarketPriceRefine(3,20000,this.fishRecommendRequest.getMoney(),400,0);
        List<FishMarketPriceRefine> fishMarketPriceRefines = new ArrayList<FishMarketPriceRefine>();
        fishMarketPriceRefines.add(fishMarketPriceRefine1);
        fishMarketPriceRefines.add(fishMarketPriceRefine2);
        fishMarketPriceRefines.add(fishMarketPriceRefine3);
        FishRecommendRefineTable fishRecommendRefineTable = new FishRecommendRefineTable(fishMarketPriceRefines, 250 * this.fishRecommendRequest.getPersonNum());
        List<List<FishRecommendResultInfo>> test = fishRecommendRefineTable.getFishRecommendResultInfos();
        return RefineTableToResponse(test);
    }
    private FishRecommendResponse RefineTableToResponse(List<List<FishRecommendResultInfo>> fishRecommendResultInfoList)
    {
        List<FishRecommendCombination> fishRecommendCombinations = new ArrayList<FishRecommendCombination>();
        List<FishRecommendResultInfo> fishRecommendResultInfos;
        FishRecommendList fishRecommendList;
        List<FishRecommendList> fishRecommendLists;
        FishRecommendCombination fishRecommendCombination;
        StringBuilder str = new StringBuilder();
        for(int i = 0; i < fishRecommendResultInfoList.size(); i++)
        {
            fishRecommendResultInfos = fishRecommendResultInfoList.get(i);
            fishRecommendLists = new ArrayList<FishRecommendList>();
            for(int j = 0; j < fishRecommendResultInfos.size(); j++)
            {
                FishRecommendResultInfo fishRecommendResultInfo = fishRecommendResultInfos.get(j);
                if (fishRecommendResultInfo.getFishMarketPriceId() == 1)
                    fishRecommendList = new FishRecommendList("광어", 10000,"소",33,500, 1000,fishRecommendResultInfo.getServing());
                else if (fishRecommendResultInfo.getFishMarketPriceId() == 2)
                    fishRecommendList = new FishRecommendList("연어", 15000,"중",40,1000, 2000,fishRecommendResultInfo.getServing());
                else if (fishRecommendResultInfo.getFishMarketPriceId() == 3)
                    fishRecommendList = new FishRecommendList("숭어", 20000,"대",20,2000, 3000,fishRecommendResultInfo.getServing());
                else
                    break;
                fishRecommendLists.add(fishRecommendList);
            }
            int totalPrice = 0;
            for(int j = 0; j < fishRecommendLists.size(); j++)
            {
                if (fishRecommendLists.get(j).getServing() > 0)
                {
                    str.append(fishRecommendLists.get(j).getFishName());
                    str.append(" ");
                    totalPrice += fishRecommendLists.get(j).getPrice() * fishRecommendLists.get(j).getServing();
                }
            }
            fishRecommendCombination = new FishRecommendCombination(totalPrice, str.toString(), fishRecommendLists);
            fishRecommendCombinations.add(fishRecommendCombination);
        }
        FishRecommendResponse fishRecommendResponse = new FishRecommendResponse(fishRecommendCombinations.size(), fishRecommendCombinations);
        return fishRecommendResponse;
    }
}
