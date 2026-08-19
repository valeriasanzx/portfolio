# Demo assets

To enable the demo video on the Bloom case study page:

1. Drop the source video in this folder.
2. Compress it and generate a poster frame:

```bash
ffmpeg -i "AI Detection Tool ML Model Ex.mov" \
  -vcodec libx264 -crf 28 -preset slow -vf "scale=1280:-2" \
  -acodec aac -b:a 96k -movflags +faststart \
  bloom-detection.mp4

ffmpeg -i bloom-detection.mp4 -ss 00:00:02 -vframes 1 bloom-detection.jpg
```

3. Uncomment the `demo` block in `content/projects.ts` (Bloom entry).
4. Delete the original `.mov` — don't commit a 44MB file.

**Before committing:** watch it through. It's a demo of an internal tool and
may show real creator content, product data, or dashboard figures that
shouldn't be on a public site.
