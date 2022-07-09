package com.samuksa.dto.fish.info;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
public class FishInfoResponse {
    private String fishName;
    private int fishInfoId;
    private int fishYield;
    private String imgUrl;
    private List<String> farmTypes;

    public FishInfoResponse(FishInfo fishInfo, List<String> farmTypes) {
        this.fishName = fishInfo.getFishName();
        this.fishInfoId = fishInfo.getFishInfoId();
        this.fishYield = fishInfo.getFishYield();
        this.imgUrl = fishInfo.getImgUrl();
        this.farmTypes = farmTypes;
    }
}
