function main () {
  var sheetId = id.getSheetId();
  db.init(sheetId, 'Sites');
  
  var sites = getSiteList();
  var data = [];
  sites.forEach(function (site) {
    var storedModified = site.LastModified;
    var LastModified = crawler.getHeaderContent(site.url, 'Last-Modified');
    data.push([LastModified]);
    if (isUpdated(LastModified, storedModified)) {
      slack.push('<' + site.url + ' | ' + site.name + '>' + ' updated on ' + LastModified);
    };
  });
  db.save(data, 2, 3, sites.length, 1);
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