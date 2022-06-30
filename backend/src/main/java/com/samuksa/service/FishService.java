package com.samuksa.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.samuksa.dto.fish.info.FishInfo;
import com.samuksa.dto.fish.api.FishApiResponse;
import com.samuksa.dto.fish.info.FishInfoResponse;
import com.samuksa.dto.fish.price.FishPrice;
import com.samuksa.dto.fish.price.FishPriceRequest;
import com.samuksa.entity.fish.info.FishInfoEntity;
import com.samuksa.entity.fish.price.FishPriceEntity;
import com.samuksa.entity.fish.saleArea.FishSaleAreaEntity;
import com.samuksa.mapper.FishMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.List;

@Service
public class FishService {

    @Autowired
    FishInfoEntity fishInfoEntity;

    @Autowired
    FishPriceEntity fishPriceEntity;

    @Autowired
    FishSaleAreaEntity fishSaleAreaEntity;

    public List<FishInfoResponse> getAllFishInfo() {
        List<FishInfo> fishInfoList = fishInfoEntity.getAllFishInfo();
        return fishInfoEntity.convertResponse(fishInfoList);
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
}
