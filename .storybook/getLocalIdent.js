const path = require("path");
const loaderUtils = require("loader-utils");

function getLocalIdent(loaderContext, localIdentName, localName, options) {
  if (!options.context) {
    // eslint-disable-next-line no-param-reassign
    options.context = loaderContext.rootContext;
  }

  const request = path
    .relative(options.context, loaderContext.resourcePath)
    .replace(/\\/g, '/');

  // eslint-disable-next-line no-param-reassign
  options.content = `${options.hashPrefix + request}+${localName}`;

  // Use the filename or folder name, based on some uses the index.js / index.module.(css|scss|sass) project style
  const fileNameOrFolder = loaderContext.resourcePath.match(
    /index\.module\.(css|scss|sass)$/
  )
    ? "[folder]"
    : "[name]";

  const join = localName.startsWith("-") ? "" : "-";
  const name = "ljas-" + fileNameOrFolder + join + localIdentName.replace(/\[local\]/gi, localName)

  const hash = loaderUtils.interpolateName(
    loaderContext,
    name,
    options
  );

  return hash
    .replace(".module", "")
    .replace("-root", "")
    .replace(new RegExp('[^a-zA-Z0-9\\-_\u00A0-\uFFFF]', 'g'), '-')
    .replace(/^((-?[0-9])|--)/, '_$1');
}

module.exports = getLocalIdent;
