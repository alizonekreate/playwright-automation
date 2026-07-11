const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');
const { CartPage } = require('../pages/CartPage');
const { CheckoutPage } = require('../pages/CheckoutPage');
const users = require('../test-data/users.json');

test.describe('End to End Tests', () => {

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(
      users.validUser.username,
      users.validUser.password
    );
  });

  test('E2E-001 - Complete purchase flow from login to order confirmation', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    // add item to cart
    await inventoryPage.addToCartByName('Sauce Labs Backpack');
    const cartCount = await inventoryPage.getCartCount();
    expect(cartCount).toBe('1');

    // go to cart and verify item
    await inventoryPage.goToCart();
    const items = await cartPage.getCartItems();
    expect(items).toContain('Sauce Labs Backpack');

    // checkout
    await cartPage.checkout();
    await checkoutPage.fillCheckoutForm(
      users.checkoutInfo.firstName,
      users.checkoutInfo.lastName,
      users.checkoutInfo.postalCode
    );
    await checkoutPage.continueToSummary();

    // verify order summary
    const total = await checkoutPage.getTotal();
    expect(total).toContain('Total');

    // finish order
    await checkoutPage.finishOrder();

    // verify confirmation
    const isComplete = await checkoutPage.isOrderComplete();
    expect(isComplete).toBe(true);

    const confirmationTitle = await checkoutPage.getConfirmationTitle();
    expect(confirmationTitle).toBe('Checkout: Complete!');
  });

  test('E2E-002 - Sort products and purchase the cheapest item', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    // sort by price low to high
    await inventoryPage.sortBy('lohi');

    // add first item (cheapest)
    await inventoryPage.addToCartByName('Sauce Labs Onesie');
    const cartCount = await inventoryPage.getCartCount();
    expect(cartCount).toBe('1');

    // go to cart and verify
    await inventoryPage.goToCart();
    const items = await cartPage.getCartItems();
    expect(items).toContain('Sauce Labs Onesie');

    // checkout
    await cartPage.checkout();
    await checkoutPage.fillCheckoutForm(
      users.checkoutInfo.firstName,
      users.checkoutInfo.lastName,
      users.checkoutInfo.postalCode
    );
    await checkoutPage.continueToSummary();

    // finish order
    await checkoutPage.finishOrder();

    // verify confirmation
    const isComplete = await checkoutPage.isOrderComplete();
    expect(isComplete).toBe(true);
  });

  test('E2E-003 - Add multiple items, remove one, checkout remaining', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    // add two items
    await inventoryPage.addToCartByName('Sauce Labs Backpack');
    await inventoryPage.addToCartByName('Sauce Labs Bike Light');
    const cartCount = await inventoryPage.getCartCount();
    expect(cartCount).toBe('2');

    // go to cart and verify both items
    await inventoryPage.goToCart();
    const itemsBefore = await cartPage.getCartItems();
    expect(itemsBefore).toContain('Sauce Labs Backpack');
    expect(itemsBefore).toContain('Sauce Labs Bike Light');

    // remove one item
    await cartPage.removeItem();

    // verify only one item remains
    const itemsAfter = await cartPage.getCartItems();
    expect(itemsAfter).toHaveLength(1);

    // checkout
    await cartPage.checkout();
    await checkoutPage.fillCheckoutForm(
      users.checkoutInfo.firstName,
      users.checkoutInfo.lastName,
      users.checkoutInfo.postalCode
    );
    await checkoutPage.continueToSummary();

    // finish order
    await checkoutPage.finishOrder();

    // verify confirmation
    const isComplete = await checkoutPage.isOrderComplete();
    expect(isComplete).toBe(true);

    const confirmationTitle = await checkoutPage.getConfirmationTitle();
    expect(confirmationTitle).toBe('Checkout: Complete!');
  });

});