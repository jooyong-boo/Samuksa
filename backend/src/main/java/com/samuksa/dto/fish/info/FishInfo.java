package com.samuksa.dto.fish.info;

import lombok.Data;

import java.util.List;

@Data
public class FishInfo {
    private int fishInfoId;
    private String fishName;
    private int fishYield;
    private String imgUrl;
}
