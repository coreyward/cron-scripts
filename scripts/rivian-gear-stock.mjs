import { parse } from "node-html-parser"
import notifier from "node-notifier"
import open from "open"

export const enabled = true

const url = "https://rivian.com/gear-shop/p/rivian-tailgate-pad"

export const run = async () => {
  const document = await fetch(url)
    .then((res) => res.text())
    .then(parse)

  const buttonText = document.querySelector("h1 ~ button").text.trim()
  if (buttonText === "Coming soon") {
    console.log("Not in stock")
  } else {
    console.log("Rivian Tailgate Pad in stock!")
    notifier.on("click", () => {
      open(url)
    })
    notifier.notify({
      title: "Rivian Tailgate Pad in stock!",
      message: `The button now shows "${buttonText}".`,
      wait: true,
    })
  }
}

// Every hour between 8am and 9pm
export const schedule = "0 8-21 * * *"

// Auto-run if invoked directly
if (`file://${process.argv[1]}` === import.meta.url) {
  console.log("Running directly invoked script…")
  run()
}
