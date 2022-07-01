package com.samuksa.dto.fish.recommend.recommendRequest;

public class FishRecommendRequest {
    private int personNum;

    private int money;

    private String area;

    public FishRecommendRequest(int personNum, int money, String area) {
        this.personNum = personNum;
        this.money = money;
        this.area = area;
    }

    public int getPersonNum() {
        return personNum;
    }

    public int getMoney() {
        return money;
    }

    public String getArea() {
        return area;
    }

    public void setPersonNum(int personNum) {
        this.personNum = personNum;
    }

    public void setMoney(int money) {
        this.money = money;
    }

    public void setArea(String area) {
        this.area = area;
    }
}
