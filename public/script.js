const input = document.getElementById("mediaUrl");
const button = document.getElementById("analyzeBtn");
const result = document.getElementById("result");
const error = document.getElementById("error");

button.addEventListener("click", analyze);
input.addEventListener("keydown", e => { if (e.key === "Enter") analyze(); });

async function analyze() {
  const url = input.value.trim();
  error.classList.add("hidden");
  result.classList.add("hidden");
  if (!url) return showError("Paste a public media URL first.");

  button.disabled = true;
  button.querySelector("span").textContent = "Checking...";

  try {
    const response = await fetch("/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url })
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Something went wrong.");

    document.getElementById("source").textContent = data.item.source.toUpperCase();
    document.getElementById("resultTitle").textContent = data.item.title;
    document.getElementById("duration").textContent = "Duration: " + data.item.duration;

    document.getElementById("formatList").innerHTML = data.item.formats.map(f => `
      <div class="format">
        <div><strong>${f.label} · ${f.quality}</strong><br><small>${f.size}</small></div>
        <button onclick="showAuthorizedNotice('${f.id || f.label}')">Select →</button>
      </div>`).join("");

    result.classList.remove("hidden");
    result.scrollIntoView({ behavior: "smooth", block: "nearest" });
  } catch (err) {
    showError(err.message);
  } finally {
    button.disabled = false;
    button.querySelector("span").textContent = "Analyze";
  }
}
function showError(message) {
  error.textContent = message;
  error.classList.remove("hidden");
}
window.showAuthorizedNotice = (formatId) => {
  alert("Selected format: " + formatId + ". Processing workflow can now be implemented here.");
};
