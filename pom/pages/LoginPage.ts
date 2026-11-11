import { Locator, Page } from '@playwright/test'
import { OrderPage } from '../../pom/pages/OrderPage'
import { SERVICE_URL } from '../../config/env-data'
import { Button } from '../atoms/Button'
import {AuthErrorPopup} from '../molecule/AuthErrorPopup'

export class LoginPage {
  readonly page: Page
  readonly url: string = SERVICE_URL
  readonly signInButton: Button
  readonly usernameField: Locator
  readonly passwordField: Locator
  readonly  errorPopup: AuthErrorPopup
  // add more locators here

  constructor(page: Page) {
    this.page = page
    this.signInButton = new Button(page, 'signIn-button') // page.getByTestId('signIn-button')
    this.usernameField = page.getByTestId('username-input')
    this.passwordField = page.getByTestId('password-input')
    this.errorPopup = new AuthErrorPopup(page, 'authorizationError-popup')
  }

  async open() {
    await this.page.goto(this.url)
  }

  async signIn(username: string, password: string): Promise<void> {
    await this.usernameField.fill(username)
    await this.passwordField.fill(password)
    await this.signInButton.click()
  }

  // continue with the rest of the implementation below
}
