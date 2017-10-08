const getInfo = function (id) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', '/api/info\?id\=' + id, false); // sync request
  const foo = xhr.send();
  return xhr;
};

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

const getContent = function (id, body) {
  return [
    '<h3> Employee details for id: '+ id + '</h3>',
    '<div> <b>Employee Name:</b>'+ body.name+' </div>',
    '<div> <b>Work Location:</b> '+ body.office_location +' </div>',
    '<div> <b>Payroll:</b> '+ body.payroll +'</div>'
  ].join('\n');
}

window.onload = () => {
  const id = getParameterByName("id", window.location.href);
  if(!id) {
    alert("provide Some id as url parameters!");
    return;
  }

  const info = getInfo(id);
  if(info.status != 200) {
    alert("Employee with specified id does not exists");
    return;
  }
  document.getElementById("content").innerHTML =
  getContent(id, JSON.parse(info.response));
}
