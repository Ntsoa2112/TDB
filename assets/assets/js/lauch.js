/**
 * Created by 01241 on 31/10/2018.
 */

  function init_lauch(stat) {
    var objectArraySetCoordonnee=[];
    stat.forEach(function(coordonnee_val){
      var objetCoordonnee={};
      objetCoordonnee.key=coordonnee_val.key;
      objetCoordonnee.src="10x10";
      objetCoordonnee.loc= new go.Point(coordonnee_val.coordonnee_x,coordonnee_val.coordonnee_y);
      if(coordonnee_val.connected)
      {
        objetCoordonnee.color="4";
      }
      else
      {
        objetCoordonnee.color="9";
      }
      objectArraySetCoordonnee.push(objetCoordonnee);
    });
    if (window.goSamples) goSamples();  // init for these samples -- you don't need to call this
    var $ = go.GraphObject.make;  // for conciseness in defining templates

    myDiagram =
      $(go.Diagram, "myDiagramDiv",
        {
          initialContentAlignment: go.Spot.TopLeft,
          isReadOnly: true,  // allow selection but not moving or copying or deleting
          scaleComputation: function(d, newsc) {
            // only allow scales that are a multiple of 0.1
            var oldsc = Math.round(d.scale * 10);
            var sc = oldsc + ((newsc * 10 > oldsc) ? 1 : -1);
            if (sc < 1) sc = 1;  // but disallow zero or negative!
            return sc / 10;
          },
          "toolManager.hoverDelay": 100  // how quickly tooltips are shown
        });

    // the background image, a floor plan
    myDiagram.add(
      $(go.Part,  // this Part is not bound to any model data
        { layerName: "Background", position: new go.Point(0, 0),
          selectable: false, pickable: false },
        $(go.Picture, "assets/img/ET_TSD_RDC.jpg")
      ));

  myDiagram.addDiagramListener("ObjectDoubleClicked", function (ev) {
    console.log(ev.subject.ej.$d); //Successfully logs the node you clicked.
  });
/*  myDiagram.addDiagramListener("Clicked", function (ev) {
    console.log(ev.subject); //Successfully logs the node you clicked.
  }); */

    // the template for each kitten, for now just a colored circle
    myDiagram.nodeTemplate =
      $(go.Node,
        new go.Binding("location", "loc"),  // specified by data
        { locationSpot: go.Spot.Center },   // at center of node
        $(go.Shape, "Circle",
          { width: 10, height: 10, strokeWidth: 3 },
          new go.Binding("fill", "color", makeFill),
          new go.Binding("stroke", "color", makeStroke)
        ),  // also specified by data
        { // this tooltip shows the name and picture of the kitten
          toolTip:
            $(go.Adornment, "Auto",
              $(go.Shape, { fill: "lightyellow" }),
              $(go.Panel, "Vertical",
                $(go.Picture, { margin: 3 },
                  new go.Binding("source", "src", function(s) { return "images/" + s + ".png"; })),
                $(go.TextBlock, { margin: 3 },
                  new go.Binding("text", "key"))
              )
            )  // end Adornment

        }
      );

    // pretend there are four kittens
    myDiagram.model.nodeDataArray = objectArraySetCoordonnee;

    function loop() {
      setTimeout(function() { randomMovement(); loop(); }, 2000);
    }
    loop();  // start the simulation

    // generate some colors based on hue value
    function makeFill(number) {
      return HSVtoRGB(0.1 * number, 0.5, 0.7);
    }
    function makeStroke(number) {
      return HSVtoRGB(0.1 * number, 0.5, 0.5); // same color but darker (less V in HSV)
    }
    function HSVtoRGB(h, s, v) {
      var r, g, b, i, f, p, q, t;
      i = Math.floor(h * 6);
      f = h * 6 - i;
      p = v * (1 - s);
      q = v * (1 - f * s);
      t = v * (1 - (1 - f) * s);
      switch (i % 6) {
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
      }
      return 'rgb(' +
        Math.floor(r * 255) + ',' +
        Math.floor(g * 255) + ',' +
        Math.floor(b * 255) + ')';
    }
  }
