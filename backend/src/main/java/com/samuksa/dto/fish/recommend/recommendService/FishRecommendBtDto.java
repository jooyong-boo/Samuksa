package com.samuksa.dto.fish.recommend.recommendService;

import com.samuksa.dto.fish.recommend.recommendResponse.FishRecommendInfo;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FishRecommendBtDto {
    private int price;

    private int yiled;

    private int serving;

    private FishRecommendInfo fishRecommendInfo;

    private int filletWeight;

    public FishRecommendBtDto(int price, int yiled, int serving, FishRecommendInfo fishRecommendInfo) {
        this.price = price;
        this.yiled = yiled;
        this.serving = serving;
        this.fishRecommendInfo = fishRecommendInfo;
        int minWeight = fishRecommendInfo.getMinWeight();
        int maxWeight = fishRecommendInfo.getMaxWeight();
        if (minWeight == 0)
            this.filletWeight = maxWeight / 100 * yiled ;
        else if (maxWeight == 0)
            this.filletWeight = minWeight / 100 * yiled;
        else
            this.filletWeight = (maxWeight + minWeight) / 200 * yiled;
    }
}
