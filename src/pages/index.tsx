import React, { useState, useEffect } from "react";
import Head from 'next/head';
import { useSelector, useDispatch } from "react-redux";
import { RootState } from '../components/redux/store';
import { 
  updateProducts,
  updateAlogliaStorage
} from "../components/redux/reducers/product";
import { toast } from 'react-toastify';
import algoliasearch from 'algoliasearch/lite';
import {
  InstantSearch
} from 'react-instantsearch-dom';
import { 
  Grid,
  Loading
} from '@nextui-org/react';
import $ from "jquery";
import {
  removeFieldOfProducts
} from "../components/redux/helper";
import ProductCategories from "../components/pages/product-categories";
import ProductSearchTool from "../components/pages/product-search-tool";
import ProductDeliveryDetails from "../components/pages/product-delivery-details";
import ProductItem from "../components/pages/product-item";

const searchClient = algoliasearch(
  'BALXIWJUHJ',
  '10a912c232ec636affee3e3a0a742dcf'
);

export default function Home() {

  const AnyProductSearchTool = ProductSearchTool as any;
  const AnyInstantSearch = InstantSearch as any;
  const AnyLoading = Loading as any;

  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.product.cart);
  const [localCart, setLocalCart] = useState<any>([]);

  const products = useSelector((state: RootState) => state.product.products);
  const [localProducts, setLocalProducts] = useState<any>([]);

  const displayMode = useSelector((state: RootState) => state.product.displayMode);

  const [keyword, setKeyword] = useState<any>([]);

  const loadingStatus = useSelector((state: RootState) => state.product.loadingStatus);

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

  useEffect(() => {
    if (JSON.stringify(removeFieldOfProducts(localProducts, "quantity_of_cart")) !== JSON.stringify(removeFieldOfProducts(products, "quantity_of_cart"))) {
      console.log('products changed');
      if (products.length !== 0) {
        setLocalProducts(products);
        dispatch(updateAlogliaStorage(products));
      } else {
        console.log("No products effected", products);
        setLocalProducts(products);
        dispatch(updateAlogliaStorage(products));
      } 
    }
  }, [products]);

  const doLocalFilter = () => {
    console.log('hey filter');
    setKeyword($('.nv-instant-search-box .m-input-widget').val());
  }

  return (
    <div className="h-full py-7 bg-white dark:bg-gray-900">
      {
        loadingStatus !== ""
        ? <div className="loading-container">
            <AnyLoading 
              type="default" 
              size="md"
              text="default"
            >
              {loadingStatus}...
            </AnyLoading>
          </div>
        : null
      }
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
            <AnyInstantSearch searchClient={searchClient} indexName="maxundmurat_shop">
              <AnyProductSearchTool doLocalFilter={doLocalFilter} />
            </AnyInstantSearch>
            <Grid.Container className="mt-1" gap={2} justify="flex-start">
            
              {
                products.length === 0
                ? <div
                    style={{
                      width: "100%",
                      height: "calc(100vh - 381px)",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      fontSize: "14px"
                    }}
                  >
                    No Prodouts Found
                  </div>
                : products.filter((f: any) => (f.name && f.name.includes(keyword)) || (f.description && f.description.includes(keyword)))
                  .map((p: any, pIdx: number) => {
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

