package com.samuksa.service;

import com.samuksa.dao.FishDao;
import com.samuksa.dto.FishInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FishService {
    @Autowired
    FishDao fishDao;

    public FishInfo getAllFishInfo() {
        return fishDao.getAllFishInfo();
    }
}
