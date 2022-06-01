import React from "react";
import { useSelector, useDispatch } from "react-redux";

const CheckoutOverview = () => {

  const dispatch = useDispatch();

  let products = [1, 2];

  return (
    <div className="border border-2 border-skin-gray px-4 py-4">
      <div>
        <h4 
          className="f-size-sm font-medium"
          style={{
            marginBottom: "15px"
          }}
        >
          Your Shopping Cart
        </h4>
        {
          products.map((p: any, idx: any) => (
            <div 
              key={`sp${idx}`}
              className="flex sm:flex-col lg:flex-row"
              style={{
                marginBottom: "10px"
              }}
            >
              <div className="flex sm:w-5/5 lg:w-3/5 text-left mb-1">
                <div className="f-size-sm text-skin-darkgray w-1/5">x{idx}</div>
                <div className="f-size-sm text-skin-darkgray w-4/5">Asparakat Spagetti Origon Pauleta Vennie Style</div>
              </div>
              <div className="flex sm:w-5/5 lg:w-2/5 text-right">
                <div 
                  className="f-size-sm text-skin-darkgray w-4/5"
                  style={{
                    lineHeight: "14px"
                  }}
                >
                  29.70 €
                </div>
                <svg
                  className="text-skin-dark w-1/5"
                  width="15"
                  height="15"
                  fill="none"
                  stroke="#626262"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <use href={`/static/svg/feather-sprite.svg#trash-2`}/>
                </svg>
              </div>
            </div>
          ))
        }
      </div>
      <hr className="mt-4 mb-4 border-skin-darkgray" />
      <div>
        <div 
          className="flex sm:flex-col lg:flex-row text-skin-darkgray"
          style={{
            marginBottom: "5px"
          }}
        >
          <div className="sm:w-full lg:w-1/2 text-left f-size-sm mb-1">Service</div>
          <div className="sm:w-full lg:w-1/2 text-right f-size-sm">10.00 €</div>
        </div>
        <div 
          className="flex sm:flex-col lg:flex-row text-skin-darkgray"
          style={{
            marginBottom: "5px"
          }}
        >
          <div className="sm:w-full lg:w-1/2 text-left f-size-sm mb-1">Rahhat</div>
          <div className="sm:w-full lg:w-1/2 text-right f-size-sm">10.00 €</div>
        </div>
      </div>
      <hr className="mt-4 mb-4 border-skin-darkgray" />
      <div>
        <div 
          className="flex sm:flex-col lg:flex-row text-skin-darkgray"
          style={{
            marginBottom: "5px"
          }}
        >
          <div className="sm:w-full lg:w-1/2 text-left f-size-sm mb-1">Sub.Total</div>
          <div className="sm:w-full lg:w-1/2 text-right f-size-sm">20.00 €</div>
        </div>
        <div 
          className="flex sm:flex-col lg:flex-row text-skin-darkgray"
          style={{
            marginBottom: "5px"
          }}
        >
          <div className="sm:w-full lg:w-1/2 text-left f-size-sm mb-1">VAT</div>
          <div className="sm:w-full lg:w-1/2 text-right f-size-sm">6.00 €</div>
        </div>
      </div>
      <hr className="mt-4 mb-4 border-skin-darkgray" />
      <div>
        <div 
          className="flex sm:flex-col lg:flex-row font-medium"
          style={{
            marginBottom: "5px"
          }}
        >
          <div className="sm:w-full lg:w-1/2 text-left f-size-sm mb-1">Total</div>
          <div className="sm:w-full lg:w-1/2 text-right f-size-sm">14.00 €</div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutOverview;
