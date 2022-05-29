import React from "react";
import { 
  Highlight,
  connectStateResults 
} from "react-instantsearch-dom";
import { 
  Grid,
  Card,
  Text
} from '@nextui-org/react';

interface ProductSearchHitsProps {
  searchState: any;
  searchResults: any;
  onClickItem: (info: any) => void;
}

const ProductSearchHits = ({ searchState, searchResults, onClickItem }: ProductSearchHitsProps) => {

  const validQuery = searchState.query?.length >= 3;
  const AnyText = Text as any;
  const AnyHighlight = Highlight as any;
  
  return (
    <>
    {
      validQuery
      ? <div className="algolia-search-hits">
          {searchResults?.hits.length === 0 && (
            <Card 
              className="w-full algolia-search-hit-item"
              css={{marginBottom: "0px !important"}}
            >
              <AnyText css={{textAlign: "center"}}>
                Aw snap! No search results were found.
              </AnyText>
            </Card>
          )}
          {searchResults?.hits.length > 0 && (
            searchResults.hits.map((hit: any, idx: any) => (
              <Card 
                className="w-full mb-2 algolia-search-hit-item"
                key={hit.objectID}
                css={{marginBottom: idx === searchResults.hits.length - 1 ? "0px !important" : "10px"}}
                onClick={() => onClickItem(hit)}
              >
                {/* <AnyHighlight attributeName="name" hit={hit} /> */}
                <Grid.Container 
                  gap={2} 
                  justify="center"
                  css={{
                    margin: "0px",
                    padding: "0px",
                    width: "100%"
                  }}
                >
                  <Grid sm={4}>
                    <img 
                      src="/static/img/cdr.png"
                      style={{
                        width: "100%",
                        height: "auto",
                        objectFit: "contain"
                      }}
                    />
                  </Grid>
                  <Grid sm={8} className="flex-col">
                    <AnyText className="f-size-sm font-semibold algolia-ellipsis">
                      {hit.name}
                    </AnyText>
                    <AnyText className="f-size-sm algolia-ellipsis">
                      {hit.description}
                    </AnyText>
                    <div className="flex mt-1 flex-wrap w-full">
                      {
                        hit.categories.map((hc: any, hcidx: any) => <span key={`hc${hcidx}`} className="algolia-category-item">{hc}</span>)
                      }
                    </div>
                    
                  </Grid>
                </Grid.Container>
              </Card>
            ))
          )}
        </div>
      : null
    }
    </>
  );
};

export default connectStateResults(ProductSearchHits);
