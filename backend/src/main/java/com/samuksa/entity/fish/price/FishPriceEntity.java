package com.samuksa.entity.fish.price;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.samuksa.dto.fish.api.FishApiResponse;
import com.samuksa.dto.fish.price.FishPrice;
import com.samuksa.dto.fish.price.FishPriceRequest;
import com.samuksa.mapper.FishMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.ArrayList;
import java.util.List;

@Component
public class FishPriceEntity {

    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    FishMapper fishMapper;

    @Autowired
    RestTemplate restTemplate;

    @Value("${fish.api.url}")
    public String fishApiUrl;

    @Value("${fish.api.path}")
    public String fishApiPath;

    public List<FishPrice> getAllTodayFishPrice() {
        return fishMapper.selectAllTodayFishPrice();
    }

    public List<FishPrice> getTodayFishPrice(String saleArea) {
        return fishMapper.selectTodayFishPriceBySaleArea(saleArea);
    }

    public void registFishPrice(List<FishPrice> fishPriceList){
        fishMapper.insertFishPrice(fishPriceList);
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

            logger.info("setFishPrice API 호출 response >> {}", apiResponse);

            List<String> priceList = apiResponse.getPrice();
            List<String> dateList = apiResponse.getDate();

            String latestRegDate = fishMapper.selectMaxRegDate(fishPriceRequest);
            if(latestRegDate == null) latestRegDate = "1";

            List<FishPrice> fishPriceList = new ArrayList<>();

            for(int i = 0; i < priceList.size(); i++) {
                if(latestRegDate.compareTo(dateList.get(i)) >= 0) continue;

                FishPrice fishPrice = new FishPrice(fishPriceRequest, priceList.get(i), dateList.get(i));
                fishPriceList.add(fishPrice);
            }

            if(fishPriceList.size() > 0) {
                this.registFishPrice(fishPriceList);
            }
        } catch(Exception e) {
            logger.error("setFishPrice API 호출 ERROR >> ", e);
        }
        return "S";
    }
}
