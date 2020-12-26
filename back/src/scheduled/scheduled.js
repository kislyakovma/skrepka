import * as cron from "node-cron";
import prices from "./Prices/prices";
import firebase from "../config/firebase";

const db = firebase.firestore();
let productList = [];
export default async function scheduled() {
  cron.schedule("* * * * *", () => {
    db.collection("products")
      .get()
      .then((products) => {
        products.docs.map((product) => {
          productList.push(product.data());
        });
        prices(productList);
        productList = [];
      });
  });
}
