//alert("Hello, France!")
upt_cht();

function upt_cht(var_bin='True') {

  console.log(var_bin);

  if (var_bin == 'True') {
      //Get and draw data
      init();

      d3.tsv("/assets/files/france.tsv")
        .row( (d, i) => {
          return {
            postalCode: +d["Postal Code"],
            inseeCode: +d.inseecode,
            place: d.place,
            longitude: +d.x,
            latitude: +d.y,
            population: +d.population,
            density: +d.density
          };
        }
      )
        .get( (error, rows) => {
          console.log("Loaded " + rows.length + " rows");
          if (rows.length > 0){
             console.log("First row: ", rows[0])
             console.log("Last row " , rows[rows.length - 1])
          }
          dataset = rows;

          //Scale coordinates
          var x = d3.scaleLinear()
            .domain(d3.extent(rows, (row) => row.longitude))
            .range([50,600]);
          var y = d3.scaleLinear()
            .domain(d3.extent(rows, (row) => row.latitude))
            .range([600,50]);

          //Scale axis
          var xAxis = svg.append("g")
            .attr("transform", "translate(0," + 620 + ")")
            .attr("class", "xaxis")
            .call(d3.axisBottom(x));
          var yAxis = svg.append("g")
            .attr("transform", "translate(0,0)")
            .attr("class", "yaxis")
            .call(d3.axisRight(y));
          //Draw function
          function draw_tooltip() {

            svg.selectAll("circle")
                .data(dataset)
                .enter()
                .append("circle")
                  .attr("r", (d) => rscale(d.population))
                  .attr("cx", (d) => x(d.longitude))
                  .attr("cy", (d) => y(d.latitude))
                  .attr("class", "circles")
                  .attr("opacity", .9)
                  .attr("fill", (d) => colorScale(d.density))
                .on("mouseover", function(d) {    
                  div.transition()    
                    .duration(20)    
                    .style("opacity", .9);    
                  div .html("<b>Town : </b>" + d.place + "<br/>" + "<b>Postal Code : </b>" + d.postalCode)  
                    .style("left", (d3.event.pageX) + "px")   
                    .style("top", (d3.event.pageY) + "px");  
                  })          
                .on("mouseout", function(d) {   
                  div.transition()    
                    .duration(500)    
                    .style("opacity", 0) })

          }
          //Draw function
          draw_tooltip();
        }
      );
    }

  else {

      init();

        //Get and draw data
      d3.tsv("/assets/files/france.tsv")
        .row( (d, i) => {
          return {
            postalCode: +d["Postal Code"],
            inseeCode: +d.inseecode,
            place: d.place,
            longitude: +d.x,
            latitude: +d.y,
            population: +d.population,
            density: +d.density
          };
        }
      )
        .get( (error, rows) => {
          console.log("Loaded " + rows.length + " rows");
          if (rows.length > 0){
             console.log("First row: ", rows[0])
             console.log("Last row " , rows[rows.length - 1])
          }
          var dataset = rows;

          //Scale coordinates
          var x = d3.scaleLinear()
            .domain(d3.extent(rows, (row) => row.longitude))
            .range([50,600]);
          var y = d3.scaleLinear()
            .domain(d3.extent(rows, (row) => row.latitude))
            .range([600,50]);

          //Scale axis
          var xAxis = svg.append("g")
            .attr("transform", "translate(0," + 620 + ")")
            .attr("class", "xaxis")
            .call(d3.axisBottom(x));
          var yAxis = svg.append("g")
            .attr("transform", "translate(10,0)")
            .attr("class", "yaxis")
            .call(d3.axisRight(y));

          function draw_zoom() {
            //Clip to zoom
            clip = svg.append("defs").append("SVG:clipPath")
              .attr("id", "clip")
              .append("SVG:rect")
              .attr("width", 620 )
              .attr("height", 620 )
              .attr("x", 0)
              .attr("y", 0);

            //Plot all circles
            scatter.selectAll("circle")
              .data(dataset)
              .enter()
              .append("circle")
                .attr("r", (d) => rscale(d.population))
                .attr("cx", (d) => x(d.longitude))
                .attr("cy", (d) => y(d.latitude))
                .attr("class", "circles")
                .attr("opacity", .9)
                .attr("fill", (d) => colorScale(d.density))

              // Zoom and rescale
            zoom = d3.zoom()
              .scaleExtent([.5, 20])  // This control how much you can unzoom (x0.5) and zoom (x20)
              .extent([[0, 0], [620, 620]])
              .on("zoom", updateChart);

            svg.append("rect")
              .attr("width", w)
              .attr("height", h)
              .style("fill", "none")
              .style("pointer-events", "all")
              .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
              .call(zoom);

        }

        function updateChart() {

          //Recover the new scale
          var newX = d3.event.transform.rescaleX(x);
          var newY = d3.event.transform.rescaleY(y);

          //Update axes with these new boundaries
          xAxis.call(d3.axisBottom(newX))
          yAxis.call(d3.axisLeft(newY))

          //Update circle position
          scatter
            .selectAll("circle")
            .attr('cx', function(d) {return newX(d.longitude)})
            .attr('cy', function(d) {return newY(d.latitude)});
          }
          //Draw function
          draw_zoom();
        }
      );
  }
}

function init() {
  d3.selectAll("svg").remove()

  w = 700;
  h = 700;

  //Datasets
  dataset = [];
  margin = {top: 0, right: 0, bottom: 0, left: 0};

  svg = d3.select("body")
            .append("svg")
              .attr("width", w + margin.left + margin.right)
              .attr("height", h + margin.top + margin.bottom);

  // Define the div for the tooltip
  div = d3.select("body").append("div") 
    .attr("class", "tooltip")       
    .style("opacity", 0);

  scatter = svg.append('g')
        .attr("clip-path", "url(#clip)")

  //For the size of the circle
  rscale = d3.scaleLinear()
    .domain([0,3000000])
    .range([1,30])

  //Color of the circles (choice)
  colorScale = d3.scaleSequential(d3.interpolateViridis)
    .domain([0, 200]);

}

//This function is called by the buttons on top of the plot
function changeColor(color){
  color = color;
  d3.selectAll("circle")
    .transition()
    .duration(2000)
    .style("fill", color)
}