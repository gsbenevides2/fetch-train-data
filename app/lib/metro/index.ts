import { Browser } from "happy-dom";
import { Metroline } from "@/app/lib/metro/types";

export async function fetchTrainDataFromMetro() {
  const browser = new Browser();

  try {
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

      // Parse HTML inline without creating additional browsers
      const tempDiv = page.mainFrame.document.createElement("div");
      tempDiv.innerHTML = bsTitle;

      const company = tempDiv.querySelector(".title")?.textContent;
      const description = tempDiv.querySelector(".description")?.textContent;
      const date = tempDiv.querySelector(".date")?.textContent;

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
  } finally {
    // Always close the browser to free memory
    browser.close();
  }
}
