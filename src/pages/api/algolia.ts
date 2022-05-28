// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
const dotenv = require("dotenv");
const algoliasearch = require("algoliasearch/lite");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  dotenv.config();

  try {
    const client = algoliasearch(
      "BALXIWJUHJ", // App Id
      "b06286c29ef802c724f4c1132ec7b972", // admin key
    );

    const index = client.initIndex("maxundmurat_shop");

    await index.setSettings({
      searchableAttributes: [
        'categories',
        'name',
        'class',
        'description',
        'tags'
      ],
      attributesToHighlight: [
        'name',
        'description'
      ],
      highlightPreTag: '<em class="nv-search-highlight">',
      highlightPostTag: '</em>',
      queryType: 'prefixAll'
    });

    console.log('will save to aloglia: ', req.body.products);

    const algoliaResponse = await index.replaceAllObjects(req.body.products);

    res.json(algoliaResponse);
  } catch (error) {
    res.status(400).send(error);
  }
}
