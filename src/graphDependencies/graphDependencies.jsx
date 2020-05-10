import React from 'react';
import { withStyles, Paper } from '@material-ui/core'
import Graph from 'react-graph-vis'

const styles = theme => ({
  graphWrapper: {
    width: '100%',
    backgroundColor: '#f8f8f8',
    marginTop: '.5em',
    padding: '.3em .6em',
    '& div:focus': {
      outline: 'none',
    },
    '& div:active': {
      outline: 'none',
    },
  },
  currentData: {
    marginBottom: '5px',
    textAlign: 'left',
  },
});

class GraphDependencies extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      graphTotal: props.graph,
      referenceSelect: [],
      dependenciesSelect: [],
      height: props.height,
      turn: props.turn,
    }
  }

  render() {
    const { classes } = this.props;

    // options for displaying the structure (general settings, settings for nodes and branches)
    const options = {
      height: `${this.props.height}px`, // height of layout
      width: '100%',
    
      physics: {
        enabled: false
      },
    
      layout: {
        hierarchical: {
          enabled: true,
          levelSeparation: 250, // distance between levels
          edgeMinimization: true,
          nodeSpacing: 250, // distance between nodes
          direction: this.props.turn, // placement positioning (LR, RL, UD, DU)
          sortMethod: 'hubsize', // tree placement direction, now from the top (hubsize, directed)
        },
      },
    
      interaction: { // interaction with the construction
        dragNodes: false,   // drag and drop nodes
        dragView: true,    // drag and drop build
        hover: true,
        zoomView: false,    // scaling
        selectable: true,  // the ability to select a specific node
        navigationButtons: false,
        // keyboard: true,
      },
      
      //  NODE STYLES
      nodes:{
        physics: true,
        borderWidth: 1,
        borderWidthSelected: 2,
        chosen: true, // enable guidance and node selection effects
        color: {
          border: '#1E3685',
          background: '#f7f7f7',
          highlight: {
            border: '#1E3685',
            background: '#eeeff1'
          },
          hover: {
            border: '#1E3685',
            background: '#eeeff1'
          }
        },
        // opacity: 1,
        font: {
          color: '#343434',
          size: 12, // px
          face: 'sans-serif',
          strokeWidth: 0, // px stroke thickness
          strokeColor: '#ffffff',
          align: 'center', // (left, center, right)
          multi: false, // 'md' - bold on (label:"*bold text*") and italic("_italic text_")
          vadjust: 0,  // vertical text offset
          bold: {
            color: '#343434',
            size: 14, // px
            face: 'arial',
            vadjust: 0,
            mod: 'bold'
          },
          ital: {
            color: '#343434',
            size: 14, // px
            face: 'arial',
            vadjust: 0,
            mod: 'italic',
          },
        },
        heightConstraint: {  // minimum node height, false (according to content) or object
          minimum: 50,
          valign: 'middle',
        },
        hidden: false,  // global node hiding
        // icon: {   // parameters for the node form 'icon'
        //   face: 'FontAwesome',
        //   code: undefined,
        //   weight: undefined,
        //   size: 50,  //50,
        //   color:'#2B7CE9'
        // },
        // image: {   // parameters for the node form 'image', maybe undefined
        //   selected: '',
        //   unselected: ''
        // },
        // imagePadding: {
        //   left: 0,
        //   top: 0,
        //   bottom: 0,
        //   right: 0
        // },
        labelHighlightBold: true,  // bold when selecting a node
        margin: { top: 5, right: 5, bottom: 5, left: 5 }, // margins text inside the node
        scaling: {   // node behavior when scaling the entire construction
          min: 10,
          max: 30,
          label: {
            enabled: false,
            min: 14,
            max: 30,
            maxVisible: 30,
            drawThreshold: 5
          },
        },
        shadow:{
          enabled: true,
          color: 'rgba(0,0,0,0.5)',
          size:5,
          x:2,
          y:2
        },
        shape: 'box',
        shapeProperties: {
          borderRadius: 4,     // only for box shape
          interpolation: false,  // only for image and circularImage shapes
          useImageSize: false,  // only for image and circularImage shapes
          useBorderWithImage: false  // only for image shape
        },
        size: 25,  // node sizes without text (image, circularImage, diamond, dot, star, triangle, triangleDown, hexagon, squareи icon)
        widthConstraint: { // minimum / maximum width of the node, false (by content) or object
          minimum: 50,
          maximum: 200,
        },
      },

      // EDGES STYLES
      edges:{
        arrows: {
          to: {
            enabled: true,
            // imageHeight: undefined,
            // imageWidth: undefined,
            scaleFactor: 1,
            // src: undefined,
            type: "arrow"
          },
          middle: {
            enabled: false,
          },
          from: {
            enabled: false,
          }
        },
        arrowStrikethrough: false, // correction of the position of the text on the edge, the thin end of the arrow
        chosen: true,  // enable edge guidance and edge selection
        color: {
          color:'#79c0f0',
          highlight:'#1E3685',
          hover: '#1E3685',
          inherit: 'from',
          opacity: 1.0
        },
        dashes: false,
        font: {
          color: '#343434',
          size: 12, // px
          face: 'sans-serif',
          strokeWidth: 0, // px stroke thickness
          strokeColor: '#ffffff',
          align: 'horizontal', // text and line layout (bottom, middle, horizontal)
          multi: 'html',
          vadjust: -10,
          bold: {
            color: '#343434',
            size: 12, // px
            face: 'arial',
            vadjust: 0,
            mod: 'bold'
          },
          ital: {
            color: '#343434',
            size: 12, // px
            face: 'arial',
            vadjust: 0,
            mod: 'italic',
          },
        },
        hidden: false, // full hide of the egde
        hoverWidth: 0, // hovering arrow, рх
        labelHighlightBold: true, // hover bold
        physics: true,
        scaling:{  // edge behavior when scaling the entire construction
          min: 1,
          max: 15,
          label: {
            enabled: true,
            min: 12,
            max: 30,
            maxVisible: 30,
            drawThreshold: 5
          },
        },
        selectionWidth: 0, // arrow thickening when highlighting, рх
        shadow:{
          enabled: true,
          color: 'rgba(0,0,0,0.5)',
          size:5,
          x:2,
          y:2,
        },
        smooth: { // edge shape
          enabled: true, // false - straight, true - curved
          type: "curvedCW", // 'dynamic', 'continuous', 'discrete', 'diagonalCross', 'straightCross', 'horizontal', 'vertical', 'curvedCW', 'curvedCCW', 'cubicBezier'
          forceDirection: 'vertical', // ('horizontal', 'vertical', 'none')
          roundness: 0.35
        },
        width: 1.5,  // line thickness
      },
    };

    // triggering events when selecting a directory in the structure
    const events = {
      select: function(event) {
        let { nodes, edges } = event;
        showStructure(nodes, edges);
      }
    };

    // display of the selected directory and its dependencies
    const showStructure = (n, e) => {
      const currentNode = this.state.graphTotal.nodes.find(i => i.id === n[0]) ? 
        this.state.graphTotal.nodes.find(i => i.id === n[0]).label : ' not select' ; // selected node
      const currentEdges = this.state.graphTotal.edges.filter(i => e.includes(i.id)).reduce((str, i) => str + ', ' + i.label, '') ?
        this.state.graphTotal.edges.filter(i => e.includes(i.id)).reduce((str, i) => str + ', ' + i.label, '').slice(2) : ' no dependencies';  // selected dependencies
      this.setState({referenceSelect: currentNode, dependenciesSelect: currentEdges})
    }

    return (
      <Paper elevation={5} className={classes.graphWrapper}>
        <div>
          <p className={classes.currentData}>Selected structure node: <b>{this.state.referenceSelect}</b></p>
          <p className={classes.currentData}>Dependencies of selected node: <b>{this.state.dependenciesSelect}</b></p>
        </div>
        <Graph
          identifier='my-network-graph'
          graph={this.state.graphTotal}
          options={options}
          events={events}
          getNetwork={network => {
            //  if you want access to vis.js network api you can set the state in a parent component using this property
          }}
      />
    </Paper>
    )
  }
}

export default withStyles(styles)(GraphDependencies)
