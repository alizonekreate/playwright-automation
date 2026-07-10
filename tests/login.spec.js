const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');
const users = require('../test-data/users.json');

test.describe('Login Feature', () => {

  test('TC-001 - Login with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.goto();
    await loginPage.login(users.validUser.username, users.validUser.password);

    const title = await inventoryPage.getTitle();
    expect(title).toBe('Products');
  });

  test('TC-002 - Login with invalid password', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(users.invalidUser.username, users.invalidUser.password);

    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain('Username and password do not match');
  });

  test('TC-003 - Login with empty username', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('', users.validUser.password);

    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain('Username is required');
  });

  test('TC-004 - Login with empty password', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(users.validUser.username, '');

    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain('Password is required');
  });

  test('TC-005 - Login with locked out user', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(users.lockedUser.username, users.lockedUser.password);

    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain('Sorry, this user has been locked out');
  });

  test('TC-006 - Logout from the application', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.goto();
    await loginPage.login(users.validUser.username, users.validUser.password);
    await inventoryPage.logout();

    await expect(page).toHaveURL('https://www.saucedemo.com/');
  });

});