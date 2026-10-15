const ADVICE_API_URL = "https://api.adviceslip.com/advice";

const adviceIdElement = document.querySelector("#advice-id");
const adviceTextElement = document.querySelector("#advice-text");
const newAdviceButton = document.querySelector("#new-advice");

function renderAdvice(slip) {
  adviceIdElement.textContent = `#${slip.id}`;
  adviceTextElement.textContent = `“${slip.advice}”`;
}

async function getAdvice() {
  newAdviceButton.disabled = true;
  newAdviceButton.setAttribute("aria-busy", "true");
  adviceTextElement.textContent = "Loading advice...";

  try {
    const response = await fetch(ADVICE_API_URL, { cache: "no-store" });

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const data = await response.json();

    if (!data.slip || !data.slip.advice || data.slip.id == null) {
      throw new Error("The API returned an unexpected response.");
    }

    renderAdvice(data.slip);
  } catch (error) {
    console.error("Unable to fetch advice:", error);
    adviceIdElement.textContent = "";
    adviceTextElement.textContent =
      "Sorry, we couldn't load advice. Please check your connection and try again.";
  } finally {
    newAdviceButton.disabled = false;
    newAdviceButton.removeAttribute("aria-busy");
  }
}

newAdviceButton.addEventListener("click", getAdvice);
getAdvice();
