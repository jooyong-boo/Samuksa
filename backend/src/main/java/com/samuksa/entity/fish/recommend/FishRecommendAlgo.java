package com.samuksa.entity.fish.recommend;

import com.samuksa.dto.fish.recommend.recommendEntity.FishRecommendAlgoNeed;
import com.samuksa.dto.fish.recommend.recommendEntity.FishRecommendAlgoWeight;
import com.samuksa.dto.fish.recommend.recommendEntity.FishRecommendResponseFlagImp;
import com.samuksa.dto.fish.recommend.recommendResponse.FishRecommendCombination;
import com.samuksa.dto.fish.recommend.recommendResponse.FishRecommendInfo;
import com.samuksa.dto.fish.recommend.recommendEntity.FishRecommendBtDto;

import java.util.ArrayList;
import java.util.List;

public class FishRecommendAlgo {

    private FishRecommendAlgoNeed fishRecommendAlgoNeed;

    private List<FishRecommendCombination> fishRecommendCombinations;

    public FishRecommendAlgo(FishRecommendAlgoNeed fishRecommendAlgoNeed) {
        this.fishRecommendAlgoNeed = fishRecommendAlgoNeed;
        fishRecommendCombinations = new ArrayList<>();
    }

    private void doRecommendBT()
    {
        List<FishRecommendBtDto> fishRecommendBtDtos = this.fishRecommendAlgoNeed.getFishRecommendBtDtos();
        FishRecommendBT(0, 0, fishRecommendBtDtos.size());
    }

    private void FishRecommendBT(int nowServing, int position, int listSize)
    {
        if (nowServing >= this.fishRecommendAlgoNeed.getTotalServing() || position >= listSize ) {
            if (nowServing >= this.fishRecommendAlgoNeed.getTotalServing())
                setReturn();
            return ;
        }

        FishRecommendBT(nowServing,position + 1, listSize);
        FishRecommendBtDto fishRecommendBtDto = this.fishRecommendAlgoNeed.getFishRecommendBtDtos().get(position);
        fishRecommendBtDto.setServing(fishRecommendBtDto.getServing() + 1);
        FishRecommendBT(nowServing + 1, position, listSize);
        fishRecommendBtDto.setServing((fishRecommendBtDto.getServing() - 1));
    }

    private int getTotalPrice()
    {
        List<FishRecommendBtDto> fishRecommendBtDtos = this.fishRecommendAlgoNeed.getFishRecommendBtDtos();
        int weight = 0;
        int totalPrice = 0;

        Loop1:
        for (FishRecommendBtDto fishRecommendBtDto : fishRecommendBtDtos)
        {
            weight = fishRecommendBtDto.getWeightPerServing() * fishRecommendBtDto.getServing();
            for (FishRecommendAlgoWeight fishRecommendAlgoWeight : fishRecommendBtDto.getFishRecommendAlgoWeights())
            {
                if (weight >= fishRecommendAlgoWeight.getMinWeight() && weight <= fishRecommendAlgoWeight.getMaxWeight())
                {
                    totalPrice += weight * fishRecommendAlgoWeight.getPrice();
                    continue Loop1;
                }
            }
            List<FishRecommendAlgoWeight> fishRecommendAlgoWeight = fishRecommendBtDto.getFishRecommendAlgoWeights();
            totalPrice += weight * fishRecommendAlgoWeight.get(fishRecommendAlgoWeight.size() - 1).getPrice();
        }
        return totalPrice;
    }

    private void setReturn()
    {
        List<FishRecommendAlgoWeight> fishRecommendAlgoWeights;
        FishRecommendBtDto cpyFishRecommendBtDto;
        int totalPrice = getTotalPrice();
        int weight = 0;

        if (totalPrice < fishRecommendAlgoNeed.getMaxPrice()) {
            List<FishRecommendBtDto> fishRecommendBtDtos = new ArrayList<>();
            List<String> strings = new ArrayList<>();

            Loop1:
            for (FishRecommendBtDto fishRecommendBtDto : fishRecommendAlgoNeed.getFishRecommendBtDtos())
            {
                if (fishRecommendBtDto.getServing() > 0) {
                    fishRecommendAlgoWeights = new ArrayList<>();
                    weight = fishRecommendBtDto.getWeightPerServing() * fishRecommendBtDto.getServing();
                    if (fishRecommendBtDto.getFishRecommendAlgoWeights().get(0).getMinWeight() > weight)
                        return ;
                    for (FishRecommendAlgoWeight fishRecommendAlgoWeight : fishRecommendBtDto.getFishRecommendAlgoWeights())
                    {
                        if (weight >= fishRecommendAlgoWeight.getMinWeight() && weight <= fishRecommendAlgoWeight.getMaxWeight())
                        {
                            fishRecommendAlgoWeights.add(fishRecommendAlgoWeight);
                            break;
                        }
                    }
                    if (fishRecommendAlgoWeights.size() == 0)
                        fishRecommendAlgoWeights.add(fishRecommendBtDto.getFishRecommendAlgoWeights().get(fishRecommendBtDto.getFishRecommendAlgoWeights().size()-1));
                    cpyFishRecommendBtDto = new FishRecommendBtDto(fishRecommendBtDto.getFishName(),
                            fishRecommendAlgoWeights,
                            fishRecommendBtDto.getWeightPerServing(),
                            fishRecommendBtDto.getServing(),
                            weight * fishRecommendAlgoWeights.get(0).getPrice());
                    strings.add(fishRecommendBtDto.getFishName());
                    fishRecommendBtDtos.add(cpyFishRecommendBtDto);
                }
            }
            if (fishRecommendBtDtos.size() > 0)
                fishRecommendCombinations.add(new FishRecommendCombination(totalPrice, strings, fishRecommendBtDtos));
        }
    }

    public List<FishRecommendCombination> getFishRecommendCombinations() {
        doRecommendBT();
        return fishRecommendCombinations;
    }
}
