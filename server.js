const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.post("/api/analyze", (req, res) => {
  const { url } = req.body || {};
  if (!url || typeof url !== "string") {
    return res.status(400).json({ error: "Please enter a valid public media URL." });
  }

  try {
    const parsed = new URL(url);
    if (!["http:", "https:"].includes(parsed.protocol)) throw new Error();

    // Safe starter implementation: validates a URL and returns a demo result.
    // Replace this adapter with an authorized media provider for production.
    res.json({
      ok: true,
      item: {
        title: "Media link ready for processing",
        source: parsed.hostname.replace(/^www\./, ""),
        thumbnail: null,
        duration: "—",
        formats: [
          { id: "video-hd", label: "MP4", quality: "HD", size: "Source dependent" },
          { id: "video-sd", label: "MP4", quality: "SD", size: "Source dependent" },
          { id: "audio", label: "Audio", quality: "Best", size: "Source dependent" }
        ]
      }
    });
  } catch {
    res.status(400).json({ error: "That link does not appear to be valid." });
  }
});

app.get("/health", (_, res) => res.json({ status: "ok", service: "ClipForge" }));

app.get("*", (_, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => console.log(`ClipForge running on port ${PORT}`));