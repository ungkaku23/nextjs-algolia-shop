import React, { 
  ReactNode, 
  useState, 
  useEffect 
} from "react";
import { useSelector, useDispatch } from "react-redux";
import { 
  Grid,
  Card,
  Row,
  Text,
  Button,
  Input
} from '@nextui-org/react';

interface MInputProps {
  onChange: (value: any) => void;
  value: any;
  type: any;
  isIcon: boolean;
  icon: ReactNode;
  className: string;
  css: any;
 }

const MInput = ({ onChange, value, type, isIcon, icon, className, css }: MInputProps) => {

  return (
    <>
      <div 
        className={`m-input ${className}`}
        style={css}
      >
        <input 
          onChange={onChange}
          value={value}
          type={type}
        />
        {isIcon ? icon : null}
      </div>
    </>
  );
};

export default MInput;
