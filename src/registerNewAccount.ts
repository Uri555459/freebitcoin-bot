import puppeteer from 'puppeteer'

const link = 'https://tempmailto.org'

const start = async () => {
	// Launch the browser and open a new blank page
	const browser = await puppeteer.launch()
	const page = await browser.newPage()

	// Navigate the page to a URL.
	await page.goto(link, { waitUntil: 'domcontentloaded' })

	// Set screen size.
	await page.setViewport({ width: 1080, height: 1024 })

	// Type into search box.
	// await page.locator('.devsite-search-field').fill('automate beyond recorder')
}

start()
