package com.samuksa.mapper;

import com.samuksa.dto.fish.info.FishInfo;
import com.samuksa.dto.fish.price.FishPrice;
import com.samuksa.dto.fish.price.FishPriceRequest;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface FishMapper {
    public List<FishInfo> selectAllFishInfoBySaleArea(String saleArea);

    public void insertFishPrice(List<FishPrice> fishPriceList);

    public List<FishPriceRequest> selectFishPriceRequest();

    public List<FishPrice> selectAllTodayFishPrice();

    public List<FishPrice> selectTodayFishPriceBySaleArea(String saleArea);

    public List<String> selectAllSaleArea();

    public String selectMaxRegDate(FishPriceRequest fishPriceRequest);
}
