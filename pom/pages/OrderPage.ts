import { Locator, Page } from '@playwright/test'
import { Button } from '../atoms/Button'
import { Input } from '../atoms/Input'
import {SuccessOrderPopup} from '../molecule/SuccessOrderPopup'

export class OrderPage {
  readonly page: Page
  readonly statusButton: Button
  readonly usernameField: Input
  readonly phoneField: Input
  readonly commentField: Input
  readonly orderButton: Button
  readonly successPopup: SuccessOrderPopup
  readonly logoutButton: Button
  readonly errorUsername: Locator
  readonly errorPhone: Locator

  constructor(page: Page) {
    this.page = page
    this.statusButton = new Button(page, 'openStatusPopup-button') //page.getByTestId('openStatusPopup-button')
    this.usernameField = new Input(page, 'username-input')
    this.phoneField = new Input(page, 'phone-input')
    this.commentField = new Input(page, 'comment-input')
    this.orderButton = new Button(page, 'createOrder-button')
    this.successPopup = new SuccessOrderPopup(page, 'orderSuccessfullyCreated-popup')
    this.logoutButton = new Button(page, 'logout-button')
    this.errorUsername = page.getByTestId('username-input-error')
    this.errorPhone = page.getByTestId('phone-input-error')
  }
}
