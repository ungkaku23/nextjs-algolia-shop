import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { 
  Grid,
  Text,
  Button
} from '@nextui-org/react';
import MInput from "../widget/minput";

const ProductDeliveryDetails = () => {

  const AnyText = Text as any;
  
  return (
    <>
      <Grid.Container className="m-0 p-0" gap={2}>
        <Grid
          className="flex items-center justify-between" 
          xs={12} sm={12} md={8} lg={8}
        >
          <AnyText className="f-size-sm" b>Delivery Details</AnyText>
          <MInput 
            value={"8472"}
            type="text"
            className="flex items-center px-2 f-size-sm"
            css={{
              width: "150px"
            }}
            onChange={(e) => {}}
            isIcon={true}
            icon={
              <svg
                className="text-skin-dark"
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <use href={`/static/svg/feather-sprite.svg#globe`}/>
              </svg>
            }
          />
          <MInput 
            value={"15"}
            type="text"
            className="flex items-center px-2 f-size-sm"
            css={{
              width: "150px"
            }}
            onChange={(e) => {}}
            isIcon={true}
            icon={
              <svg
                className="text-skin-dark"
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <use href={`/static/svg/feather-sprite.svg#users`}/>
              </svg>
            }
          />
          <MInput 
            value={"20.01.2022"}
            type="text"
            className="flex items-center px-2 f-size-sm"
            css={{
              width: "150px"
            }}
            onChange={(e) => {}}
            isIcon={true}
            icon={
              <svg
                className="text-skin-dark"
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <use href={`/static/svg/feather-sprite.svg#calendar`}/>
              </svg>
            }
          />
          <MInput 
            value={"20:01"}
            type="text"
            className="flex items-center px-2 f-size-sm"
            css={{
              width: "150px"
            }}
            onChange={(e) => {}}
            isIcon={true}
            icon={
              <svg
                className="text-skin-dark"
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <use href={`/static/svg/feather-sprite.svg#clock`}/>
              </svg>
            }
          />
        </Grid>
        <Grid 
          className="flex items-center justify-between"
          xs={12} sm={12} md={4} lg={4}
        >
          <div className="mr-3">
            <AnyText className="f-size-sm">20 Products in Shopping Cart</AnyText>
            <AnyText className="f-size-sm"><strong>150</strong> plus VAT</AnyText>
          </div>
          <div>
            <Button 
              auto 
              className="w-full f-size-sm text-skin-white rounded bg-skin-bgdark"
              css={{ 
                height: "32px",
                lineHeight: "32px"
              }}
            >
              Check Orders
            </Button>
          </div>
        </Grid>
      </Grid.Container>
    </>
  );
};

export default ProductDeliveryDetails;
