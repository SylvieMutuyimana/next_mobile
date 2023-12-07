import dbConnect from "../../utils/dbConnect";
import { hash_pass } from "./signup";
dbConnect();

export default async function put_delete(name, the_module, fields, req, res) {
  console.log('here23e');
  const { query: { id }, method, body } = req;
  console.log('here');
  console.log("method: ", method);
  switch (method) {
    case "PUT":
      try {
        const item = await the_module.findById(id);
        if (!item) {
          return res.status(404).json({ message: `${name} not found` });
        }
        for (const field of fields) {
          if (body[field] !== undefined) {
            if (name === "user") {
              if(field === "email"){
                const existingUser = await the_module.findOne({ email: body[field] });
                if (existingUser) {
                  return res.status(200).json({ message: 'A hospital with the specified email exists' });
                }else{
                  item[field] = body[field];
                }
              }else if(field === "password"){
                item[field] = await hash_pass(body[field]);
              }
            }else{
              item[field] = body[field];
            }
          }
        }
        await item.save();
        res.status(200).json({ message: `${name} updated successfully, ${item}` });
      } catch (error) {
        res.status(500).json({
          message: `Error updating ${name}`,
          error: error.message,
        });
      }
      break;
    case "DELETE":
      try {
        const deletedItems = await the_module.findByIdAndDelete(id);
        if (!deletedItems) {
          return res.status(404).json({ message: `${name}: ${id} not found` });
        }
        res.status(200).json({ message: `${name}: ${id} deleted successfully` });
      } catch (error) {
        res.status(500).json({
          message: `Error deleting ${name}: ${id}`,
          error: error.message,
        });
      }
      break;
    default:
      res.status(405).json({ message: `Method ${method} not allowed` });
      break;
  }
}
