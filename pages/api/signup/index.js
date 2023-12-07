import dbConnect from "../../../utils/dbConnect";
import User from "../../../models/users";
import bcrypt from "bcryptjs";

dbConnect();

export default async function Signup(req, res) {
    if (req.method === "POST") {
        try {
            if (req.body['email']) {
                const existingUser = await User.findOne({ email: req.body['email'] });
                if (existingUser) {
                    return res.status(200).json({ message: 'User exists' });
                } else {
                    if (!req.body['password']) {
                        return res.status(500).json({
                            message: "Password is missing"
                        });
                    } else if (!req.body['type']) {
                        return res.status(500).json({
                            message: "Type is missing"
                        });
                    } else {
                        const newUserData = {
                            email: '', password: '',
                            type: '', doneOn: new Date()
                        };
                        newUserData['email'] = req.body['email'];
                        newUserData['type'] = req.body['type'];
                        const hashedPassword = await bcrypt.hash(req.body['password'], 10);
                        if (hashedPassword) {
                            newUserData['password'] = hashedPassword;
                            const newUser = new User(newUserData);
                            await newUser.save();
                            console.log('new: ', newUserData);
                            return res.status(201).json({
                                message: `${newUserData.type} created successfully for ${newUser}`,
                                newUser: newUser
                            });
                        } else {
                            return res.status(500).json({
                                message: "Error hashing the password"
                            });
                        }
                    }
                }
            }
        } catch (error) {
            return res.status(500).json({
                message: 'Error creating the item',
                error: error.message
            });
        }
    } else if (req.method === "GET") {
        try {
            const items = await User.find({}).sort({ doneOn: -1 });
            return res.status(200).json(items);
        } catch (error) {
            return res.status(500).json({
                message: `Error retrieving items`,
                error: error.message
            });
        }
    } else {
        return res.status(405).json({ message: "Method not allowed" });
    }
}
