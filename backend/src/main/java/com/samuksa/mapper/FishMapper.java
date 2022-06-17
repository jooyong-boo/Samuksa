package com.samuksa.mapper;

import com.samuksa.dto.FishInfo;
import com.samuksa.dto.fish.price.FishPrice;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
public interface FishMapper {
    public List<FishInfo> selectAllFishInfo();

    public void insertFishMarketPrices(FishPrice fishPrice);
}
