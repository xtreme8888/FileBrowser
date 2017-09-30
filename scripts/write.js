const path = require('path');
const maxmin = require('maxmin');
const colors = require('colors');
const jetpack = require('fs-jetpack');
const resolve = file => path.resolve(__dirname, file);

const dev = !!process.env.DEV;

const jsFile = resolve('../dist/filebrowser-deps.js');
const cssFile = resolve('../dist/filebrowser-deps.css');

const materialJS = [
  'checkbox',
  'dialog',
  'radio',
  'ripple',
  'textfield'
].map(e => resolve(`../node_modules/@material/${e}/dist/mdc.${e}.min.js`));

const materialCSS = [
  'button',
  'checkbox',
  'dialog',
  'radio',
  'textfield'
].map(e => resolve(`../node_modules/@material/${e}/dist/mdc.${e}.min.css`));

const depsDev = [
  resolve('../node_modules/vue/dist/vue.runtime.js'),
  resolve('../node_modules/vuex/dist/vuex.js'),
  resolve('../node_modules/pica/dist/pica.min.js'),
  resolve('../node_modules/axios/dist/axios.min.js')
].concat(materialJS);

const depsProd = [
  resolve('../node_modules/vue/dist/vue.runtime.min.js'),
  resolve('../node_modules/vuex/dist/vuex.min.js'),
  resolve('../node_modules/pica/dist/pica.min.js'),
  resolve('../node_modules/axios/dist/axios.min.js')
].concat(materialJS);

const css = [].concat(materialCSS);

jetpack.remove(jsFile);
jetpack.remove(cssFile);

concat(css, cssFile);
dev ? concat(depsDev, jsFile) : concat(depsProd, jsFile);

function concat(files, final) {
  let code = '';
  files.forEach(each => {
    if (!jetpack.exists(each)) throw `File not found ${each}`;
    code += jetpack.read(each) + '\n';
  });

  jetpack.write(final, code);
  const asset = path.basename(final);
  const size = maxmin(code, code, true);

  console.log(colors.green.bold(
    `\nWritten: ${asset}
    \nSize: ${size.substr(size.indexOf(' → ') + 3)}
    \nNow: ${new Date()}\n`
  ));
}
