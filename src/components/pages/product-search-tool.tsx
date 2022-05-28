import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from '../redux/store';
import { changeDisplayMode } from "../redux/reducers/product";
import { Grid, Input } from '@nextui-org/react';
import MInput from "../widget/minput";

const ProductSearchTool = () => {

  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState<any>("");
  const displayMode = useSelector((state: RootState) => state.product.displayMode);
  
  return (
    <>
      <Grid.Container gap={2} justify="center">
        <Grid xl={8} lg={7} md={6} sm={12} xs={12}>
          <MInput 
            value={keyword}
            type="text"
            className="flex items-center px-2 f-size-sm"
            css={{}}
            onChange={(e) => {
              setKeyword(e.target.value)
            }}
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
                <use href={`/static/svg/feather-sprite.svg#search`}/>
              </svg>
            }
          />
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

export default ProductSearchTool;
