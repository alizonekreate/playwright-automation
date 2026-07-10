const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');
const { CartPage } = require('../pages/CartPage');
const users = require('../test-data/users.json');

test.describe('Shopping Cart Feature', () => {

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(users.validUser.username, users.validUser.password);
  });

  test('TC-009 - Add a single item to the cart', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);

    await inventoryPage.addToCartByName('Sauce Labs Backpack');
    const cartCount = await inventoryPage.getCartCount();

    expect(cartCount).toBe('1');
  });

  test('TC-010 - Add multiple items to the cart', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);

    await inventoryPage.addToCartByName('Sauce Labs Backpack');
    await inventoryPage.addToCartByName('Sauce Labs Bike Light');
    await inventoryPage.addToCartByName('Sauce Labs Bolt T-Shirt');
    const cartCount = await inventoryPage.getCartCount();

    expect(cartCount).toBe('3');
  });

  test('TC-011 - Remove an item from the product listing page', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);

    await inventoryPage.addToCartByName('Sauce Labs Backpack');
    await inventoryPage.removeFromCartByName('Sauce Labs Backpack');
    const cartCount = await inventoryPage.getCartCount();

    expect(cartCount).toBe('0');
  });

  test('TC-012 - View cart contents', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    await inventoryPage.addToCartByName('Sauce Labs Backpack');
    await inventoryPage.goToCart();

    const items = await cartPage.getCartItems();
    expect(items).toContain('Sauce Labs Backpack');
  });

  test('TC-013 - Remove an item from the cart page', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    await inventoryPage.addToCartByName('Sauce Labs Backpack');
    await inventoryPage.goToCart();
    await cartPage.removeItem();

    const isEmpty = await cartPage.isCartEmpty();
    expect(isEmpty).toBe(true);
  });

  test('TC-014 - Continue shopping from cart page', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    await inventoryPage.addToCartByName('Sauce Labs Backpack');
    await inventoryPage.goToCart();
    await cartPage.continueShopping();

    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  });

  test('TC-015 - Proceed to checkout from cart page', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    await inventoryPage.addToCartByName('Sauce Labs Backpack');
    await inventoryPage.goToCart();
    await cartPage.checkout();

    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html');
  });

});