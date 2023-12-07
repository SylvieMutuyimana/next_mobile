// users/[id].js
import dbConnect from "../../../utils/dbConnect";
import User from "../../../models/users";
import put_delete from "../put_delete";

dbConnect();

export default async function handler(req, res) {
  const { method, query: { id } } = req;

  if (method === "GET") {
    try {
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving user', error: error.message });
    }
  }  else{
    const fields = ["name", "email", "password"]
    console.log("id: ", id)
    put_delete('user', User, fields, req, res);
  } 
}
