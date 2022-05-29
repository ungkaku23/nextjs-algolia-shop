import React, { useState, useEffect } from "react";
import { connectSearchBox } from "react-instantsearch-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from '../redux/store';
import { changeDisplayMode } from "../redux/reducers/product";
import { Grid, Input } from '@nextui-org/react';
import MInput from "../widget/minput";
import ProductSearchHits from "./product-search-hits";

import $ from "jquery";

interface ProductSearchToolProps {
  refine: (info: any) => void;
  doLocalFilter: () => void;
}

const ProductSearchTool = ({ refine, doLocalFilter }: ProductSearchToolProps) => {

  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState<any>("");
  const displayMode = useSelector((state: RootState) => state.product.displayMode);

  const AnyProductSearchHits = ProductSearchHits as any;

  const [showHits, setShowHits] = useState<any>(false);

  const handleSearchBoxEvent = () => {
    const concernedElement: any = document.querySelector(".nv-instant-search-box");

    document.addEventListener("mousedown", (event: any) => {
      if (concernedElement.contains(event.target)) {
        setShowHits(true);
      } else {
        setTimeout(() => {
          setShowHits(false);
        }, 100);
      }
    });

    $('.nv-instant-search-box .m-input-widget').keyup(function(e: any){
      if(e.keyCode == 13) {
        doLocalFilter();
        setShowHits(false);
      }
    });
  }

  useEffect(() => {
    handleSearchBoxEvent();
  }, []);
  
  return (
    <>
      <Grid.Container gap={2} justify="center">
        <Grid xl={8} lg={7} md={6} sm={12} xs={12} className="relative">
          <MInput 
            value={keyword}
            type="text"
            className="flex items-center px-2 f-size-sm nv-instant-search-box"
            css={{}}
            onChange={(e) => {
              setKeyword(e.target.value);
              refine(e.target.value);
            }}
            onUpdate={(obj) => {
              if (obj.hasOwnProperty("clear") && obj.clear) {
                setShowHits(false);
                refine("");
                setKeyword("");
                $('.nv-instant-search-box .m-input-widget').val("");
                doLocalFilter();
              }
            }}
            isIcon={true}
            icon={
              <svg
                className="text-skin-dark cursor-pointer"
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <use href={`/static/svg/feather-sprite.svg#search`}/>
              </svg>
            }
          />
          {showHits ? <AnyProductSearchHits onClickItem={(info: any) => {doLocalFilter()}}/> : null}
        </Grid>
        <Grid xl={4} lg={5} md={6} sm={12} xs={12}>
          <div className="flex items-center justify-end w-full">
            <div className="flex items-center">
              <svg
                className="text-skin-dark mr-2"
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <use href={`/static/svg/feather-sprite.svg#align-right`}/>
              </svg>
              <span className="f-size-sm font-medium">Default Sorting</span>
            </div>
            <div 
              style={{
                borderRight: "1px solid #5F5F5F",
                opacity: "0.5",
                height: "32px",
                width: "0px",
                marginLeft: "24.5px",
                marginRight: "24.5px"
              }
            }>
            </div>
            <div className="flex items-center">
              <svg
                className="text-skin-dark mr-3 cursor-pointer"
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity={displayMode === "list" ? "1" : "0.5"}
                onClick={() => {
                  dispatch(changeDisplayMode('list'));
                }}
              >
                <use href={`/static/svg/feather-sprite.svg#list`}/>
              </svg>
              <svg
                className="text-skin-dark cursor-pointer"
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity={displayMode === "grid" ? "1" : "0.5"}
                onClick={() => {
                  dispatch(changeDisplayMode('grid'));
                }}
              >
                <use href={`/static/svg/feather-sprite.svg#grid`}/>
              </svg>
            </div>
          </div>
        </Grid>
      </Grid.Container>
    </>
  );
};

export default connectSearchBox(ProductSearchTool);
