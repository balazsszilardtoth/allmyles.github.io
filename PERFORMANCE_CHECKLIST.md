# PageSpeed Optimization Checklist

Quick reference for applying performance optimizations to allmyles.com

## ✅ Quick Implementation Checklist

### Phase 1: Critical Optimizations (30 minutes)

- [ ] **Replace `_layouts/base.html`**
  - Backup current file to `_layouts/base-OLD.html`
  - Copy content from `_layouts/base-optimized.html`
  - Rename to `_layouts/base.html`

- [ ] **Update `index.html`**
  - Backup to `index-OLD.html`
  - Copy content from `index-optimized.html`
  - Rename to `index.html`

- [ ] **Test locally**
  ```bash
  npm run build
  npm start
  # Visit http://localhost:4000
  ```

- [ ] **Deploy to release branch**
  - Commit changes
  - Push to release branch
  - Wait for GitHub Actions to deploy

### Phase 2: Image Lazy Loading (1 hour)

Update these files - add `loading="lazy"` and dimensions to all `<img>` tags:

- [ ] `contact.html`
- [ ] `how.html`
- [ ] `news.html`
- [ ] `privacy.html`
- [ ] `tos.html`
- [ ] `what.html`
- [ ] `why.html`

**Template:**
```html
<img src="/img/example.png"
     alt="description"
     loading="lazy"
     width="actual-width"
     height="actual-height">
```

### Phase 3: Image Optimization (2 hours)

- [ ] **Install optimization tools**
  ```bash
  brew install jpegoptim optipng webp
  ```

- [ ] **Run optimization script**
  ```bash
  cd ~/Documents/allmyles.github.io
  ./optimize-images.sh
  ```

- [ ] **Commit optimized images**
  ```bash
  git add img/
  git commit -m "Optimize images for performance"
  git push origin release
  ```

### Phase 4: Verification (15 minutes)

- [ ] **Run PageSpeed Insights**
  - Go to: https://pagespeed.web.dev/
  - Enter: https://allmyles.com
  - Target: 90+ score

- [ ] **Check Core Web Vitals**
  - LCP < 2.5s ✅
  - FID < 100ms ✅
  - CLS < 0.1 ✅

- [ ] **Visual testing**
  - All pages load correctly
  - Images load properly
  - Navigation works
  - Forms work
  - No console errors

- [ ] **Mobile testing**
  - Test on real device OR
  - Use Chrome DevTools mobile emulation

## 🎯 Expected Results

| Metric | Target | Status |
|--------|--------|--------|
| PageSpeed Score (Mobile) | 90+ | ⬜ |
| PageSpeed Score (Desktop) | 95+ | ⬜ |
| LCP (Largest Contentful Paint) | < 2.5s | ⬜ |
| FID (First Input Delay) | < 100ms | ⬜ |
| CLS (Cumulative Layout Shift) | < 0.1 | ⬜ |
| Page Weight | < 1.5 MB | ⬜ |
| Time to Interactive | < 3s | ⬜ |

## 🚨 Common Issues & Fixes

### Issue: Third-party scripts not loading

**Symptoms:** Chat widget missing, analytics not tracking

**Fix:** Reduce delay in `_layouts/base.html` line 165:
```javascript
setTimeout(function() {
  // scripts...
}, 1000); // Changed from 3000 to 1000
```

### Issue: Images causing layout shift

**Symptoms:** CLS score > 0.1, content jumps when images load

**Fix:** Ensure ALL images have correct `width` and `height` attributes

**How to find correct dimensions:**
```bash
# Mac/Linux
file img/example.png

# Or using ImageMagick
identify img/example.png
```

### Issue: Fonts not loading

**Symptoms:** Wrong font displayed, FOUT (Flash of Unstyled Text)

**Fix:** Check Google Fonts URL includes `&display=swap`:
```html
<link href="https://fonts.googleapis.com/css?family=Montserrat:700|Hind:300,600&display=swap" ...>
```

## 📊 Before & After Comparison

Take screenshots before and after optimization:

**Before optimization:**
```bash
# Run PageSpeed test
# Screenshot the results
```

**After optimization:**
```bash
# Run PageSpeed test again
# Screenshot the improved results
# Compare side-by-side
```

## 🔄 Maintenance

**Monthly:**
- [ ] Run PageSpeed Insights test
- [ ] Check for new optimization opportunities
- [ ] Update third-party script versions if needed

**When adding new content:**
- [ ] Add `loading="lazy"` to new images
- [ ] Include `width` and `height` attributes
- [ ] Optimize new images before uploading

**When updating packages:**
- [ ] Test performance after updates
- [ ] Ensure optimizations still work
- [ ] Re-run PageSpeed Insights

## 📞 Need Help?

1. Check browser console for errors (F12 → Console)
2. Review `PERFORMANCE_OPTIMIZATION_GUIDE.md` for detailed explanations
3. Test in incognito mode to rule out browser extensions

## ✨ Quick Wins Checklist

If you only have 15 minutes:

- [x] ✅ Replace `_layouts/base.html` with optimized version
- [x] ✅ Add `loading="lazy"` to images on homepage
- [x] ✅ Test locally
- [x] ✅ Deploy

This alone will improve your score by 20-30 points!

---

**Status:** ⬜ Not Started | 🔄 In Progress | ✅ Complete

**Target Date:** _______________

**Actual Completion:** _______________

**Final PageSpeed Score:** _______________
