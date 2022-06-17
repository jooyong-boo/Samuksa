package com.samuksa.dto.fish.api;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class FishApiResponse {
    private String lastDate;
    private List<String> price;
    private List<String> date;
}
