const getEmployeePayroll = function (id) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'http://localhost:4000/api/employee_payroll\?id\=' + id, false); // sync request
  const foo = xhr.send();
  return xhr;
};

const getEmployeeInfo = function (id) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'http://localhost:3000/api/employee\?id\=' + id, false); // sync request
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

const getContent = function (id, info, payroll) {
  return [
    '<h3> Employee details for id: '+ id + '</h3>',
    '<div> <b>Employee Name:</b>'+ info.name+' </div>',
    '<div> <b>Work Location:</b> '+ info.office_location +' </div>',
    '<div> <b>Payroll:</b> '+ payroll.payroll +'</div>'
  ].join('\n');
}

window.onload = () => {
  const id = getParameterByName("id", window.location.href);
  if(!id) {
    alert("provide Some id as url parameters!");
    return;
  }
  const payroll = getEmployeePayroll(id);
  const info = getEmployeeInfo(id);
  if(payroll.status != 200) {
    alert("Employee with specified id does not exists");
    return;
  }
  document.getElementById("content").innerHTML =
  getContent(id, JSON.parse(info.response), JSON.parse(payroll.response));
}
