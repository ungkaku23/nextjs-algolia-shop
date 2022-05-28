// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
const { default: SleekShop } = require("@trefox/sleekshop-js");
const sleekShop = new SleekShop("https://maxundmurat.sleekshop.net", "maxundmurat_HcDbZqlx83ZKoyjyU7WT", "AJCEU136IYanex2BZRuy", "PJkHatIN4X98Agj3l41Y");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(req.body.invoke);
  const data = await eval(req.body.invoke);
  res.json(data);
}
