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
        'tags',
        'name_suffixes'
      ],
      highlightPreTag: '<em class="nv-search-highlight">',
      highlightPostTag: '</em>',
      queryType: 'prefixAll'
    });

    const formattedData = req.body.products.map((o: any) => {
      let name = o.name;
      o.name_suffixes = [];

      while (name && name.length > 1) {
        name = name.substr(1);
        o.name_suffixes.push(name);
      }

      return o;
    });

    const algoliaResponse = await index.replaceAllObjects(formattedData);

    res.json(algoliaResponse);
  } catch (error) {
    res.status(400).send(error);
  }
}
