import { expect, Locator, Page } from '@playwright/test'
import { Button } from '../atoms/Button'

export class AuthErrorPopup {
  readonly page: Page
  readonly popupContainer: Locator
  readonly errorMessage: Locator
  readonly popupCloseButton: Button

  constructor(page: Page, dataTestId: string) {
    this.page = page
    this.popupContainer = page.getByTestId(dataTestId)
    this.errorMessage = this.popupContainer.getByText('Incorrect credentials')
    this.popupCloseButton = new Button(page, 'authorizationError-popup-close-button')
  }

  async checkVisible (visible = true): Promise<void> {
    await expect(this.popupContainer).toBeVisible({ visible: visible })
  }
  async close() {
    await this.popupCloseButton.click()
  }
}
