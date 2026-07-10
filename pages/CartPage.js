class CartPage {
  constructor(page) {
    this.page = page;

    // locators
    this.cartItems = page.locator('[data-test="inventory-item-name"]');
    this.removeButton = page.locator('[data-test="remove-sauce-labs-backpack"]');
    this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.itemQuantity = page.locator('[data-test="item-quantity"]');
  }

  async getCartItems() {
    return await this.cartItems.allTextContents();
  }

  async getItemQuantity() {
    return await this.itemQuantity.textContent();
  }

  async removeItem() {
    await this.removeButton.click();
  }

  async continueShopping() {
    await this.continueShoppingButton.click();
  }

  async checkout() {
    await this.checkoutButton.click();
  }

  async isCartEmpty() {
    const count = await this.cartItems.count();
    return count === 0;
  }
}

module.exports = { CartPage };