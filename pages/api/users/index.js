//User.js
import dbConnect from "../../../utils/dbConnect";
import User from "../../../models/users";

dbConnect();

export default async function handler(req, res) {
    if (req.method === "GET") {
        try {
            const users = await User.find({}).sort({ doneOn: -1 });
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving user', error: error.message });
        }
    }else if(req.method === 'DELETE'){
        try {
            const { type } = req.body;
            if (!type) {
                return res.status(400).json({ message: 'Specify "type" in the request body' });
            }
            const result = await User.deleteMany({ type: type });
            const deletedCount = result.deletedCount;
            res.status(200).json({ message: `${deletedCount} ${type} deleted` });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting users', error: error.message });
        }
    }else {
        res.status(405).json({ message: "Method not allowed" });
    }
}
