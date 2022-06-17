package com.samuksa.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.samuksa.dto.FishInfo;
import com.samuksa.dto.fish.api.FishApiResponse;
import com.samuksa.dto.fish.price.FishPrice;
import com.samuksa.dto.fish.price.FishPriceRequest;
import com.samuksa.mapper.FishMapper;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.List;

@Service
public class FishService {
    @Autowired
    FishMapper fishMapper;

    @Autowired
    RestTemplate restTemplate;

    @Value("${fish.api.url}")
    public String fishApiUrl;

    @Value("${fish.api.path}")
    public String fishApiPath;

    public List<FishInfo> getAllFishInfo() {
        return fishMapper.selectAllFishInfo();
    }

    public String setFishPrice(FishPriceRequest fishPriceRequest) {
        String url = UriComponentsBuilder.fromHttpUrl(fishApiUrl)
                .path(fishApiPath)
                .queryParam("id", fishPriceRequest.getNameCode())
                .queryParam("itemGroupCode", fishPriceRequest.getSizeCode())
                .queryParam("zoneCode", fishPriceRequest.getSaleAreaCode())
                .encode()
                .toUriString();

        try {
            String response = restTemplate.getForObject(url, String.class);
            ObjectMapper objectMapper = new ObjectMapper();
            FishApiResponse apiResponse = objectMapper.readValue(response, FishApiResponse.class);

            List<String> priceList = apiResponse.getPrice();
            List<String> dateList = apiResponse.getDate();

            for(int i = 0; i < priceList.size(); i++) {
                FishPrice fishPrice = new FishPrice(fishPriceRequest, priceList.get(i), dateList.get(i));
                fishMapper.insertFishMarketPrices(fishPrice);
            }

        } catch(Exception e) {
            System.out.println(e);
        }
        return "S";
    }

}
