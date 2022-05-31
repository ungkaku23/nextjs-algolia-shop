import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Checkbox,
  Button
} from '@nextui-org/react';

const CheckoutService = () => {

  const dispatch = useDispatch();

  const services = [
    {
      title: "By Delivery",
      description: "Delivered easily, Ideal for internal, Short-term events, Delivery with/on disposable crockery",
      price: "5"
    }, {
      title: "Catering",
      description: "Cold and warm buffets, Suitable for almost every occasion, Delivery and assembly with/on reusable crockery",
      price: "50"
    }, {
      title: "Concept",
      description: "Coordinated concepts, Perfect for representative events, Concept build with Design Table Top",
      price: "Only By Request"
    }
  ];

  const [serviceVal, setServiceVal] = useState<any>(["5"]);

  return (
    <div>
      <h3 
        className="f-size-md lg:f-size-lg font-medium"
        style={{
          marginBottom: "35px",
          marginTop: "25px"
        }}
      >
        Shipping Address
      </h3>
      <Checkbox.Group
        className="checkbox-group"
        color="secondary"
        defaultValue={serviceVal}
        label={""}
        onChange={(val: any) => setServiceVal(val)}
      >
        {
          services.map((o: any, idx: any) => (
            <div
              key={`servicediv${idx}`} 
              className="flex sm:flex-col lg:flex-row items-center f-size-sm"
              style={{
                padding: "15px",
                border: "solid 1px",
                marginBottom: "20px"
              }}
            >
              <div className="sm:w-full lg:w-2/3 text-left">
                <div className="font-medium">{o.title}</div>
                <div
                  style={{
                    lineHeight: "16px",
                    marginTop: "10px"
                  }}
                >{o.description}</div>
              </div>
              <div className="sm:w-full sm:mt-2 lg:w-1/3 flex justify-end">
                <div 
                  className="mr-2"
                  style={{
                    marginTop: "-2px"
                  }}
                >
                  {o.price} {idx < 2 ? '€' : ''}
                </div>
                <Checkbox 
                  key={`servicecheckbox${idx}`}
                  value={o.price}
                  size="sm" 
                  color="primary"
                >
                </Checkbox>
              </div>
            </div>
          ))
        }
      </Checkbox.Group>
      <div className="mt-4">
        <Button 
          auto 
          className="min-w-md f-size-sm font-medium text-skin-white rounded bg-skin-dark"
          type="submit"
          css={{
            height: "30px",
            lineHeight: "30px"
          }}
        >
          Next Step
        </Button>
      </div>
    </div>
  );
};

export default CheckoutService;
