import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://google.com/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Google/);
});

test('probar text box', async ({ page }) => {
  await page.goto('https://demoqa.com/');

  await page.getByRole('heading', { name: 'Elements'}).click();
  // Expect a title "to contain" a substring.
  //div[@id='app']//header
  await page.locator("//span[contains(text(), 'Text Box')]").click();
});

test('Probar componente text box y formulario GRABANDO', async ({ page }) => {
  await page.goto('https://demoqa.com/');
  await page.getByRole('heading', { name: 'Elements' }).click();
  await page.getByText('Text Box').click();
  await page.getByPlaceholder('Full Name').fill('pepito Montoya'); // campo 1
  await page.getByPlaceholder('name@example.com').fill('pepito@prueba.com');
  await page.getByPlaceholder('Current Address').fill('prueba current');
  await page.locator('#permanentAddress').fill('prueba address');
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.locator('#email')).toContainText('Email:pepito@prueba.com');
});

test('test grabado', async ({ page }) => {
  await page.goto('https://demoqa.com/');
  await page.getByRole('heading', { name: 'Elements' }).click();
  await page.getByText('Text Box').click();
  await page.getByPlaceholder('Full Name').click();
  await page.getByPlaceholder('Full Name').fill('juan carlos hernandez');
  await page.getByPlaceholder('Full Name').press('Tab');
  await page.getByPlaceholder('name@example.com').fill('juanc.nandez@gmail.com');
  await page.getByPlaceholder('name@example.com').press('Tab');
  await page.getByPlaceholder('Current Address').fill('cl 19 sur # 52c 19');
  await page.getByPlaceholder('Current Address').press('Tab');
  await page.locator('#permanentAddress').fill('same as below');
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByText('Name:juan carlos hernandez').click();
});


test('test grabacion botones', async ({ page }) => {
  await page.goto('https://demoqa.com/');
  await page.getByRole('heading', { name: 'Elements' }).click();
  await page.getByText('Buttons').click();
  await page.getByRole('button', { name: 'Double Click Me' }).dblclick();
  await expect(page.locator('#doubleClickMessage')).toContainText('You have done a double click');
  await page.getByRole('button', { name: 'Right Click Me' }).click({
    button: 'right'
  });
  await expect(page.locator('#rightClickMessage')).toContainText('You have done a right click');
  await page.getByRole('button', { name: 'Click Me', exact: true }).click();
  await expect(page.locator('#dynamicClickMessage')).toContainText('You have done a dynamic click');
  await page.screenshot({path: 'evidencia/Alertas.png', fullPage:true});
});


test('test con alertas', async ({ page }) => {
  await page.goto('https://demoqa.com/');
  await page.getByRole('heading', { name: 'Alerts, Frame & Windows' }).click();
  await page.locator('li').filter({ hasText: 'Alerts' }).click();
  page.on('dialog', async dialog => {
    if (dialog.type() === 'alert') {
      console.log(" Alerta detectada:", dialog.message());
      await dialog.accept();
    } else if (dialog.type() === 'confirm') {
      await dialog.accept();
    } else if (dialog.type() === 'prompt') {
      await dialog.accept('Prueba Automatizacion');
    }
  });
  

  await page.locator('#alertButton').click();
  await page.locator('#timerAlertButton').click();
  await page.waitForTimeout(6000);
  await page.locator('#confirmButton').click();
  await page.locator('#promtButton').click();
  await expect(page.locator('#confirmResult')).toContainText('You selected Ok');
  await expect(page.locator('#promptResult')).toContainText('You entered Prueba Automatizacion');
  await page.screenshot({path: 'evidencia/Alertas.png', fullPage:true});
});




// test('get started link', async ({ page }) => {
//   await page.goto('https://google.com/');

//   // Click the get started link.
//   await page.getByRole('combobox', { name: 'Buscar' }).fill("Hola mundo");

//   // Expects page to have a heading with the name of Installation.
//   await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
// });
