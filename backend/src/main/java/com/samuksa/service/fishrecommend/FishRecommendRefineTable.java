package com.samuksa.service.fishrecommend;

import com.samuksa.dto.response.fishrecommend.FishRecommendResponse;
import com.samuksa.dto.testDto.FishMarketPriceRefine;
import com.samuksa.dto.testDto.FishRecommendResultInfo;

import java.util.ArrayList;
import java.util.List;

public class FishRecommendRefineTable {
    private List<FishMarketPriceRefine> fishMarketPriceRefineBase;

    private int recommendWeight;

    private List<List<FishRecommendResultInfo>> fishRecommendResultInfos;

    public FishRecommendRefineTable(List<FishMarketPriceRefine> fishMarketPriceRefineBase, int recommendWeight) {
        this.fishMarketPriceRefineBase = fishMarketPriceRefineBase;
        this.recommendWeight = recommendWeight;
        fishRecommendResultInfos = new ArrayList<List<FishRecommendResultInfo>>();
        FishRecommendRefineBT(fishMarketPriceRefineBase, 0, 0,fishMarketPriceRefineBase.size(),0);
    }

    private void FishRecommendRefineBT(List<FishMarketPriceRefine> fishMarketPriceRefine, int totalServing, int position, int listSize, int totalMoney)
    {
        if (totalServing > recommendWeight || position >= listSize || totalMoney > fishMarketPriceRefine.get(0).getMaxPrice()) {
            if (totalServing > recommendWeight && totalMoney < fishMarketPriceRefine.get(0).getMaxPrice())
                this.fishRecommendResultInfos.add(PriceRefineToResultInfo(fishMarketPriceRefine));
            return ;
        }

        FishRecommendRefineBT(fishMarketPriceRefine, totalServing,position + 1, listSize,totalMoney);
        FishMarketPriceRefine cpyFishMarketPriceRefine = fishMarketPriceRefine.get(position);
        cpyFishMarketPriceRefine.setServing(cpyFishMarketPriceRefine.getServing() + 1);
        totalServing += cpyFishMarketPriceRefine.getFilletWeight();
        FishRecommendRefineBT(fishMarketPriceRefine, totalServing,position, listSize,totalMoney+ cpyFishMarketPriceRefine.getPrice());
        cpyFishMarketPriceRefine.setServing(cpyFishMarketPriceRefine.getServing() - 1);
    }

    public List<FishRecommendResultInfo> PriceRefineToResultInfo(List<FishMarketPriceRefine> fishMarketPriceRefines)
    {
        List<FishRecommendResultInfo> fishRecommendResultInfosReturn = new ArrayList<FishRecommendResultInfo>();
        int maxSizeNum = fishMarketPriceRefines.size();
        FishMarketPriceRefine fishMarketPriceRefine;
        for (int sizeNum = 0; sizeNum < maxSizeNum; sizeNum++)
        {
            fishMarketPriceRefine = fishMarketPriceRefines.get(sizeNum);
            FishRecommendResultInfo fishRecommendResultInfo = new FishRecommendResultInfo(fishMarketPriceRefine.getFishMarketPriceId(), fishMarketPriceRefine.getServing());
            fishRecommendResultInfosReturn.add(fishRecommendResultInfo);
        }
        return fishRecommendResultInfosReturn;
    }

    public List<List<FishRecommendResultInfo>> getFishRecommendResultInfos() {
        return fishRecommendResultInfos;
    }
}
