package com.samuksa.dto.testDto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

public class FishMarketPriceRefine {

    private int fishMarketPriceId;

    private int price;

    private int maxPrice;
    private int filletWeight;

    private int serving;

    public FishMarketPriceRefine(int fishMarketPriceId, int price,int maxPrice, int filletWeight, int serving) {
        this.fishMarketPriceId = fishMarketPriceId;
        this.price = price;
        this.maxPrice = maxPrice;
        this.filletWeight = filletWeight;
        this.serving = serving;
    }
}
