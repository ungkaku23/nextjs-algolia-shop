import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from '../redux/store';
import { 
  Grid,
  Text,
  Button
} from '@nextui-org/react';
import lineProgressCSS from './line-progress.module.css';

interface LineProgressProps {
  onClickStep: (stepIndex: any) => void;
  stepIndex: any;
}

const LineProgress = ({ onClickStep, stepIndex }: LineProgressProps) => {
  
  const items = ["Address", "Service", "Confirmation", "Payment Method"];

  return (
    <div className={`${lineProgressCSS.progress_container}`}>
      <hr className={`${lineProgressCSS.progress_line}`} />
      {
        items.map((o: any, idx: any) => (
          <div
            key={`stepitem${idx}`}
            className={`${lineProgressCSS.progress_item}`}
            onClick={() => onClickStep(idx + 1)}
          >
            <span className={`${stepIndex === idx + 1 ? "bg-skin-fill border-skin-base text-skin-white" : "bg-skin-white border-skin-dark"} f-size-sm cursor-pointer`}>{idx + 1}</span>
            <span className={`${stepIndex === idx + 1 ? "text-skin-base" : ""} f-size-sm cursor-pointer`}>{o}</span>
          </div>
        ))
      }
    </div>
  );
};

export default LineProgress;
