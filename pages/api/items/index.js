// Appointment.js
import dbConnect from "../../../utils/dbConnect";
import the_handler from "../get_post";
import Items from "../../../models/items";

dbConnect();

export default function handler(req, res) {
  const fields = ['name','image','amount','seller', 'description', 'status', 'doneOn']  
  the_handler('booking', Items, fields, req, res);
}
