import React, { useState, useEffect } from "react";
import Head from 'next/head';
import { useSelector, useDispatch } from "react-redux";
import { RootState } from '../components/redux/store';
import { 
  addCart,
  updateProducts
} from "../components/redux/reducers/product";
import { 
  Grid
} from '@nextui-org/react';
import { toast } from 'react-toastify';
import ProductCategories from "../components/pages/product-categories";
import ProductSearchTool from "../components/pages/product-search-tool";
import ProductItem from "../components/pages/product-item";
import ProductDeliveryDetails from "../components/pages/product-delivery-details";

export default function Home() {

  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.product.cart);
  const [localCart, setLocalCart] = useState<any>([]);

  const displayMode = useSelector((state: RootState) => state.product.displayMode);

  const products = useSelector((state: RootState) => state.product.products);

  useEffect(() => {
    if (JSON.stringify(localCart) !== JSON.stringify(cart)) {
      setLocalCart(cart);
      toast('🦄 Cart Changed!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });
    }
  }, [cart]);

  return (
    <div className="h-full py-7 bg-white dark:bg-gray-900">
      <div className="container max-w-none md:layout-px-1 lg:layout-px-2 xl:layout-px-3">
        <div className="row g-1 mb-5">
          <div className="sm:col-12 md:col-4">
            <h2 className="f-size-lg lg:f-size-xl font-medium">Catering Shop</h2>
          </div>
          <div className="sm:col-12 md:col-8"></div>
        </div>
        <div className="row g-1">
          <div className="sm:col-12 md:col-4 sticky-fixed">
            <ProductCategories />
          </div>
          <div className="sm:col-12 md:col-8">
            <ProductSearchTool />
            <Grid.Container className="mt-1" gap={2} justify="flex-start">
              {
                products.map((p: any, pIdx: number) => {
                  return <Grid 
                          key={`product${pIdx}`} 
                          xs={displayMode === "grid" ? 6 : 12} 
                          sm={displayMode === "grid" ? 6 : 12} 
                          md={displayMode === "grid" ? 4 : 12} 
                          lg={displayMode === "grid" ? 4 : 12} 
                          xl={displayMode === "grid" ? 3 : 12}
                        >
                          <ProductItem 
                            info={p}
                            onAdd={(info: any) => {
                              console.log('clicked: ', info);
                              dispatch(addCart(info));
                            }} 
                            onUpdate={(info: any) => {
                              dispatch(updateProducts(products.map((p: any) => p.id === info.id ? info : p)));
                            }}
                          />
                        </Grid>
                })
              }
            </Grid.Container>
          </div>
        </div>
      </div>
      <div className="container max-w-none md:layout-px-1 lg:layout-px-2 xl:layout-px-3 top-shadow fixed-bottom">
        <div className="row g-1">
          <ProductDeliveryDetails />
        </div>
      </div>
    </div>
  )
}

