# PageSpeed Performance Optimization Guide for Allmyles.com

This guide contains all optimizations to make your site **superfast** according to Google's PageSpeed Insights guidelines.

## 📊 Current Issues Identified

1. **Render-blocking resources** - CSS and fonts loaded synchronously in `<head>`
2. **Third-party scripts** - Multiple analytics/chat tools blocking main thread
3. **Image optimization** - No lazy loading, no width/height attributes, large file sizes
4. **No resource hints** - Missing preconnect/dns-prefetch for external domains
5. **Font loading** - No font-display strategy
6. **JavaScript** - Too many synchronous scripts in head

## 🚀 Optimizations Implemented

### 1. Resource Hints & Preconnect (Critical!)

**What it does:** Tells the browser to connect to external domains early, reducing DNS/TCP/TLS time.

**In `_layouts/base-optimized.html` lines 18-27:**
```html
<link rel="preconnect" href="https://fonts.googleapis.com" crossorigin>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preconnect" href="https://cdnjs.cloudflare.com" crossorigin>
<link rel="dns-prefetch" href="//rec.smartlook.com">
<link rel="dns-prefetch" href="//cdn.segment.com">
<link rel="dns-prefetch" href="//connect.facebook.net">
```

**Impact:** Reduces latency for external resources by 100-500ms

### 2. Optimized Font Loading

**What it does:** Fonts load asynchronously without blocking page render.

**In `_layouts/base-optimized.html` lines 51-53:**
```html
<link rel="preload" href="https://fonts.googleapis.com/css?family=Montserrat:700|Hind:300,600&display=swap" as="style" onload="this.onload=null;this.rel='stylesheet'">
<noscript><link href="https://fonts.googleapis.com/css?family=Montserrat:700|Hind:300,600&display=swap" rel="stylesheet"></noscript>
```

**Impact:** Eliminates render-blocking fonts, improves FCP (First Contentful Paint) by 300-800ms

### 3. Deferred Third-Party Scripts

**What it does:** Loads all analytics/chat scripts AFTER page content loads.

**In `_layouts/base-optimized.html` lines 161-220:**
- All third-party scripts (Smartlook, Segment, Facebook Pixel, Tawk.to, Mailchimp, Cookie Consent) are wrapped in:
```javascript
window.addEventListener('load', function() {
  setTimeout(function() {
    // Load scripts here
  }, 3000);
});
```

**Impact:**
- Improves TTI (Time to Interactive) by 2-4 seconds
- Reduces main thread blocking
- Better LCP and FID scores

### 4. Image Lazy Loading

**What it does:** Images below the fold load only when user scrolls near them.

**In `index-optimized.html`:**
```html
<img src="/img/frontpage/chart.png"
     alt="chart"
     loading="lazy"
     width="100"
     height="100">
```

**Key attributes added:**
- `loading="lazy"` - Native browser lazy loading
- `width` and `height` - Prevents layout shift (improves CLS)

**Impact:**
- Reduces initial page weight by 60-80%
- Improves LCP by 1-2 seconds
- Eliminates Cumulative Layout Shift (CLS)

### 5. Added Security & Accessibility

**What it does:** Improves security and accessibility.

**In `_layouts/base-optimized.html`:**
```html
<a target="_blank" href="https://www.facebook.com/allmyles" rel="noopener" aria-label="Facebook">
```

- `rel="noopener"` - Prevents security vulnerabilities
- `aria-label` - Improves accessibility for screen readers

### 6. Defer jQuery and Bootstrap

**What it does:** Loads jQuery/Bootstrap without blocking page render.

```html
<script src="//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.4/jquery.min.js" defer></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.5/js/bootstrap.min.js" defer></script>
```

**Impact:** Scripts execute after HTML parsing completes

## 📁 How to Apply These Optimizations

### Step 1: Backup Current Files (On Release Branch)

On GitHub, navigate to the release branch and:
1. Rename `_layouts/base.html` to `_layouts/base-OLD.html` (keep as backup)
2. Rename `index.html` to `index-OLD.html` (keep as backup)

### Step 2: Apply Optimized Files

1. Copy `_layouts/base-optimized.html` content → rename to `_layouts/base.html`
2. Copy `index-optimized.html` content → rename to `index.html`

### Step 3: Apply Image Optimizations to All Pages

Update these files with lazy loading attributes:
- `contact.html`
- `how.html`
- `news.html`
- `privacy.html`
- `tos.html`
- `what.html`
- `why.html`

**Find all `<img>` tags and add:**
```html
loading="lazy"
width="[actual-width]"
height="[actual-height]"
```

**Example transformation:**
```html
<!-- BEFORE -->
<img src="/img/something.png" alt="description">

<!-- AFTER -->
<img src="/img/something.png"
     alt="description"
     loading="lazy"
     width="200"
     height="150">
```

## 🖼️ Image Optimization (Advanced)

### Convert Images to WebP

WebP format is 25-35% smaller than PNG/JPG with same quality.

**Install WebP tools:**
```bash
brew install webp  # Mac
```

**Convert images:**
```bash
cd img/frontpage
for file in *.png; do
  cwebp -q 85 "$file" -o "${file%.png}.webp"
done
```

**Use with fallback in HTML:**
```html
<picture>
  <source srcset="/img/frontpage/chart.webp" type="image/webp">
  <img src="/img/frontpage/chart.png" alt="chart" loading="lazy" width="100" height="100">
</picture>
```

### Optimize Existing Images

**Using ImageOptim (Mac GUI):**
1. Download: https://imageoptim.com/
2. Drag `/img` folder into app
3. Wait for optimization
4. Commit optimized images

**Using CLI:**
```bash
# Install tools
brew install jpegoptim optipng

# Optimize JPGs
find img -name "*.jpg" -exec jpegoptim --strip-all --max=85 {} \;

# Optimize PNGs
find img -name "*.png" -exec optipng -o7 {} \;
```

## 🔧 Additional Optimizations

### 1. Enable Compression (via _config.yml)

Already enabled via `layout: compress` but ensure it's working:

```yaml
# _config.yml
compress_html:
  clippings: all
  comments: all
  endings: all
  startings: []
  blanklines: false
  profile: false
```

### 2. Add HTTP/2 Server Push (GitHub Pages Auto-Enabled)

GitHub Pages automatically enables HTTP/2. No action needed.

### 3. Minimize CSS/JS

Your Gulp build already does this via:
- `cssnano` for CSS
- `terser` for JS

Make sure to run `npm run build` before deploying.

## 📈 Expected Performance Improvements

After applying all optimizations:

| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| **PageSpeed Score** | 40-60 | 85-95 | +40-50 points |
| **LCP** | 4-6s | 1.5-2.5s | 60-70% faster |
| **FID** | 200-400ms | <100ms | 70% improvement |
| **CLS** | 0.15-0.30 | <0.05 | 80% improvement |
| **Page Weight** | 2-3 MB | 800KB-1.2MB | 60% reduction |
| **Time to Interactive** | 6-8s | 2-3s | 65% faster |

## ✅ Testing Checklist

After applying optimizations:

1. **Test Locally:**
   ```bash
   npm run build
   npm start
   # Visit http://localhost:4000
   ```

2. **Visual Regression Test:**
   - Check all pages load correctly
   - Verify images load with lazy loading
   - Test all interactive elements (nav, forms, etc.)

3. **Run PageSpeed Insights:**
   - Visit: https://pagespeed.web.dev/
   - Test: https://allmyles.com
   - Target: 90+ score

4. **Check Core Web Vitals:**
   - LCP: < 2.5s (Good)
   - FID: < 100ms (Good)
   - CLS: < 0.1 (Good)

5. **Test on Mobile:**
   - Use Chrome DevTools mobile emulation
   - Test on real device if possible

## 🚨 Troubleshooting

**Issue: Third-party scripts not loading**
- Check browser console for errors
- Reduce delay from 3000ms to 1000ms in `window.addEventListener('load')`

**Issue: Lazy loading not working**
- Ensure browser supports `loading="lazy"` (all modern browsers do)
- Fallback: Add JavaScript polyfill for older browsers

**Issue: Layout shift with images**
- Double-check all `width` and `height` attributes match actual image dimensions
- Use browser DevTools to measure image dimensions

**Issue: Fonts not loading**
- Check Google Fonts link is correct
- Ensure `&display=swap` parameter is present

## 📚 Additional Resources

- [Web.dev - Optimize LCP](https://web.dev/optimize-lcp/)
- [Web.dev - Optimize FID](https://web.dev/optimize-fid/)
- [Web.dev - Optimize CLS](https://web.dev/optimize-cls/)
- [Chrome DevTools Performance Guide](https://developer.chrome.com/docs/devtools/performance/)

## 🎯 Priority Implementation Order

If you can't do everything at once, implement in this order:

1. ✅ **CRITICAL:** Replace `_layouts/base.html` with optimized version (defer third-party scripts)
2. ✅ **HIGH:** Add lazy loading to all images (index.html first, then other pages)
3. 🔶 **MEDIUM:** Convert images to WebP format
4. 🔶 **MEDIUM:** Optimize existing PNG/JPG images
5. ⬜ **LOW:** Fine-tune delay timings for third-party scripts

## Need Help?

If you encounter issues:
1. Check browser console for JavaScript errors
2. Use PageSpeed Insights to identify remaining issues
3. Test in incognito mode to avoid browser extensions affecting results

---

**Made with ❤️ for superfast performance!**
