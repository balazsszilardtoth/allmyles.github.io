# Allmyles

### Install npm packages

Install the `npm` packages described in the `package.json`:

`npm install`

### npm scripts

These are the most useful commands defined in `package.json`:

* `npm run start` - Run development server in watch mode.
* `npm run build` - Build production files.
* `npm run watch` - Run in tests in watch mode.
* `npm run clean` - Delete `_site` folder.

### Other scripts

These are the other commands in `gulpfile.js`:

* `gulp` - Run development server in watch mode as `npm run start`.
* `gulp build` - Build production files as `npm run build`.
* `gulp watch` - Run in tests in watch mode as `npm run watch`.
* `gulp bootstrap-scss` - Compile Bootstrap SCSS to CSS.
* `gulp bootstrap-js` - Compile Bootstrap JS.
* `gulp bootstrap-clean` - Delete compiled Bootstrap CSS and JS.
* `gulp js` - Compile partials to `main.js` file.
* `gulp js-clean` - Delete compiled `main.js` file.

### EmailJS configuration

First you need to register this [link](https://www.emailjs.com/) and create a service and template.

And you can give access in `_config.yml` file.

* `emailjs_user_id`: User ID of the account.
* `emailjs_service_id`: Service ID of the service through which the email should be sent.
* `emailjs_template_id`: Template ID of the email.
