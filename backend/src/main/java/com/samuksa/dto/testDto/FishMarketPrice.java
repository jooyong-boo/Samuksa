package com.samuksa.dto.testDto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;

@AllArgsConstructor
@Getter
@Setter
public class FishMarketPrice {
    private int fishMarketPriceId;

    private String fishName;

    private String saleArea;

    private Timestamp saleDtm;

    private String fishSize;

    private int minWeight;

    private int maxWeight;


}
