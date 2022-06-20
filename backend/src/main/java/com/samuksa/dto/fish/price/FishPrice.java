package com.samuksa.dto.fish.price;

import lombok.*;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class FishPrice {

    private String fishName;
    private String fishSize;
    private String fisheryArea;
    private String saleArea;
    private String farmType;
    private String saleDtm;
    private int minWeight;
    private int maxWeight;
    private int price;

    private int yield;

    public FishPrice(FishPriceRequest fishPriceRequest, String priceStr, String pSaleDtm) {
        fishName = fishPriceRequest.getFishName();
        fishSize = fishPriceRequest.getFishSize();
        fisheryArea = fishPriceRequest.getFisheryArea();
        saleArea = fishPriceRequest.getSaleArea();
        farmType = fishPriceRequest.getFarmType();
        saleDtm = pSaleDtm;
        minWeight = fishPriceRequest.getMinWeight();
        maxWeight = fishPriceRequest.getMaxWeight();
        price = Integer.parseInt(priceStr);
    }
}
