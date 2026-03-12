// Mysticloak - Stripe Checkout Integration
// See STRIPE-SETUP.md for configuration instructions

// Replace with your Stripe Publishable Key
const STRIPE_PUBLISHABLE_KEY = 'pk_test_REPLACE_WITH_YOUR_KEY';

// Optional: Add Stripe Shipping Rate IDs here
const SHIPPING_RATES = [
  // 'shr_XXXXXXXXXXXXX'  // Uncomment and add your shipping rate ID
];

// Get the base URL for redirects
function getBaseUrl() {
  const url = new URL(window.location.href);
  const pathParts = url.pathname.split('/');
  pathParts.pop(); // Remove current file
  return url.origin + pathParts.join('/') + '/';
}

// Redirect to Stripe Checkout
async function redirectToStripeCheckout(priceId) {
  if (STRIPE_PUBLISHABLE_KEY === 'pk_test_REPLACE_WITH_YOUR_KEY') {
    alert(
      'Stripe is not configured yet!\n\n' +
      '1. Create a Stripe account at stripe.com\n' +
      '2. Get your Publishable Key from the dashboard\n' +
      '3. Update STRIPE_PUBLISHABLE_KEY in js/stripe-checkout.js\n' +
      '4. See STRIPE-SETUP.md for full instructions'
    );
    return;
  }

  if (priceId === 'price_REPLACE_WITH_REAL_ID') {
    alert(
      'This product doesn\'t have a Stripe Price ID yet.\n\n' +
      'Create the product in your Stripe dashboard and update\n' +
      'the stripePriceId in js/products.js'
    );
    return;
  }

  try {
    const stripe = Stripe(STRIPE_PUBLISHABLE_KEY);
    const baseUrl = getBaseUrl();

    const checkoutOptions = {
      lineItems: [{ price: priceId, quantity: 1 }],
      mode: 'payment',
      successUrl: baseUrl + 'success.html',
      cancelUrl: baseUrl + 'canceled.html',
      shippingAddressCollection: {
        allowedCountries: ['US', 'CA', 'GB', 'AU', 'NZ', 'DE', 'FR', 'IT', 'ES', 'NL', 'SE', 'NO', 'DK', 'FI', 'IE', 'AT', 'BE', 'CH', 'JP']
      }
    };

    // Add shipping rates if configured
    if (SHIPPING_RATES.length > 0) {
      checkoutOptions.shippingRates = SHIPPING_RATES;
    }

    const { error } = await stripe.redirectToCheckout(checkoutOptions);

    if (error) {
      console.error('Stripe Checkout error:', error);
      alert('Something went wrong. Please try again.');
    }
  } catch (err) {
    console.error('Stripe error:', err);
    alert('Payment system encountered an error. Please try again later.');
  }
}
