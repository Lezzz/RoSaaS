const User = require('../models/User');

const stripe = require('stripe')(process.env.STRIPE_SECRET);
const DOMAIN = "http://localhost:3000";

exports.createCheckout = async (req, res) => {
    const {priceId, sub} = req.body;

    try {

        const user = await User.findById(req.user);
        const session = await stripe.checkout.sessions.create({
            mode: "subscription",
            line_items: [
                {
                    price: priceId,
                    quantity: 1,

                }
            ], 
            metadata: { 
                        user_id: JSON.stringify(user._id).substring(1, JSON.stringify(user._id).length - 1),
                        subscrription: sub
                    
            },
            success_url: `${DOMAIN}/`,
            cancel_url: `${DOMAIN}/`,
            automatic_tax: {enabled: true},
        }); 
        return res.status(200).json({ session });

    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: err.message });
    }
        
}