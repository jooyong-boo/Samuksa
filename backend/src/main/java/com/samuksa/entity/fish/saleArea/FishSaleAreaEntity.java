package com.samuksa.entity.fish.saleArea;

import com.samuksa.mapper.FishMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class FishSaleAreaEntity {

    @Autowired
    FishMapper fishMapper;

    public List<String> getAllSaleArea() {
        return fishMapper.selectAllSaleArea();
    }
}
