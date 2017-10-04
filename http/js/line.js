function renderLine(data, svg) {
  //init
  var lines = svg.selectAll("line").data(data);

  //enter
  lines.enter().append("line")
    .attr("style", "stroke:rgb(256,0,0);stroke-width:2")
    .attr("x1", (d, i) => (i-1) * 6 )
    .attr("y1", (d, i) => (isNaN(data[i-1]) ? 0 : 100 - data[i-1]) )
    .attr("x2", (d, i) => i * 6 )
    .attr("y2", (d) => 100 - d )
  // update
  lines.transition().duration(0)
    .attr("x1", (d, i) => (i-1) * 6 )
    .attr("y1", (d, i) => (isNaN(data[i-1]) ? 0 : 100 - data[i-1]))
    .attr("x2", (d, i) => i * 6 )
    .attr("y2", (d) => 100 - d)
  // exit
  lines.exit().remove();
}
