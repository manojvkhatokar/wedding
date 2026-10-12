import { writeFile } from "node:fs/promises";
import { createCalendar } from "../src/wedding.js";

// Keep the public Apple subscription in sync with the invitation details.
// The stable stamp avoids changing the committed file on every local build.
const calendar = createCalendar(undefined, "20261012T000000Z");
await writeFile(new URL("../public/wedding-dates.ics", import.meta.url), calendar);
