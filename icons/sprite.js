'use strict';

const mkdirp = require('mkdirp');
const path = require('path');
const fs = require('fs');
const glob = require('glob');
const cwd = path.resolve('src');
const SVGSpriter = require('svg-sprite');
const config = require('./sprite.config');
const spriter = new SVGSpriter(config);
const _ = require('lodash');

// Find SVG files recursively via `glob`
glob.glob('**/*.svg', { cwd: cwd }, function (err, files) {

  // Create temporary assets folder
  if (!fs.existsSync('tmp/assets')) {
    fs.mkdirSync('tmp/assets', { recursive: true });
  }

  // Add each SVG
  files.forEach(function (file) {
    const fileExtension = path.extname(file);
    const fileName = _.kebabCase(file.substr(0, file.length - fileExtension.length)) + fileExtension;
    const fileContent = fs.readFileSync(path.join(cwd, file), 'utf-8');
    const filePath = path.join(path.resolve('tmp/assets'), fileName);
    fs.writeFileSync(filePath, fileContent, 'utf-8');
    spriter.add(filePath, fileName, fileContent);
  });

  // Compile sprite
  spriter.compile(function (error, result, data) {
    for (let mode in result) {
      for (let type in result[mode]) {
        mkdirp.sync(path.dirname(result[mode][type].path));
        fs.writeFileSync(result[mode][type].path, result[mode][type].contents);
      }
    }
  });
});
