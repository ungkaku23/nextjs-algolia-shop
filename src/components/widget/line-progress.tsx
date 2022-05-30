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
  
  return (
    <div className="container progress-container max-w-none">
      <div className="row relative">
        <hr className={`${lineProgressCSS.progress_line}`}/>
        <div className="sm:col-12 md:col-3">
          <div className={`${lineProgressCSS.progress_item}`}>
            <span>1</span>
            Address
          </div>
        </div>
        <div className="sm:col-12 md:col-3">
          <div className={`${lineProgressCSS.progress_item}`}>
            <span>1</span>
            Service
          </div>
        </div>
        <div className="sm:col-12 md:col-3">
          <div className={`${lineProgressCSS.progress_item}`}>
            <span>1</span>
            Confirmation
          </div>
        </div>
        <div className="sm:col-12 md:col-3">
          <div className={`${lineProgressCSS.progress_item}`}>
            <span>1</span>
            Payment Method
          </div>
        </div>
      </div>
    </div>
  );
};

export default LineProgress;
