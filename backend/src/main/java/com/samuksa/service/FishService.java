package com.samuksa.service;

import com.samuksa.dto.fish.info.FishInfo;
import com.samuksa.dto.fish.price.FishPrice;
import com.samuksa.entity.fish.info.FishInfoEntity;
import com.samuksa.entity.fish.price.FishPriceEntity;
import com.samuksa.entity.fish.saleArea.FishSaleAreaEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FishService {

    @Autowired
    FishInfoEntity fishInfoEntity;

    @Autowired
    FishPriceEntity fishPriceEntity;

    @Autowired
    FishSaleAreaEntity fishSaleAreaEntity;

    public List<FishInfo> getAllFishInfo() {
        return fishInfoEntity.getAllFishInfo();
    }

    public List<FishPrice> getAllTodayFishPrice() {
        return fishPriceEntity.getAllTodayFishPrice();
    }

    public List<FishPrice> getTodayFishPrice(String saleArea) {
        return fishPriceEntity.getTodayFishPrice(saleArea);
    }

    public List<String> getAllSaleArea() {
        return fishSaleAreaEntity.getAllSaleArea();
    }

    public List<String> getFishFarmTypeByName(String fishName) {
        return fishInfoEntity.getFishFarmTypeByName(fishName);
    }
}
