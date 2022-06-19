package com.samuksa.service.fishrecommend;

import com.samuksa.dto.fish.recommend.recommendRequest.FishRecommendRequest;
import com.samuksa.dto.fish.recommend.recommendResponse.FishRecommendCombination;
import com.samuksa.dto.fish.recommend.recommendResponse.FishRecommendInfo;
import com.samuksa.dto.fish.recommend.recommendResponse.FishRecommendResponse;
import com.samuksa.dto.fish.recommend.recommendResponse.FishRecommendUnion;
import com.samuksa.dto.fish.recommend.recommendService.FishRecommendBtDto;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

public class FishRecommendService {

    private  FishRecommendRequest fishRecommendRequest;

    private List<FishRecommendBtDto> fishRecommendBtDtos;

    private List<FishRecommendCombination> fishRecommendCombinations;

    private List<FishRecommendUnion> fishRecommendUnions;

    private FishRecommendResponse fishRecommendResponse;

    private int totalServingWeight;

    private StringBuffer sb;
    public FishRecommendService(FishRecommendRequest fishRecommendRequest, List<FishRecommendBtDto> fishRecommendBtDtos) {
        this.fishRecommendRequest = fishRecommendRequest;
        this.fishRecommendBtDtos = fishRecommendBtDtos;
        fishRecommendCombinations = new ArrayList<>();
        fishRecommendUnions = new ArrayList<>();
        totalServingWeight = fishRecommendRequest.getPersonNum() * 250;
        FishRecommendBT(fishRecommendBtDtos, 0, 0, fishRecommendBtDtos.size(), 0);
        CombinationToUnion();
        CountCombinationSize();
        fishRecommendResponse = new FishRecommendResponse(fishRecommendCombinations.size(), fishRecommendUnions.size(), fishRecommendUnions);
    }

    private void FishRecommendBT(List<FishRecommendBtDto> fishRecommendBtDtos, int nowWeight, int position, int listSize, int totalMoney)
    {
        if (nowWeight > this.totalServingWeight || position >= listSize || totalMoney > this.fishRecommendRequest.getMoney()) {
            if (nowWeight > this.totalServingWeight && totalMoney < fishRecommendRequest.getMoney())
            {
                this.sb = new StringBuffer();
                List<FishRecommendInfo> fishRecommendInfos = BtDtoInfo(fishRecommendBtDtos);
                FishRecommendCombination fishRecommendCombination = new FishRecommendCombination(totalMoney,this.sb.toString(),fishRecommendInfos);
                fishRecommendCombinations.add(fishRecommendCombination);
            }
            return ;
        }

        FishRecommendBT(fishRecommendBtDtos, nowWeight,position + 1, listSize,totalMoney);
        FishRecommendBtDto cpyfishRecoomendBtDto = fishRecommendBtDtos.get(position);
        cpyfishRecoomendBtDto.setServing(cpyfishRecoomendBtDto.getServing() + 1);
        nowWeight += cpyfishRecoomendBtDto.getFilletWeight();
        FishRecommendBT(fishRecommendBtDtos, nowWeight, position, listSize, totalMoney + cpyfishRecoomendBtDto.getFishRecommendInfo().getPrice());
        cpyfishRecoomendBtDto.setServing((cpyfishRecoomendBtDto.getServing() - 1));
    }
    public List<FishRecommendInfo> BtDtoInfo(List<FishRecommendBtDto> fishRecommendBtDtos)
    {
        List<FishRecommendInfo> fishRecommendInfos = new ArrayList<>();

        for (FishRecommendBtDto cpy_fishRecommendBtDto : fishRecommendBtDtos)
        {
            int BtDtoServing = cpy_fishRecommendBtDto.getServing();
            if (BtDtoServing > 0)
            {
                cpy_fishRecommendBtDto.getFishRecommendInfo().setServing(cpy_fishRecommendBtDto.getServing());
                FishRecommendInfo fishRecommendInfo = new FishRecommendInfo(cpy_fishRecommendBtDto.getFishRecommendInfo());
                fishRecommendInfos.add(fishRecommendInfo);
                this.sb.append(fishRecommendInfo.getFishName());
                this.sb.append(" ");
            }
        }
        return fishRecommendInfos;
    }

    private void CombinationToUnion()
    {
        for (FishRecommendCombination fishRecommendCombination : fishRecommendCombinations)
        {
            CombinationToUnion(fishRecommendCombination);
        }
    }

    private void CombinationToUnion(FishRecommendCombination fishRecommendCombination)
    {
        for (FishRecommendUnion fishRecommendUnion : this.fishRecommendUnions)
        {
            if (Objects.equals(fishRecommendUnion.getCombinationName(),fishRecommendCombination.getCombinationName())) {
                fishRecommendUnion.getFishRecommendCombinations().add(fishRecommendCombination);
                return ;
            }
        }

        List<FishRecommendCombination> tmp_fishRecommendCombinations = new ArrayList<>();
        tmp_fishRecommendCombinations.add(fishRecommendCombination);
        FishRecommendUnion fishRecommendUnion = new FishRecommendUnion(fishRecommendCombination.getCombinationName(),tmp_fishRecommendCombinations);
        this.fishRecommendUnions.add(fishRecommendUnion);
    }

    private void CountCombinationSize(){
        for (FishRecommendUnion fishRecommendUnion : this.fishRecommendUnions)
        {
            fishRecommendUnion.setCombinationSize(fishRecommendUnion.getFishRecommendCombinations().size());
        }
    }
    public FishRecommendResponse getFishRecommendResponse() {
        return fishRecommendResponse;
    }
}
