import { parse } from "node-html-parser"
import notifier from "node-notifier"
import open from "open"

const url = "https://www.armadilloclay.com/store/p2858/Cone_5_B-Mix_with_Speckles_%28WC-408%29.html"
// const url = "https://www.armadilloclay.com/store/p17/Laguna_B-Mix_Cone_5.html"

export const run = async () => {
  const document = await fetch(url).then(res => res.text()).then(parse)

  const outOfStock = document.querySelector("#wsite-com-product-inventory-out-of-stock-message").text.trim()
  if (outOfStock === "Sold out") {
    console.log("Out of stock")
  } else {
    console.log("Maybe in stock!")
    notifier.on("click", () => {
      open(url)
    })
    notifier.notify({
      title: "B-Mix stock change!",
      message: `The stock status now shows "${outOfStock}".`,
      wait: true,
    })
  }
}

export const schedule = "0 8-17/2 * * *"
