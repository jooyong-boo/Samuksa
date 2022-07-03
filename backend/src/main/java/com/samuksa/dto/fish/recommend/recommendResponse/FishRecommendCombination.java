package com.samuksa.dto.fish.recommend.recommendResponse;

import com.samuksa.dto.fish.recommend.recommendEntity.FishRecommendBtDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@AllArgsConstructor
@Setter
@Getter
public class FishRecommendCombination {
    private int totalPrice;

    private List<String> combinationName;

    private List<FishRecommendBtDto> fishRecommendBtDtos;

}
