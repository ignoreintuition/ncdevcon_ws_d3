function renderBar(data, svg) {
  //init
  var rects = svg.selectAll("rect").data(data);
  //enter
  rects.enter().append("rect")
    .attr("width",          5 )
    .attr("x", (d, i)   =>  i * 6 )
    .attr("y", (d)      =>  100 - d )
    .attr("height", (d) =>  d )
  // update
  rects.transition().duration(0)
    .attr("x", (d, i)   =>  i * 6 )
    .attr("y", (d)      =>  100 - d )
    .attr("height", (d) =>  d )
  // exit
  rects.exit().remove();
}
