package com.samuksa.entity.fish.info;

import com.samuksa.dto.fish.info.FishInfo;
import com.samuksa.dto.fish.info.FishInfoResponse;
import com.samuksa.mapper.FishMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class FishInfoEntity {

    @Autowired
    FishMapper fishMapper;

    public List<FishInfo> getAllFishInfo() {
        return fishMapper.selectAllFishInfo();
    }

    public List<FishInfoResponse> convertResponse(List<FishInfo> fishInfoList) {

        List<FishInfoResponse> result = new ArrayList<>();

        if(fishInfoList == null) return result;

        for(FishInfo fishInfo: fishInfoList) {
            String farmTypesStr = fishInfo.getFarmTypes();

            if(farmTypesStr == null) continue;

            List<String> farmTypes = Arrays.stream(farmTypesStr.split(","))
                    .collect(Collectors.toList());
            FishInfoResponse fishInfoResponse = new FishInfoResponse(fishInfo, farmTypes);
            result.add(fishInfoResponse);
        }

        return result;
    }
}
