import fs from "fs";
import path from "path";
import sharp from "sharp";

const ROOT = "public/images/gallery";
const THUMBS = "public/images/gallery-thumbs";
const OUT = "src/galleryData.json";
const exts = /\.(jpe?g|png|webp)$/i;

// keep any hand-edited titles/dates/details when re-running
const prev = fs.existsSync(OUT) ? JSON.parse(fs.readFileSync(OUT, "utf8")) : [];
const prevBySrc = Object.fromEntries(prev.map((p) => [p.src, p]));

const out = [];
for (const dir of fs.readdirSync(ROOT, { withFileTypes: true })) {
  if (!dir.isDirectory()) continue;
  for (const file of fs.readdirSync(path.join(ROOT, dir.name))) {
    if (!exts.test(file)) continue;
    const base = file.replace(exts, "");
    const full = path.join(ROOT, dir.name, file);

    const thumbDir = path.join(THUMBS, dir.name);
    fs.mkdirSync(thumbDir, { recursive: true });
    const thumbFile = path.join(thumbDir, base + ".webp");
    if (!fs.existsSync(thumbFile)) {
      await sharp(full).resize({ width: 700 }).webp({ quality: 78 }).toFile(thumbFile);
    }

    const src = encodeURI(`/images/gallery/${dir.name}/${file}`);
    const fresh = {
      cat: dir.name,
      title: base.replace(/[-_]/g, " "),
      date: fs.statSync(full).mtime.toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
      src,
      thumb: encodeURI(`/images/gallery-thumbs/${dir.name}/${base}.webp`),
    };
    out.push({ ...fresh, ...(prevBySrc[src] || {}) });
  }
}

out.forEach((o, i) => (o.id = i + 1));
fs.writeFileSync(OUT, JSON.stringify(out, null, 2));
console.log(`Wrote ${out.length} photos`);