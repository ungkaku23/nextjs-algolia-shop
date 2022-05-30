import React, { 
  ReactNode, 
  useState, 
  useEffect 
} from "react";
import { useSelector, useDispatch } from "react-redux";
import { 
  Grid,
  Card,
  Row,
  Text,
  Button,
  Input
} from '@nextui-org/react';
import { 
  addCartTemporarily
} from "../redux/reducers/product";

interface ProductItemProps {
  onUpdate: (info: any) => void;
  info: any;
}

const ProductItem = ({ onUpdate, info }: ProductItemProps) => {

  const dispatch = useDispatch();

  const [localInfo, setLocalInfo] = useState<any>({});

  const AnyText = Text as any;
  const AnyRow = Row as any;

  useEffect(() => {
    setLocalInfo(info);
  }, [info]);

  return (
    <>
      <Card 
        hoverable 
        shadow 
        bordered="false" 
        css={{ 
          borderRadius: "0", 
          border: "none" 
        }}
      >
        <Card.Body css={{ 
          padding: "30px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center", 
          background: "black"
        }}>
          <Card.Image
            objectFit="contain"
            src={"/static/img/cdr.png"}
            width="100%"
            height={140}
            alt={"test"}
          />
        </Card.Body>
        <Card.Footer css={{ p: "12px 5px" }}>
          <AnyRow 
            wrap="wrap"
            className="flex-col" 
          >
            <AnyText
              className="f-size-sm mb-2" 
              css={{ lineHeight: "$sm" }}
              b
            >
              {localInfo?.name}
            </AnyText>
            <AnyText className="f-size-sm mb-1">
              {localInfo?.price} € plus VAT
            </AnyText>
            <Grid.Container 
              gap={1} 
              alignItems="center" 
              justify="center"
            >
              <Grid 
                xs={5} sm={5} md={5} lg={5}
                className="cart-num-input"
              >
                <AnyText 
                  className="cursor-pointer" 
                  css={{ fontSize: "21px" }}
                  onClick={() => {
                    let newLocalInfo = {
                      ...localInfo,
                      quantity_of_cart: parseInt(localInfo.quantity_of_cart) > 0 
                                ? parseInt(localInfo.quantity_of_cart) - 1 
                                : parseInt(localInfo.quantity_of_cart)
                    };
                    setLocalInfo(newLocalInfo);
                    onUpdate(newLocalInfo);
                  }}
                >
                  -
                </AnyText>
                <Input
                  bordered={false}
                  value={localInfo.quantity_of_cart ? localInfo.quantity_of_cart : 0}
                  onChange={(e) => {
                    let newLocalInfo = {
                      ...localInfo,
                      quantity_of_cart: e.target.value === "" ? 0 : parseInt(e.target.value)
                    };
                    setLocalInfo(newLocalInfo);
                    onUpdate(newLocalInfo);
                  }}
                />
                <AnyText 
                  className="cursor-pointer" 
                  css={{ fontSize: "15px" }}
                  onClick={() => {
                    let newLocalInfo = {
                      ...localInfo,
                      quantity_of_cart: parseInt(localInfo.quantity_of_cart) + 1
                    };
                    setLocalInfo(newLocalInfo);
                    onUpdate(newLocalInfo);
                  }}
                >
                  +
                </AnyText>
              </Grid>
              <Grid 
                xs={7} sm={7} md={7} lg={7}
                css={{ padding: "0px 0px 0px 10px" }}
              >
                <Button 
                  auto 
                  className="w-full f-size-sm text-skin-white rounded bg-skin-bgdark"
                  css={{ 
                    height: "32px",
                    lineHeight: "32px"
                  }}
                  onClick={() => {
                    dispatch(addCartTemporarily(localInfo));
                  }}
                >
                  Add
                </Button>
              </Grid>
            </Grid.Container>
          </AnyRow>
        </Card.Footer>
      </Card>
    </>
  );
};

export default ProductItem;
