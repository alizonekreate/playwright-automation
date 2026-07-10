class InventoryPage {
    constructor(page) {
        this.page = page;

    //locators
    this.title = page.locator('[data-test="title"]');
    this.productList = page.locator('[data-test="inventory-list"]');
    this.cartIcon = page.locator('[data-test="shopping-cart-link"]');
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    this.menuButton = page.locator('#react-burger-menu-btn');
    this.logoutLink = page.locator('#logout_sidebar_link');
     this.sortDropdown = page.locator('[data-test="product-sort-container"]');
  }

  async getTitle() {
    return await this.title.textContent();
  }
  
  async addToCartByName(productName) {
    const product = this.page
    .locator('.inventory_item')
    .filter({hasText: productName});
    await product.locator('button').click(); 
  }

  async removeFromCartByName(productName) {
    const product = this.page
    .locator('.inventory_item')
    .filter({hasText: productName});
    await product.locator('button').click();
  }

  async getCartCount() {
    const badge = this.cartBadge;
    const isVisible = await badge.isVisible();
    if (isVisible) {
        return await badge.textContent();
    }
    return '0';
  }
  async goToCart() {
    await this.cartIcon.click();
  }

  async logout() {
    await this.menuButton.click();
    await this.logoutLink.click();
  }

  async sortBy(option) {
    await this.sortDropdown.selectOption(option);
  }
}

module.exports = { InventoryPage };