import dbConnect from "../../../utils/dbConnect";
import put_delete from "../put_delete";
import Purchases from "../../../models/purchases";

dbConnect();

export default async function handler(req, res) {
  const { query: { id }} = req;
  const fields = ['item','buyer', 'seller', 'date', 'status', 'doneOn']  
  console.log("id: ", id)
  put_delete('purchases', Purchases, fields, req, res);
}
