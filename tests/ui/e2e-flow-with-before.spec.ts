import { test } from '@playwright/test'
import { LoginPage } from '../../pom/pages/LoginPage'
import { faker } from '@faker-js/faker/locale/en'
import { PASSWORD, USERNAME } from '../../config/env-data'
import { OrderPage } from '../../pom/pages/OrderPage'

let loginPage: LoginPage

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page)
  await loginPage.open()
})

test('TL-17-3 signIn button disabled when incorrect data inserted', async ({}) => {
  await loginPage.usernameField.fill(faker.lorem.word(2))
  await loginPage.passwordField.fill(faker.lorem.word(7))
  await loginPage.signInButton.checkVisible()
  await loginPage.signInButton.checkEnabled(false)
})

test('TL-17-4 error message displayed when incorrect credentials used', async ({}) => {
  await loginPage.usernameField.fill(faker.lorem.word(2))
  await loginPage.passwordField.fill(faker.lorem.word(8))
  await loginPage.signInButton.click()
  await loginPage.errorPopup.checkVisible()
  await loginPage.errorPopup.errorMessage.isVisible()
})

test('TL-17-5 login with correct credentials and verify order creation page', async ({ page }) => {
  const orderCreationPage = new OrderPage(page)
  await loginPage.signIn(USERNAME, PASSWORD)
  await orderCreationPage.statusButton.checkVisible()
  await orderCreationPage.usernameField.checkVisible()
  await orderCreationPage.phoneField.checkVisible()
  await orderCreationPage.commentField.checkVisible()
})

test('TL-17-6 login and create order', async ({ page }) => {
  const orderCreationPage = new OrderPage(page)
  await loginPage.signIn(USERNAME, PASSWORD)
  await orderCreationPage.usernameField.fill(faker.lorem.word(2))
  await orderCreationPage.phoneField.fill(faker.lorem.word(6))
  await orderCreationPage.commentField.fill(faker.lorem.word(8))
  await orderCreationPage.orderButton.click()
  await orderCreationPage.successPopup.checkVisible()
  await orderCreationPage.successPopup.title.isVisible()
  await orderCreationPage.successPopup.okButton.click()
})

//Вход и проверка ошибок валидации при создании заказа
test('TL-17-7 login and create order', async ({ page }) => {
  const orderCreationPage = new OrderPage(page)
  await loginPage.signIn(USERNAME, PASSWORD)
  await orderCreationPage.usernameField.fill(faker.lorem.word(1))
  await orderCreationPage.errorUsername.isVisible()
  await orderCreationPage.phoneField.fill(faker.lorem.word(1))
  await orderCreationPage.errorPhone.isVisible()
})

// Выход из системы
test('TL-17-8 logout', async ({ page }) => {
  const orderCreationPage = new OrderPage(page)
  await loginPage.signIn(USERNAME, PASSWORD)
  await orderCreationPage.logoutButton.checkVisible()
  await orderCreationPage.logoutButton.click()
  await loginPage.signInButton.checkVisible()
})
