package com.samuksa.bean;

import com.samuksa.dto.fish.price.FishPriceRequest;
import com.samuksa.mapper.FishMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class FishBean {

    @Autowired
    FishMapper fishMapper;

    @Bean
    public List<FishPriceRequest> fishPriceRequestList() {
        return fishMapper.selectFishPriceRequest();
    }
}
