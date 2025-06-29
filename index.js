const { chromium } = require('playwright');
const faker = require('@faker-js/faker').faker;

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  const referido = "878124";

  while (true) {
    const url = `https://gnvidiak.vip/#/register?ref=${referido}`;
    await page.goto(url, { waitUntil: 'load' });
    await page.waitForTimeout(4000);

    const correo = faker.internet.email();
    const password = faker.internet.password({ length: 10 });
    const telefono = '098' + Math.floor(Math.random() * 1000000).toString().padStart(6, '0');

    await page.fill('input[placeholder*="correo"]', correo).catch(() => {});
    await page.fill('input[placeholder*="Contraseña"]', password).catch(() => {});
    await page.fill('input[placeholder*="Confirmar"]', password).catch(() => {});
    await page.fill('input[placeholder*="teléfono"]', telefono).catch(() => {});
    await page.click('button:has-text("Registrarse")').catch(() => {});
    console.log(`✅ Registrado: ${correo} | ${password}`);

    await page.waitForTimeout(60000);
  }
})();
