package com.samuksa.dto.fish.recommend.recommendResponse;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class FishRecommendInfo {
    private String fishName;

    private String area;

    private String areaFrom;

    private String farmType;

    private String size;

    private int price;

    private int minWeight;

    private int maxWeight;

    private int serving;
}
