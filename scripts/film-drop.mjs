import { parse } from "node-html-parser"
import notifier from "node-notifier"
import open from "open"

const url = "https://shop.indiefilmlab.com/"

let alreadyNotified = false

export const enabled = false

export const run = async () => {
  if (alreadyNotified) return

  const document = await fetch(url, { redirect: "follow" })
    .then((res) => res.text())
    .then(parse)

  const lockIcon = document.querySelector(".icon-padlock")

  if (lockIcon) {
    console.log("Film drop locked")
  } else {
    console.log("Film drop unlocked!")
    alreadyNotified = true
    notifier.on("click", () => {
      open(url)
    })
    notifier.notify({
      title: "Film drop is open!",
      message: `Go get it!`,
      wait: true,
    })
  }
}

// Every minute from 11am to 2pm
export const schedule = "* 11-14 * * *"

// Auto-run if invoked directly
if (`file://${process.argv[1]}` === import.meta.url) {
  console.log("Running directly invoked script…")
  run()
}
