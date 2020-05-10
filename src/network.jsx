import React from 'react'
import { withStyles , Button, Paper } from '@material-ui/core'
import ArrowUpward from '@material-ui/icons/ArrowUpward'
import ArrowDownward from '@material-ui/icons/ArrowDownward'
import Rotate90DegreesCcw from '@material-ui/icons/Rotate90DegreesCcw'
import Autorenew from '@material-ui/icons/Autorenew'

import Graph from './graphDependencies/graphDependencies'

const styles = theme => ({
    dependenciesReference: {
      display: 'flex',
      flexFlow: 'column nowrap',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      minHeight: '445px',
      padding: '1em 1em',
      overflow: 'hidden',
      margin: '.5em',
    },
    controlButtons: {
      alignSelf: 'flex-end'
    },
    controlButton: {
      margin: '0 5px 5px 0',
      '& svg': {
        marginLeft: '5px'
      }
    },
    explanation: {
      fontSize: '.7em',
      fontWeight: '700',
      color: '#666'
    },
});

class Network extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            heightGr: 300,  // height container
            redraw: true,   // redraw state
            turn: 'UD',     // rotate network
        }
    }

    componentDidMount = () => { };

    // container height change for easy display of structure
    handleClick(h) {
      !((h < 0 ) & (this.state.heightGr < 350 )) && this.setState({heightGr: this.state.heightGr + h})
    }

    // redrawing the structure to the new container size and due to window changes
    async redrawAll() {
      await this.setState({ redraw: !this.state.redraw })
      await this.setState({ redraw: !this.state.redraw })
    }

    // rotate structure display counterclockwise
    turnGraph() {
      const sides = ['UD', 'LR', 'DU', 'RL']
      this.state.turn === 'RL' ? this.setState({ turn: 'UD' }) : this.setState({ turn: sides[sides.indexOf(this.state.turn)+1] })
      this.redrawAll()
    }

    // REST adaptation for building a dependency structure
    adaptationKeys(graphStructure) {
      let graphAdapted = graphStructure
      const graphNodes = graphAdapted.nodes.map(item => {
        return { id: item.id, label: item.label }
      })
      const graphEdges = graphAdapted.edges.map(item => {
          return { from: item.fromId, to: item.toId, label: item.label}
      })
      graphAdapted = this.foundSimilarConnections(graphNodes, graphEdges)
      return graphAdapted
    }

    // selection of the container height for the structure depending on the number of nodes in the structure
    heightSelection(nodes) {
      return this.state.heightGr + nodes.length * 30 
    }

    // collapse of several links from one directory to another into one
    foundSimilarConnections(nodes, edges) {
      let graphNewNodes = []
      let graphNewEdges = []
      for (let i=0; i < edges.length; ) {
        graphNewEdges.push(edges.shift())
        if(edges.length) {
          let indexes = []
          // eslint-disable-next-line no-loop-func
          let rez = edges.reduce((rez, item, i) => { 
            if((item.from === graphNewEdges[graphNewEdges.length-1].from) & (item.to === graphNewEdges[graphNewEdges.length-1].to)) {
              rez+=', '+item.label
              indexes.push(i)
            }
            return rez }, [''])
          edges = edges.filter((item ,i) => !indexes.includes(i) && item)
          graphNewEdges[graphNewEdges.length-1].label+=rez
        }
      }
      if(!!!graphNewNodes.length) graphNewNodes = nodes
      if(!!!graphNewEdges.length) graphNewEdges = edges
      return { nodes: graphNewNodes, edges: graphNewEdges }
    }

    render() {
      const { classes } = this.props;

      const graphStructure = {
        nodes: [
          { id: 1,label: 'Node one' },
          { id: 2,label: 'Node two' },
          { id: 3,label: 'Node three' },
          { id: 4,label: 'Node four' },
          { id: 5,label: 'Node five' },
        ],
        edges: [
          { fromId: 3, toId: 1, label: 'edge one' },
          { fromId: 1, toId: 2, label: 'edge two' },
          { fromId: 1, toId: 5, label: 'edge three' },
          { fromId: 5, toId: 2, label: 'edge four' },
          { fromId: 5, toId: 4, label: 'edge five' },
          { fromId: 4, toId: 1, label: 'edge six' },
          { fromId: 2, toId: 3, label: 'edge seven' },
          { fromId: 1, toId: 2, label: 'edge eight' },
          { fromId: 5, toId: 4, label: 'edge nine' },
          { fromId: 3, toId: 1, label: 'edge ten' },
          { fromId: 1, toId: 4, label: 'edge eleven' },
          { fromId: 1, toId: 3, label: 'edge twelve' },
        ],
      }

      const graph = graphStructure.nodes ? this.adaptationKeys(graphStructure) : {}

      //  display options depending on the presence of logical connections
      const displayStructure = () => {
          if (graphStructure.nodes && this.state.redraw) {
            if (graphStructure.nodes.length) return <Graph graph={graph} height={this.heightSelection(graph.nodes)} turn={this.state.turn} />
            else return <div>There are no logical connections in this structure</div>
          } 
        else return <div>Loading logical connections...</div>
      }

      return (
        <Paper elevation={5} className={classes.dependenciesReference}>
          <p className={classes.explanation}>library for building network (graph dependencies) with advanced functions</p>
          <h3 style={{ margin: '.3em 0' }}>Logical network dependencies: {this.props.name}</h3>
          {graphStructure.nodes && (graphStructure.nodes.length > 0) && <div className={classes.controlButtons}>
            <Button
              variant='contained'
              onClick={() => this.handleClick(50)}
              color='primary'
              size='small' 
              className={classes.controlButton}>Increase<ArrowDownward /></Button>
            <Button
              variant='contained'
              onClick={() => this.handleClick(-50)}
              color='primary'
              size='small'
              className={classes.controlButton}>Decrease<ArrowUpward/></Button>
            <Button
              variant='contained'
              onClick={() => this.turnGraph()}
              color='primary'
              size='small'
              className={classes.controlButton}>Rotate<Rotate90DegreesCcw /></Button>
            <Button
              variant='contained'
              onClick={() => this.redrawAll()}
              color='primary'
              size='small'
              className={classes.controlButton}>Redraw<Autorenew /></Button>
          </div> }
          { displayStructure() }
        </Paper>
      )
    }
}

export default withStyles(styles)(Network)