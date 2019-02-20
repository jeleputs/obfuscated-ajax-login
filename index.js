function pasuser(form) {
  const str = salt(form.pass.value);
  const tp = str.ts;
  const pw = sha3_512(str.ss);
  const encUsr = salt(form.id.value);
  const hs = sha3_512(pw + encUsr.ss);
  post('http://example.com/path/to/model', {
    tp,
    pw,
    ...encUsr,
    hs
  });
}
function salt(str) {
  const date = new Date();
  const ts = date.getTime().toString();
  const sp = str.split('');
  const ta = ts.split('').reverse();
  var ss = '';
  for (i in sp) {
    ss += rc(ta[i % 6]) + sp[i];
  }
  return { ss, ts };
}
function rc(i) {
  const possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var text = '';
  for (var j = 0; j < i * 2; j++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  return text;
}
function post(path, params, method) {
  var xhttp = new XMLHttpRequest();
  console.log(params);
  method = method || 'post'; // Set method to post by default if not specified.
  xhttp.open(method, path, true);
  xhttp.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
  xhttp.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
  xhttp.setRequestHeader('length', 'XMLHttpRequest');
  xhttp.setRequestHeader('test', 'ok');
  xhttp.send(params);
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      // Typical action to be performed when the document is ready:
      console.log(xhttp.responseText);
    }
  };
}
