import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from '../redux/store';
import Router from 'next/router'
import { 
  Grid,
  Text,
  Button
} from '@nextui-org/react';
import MInput from "../widget/minput";

const ProductDeliveryDetails = () => {

  const cart = useSelector((state: RootState) => state.product.cart);
  const [cartInfo, setCartInfo] = useState<any>({});

  const AnyText = Text as any;

  useEffect(() => {
    let totalCount = cart.reduce((sum: any, o: any) => sum + o.quantity_of_cart, 0);
    let totalPrice = cart.reduce((sum: any, o: any) => sum + o.quantity_of_cart * o.price, 0);

    setCartInfo({
      totalCount,
      totalPrice
    });
  }, [cart]);
  
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
            onUpdate={(o: any) => {}}
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
            onUpdate={(o: any) => {}}
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
            onUpdate={(o: any) => {}}
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
            onUpdate={(o: any) => {}}
          />
        </Grid>
        <Grid 
          className="flex items-center justify-between"
          xs={12} sm={12} md={4} lg={4}
        >
          <div className="mr-3">
            <AnyText className="f-size-sm">{cartInfo?.totalCount} Products in Shopping Cart</AnyText>
            <AnyText className="f-size-sm"><strong>{cartInfo?.totalPrice}</strong> plus VAT</AnyText>
          </div>
          <div>
            <Button 
              auto 
              className="w-full f-size-sm text-skin-white rounded bg-skin-bgdark"
              css={{ 
                height: "32px",
                lineHeight: "32px"
              }}
              onClick={() => {
                Router.push('/checkout');
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
