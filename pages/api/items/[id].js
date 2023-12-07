import Items from "../../../models/items";
import dbConnect from "../../../utils/dbConnect";
import put_delete from "../put_delete";

dbConnect();

export default async function handler(req, res) {
  const { query: { id }} = req;
  const fields = ['name','image','amount','seller', 'description', 'status', 'doneOn']  
  console.log("id: ", id)
  put_delete('items', Items, fields, req, res);
}
