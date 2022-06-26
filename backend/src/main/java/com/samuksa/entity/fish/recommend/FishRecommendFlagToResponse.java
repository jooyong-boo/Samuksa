package com.samuksa.entity.fish.recommend;

import com.samuksa.dto.fish.price.FishPrice;
import com.samuksa.dto.fish.recommend.recommendEntity.FishRecommendResponseFlagImp;
import com.samuksa.dto.fish.recommend.recommendResponse.FishRecommendCombination;
import com.samuksa.dto.fish.recommend.recommendResponse.FishRecommendInfo;
import com.samuksa.dto.fish.recommend.recommendResponse.FishRecommendResponse;
import com.samuksa.dto.fish.recommend.recommendResponse.FishRecommendUnion;
import com.sun.org.apache.xpath.internal.operations.String;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

public class FishRecommendFlagToResponse {
    private List<List<FishRecommendResponseFlagImp>> fishRecommendResponseFlagImpsList;

    private List<FishPrice> fishPrices;

    private FishRecommendResponse fishRecommendResponse;

    public FishRecommendFlagToResponse(List<List<FishRecommendResponseFlagImp>> fishRecommendResponseFlagImpsList, List<FishPrice> fishPrices) {
        this.fishRecommendResponseFlagImpsList = fishRecommendResponseFlagImpsList;
        this.fishPrices = fishPrices;
    }

    public FishRecommendResponse getFishRecommendResponse() {
        List<FishRecommendUnion> fishRecommendUnions;
        FishRecommendCombination fishRecommendCombination;
        int totalPrice;
        StringBuilder sb;
        List<FishRecommendInfo> fishRecommendInfos;
        FishRecommendInfo fishRecommendInfo;
        FishPrice fishPrice;

        fishRecommendUnions = new ArrayList<>();
        for (List<FishRecommendResponseFlagImp> fishRecommendResponseFlagImps : fishRecommendResponseFlagImpsList)
        {
            fishRecommendInfos = new ArrayList<>();
            totalPrice = 0;
            sb = new StringBuilder();
            for (FishRecommendResponseFlagImp fishRecommendResponseFlagImp : fishRecommendResponseFlagImps)
            {
                fishPrice = fishPrices.get(fishRecommendResponseFlagImp.getFishPosition());
                fishRecommendInfo = new FishRecommendInfo(
                        fishPrice.getFishName(),
                        fishPrice.getSaleArea(),
                        fishPrice.getFisheryArea(),
                        fishPrice.getFarmType(),
                        fishPrice.getFishSize(),
                        fishPrice.getPrice(),
                        fishPrice.getMinWeight(),
                        fishPrice.getMaxWeight(),
                        fishRecommendResponseFlagImp.getServing()
                        );
                sb.append(fishPrice.getFishName());
                sb.append(" ");
                totalPrice += fishPrice.getPrice() * fishRecommendResponseFlagImp.getServing();
                fishRecommendInfos.add(fishRecommendInfo);
            }
            sb.deleteCharAt(sb.lastIndexOf(" "));
            fishRecommendCombination = new FishRecommendCombination(totalPrice, sb.toString(), fishRecommendInfos);
            CombinationToUnion(fishRecommendUnions,fishRecommendCombination);
        }

        this.fishRecommendResponse = new FishRecommendResponse(this.fishRecommendResponseFlagImpsList.size(), fishRecommendUnions.size(), fishRecommendUnions);

        return fishRecommendResponse;
    }

    private void CombinationToUnion(List<FishRecommendUnion> fishRecommendUnions, FishRecommendCombination fishRecommendCombination)
    {
        for (FishRecommendUnion fishRecommendUnion : fishRecommendUnions)
        {
            if (Objects.equals(fishRecommendUnion.getCombinationName(),fishRecommendCombination.getCombinationName())) {
                fishRecommendUnion.getFishRecommendCombinations().add(fishRecommendCombination);
                return ;
            }
        }

        List<FishRecommendCombination> tmp_fishRecommendCombinations = new ArrayList<>();
        tmp_fishRecommendCombinations.add(fishRecommendCombination);
        FishRecommendUnion fishRecommendUnion = new FishRecommendUnion(fishRecommendCombination.getCombinationName(),tmp_fishRecommendCombinations);
        fishRecommendUnions.add(fishRecommendUnion);
    }

}
