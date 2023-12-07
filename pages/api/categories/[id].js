import dbConnect from "../../../utils/dbConnect";
import put_delete from "../put_delete";
import Categories from "../../../models/categories";

dbConnect();

export default async function handler(req, res) {
  const { query: { id }} = req;
  const fields = ['name', 'doneOn']  
  console.log("id: ", id)
  put_delete('categories', Categories, fields, req, res);
}
