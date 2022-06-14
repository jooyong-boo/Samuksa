package com.samuksa.dao.impl;

import com.samuksa.dao.FishDao;
import com.samuksa.dto.FishInfo;
import org.apache.ibatis.annotations.Mapper;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
@Mapper
public class FishDaoImpl implements FishDao {
    @Autowired
    private SqlSessionTemplate sqlSession;

    public FishInfo getAllFishInfo() {
        FishInfo fishInfo = sqlSession.selectOne("getAllFishInfo");

        return fishInfo;
    }
}
