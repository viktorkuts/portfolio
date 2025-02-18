package com.viktorkuts.portfolio_be.shared;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class LocalizableString {
    String original;
    String french;
}
