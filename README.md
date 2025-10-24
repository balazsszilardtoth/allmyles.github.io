allmyles.com
============

Source code of allmyles.com

## Development

This is a Jekyll-based static site using GitHub Pages.

### Requirements

- Ruby 3.3.6 (specified in `.ruby-version`)
- Bundler

### Setup

```bash
bundle install
```

### Building the Site

For local development with Ruby 3.x, use the provided build scripts that handle UTF-8 encoding:

```bash
# Build the site
./bin/build

# Serve the site locally
./bin/serve
```

The site will be built to the `_site` directory.

### Deployment

The site is automatically deployed to GitHub Pages when changes are pushed to the main branch.
