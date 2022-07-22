package com.samuksa.entity.fish.recommend;

import com.samuksa.dto.fish.price.FishPrice;
import com.samuksa.dto.fish.recommend.recommendEntity.FishRecommendBtDto;
import com.samuksa.dto.fish.recommend.recommendEntity.FishRecommendResponseFlagImp;
import com.samuksa.dto.fish.recommend.recommendResponse.FishRecommendCombination;
import com.samuksa.dto.fish.recommend.recommendResponse.FishRecommendInfo;
import com.samuksa.dto.fish.recommend.recommendResponse.FishRecommendResponse;
import com.samuksa.dto.fish.recommend.recommendResponse.FishRecommendUnion;

import java.util.*;

public class FishRecommendFlagToResponse {

    private List<FishRecommendCombination> fishRecommendCombinations;

    private List<FishPrice> fishPrices;

    private FishRecommendResponse fishRecommendResponse;

    public FishRecommendFlagToResponse(List<FishRecommendCombination> fishRecommendCombinations, List<FishPrice> fishPrices) {
        this.fishRecommendCombinations = fishRecommendCombinations;
        this.fishPrices = fishPrices;
    }

    public FishRecommendResponse getFishRecommendResponse() {

        List<FishRecommendUnion> fishRecommendUnions = new ArrayList<>();
        Set<FishRecommendUnion> randomRecommendUnions = new HashSet<>();
        Random rd = new Random();

        for(FishRecommendCombination fishRecommendCombination : this.fishRecommendCombinations)
            combinationToUnion(fishRecommendUnions, fishRecommendCombination);
        for(FishRecommendUnion fishRecommendUnion : fishRecommendUnions)
            fishRecommendUnion.setCombinationSize(fishRecommendUnion.getFishRecommendCombinations().size());
        while (randomRecommendUnions.size() < 5 && randomRecommendUnions.size() != fishRecommendUnions.size())
            randomRecommendUnions.add(fishRecommendUnions.get(rd.nextInt(fishRecommendUnions.size())));
        fishRecommendResponse = new FishRecommendResponse(this.fishRecommendCombinations.size(),fishRecommendUnions.size(), randomRecommendUnions, fishRecommendUnions);
        return fishRecommendResponse;
    }

    private boolean checkName(FishRecommendUnion fishRecommendUnion, FishRecommendCombination fishRecommendCombination)
    {
        if (fishRecommendUnion.getCombinationName().size() == fishRecommendCombination.getCombinationName().size())
        {
            Loop1:
            for (String str1 : fishRecommendUnion.getCombinationName())
            {
                for (String str2 : fishRecommendCombination.getCombinationName())
                {
                    if (str1.equals(str2))
                        continue Loop1;
                }
                return false;
            }
            return true;
        }
        return false;
    }
    private void combinationToUnion(List<FishRecommendUnion> fishRecommendUnions, FishRecommendCombination fishRecommendCombination)
    {
        for (FishRecommendUnion fishRecommendUnion : fishRecommendUnions)
        {
            if (checkName(fishRecommendUnion, fishRecommendCombination))
            {
                if (fishRecommendUnion.getCombinationSize() < 20)
                {
                    fishRecommendUnion.getFishRecommendCombinations().add(fishRecommendCombination);
                    fishRecommendUnion.setCombinationSize(fishRecommendUnion.getCombinationSize() + 1);
                    if (fishRecommendCombination.getTotalPrice() > fishRecommendUnion.getMaxPrice())
                        fishRecommendUnion.setMaxPrice(fishRecommendCombination.getTotalPrice());
                }
                else{
                    if (fishRecommendCombination.getTotalPrice() < fishRecommendUnion.getMaxPrice()){
                        fishRecommendUnion.getFishRecommendCombinations().add(fishRecommendCombination);
                        Collections.sort(fishRecommendUnion.getFishRecommendCombinations(), Comparator.comparingInt(FishRecommendCombination::getTotalPrice));
                        fishRecommendUnion.getFishRecommendCombinations().remove(20);
                        fishRecommendUnion.setMaxPrice(fishRecommendUnion.getFishRecommendCombinations().get(19).getTotalPrice());
                    }
                }
                return;
            }
        }
        List<FishRecommendCombination> fishRecommendCombinations1 = new ArrayList<>();
        fishRecommendCombinations1.add(fishRecommendCombination);
        FishRecommendUnion fishRecommendUnion = new FishRecommendUnion(fishRecommendCombination.getCombinationName(), fishRecommendCombinations1);
        fishRecommendUnions.add(fishRecommendUnion);
        fishRecommendUnion.setCombinationSize(1);
    }
}
