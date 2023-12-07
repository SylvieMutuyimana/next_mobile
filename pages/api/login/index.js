import dbConnect from '../../../utils/dbConnect';
import User from '../../../models/users';
import bcrypt from 'bcryptjs'; 
import jwt from 'jsonwebtoken';

dbConnect();

export default async function Login(req, res) {
    console.log('method1: ', req.method);

    if (req.method === 'POST') {
        try {
            const { email, password } = req.body;
            console.log('Received email:', email);
            console.log('Received password:', password);
            if (!email) {
                return res.status(401).json({ message: 'Email missing' });
            }
            // Check if the user exists
            const user = await User.findOne({ email });

            if (!user) {
                return res.status(401).json({ message: 'Account does not exist' });
            }

            // Verify the password
            if (!password) {
                return res.status(401).json({ message: 'Password missing' });
            }
            const isPasswordValid = await bcrypt.compare(password, user.password); 
            // Use bcryptjs for password comparison
            console.log(password, "=", user.password);
            if (!isPasswordValid) {
                console.log('issues with password')
                return res.status(401).json({ message: 'Wrong password for the email' });
            } else {
                try {
                        // Generate a JWT token for authentication
                        const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
                            expiresIn: '1h', 
                        });
                        const the_user = {_id: user._id, type: user.type}
                        res.status(200).json({ message: 'Login successful', the_user , token });
                    } catch (error) {
                        res.status(500).json({ message: `error: ${error}` });
                }
            }
        } catch (error) {
            console.error('Error during login:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
