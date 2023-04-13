const User = require('../models/User');
const mongoose = require('mongoose');


const stripe = require('stripe')(process.env.STRIPE_SECRET);
const DOMAIN = "http://localhost:3000";
const timer = ms => new Promise(res => setTimeout(res, ms));

exports.createPortal = async (req, res) => {
    const {customerId} = req.body;
    try {
        const portalSession = await stripe.billingPortal.sessions.create({
            customer: customerId,
            return_url: `${DOMAIN}/`
        });
        // Return the portal URL instead of the entire portalSession object
        return res.status(200).json({ url: portalSession.url });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: err.message });
    }
}


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
                        subscription: sub
                    
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

exports.createWebhook = async (req, res) => {
        const sig = req.headers['stripe-signature'];
        let event;
        const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
        try {
            event = stripe.webhooks.constructEvent(req.rawBody, sig, endpointSecret);
        } catch (err) {
            console.log(err.message);
            return res.status(400).send(`Webhook Error: ${err.message}`);
        }

        console.log("Event:", event.type);

        switch (event.type) {
            case 'checkout.session.completed': {
                try {
                    console.log("Checkout session completed");
                    const user_id = new mongoose.Types.ObjectId(event.data.object.metadata.user_id);
                    const subscription = event.data.object.metadata.subscription;
            
                    console.log("User ID:", user_id); // Add this log
                    console.log("Subscription:", subscription); // Add this log
            
                    await stripe.customers.update(
                        event.data.object.customer,
                        { metadata: { user_id: user_id, sub: subscription } }
                    );
            
                    const user = await User.findOne({ _id: user_id });
                    const subscription_id = event.data.object.subscription;
            
                    const stripeSubscription = await stripe.subscriptions.retrieve(subscription_id);
                    
                    // Update the user's subscription with the metadata subscription value
                    user.subscription = subscription;
                    
                    user.customerId = event.data.object.customer;
                    await user.save();
                    console.log("User updated:", user); // Add this log
                } catch (err) {
                    console.log(err);
                    return res.status(404).send(`Webhook error: ${err.message}`);
                }
            
                break;
            }
            
            
            case 'payment_intent.payment_failed': {
                try {
                    await timer(3000);
                    const customer_id = event.data.object.customer;
                    console.log("Payment intent failure");
                    const customer = await stripe.customers.retrieve(customer_id);
                    const user = await User.findOne({ customerId: customer_id});
                    user.subscription = "";
                    await user.save();
                    
                } catch (err) {
                    console.log(err);
                    return res.status(400).send(`Webhook error: ${err.message}`);
                }

                break;
            }
            case 'customer.subscription.deleted': {
                try {
                    console.log("customer subscription deleted");
                    await timer(3000);
                    const customer_id = event.data.object.customer;

                    const user = await User.findOne({ customerId: customer_id });
                    user.subscription = "";
                    await user.save();

                } catch (err) {
                    console.log(err);
                    return res.status(400).send(`Webhook error: ${err.message}`);
                }

                break;
            }
            case 'customer.deleted': {
                try {
                    console.log("customer deleted");
                    const customer_id = event.data.object.customer;
                    const user = await User.findOne({ customerId: customer_id });
                    user.customerId = "";
                    user.subscription = "";
                    await user.save();

                } catch (err) {
                    console.log(err);
                    return res.status(400).send(`Webhook error: ${err.message}`);
                }

                break;
            }
            default:
                // Unexpected event type
                return res.status(400).end();
        }
        res.json({ received: true });
}
