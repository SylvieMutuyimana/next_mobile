// Appointment.js
import dbConnect from "../../../utils/dbConnect";
import the_handler from "../get_post";
import Categories from "../../../models/categories";

dbConnect();

export default function handler(req, res) {
  const fields = ['name', 'doneOn']  
  the_handler('categories', Categories, fields, req, res);
}
