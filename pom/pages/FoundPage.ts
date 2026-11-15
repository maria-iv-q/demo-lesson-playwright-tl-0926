import { expect, Locator, Page } from '@playwright/test'
import { Button } from '../atoms/Button'
import { Input } from '../atoms/Input'
import { BasePage } from './BasePage'

export class FoundPage extends BasePage {
  readonly page: Page
  readonly orderDetailsBlock: Locator

  constructor(page: Page) {
    super(page)
    this.page = page
    this.orderDetailsBlock = page.locator('.order-details')
  }
  async checkFoundPageVisible(visible = true): Promise<void> {
    await expect(this.orderDetailsBlock).toBeVisible({ visible })
  }
}
