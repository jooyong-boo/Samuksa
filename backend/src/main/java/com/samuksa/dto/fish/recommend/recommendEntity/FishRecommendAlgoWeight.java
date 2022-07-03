package com.samuksa.dto.fish.recommend.recommendEntity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Setter
@Getter
public class FishRecommendAlgoWeight {
    private String fishSize;

    private String area;

    private String areaFrom;

    private String farmType;

    private int minWeight;

    private int maxWeight;

    private int price;
}
