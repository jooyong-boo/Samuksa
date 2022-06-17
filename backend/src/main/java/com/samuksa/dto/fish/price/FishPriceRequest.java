package com.samuksa.dto.fish.price;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
public class FishPriceRequest {

    private String fishName;
    private String fishSize;
    private String nameCode;
    private String sizeCode;
    private String saleAreaCode;
    private String fisheryArea;
    private String saleArea;
    private String farmType;
    private String saleDtm;
    private int minWeight;
    private int maxWeight;
}
