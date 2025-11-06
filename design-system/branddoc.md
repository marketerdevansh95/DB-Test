
# 🖤 Discovering Brands — Brand Guidelines (v1.0)

### Visibility Meets Credibility

---

## 🎯 Brand Summary
**Discovering Brands** connects users with authentic, verified brands through a curated discovery experience.

**Mission:** To connect users with authentic, verified brands through a curated discovery experience.  
**Vision:** To become the world’s most trusted ecosystem for brand discovery.  
**Core Values:** Visibility · Credibility · Simplicity · Curation · Trust

---

## 🧠 Brand Personality & Voice
**Tone:** Editorial · Premium · Warm · Trustworthy  
**Voice:** Confident, modern, and minimal.  
**Style Traits:**
- Confident, not loud  
- Modern yet timeless  
- Professional yet approachable  
- Clarity over clutter  

**Copy Examples:**
> “Discover brands that define quality.”  
> “Where every click leads to authenticity.”  
> “Your trusted space for verified brands.”

---

## 🎨 Color System
| Name | Hex | Usage |
|------|------|--------|
| **Black** | `#000000` | Text, main accents |
| **Brown** | `#6B4F3B` | CTAs, highlights |
| **Beige** | `#F5EBDD` | Backgrounds |
| **White** | `#FFFFFF` | Contrast and clarity |

**Rules:**
- Beige dominates ~60% of backgrounds.  
- Brown used sparingly for CTAs.  
- Keep palette warm and desaturated.

---

## 🔤 Typography
| Role | Font | Weight | Size |
|------|------|--------|------|
| H1 | Poppins | 700 | 48px |
| H2 | Poppins | 600 | 32px |
| Body | DM Sans | 400 | 16px |
| Caption | DM Sans | 400 | 13px |

**Rules:**
- Poppins for headings and CTAs.  
- DM Sans for body and captions.  
- Maintain generous spacing and white space.

---

## 🧩 UI Components

**Buttons:**
```json
{
  "primary": {
    "bg": "#6B4F3B",
    "text": "#FFFFFF",
    "hover_bg": "#000000",
    "radius": "8px"
  },
  "secondary": {
    "bg": "#F5EBDD",
    "text": "#6B4F3B",
    "hover_bg": "#6B4F3B",
    "hover_text": "#FFFFFF"
  }
}
```

**Cards:**
```json
{
  "bg": "#FFFFFF",
  "shadow": "0 2px 8px rgba(0,0,0,0.05)",
  "radius": "12px",
  "padding": "24px"
}
```

---

## 📐 Layout & Spacing
```json
{
  "grid": { "columns": 12, "gutter": "24px", "max_width": "1200px" },
  "spacing_scale": { "xs": "4px", "sm": "8px", "md": "16px", "lg": "32px", "xl": "64px" }
}
```
**Rules:**
- Use white space generously.  
- Maintain symmetrical padding.  
- Beige backgrounds for visual balance.

---

## 🖼 Imagery & Iconography
- Editorial lifestyle photography.  
- Natural light, real textures (fabric, skin, materials).  
- Avoid stock visuals and over-saturation.  
- Icons: thin-line, monochrome (#6B4F3B), rounded corners (4px).

---

## ⚙️ Motion & Interactions
- Subtle fade and slide animations.  
- Duration: 200–400ms, easing: ease-in-out.  
- Hover effects: shadow lift and light scale-up (1.02).  
- Smooth scroll transitions between pages.

---

## ✍️ Copywriting & Microtext
**CTAs:** “Get Listed Now” · “Discover More Brands” · “Explore Categories”  
**Voice Examples:** “Discover the difference of authentic brands.”  
**Error Message Example:** “Brand not found — but discovery never ends.”

---

## 🧱 File for AI Training
Save this file as:  
`/design-system/discoveringbrands_brand_guidelines.md`

To train Opencode AI:
```bash
opencode train --brand-guidelines ./design-system/discoveringbrands_brand_guidelines.md
```

After training, generate UI components consistent with brand styling:
```bash
opencode generate component HeroSection --style=brand
```

---

© 2025 Discovering Brands — Visibility Meets Credibility
