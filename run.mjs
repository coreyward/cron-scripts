import fs from "node:fs/promises"
import cron from "node-cron"
import invariant from "tiny-invariant"

const files = await fs.readdir("./scripts")

files
  .filter((file) => file.endsWith(".mjs"))
  .map(async (file) => {
    const { run, schedule, enabled } = await import(`./scripts/${file}`)

    if (enabled === false) return

    invariant(
      cron.validate(schedule),
      `Invalid schedule '${schedule}' for ${file}.`
    )

    console.log(`Scheduling ${file} to run on schedule '${schedule}'.`)

    return cron.schedule(schedule, run)
  })
