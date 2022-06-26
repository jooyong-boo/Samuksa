package com.samuksa.dto.fish.recommend.recommendEntity;

import com.samuksa.dto.fish.recommend.recommendResponse.FishRecommendInfo;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class FishRecommendBtDto {
    private int fishPosition;

    private int price;

    private int yiled;

    private int serving;

    private int filletWeight;

}
