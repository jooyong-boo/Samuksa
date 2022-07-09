package com.samuksa.service;

import com.samuksa.dto.fish.price.FishPriceRequest;
import com.samuksa.entity.fish.price.FishPriceEntity;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.TaskScheduler;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.TimerTask;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ScheduledFuture;
@Service
public class SchedulerService {

    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    private Map<String, ScheduledFuture<?>> scheduledTasks = new ConcurrentHashMap<>();

    private int count;

    @Autowired
    private TaskScheduler taskScheduler;

    @Autowired
    private List<FishPriceRequest> fishPriceRequestList;

    @Autowired
    private FishPriceEntity fishPriceEntity;

    public void register() {
        count = 0;
        ScheduledFuture<?> task = taskScheduler.scheduleAtFixedRate(new TimerTask() {
            public void run() {
                // 1초마다 api 한번 호출
                if(fishPriceRequestList == null || count == fishPriceRequestList.size()){
                    remove();
                } else {
                    logger.info("register >> fishPriceRequest: {}", fishPriceRequestList.get(count));
                    fishPriceEntity.setFishPrice(fishPriceRequestList.get(count++));
                }
            }
        }, 1000);
        scheduledTasks.put("mySchedulerId", task);
    }

    public void remove() {
        scheduledTasks.get("mySchedulerId").cancel(true);
    }
}
