import { Browser } from "happy-dom";
import { Metroline } from "@/app/lib/metro/types";

function parseHTMLAndGetText(html: string, selector: string) {
  const browser = new Browser();
  const page = browser.newPage();
  page.mainFrame.document.body.innerHTML = html;
  return page.mainFrame.document.querySelector(selector)?.textContent;
}

export async function fetchTrainDataFromMetro() {
  const browser = new Browser();
  const page = browser.newPage();
  await page.goto(
    "https://www.metro.sp.gov.br/wp-content/themes/metrosp/direto-metro.php"
  );
  const lines = page.mainFrame.document.querySelectorAll(
    ".direto-metro .linha"
  );
  const data = Array.from(lines).map((line) => {
    const numberBlock = line.querySelector(
      ".linha-numero"
    ) as unknown as HTMLDivElement;
    const info = line.querySelector(".linha-info");
    const bsTitle = info?.getAttribute("data-bs-title") ?? "";
    const company = parseHTMLAndGetText(bsTitle, ".title");
    const description = parseHTMLAndGetText(bsTitle, ".description");
    const date = parseHTMLAndGetText(bsTitle, ".date");
    const color = numberBlock.style.backgroundColor;
    const statusBubble = line.querySelector(
      ".linha-situacao-icon"
    ) as unknown as HTMLDivElement;
    const statusColor = statusBubble.style.backgroundColor;

    return {
      number: numberBlock.textContent,
      name: line.querySelector(".linha-nome")?.textContent,
      status: line.querySelector(".linha-situacao")?.textContent,
      company,
      description,
      date,
      color,
      statusColor,
    } as Metroline;
  });

  return data;
}
