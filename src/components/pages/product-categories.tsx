import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Checkbox } from '@nextui-org/react';

import { 
  getProductCategories, 
  updateProductCategories,
  getProductsInCategory,
  getAllProducts
} from "../redux/reducers/product";

import { RootState } from '../redux/store';
import { getDiffs } from "../redux/helper";

const _ = require("lodash");

const ProductCategories = () => {

  const dispatch = useDispatch();

  const categories = useSelector((state: RootState) => state.product.categories);

  const [prevCategories, setPrevCategories] = useState<any>([]);
  const [extCategories, setExtCategories] = useState<any>({});
  const [diffs, setDiffs] = useState<any>({});

  useEffect(() => {
    dispatch(getProductCategories(0));
  }, []);

  useEffect(() => {
    // setExtCategories({
    //   label: "",
    //   children: [
    //     {
    //       label: "Vegetarian",
    //       value: "vegetarian"
    //     }, {
    //       label: "Vegan",
    //       value: "vegan"
    //     }, {
    //       label: "Gluten Free",
    //       value: "gluten-free"
    //     }
    //   ],
    //   value: []
    // });
  }, []);

  useEffect(() => {
    if (diffs.hasOwnProperty("value") && diffs.value !== undefined) {
      console.log("category checkbox changed effect");
      dispatch(getProductsInCategory(diffs));
      setDiffs({});
    }

    if (prevCategories.length === 0 && categories.length > 0) {
      dispatch(getAllProducts(categories));
      setPrevCategories(categories);
    }
  }, [categories])

  const updateCategories = (label: any, fieldName: string, fieldValue: any) => {
    let temp = Object.assign([], categories);
    dispatch(updateProductCategories(temp.map((t: any) => {
      if (t.label === label) {
        if (fieldName === "value") {
          setDiffs({
            value: getDiffs(t.value, fieldValue)[0],
            isAdded: fieldValue.length > t.value.length
          });
        }
        
        return {
          ...t,
          [fieldName]: fieldValue
        };
      }

      return t;
    })));
  }

  const updateExtCategories = (fieldName: string, fieldValue: any) => {
    let temp = Object.assign({}, extCategories);
    setExtCategories({
      ...temp,
      [fieldName]: fieldValue 
    });
  }

  return (
    <>
      <h4 className="f-size-sm font-medium mb-4">Category</h4>
      {
        categories.map((o: any, cgIdx: any) => {
          return <div 
                    className="flex"
                    key={`cg${cgIdx}`}
                    style={{marginBottom: o.isOpened ? "13px" : "0px"}}
                  >
                    <svg
                      className="cursor-pointer mr-1 text-skin-dark hover:text-skin-base"
                      x-show="!showMenu"
                      width="24"
                      height="24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      onClick={() => { 
                        updateCategories(o.label, "isOpened", !o.isOpened); 
                        // dispatch(getProductCategories(o.id));
                      }}
                    >
                      <use href={`/static/svg/feather-sprite.svg#${o.isOpened ? "chevron-down" : "chevron-right"}`}/>
                    </svg>
                    <div>
                      <div 
                        className="f-size-sm cursor-pointer hover:text-skin-base"
                        style={{marginBottom: o.isOpened ? "13px" : "0px"}}
                        onClick={() => { 
                          updateCategories(o.label, "isOpened", !o.isOpened); 
                          // dispatch(getProductCategories(o.id));
                        }}
                      >
                        {o.label}
                      </div>
                      <Checkbox.Group
                        className="checkbox-group"
                        color="secondary"
                        defaultValue={o.value}
                        label={""}
                        onChange={(data) => { updateCategories(o.label, "value", data); }}
                        id={`category-${cgIdx}`}
                      >
                        {
                          o.isOpened
                          ? o.children.map((c: any, idx: any) => {
                            return <Checkbox 
                                      key={`cb${cgIdx}${idx}`}
                                      value={c.id}
                                      size="sm" 
                                      color="primary"
                                    >
                                      {c.label}
                                    </Checkbox>
                          })
                          : null
                        }
                      </Checkbox.Group>
                    </div>
                  </div> 
        })
      }

      <hr 
        style={{
          marginTop: "22px",
          marginBottom: "22px",
          border: "solid 1px #5F5F5F",
          opacity: "0.5"
        }} 
      />

      {/* <h4 className="f-size-sm font-medium mb-4">Diets</h4> */}
      <Checkbox.Group
        className="checkbox-group"
        color="secondary"
        defaultValue={extCategories.value}
        label={""}
        onChange={(data) => { updateExtCategories("value", data); }}
        id="ext-category-1"
      >
        {
          extCategories.children
          ? extCategories.children.map((c: any, idx: any) => {
            return <Checkbox 
                      key={`cbe${idx}`}
                      value={c.value}
                      size="sm" 
                      color="primary"
                    >
                      {c.label}
                    </Checkbox>
          })
          : null
        }
      </Checkbox.Group>
    </>
  );
};

export default ProductCategories;
