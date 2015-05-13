require 'html/proofer'
# rake test
desc "build and test website"
task :test do
  sh "bundle exec jekyll build"
  HTML::Proofer.new("./_site", {
    :verbose => true,
    :check_html => true,
    :check_favicon => true,
    :href_ignore => ["linkedin.com"]
  }).run
end

