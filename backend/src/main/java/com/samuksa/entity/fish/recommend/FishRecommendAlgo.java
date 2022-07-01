package com.samuksa.entity.fish.recommend;

import com.samuksa.dto.fish.recommend.recommendEntity.FishRecommendAlgoNeed;
import com.samuksa.dto.fish.recommend.recommendEntity.FishRecommendResponseFlagImp;
import com.samuksa.dto.fish.recommend.recommendResponse.FishRecommendCombination;
import com.samuksa.dto.fish.recommend.recommendResponse.FishRecommendInfo;
import com.samuksa.dto.fish.recommend.recommendEntity.FishRecommendBtDto;

import java.util.ArrayList;
import java.util.List;

public class FishRecommendAlgo {

    private FishRecommendAlgoNeed fishRecommendAlgoNeed;

    private List<List<FishRecommendResponseFlagImp>> fishRecommendResponseFlagImpsList;

    public FishRecommendAlgo(FishRecommendAlgoNeed fishRecommendAlgoNeed) {
        this.fishRecommendAlgoNeed = fishRecommendAlgoNeed;
        fishRecommendResponseFlagImpsList = new ArrayList<>();
    }

    private void doRecommendBT()
    {
        List<FishRecommendBtDto> fishRecommendBtDtos = this.fishRecommendAlgoNeed.getFishRecommendBtDtos();
        FishRecommendBT(0, 0, fishRecommendBtDtos.size(), 0);
    }

    private void FishRecommendBT(int nowWeight, int position, int listSize, int totalMoney)
    {
        if (nowWeight > this.fishRecommendAlgoNeed.getTotalServingWeight() || position >= listSize || totalMoney > this.fishRecommendAlgoNeed.getLimitMoney()) {
            if (nowWeight > this.fishRecommendAlgoNeed.getTotalServingWeight() && totalMoney < fishRecommendAlgoNeed.getLimitMoney() )
                setFlag();
            return ;
        }

        FishRecommendBT(nowWeight,position + 1, listSize,totalMoney);
        FishRecommendBtDto fishRecommendBtDto = this.fishRecommendAlgoNeed.getFishRecommendBtDtos().get(position);
        fishRecommendBtDto.setServing(fishRecommendBtDto.getServing() + 1);
        nowWeight += fishRecommendBtDto.getFilletWeight();
        FishRecommendBT(nowWeight, position, listSize, totalMoney + fishRecommendBtDto.getPrice());
        fishRecommendBtDto.setServing((fishRecommendBtDto.getServing() - 1));
    }

    private void setFlag()
    {
        List<FishRecommendBtDto> fishRecommendBtDtos = this.fishRecommendAlgoNeed.getFishRecommendBtDtos();
        List<FishRecommendResponseFlagImp> fishRecommendResponseFlagImps = new ArrayList<>();

        for (FishRecommendBtDto fishRecommendBtDto : fishRecommendBtDtos)
        {
            if (fishRecommendBtDto.getServing() > 0) {
                FishRecommendResponseFlagImp fishRecommendResponseFlagImp = new FishRecommendResponseFlagImp(fishRecommendBtDto.getFishPosition(), fishRecommendBtDto.getServing());
                fishRecommendResponseFlagImps.add(fishRecommendResponseFlagImp);
            }
        }
        this.fishRecommendResponseFlagImpsList.add(fishRecommendResponseFlagImps);
    }

    public List<List<FishRecommendResponseFlagImp>> getFishRecommendResponseFlagImpsList() {
        doRecommendBT();
        return fishRecommendResponseFlagImpsList;
    }
}
