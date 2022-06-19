package com.samuksa.dto.fish.api;

import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class FishApiResponse {
    private String lastDate;
    private List<String> price;
    private List<String> date;
}
