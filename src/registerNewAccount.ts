import fs from 'fs'
import puppeteer from 'puppeteer'

const linkEmail = 'https://tempmailto.org'
const linkBitcoin = 'https://freebitco.in'
const fileDataPath = 'emailData.json'

// Функция запуска
const start = async () => {
	// Настраиваем браузер
	let browser = await puppeteer.launch({
		headless: false,
		slowMo: 100,
		devtools: false,
	})
	let page = await browser.newPage()

	// Переходим на страницу и ждем ее полной загрузки
	await page.goto(linkEmail, { waitUntil: 'domcontentloaded' })

	// Устанавливаем размер окна
	await page.setViewport({ width: 1080, height: 1024 })

	// Забираем email
	const email = await page.$eval('#email_id', elem => elem.textContent)

	// Если не нашли email, то выходим
	if (!email) {
		console.error('Email not found')
		browser.close()
		return
	}

	// Если файла нет, то создаем
	if (!fs.existsSync(fileDataPath)) {
		fs.writeFileSync(fileDataPath, JSON.stringify([email]), 'utf8')
	}

	// Читаем файл
	const data = JSON.parse(fs.readFileSync(fileDataPath, 'utf8'))
	// Добавляем в массив
	data.push(email)
	// Записываем обратно в файл
	fs.writeFileSync(fileDataPath, JSON.stringify(data), 'utf8')

	// Закрываем браузер
	browser.close()

	// Настраиваем новый браузер
	browser = await puppeteer.launch({
		headless: false,
		slowMo: 100,
		devtools: true,
	})
	page = await browser.newPage()
	// Переходим на страницу и ждем ее полной загрузки
	await page.goto(linkBitcoin, { waitUntil: 'domcontentloaded' })

	// Вводим email
	await page.type('#signup_form_email', email)

	// Вводим password
	await page.type('#signup_form_password', email)

	// Подтверждаем что не робот
	await page.mouse.click(434, 390)
	await page.mouse.click(434, 390)

	// Кликаем зарегистрироваться
	// await page.click('#signup_button')
	// Закрываем браузер
	// browser.close()

	// Type into search box.
	// await page.locator('.devsite-search-field').fill('automate beyond recorder')

	// top:354.0625 left: 536
}

// Запускаем
start()
