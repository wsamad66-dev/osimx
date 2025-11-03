# Placeholder Image

This is a placeholder for partner logos.

To create a simple placeholder image, you can:

1. **Use an online tool**:
   - https://placeholder.com/ 
   - https://via.placeholder.com/300x200/CCCCCC/666666?text=University+Logo

2. **Create in Figma/Photoshop**:
   - Canvas: 300x200px
   - Background: #F3F4F6 (gray-100)
   - Text: "University Logo" or university initials
   - Export as PNG

3. **Use a simple SVG** (saved as placeholder.png):

```svg
<svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
  <rect width="300" height="200" fill="#F3F4F6"/>
  <text x="50%" y="50%" 
        font-family="Arial, sans-serif" 
        font-size="20" 
        fill="#6B7280" 
        text-anchor="middle" 
        dominant-baseline="middle">
    University Logo
  </text>
</svg>
```

4. **Quick CLI command** (requires ImageMagick):

```bash
convert -size 300x200 xc:#F3F4F6 \
  -font Arial -pointsize 20 -fill '#6B7280' \
  -gravity center -annotate +0+0 'University Logo' \
  placeholder.png
```

## Current Status

⚠️ **This file is a placeholder documentation**. 

Replace this file with an actual image file named `placeholder.png` (300x200px recommended).
