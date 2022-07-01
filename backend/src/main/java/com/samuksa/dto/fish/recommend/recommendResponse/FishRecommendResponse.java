package com.samuksa.dto.fish.recommend.recommendResponse;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@AllArgsConstructor
@Setter
@Getter
public class FishRecommendResponse {
    private int recommendTotalCount;

    private int recommendUnionCount;

    private List<FishRecommendUnion> fishRecommendUnions;

}
