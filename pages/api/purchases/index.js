// Appointment.js
import dbConnect from "../../../utils/dbConnect";
import the_handler from "../get_post";
import Purchases from "../../../models/purchases";

dbConnect();

export default function handler(req, res) {
  const fields = ['item','buyer', 'seller', 'date', 'status', 'doneOn']  
  the_handler('booking', Purchases, fields, req, res);
}
