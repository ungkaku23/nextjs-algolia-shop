import React, { 
  ReactNode, 
  useState, 
  useEffect 
} from "react";

import minputCSS from "./minput.module.css";

interface MInputProps {
  onChange: (value: any) => void;
  value: any;
  type: any;
  isIcon: boolean;
  icon: ReactNode;
  className: string;
  css: any;
  onUpdate: (obj: any) => void;
 }

const MInput = ({ onChange, value, type, isIcon, icon, className, css, onUpdate }: MInputProps) => {

  return (
    <>
      <div 
        className={`${minputCSS.m_input} ${className}`}
        style={css}
      >
        <input 
          className="m-input-widget"
          onChange={onChange}
          value={value}
          type={type}
        />
        { isIcon 
          ? className.indexOf("nv-instant-search-box") !== -1
            ? typeof value === "string"
              ? value === ""
                ? icon
                : <svg
                    className="text-skin-dark cursor-pointer"
                    width="20"
                    height="20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    onClick={() => {
                      onUpdate({
                        clear: true
                      });
                    }}
                  >
                    <use href={`/static/svg/feather-sprite.svg#x`}/>
                  </svg> 
              : icon
            : icon
          : null}
      </div>
    </>
  );
};

export default MInput;
