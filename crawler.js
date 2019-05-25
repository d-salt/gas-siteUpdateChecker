var crawler = {}

crawler.getResponseHeader = function (url) {
  var response = UrlFetchApp.fetch(url);
  return response.getAllHeaders();
};

crawler.getHeaderContent = function (url, proparty) {
  var header = this.getResponseHeader(url);
  return header[proparty] !== undefined ? header[proparty] : '';
};