function main () {
  var sheetId = id.getSheetId();
  db.init(sheetId, 'App');
  
  var siteList = getSiteList();
  siteList.forEach(function (site, i) {
    var row = i + 2; // 1スタートにする & headerの分1行たす
    var storedModified = site.LastModified;
    var LastModified = crawler.getHeaderContent(site.url, 'Last-Modified');
    if (isUpdated(LastModified, storedModified)) {
      slack.push('<' + site.url + ' | ' + site.name + '>' + ' updated on ' + LastModified);
    };
    db.save(LastModified, row, 3);
  });
};

var getSiteList = function () {
  return valuesToObject(db.load(1, 1, db.sheet.getLastRow(), db.sheet.getLastColumn()));
};

var isUpdated = function (LastModified, storedModified) {
  if (storedModified !== LastModified) {
    return true;
  } else {
    return false;
  }
};