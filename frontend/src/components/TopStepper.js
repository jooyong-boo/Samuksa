import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

const steps = [
  '검색 조건',
  '상세 검색 조건',
  '선택한 조건 목록',
  '검색 결과',
];

export default function TopStepper() {
  return (
    <Box sx={{ width: '100%', margin: 3 }}>
      <Stepper activeStep={0} alternativeLabel>
        {steps.map((label, i) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}