/* eslint-disable arrow-parens */
import puppeteer from 'puppeteer';
import cheerio from 'cheerio';
import firebase from '../../config/firebase';

const db = firebase.firestore();

const officeMag = async (product) => {
    await puppeteer
        .launch()
        .then((browser) => browser.newPage())
        .then((page) => page.goto(product.url).then(() => page.content()))
        .then((html) => {
            const $ = cheerio.load(html);
            const description = $('.infoDescription').first().text();
            const brand = $('.ProductBrand__name').first().text();
            const name = $('.Product__name').first().text().split(',')[0];
            const price = $('.Price--best')
                .first()
                .text()
                .replace(/[^,\d]/g, '')
                .replace(',', '.');

            db.collection('products')
                .doc(product.id.toString())
                .set({
                    id: product.id,
                    name,
                    rate: 5,
                    time: 1586372610052,
                    price: Math.round(
                        parseFloat(price)
                        + parseFloat(price) * (parseFloat(product.profit) / 100),
                    ),
                    oldPrice: false,
                    popular: 105,
                    brand,
                    category: product.category,
                    img: product.imgUrl,
                    imgUrl: product.imgUrl,
                    description,
                    status: product.status,
                    url: product.url,
                    profit: product.profit,
                    modified: true,
                });
        })
        .catch(console.error);
}
const wildberries = async (product) => {
    await puppeteer
        .launch()
        .then((browser) => browser.newPage())
        .then((page) => page.goto(product.url).then(() => page.content()))
        .then((html) => {
            const $ = cheerio.load(html);
            const description = $('.j-description p').first().text();
            const brand = $('.brand').first().text();
            const name = $('.name').first().text();
            const price = $('.final-cost')
                .first()
                .text()
                .replace(/[^,\d]/g, '')
                .replace(',', '.');

            db.collection('products')
                .doc(product.id.toString())
                .set({
                    id: product.id,
                    name,
                    rate: 5,
                    time: 1586372610052,
                    price: Math.round(
                        parseFloat(price)
                        + parseFloat(price) * (parseFloat(product.profit) / 100),
                    ),
                    oldPrice: false,
                    popular: 105,
                    brand,
                    category: product.category,
                    img: product.imgUrl,
                    imgUrl: product.imgUrl,
                    description,
                    status: product.status,
                    url: product.url,
                    profit: product.profit,
                    modified: true,
                });
        })
        .catch(console.error);
}

export default async function prices(productList) {
  for (const product of productList) {
   switch (product.status) {
       case "officemag": officeMag(product); break;
       case "wildberries": wildberries(product); break;
   }
  }
}
