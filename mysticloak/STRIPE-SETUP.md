# Stripe Setup Guide for Mysticloak

## Step 1: Create a Stripe Account
1. Go to https://stripe.com and click "Start now"
2. Complete the registration process
3. You'll start in **test mode** (toggle in top-right of dashboard)

## Step 2: Get Your API Keys
1. In the Stripe Dashboard, go to **Developers > API keys**
2. Copy your **Publishable key** (starts with `pk_test_...`)
3. Open `js/stripe-checkout.js` and replace the placeholder key:
   ```js
   const STRIPE_PUBLISHABLE_KEY = 'pk_test_YOUR_KEY_HERE';
   ```

## Step 3: Create Products & Prices
For each product you sell:

1. Go to **Products** in the Stripe Dashboard
2. Click **+ Add product**
3. Fill in:
   - **Name**: e.g., "Midnight Velvet Cloak"
   - **Description**: Product description
   - **Image**: Upload a product photo
   - **Price**: Set the price (one-time payment)
4. After saving, click on the product, then click on the price
5. Copy the **Price ID** (starts with `price_...`)
6. Update the matching product in `js/products.js`:
   ```js
   stripePriceId: 'price_XXXXXXXXXXXXX',
   ```

## Step 4: Set Up Shipping Rates (Optional)
1. Go to **Products > Shipping rates**
2. Click **+ Add shipping rate**
3. Set up your shipping options (e.g., "Standard Shipping - $5.00")
4. Copy the **Shipping Rate ID** (starts with `shr_...`)
5. Add it to `js/stripe-checkout.js` in the `shippingRates` array

## Step 5: Test a Purchase
1. Make sure you're in **test mode** (dashboard shows "Test mode" banner)
2. Browse your shop and click "Buy Now" on a product
3. Use Stripe's test card: `4242 4242 4242 4242`
   - Any future expiry date
   - Any 3-digit CVC
   - Any name and address
4. Complete the purchase - you should be redirected to success.html
5. Check the Stripe Dashboard under **Payments** to see the test payment

## Step 6: Go Live
When ready to accept real payments:
1. Complete your Stripe account activation (provide business details, bank account)
2. Toggle from "Test mode" to "Live mode" in the dashboard
3. Copy your **live** Publishable key (`pk_live_...`)
4. Update `js/stripe-checkout.js` with the live key
5. Create your products again in live mode (or copy from test mode)
6. Update all `stripePriceId` values in `js/products.js` with live Price IDs

## Alternative: Payment Links (Simpler Option)
If you prefer not to use Stripe Checkout integration:
1. In Stripe Dashboard, go to **Payment Links**
2. Create a payment link for each product
3. Use those links directly as your "Buy Now" button hrefs
4. No JavaScript integration needed!

## Important Notes
- **Never expose your Secret Key** (`sk_...`) in frontend code
- The Publishable Key (`pk_...`) is safe to use in frontend code
- Test mode and live mode have separate keys and separate product catalogs
- Stripe handles all PCI compliance - you never touch card data
