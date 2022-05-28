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
}

const ProductSearchHits = ({ searchState, searchResults }: ProductSearchHitsProps) => {

  const validQuery = searchState.query?.length >= 3;
  const AnyText = Text as any;
  
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
              >
                <AnyText className="f-size-sm font-semibold algolia-ellipsis">
                  {hit.name}
                </AnyText>
                <AnyText className="f-size-sm algolia-ellipsis">
                  {hit.description}
                </AnyText>
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
