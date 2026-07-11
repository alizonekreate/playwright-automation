class CheckoutPage {
  constructor(page) {
    this.page = page;

    // checkout form
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');

    // order summary
    this.finishButton = page.locator('[data-test="finish"]');
    this.totalLabel = page.locator('[data-test="total-label"]');

    // confirmation
    this.confirmationContainer = page.locator('[data-test="checkout-complete-container"]');
    this.confirmationTitle = page.locator('[data-test="title"]');
  }

  async fillCheckoutForm(firstName, lastName, postalCode) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }

  async continueToSummary() {
    await this.continueButton.click();
  }

  async finishOrder() {
    await this.finishButton.click();
  }

  async getTotal() {
    return await this.totalLabel.textContent();
  }

  async getConfirmationTitle() {
    return await this.confirmationTitle.textContent();
  }

  async isOrderComplete() {
    return await this.confirmationContainer.isVisible();
  }
}

module.exports = { CheckoutPage };