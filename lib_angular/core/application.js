// file which define appplication global funcations
function getQueryString(queryName) {
  var reg = new RegExp('(^|&)' + queryName + '=([^&]*)(&|$)', 'i');
  var matched = window.location.search.substr(1).match(reg);

  if (matched != null) {
    return decodeURIComponent(matched[2]);
  }
  return null;
}

function getEnvName() {
  var envName = getQueryString('env') || 'prod';
  return envName;
}

window.BLOG = {
  getQueryString: getQueryString,
  envName: getEnvName()
};
