import { sendMail } from "../src/utils/mailer.ts"

const main = async () => {
    const body = `Hi Samskruthi team,\n\nSaw your listing with the National Book Trust—congrats on the statewide reach.\n\nWe’ve built an AI bot that lives on your landing page, answers every visitor’s “Which book should I read next?” and auto-suggests titles from your catalogue. Mid-sized Karnataka vendors using it are seeing 27 % more cart completions without adding staff.\n\nCould we show you the numbers and set it up on your site in a 15-min demo this week?\n\nBook a slot here → [calendar link]\n\nBest,\nVin'z Sales`;

    const subject = `Samskruthi Book House—AI that turns browsers into buyers in 15 min`;

    const deliveryStatus = await sendMail("vinz.sales@hotmail.com", "test@hotmail.com", subject, body);

    console.log(deliveryStatus.response);
}

await main()
    .finally(() => {
        console.warn(`\nBye!\n`);
    });