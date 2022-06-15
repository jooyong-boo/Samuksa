package com.samuksa.service;

import com.samuksa.dto.FishInfo;
import com.samuksa.mapper.FishMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FishService {
    @Autowired
    FishMapper fishMapper;

    public List<FishInfo> getAllFishInfo() {
        return fishMapper.getAllFishInfo();
    }
}
