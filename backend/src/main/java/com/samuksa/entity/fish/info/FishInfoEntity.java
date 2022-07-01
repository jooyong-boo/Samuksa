package com.samuksa.entity.fish.info;

import com.samuksa.dto.fish.info.FishInfo;
import com.samuksa.mapper.FishMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class FishInfoEntity {

    @Autowired
    FishMapper fishMapper;

    public List<FishInfo> getAllFishInfo() {
        return fishMapper.selectAllFishInfo();
    }

    public List<String> getFishFarmTypeByName(String fishName) {
        return fishMapper.selectFishFarmTypeByName(fishName);
    }
}
