import dbConnect from "../../utils/dbConnect";
dbConnect();

export default async function the_handler(name, the_module, fields, req, res) {
  if (req.method === "POST") {
    try {
      const newItemData = {};
      for (const field of fields) {
        if (req.body[field]) {
          newItemData[field] = req.body[field];
        }
      }
      const the_checkers = {
        'vehicles': 'name', 'drivers': 'drivingLicense','vehicleGroups':'name', 'reminders':'title'
      };
      
      const existing = async (key, item) => await the_module.findOne({ [key]: item });
      const exist_key = the_checkers[name];
      const exist_item = req.body[exist_key];
      let exists
      if (exist_key){
        console.log('here: ', exist_key, exist_item)
        exists = await existing(exist_key, exist_item); 
        console.log('here: :', exists)
      }
      if (exists) {
        res.status(201).json({ message: `${name} with ${exist_key}: ${exist_item} exist(s)` });
      } else {
        const newItem = new the_module(req.body); 
        await newItem.save();
        res.status(200).json({ message: `${name} created successfully`, newItem });
      }
      
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error creating item", error: error.message });
    }
  } else if (req.method === "GET") {
    try {
      const items = await the_module.find({}).sort({ doneOn: -1 });
      res.status(200).json(items);
    } catch (error) {
      res
        .status(500)
        .json({ message: `Error retrieving ${name}`, error: error.message });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
