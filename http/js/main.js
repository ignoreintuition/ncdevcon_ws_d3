const socket = new WebSocket("ws://localhost:8080");
var svg   = [],
    data = {
      high:   [],
      low:    [],
      open:   [],
      close:  []
    }

svg.push(d3.select("#highChart").append("svg")
  .attr("height", 100)
  .attr("width", 200));
svg.push(d3.select("#lowChart").append("svg")
  .attr("height", 100)
  .attr("width", 200));
svg.push(d3.select("#openGraph").append("svg")
  .attr("height", 100)
  .attr("width", 200));
svg.push(d3.select("#closeGraph").append("svg")
  .attr("height", 100)
  .attr("width", 200));

socket.addEventListener('open', function(event) {
  socket.send("Connected");
});

socket.addEventListener('message', function(event) {
  d = JSON.parse(event.data)
  $("#tabular").html(
    card({ 'nm': 'Date',
           'v': d.Date }) +
    card({ 'nm': 'High',
           'v': d.High }) +
    card({ 'nm': 'Low',
           'v': d.Low }) +
    card({ 'nm': 'Open',
           'v': d.Open }) +
    card({ 'nm': 'Close',
           'v': d.Close }));

  data.high.push(d.High / 50);
  if (data.high.length > 35) data.high.splice(0, 1);
  renderBar(data.high, svg[0]);

  data.low.push(d.Low / 50);
  if (data.low.length > 35) data.low.splice(0, 1);
  renderBar(data.low, svg[1]);

  data.open.push(d.Open / 50);
  if (data.open.length > 35) data.open.splice(0, 1);
  renderLine(data.open, svg[2]);

  data.close.push(d.Close / 50);
  if (data.close.length > 35) data.close.splice(0, 1);
  renderLine(data.close, svg[3]);

})

var card = function(obj) {
  return `
  <div class="row">
  <div class="col-lg-1"> ${obj.nm} </div>
  <div class="col-lg-2"> ${obj.v} </div>
  </div>
  `
}
