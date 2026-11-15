import { expect, Locator, Page } from '@playwright/test'
import { Button } from '../atoms/Button'

export class SuccessOrderPopup {
  readonly page: Page
  readonly popupContainer: Locator
  readonly title: Locator
  readonly okButton: Button
  readonly popupCloseButton: Button

  constructor(page: Page, dataTestId:string) {
    this.page = page
    this.popupContainer = page.getByTestId(dataTestId)
    this.title = this.popupContainer.getByText('Order has been created!')
    this.okButton = new Button(page, 'orderSuccessfullyCreated-popup-ok-button') //page.getByTestId('openStatusPopup-button')
    this.popupCloseButton = new Button(page, 'orderSuccessfullyCreated-popup-close-button')
  }

  async checkVisible(visible = true): Promise<void> {
    await expect(this.popupContainer).toBeVisible({ visible: visible })
  }
  async close() {
    await this.okButton.click()
  }
}
