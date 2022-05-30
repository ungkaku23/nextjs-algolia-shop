import React from "react";
import Image from "next/image";
import LineProgress from "../components/widget/line-progress";

const CheckOut = () => {
  return (
    <div className="h-full py-7 bg-white dark:bg-gray-900">
      <div className="container max-w-none md:layout-px-1 lg:layout-px-2 xl:layout-px-3">
        <div className="row g-1 mb-5">
          <div className="sm:col-12 md:col-4">
            <h2 className="f-size-lg lg:f-size-xl font-medium">Check Out</h2>
          </div>
          <div className="sm:col-12 md:col-8"></div>
        </div>
        <div className="row g-1 mb-5">
          <div className="sm:col-12 md:col-4">
            <LineProgress 
              onClickStep={(sIdx: any) => {}}
              stepIndex={3}
            />
          </div>
          <div className="sm:col-12 md:col-8"></div>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
