var templateUrlRegex = /templateUrl\s*:(\s*['"`](.*?)['"`]\s*)/gm;
var stylesRegex = /styleUrls *:(\s*\[[^\]]*?\])/g;
var stringRegex = /(['`"])((?:[^\\]\\\1|.)*?)\1/g;

module.exports.translate = function(load) {
  var url = document.createElement('a');
  url.href = load.address;

  var basePathParts = url.pathname.split('/');

  basePathParts.pop();
  var basePath = basePathParts.join('/');

  var baseHref = document.createElement('a');
  baseHref.href = this.baseURL;
  baseHref = baseHref.pathname;

  basePath = basePath.replace(baseHref, '');
  basePath = basePath.replace('js/app', ''); // strip away js/app pathes

  load.source = load.source
    .replace(templateUrlRegex, function(match, quote, url) {
      if (url.startsWith('.')) {
        url = url.substr(1);
      }
      url = basePath + '/' + url;
      // console.log(url);

      return 'templateUrl: "' + url + '"';
    })
    .replace(stylesRegex, function(match, relativeUrls) {
      var urls = [];

      while ((match = stringRegex.exec(relativeUrls)) !== null) {
        var url = match[2];
        if (url.startsWith('.')) {
          url.substr(1);
        }
        url = 'css' + basePath + '/' + url;

        urls.push("'" + url + "'");
        // console.log('base:' + basePath + ' match: ' + match[2]);
      }

      // console.log('urls:' + urls.toString());

      return "styleUrls: [" + urls.join(', ') + "]";
    });

  return load;
};
