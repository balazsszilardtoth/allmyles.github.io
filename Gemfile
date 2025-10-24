source "https://rubygems.org"

# GitHub Pages gem includes Jekyll and all plugins
gem "github-pages", group: :jekyll_plugins

# Required for Ruby 3.x
gem 'webrick', '~> 1.8'

# Required for Faraday v2.0+
gem 'faraday-retry'

# Jekyll plugins
group :jekyll_plugins do
  gem "jekyll-feed", "~> 0.12"
  gem "jekyll-google-tag-manager"
  gem "jekyll-seo-tag"
  gem "jekyll-redirect-from"
  gem 'jekyll-sitemap'
end

# Windows and JRuby timezone support
install_if -> { RUBY_PLATFORM =~ %r!mingw|mswin|java! } do
  gem "tzinfo", "~> 1.2"
  gem "tzinfo-data"
end

# Gems for testing
group :test do
  gem 'rake'
  gem 'html-proofer'
end
