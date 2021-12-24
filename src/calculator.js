
const calcItems =[
  { id: "clear", text: 'CLR', class: 'calc-button bkg3', style: {gridColumnStart: "span 3"} },
  { id: "add", text: '+', class: 'calc-button bkg3' },
  { id: "one", text: '1', class: 'calc-button bkg2' },
  { id: "two", text: '2', class: 'calc-button bkg2' },
  { id: "three", text: '3', class: 'calc-button bkg2' },
  { id: "subtract", text: '-', class: 'calc-button bkg3' },
  { id: "four", text: '4', class: 'calc-button bkg2' },
  { id: "five", text: '5', class: 'calc-button bkg2' },
  { id: "six", text: '6', class: 'calc-button bkg2' },
  { id: "multiply", text: '*', class: 'calc-button bkg3' },
  { id: "seven", text: '7', class: 'calc-button bkg2' },
  { id: "eight", text: '8', class: 'calc-button bkg2' },
  { id: "nine", text: '9', class: 'calc-button bkg2' },
  { id: "divide", text: '/', class: 'calc-button bkg3' },
  { id: "zero", text: '0', class: 'calc-button bkg2' },
  { id: "decimal", text: '.', class: 'calc-button bkg2' },
  { id: "equals", text: '=', class: 'calc-button bkg3', style: {gridColumnStart: "span 2"} }
]

class CButton extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div 
        id={this.props.id} 
        className={this.props.className} 
        style={this.props.style}
        onClick={this.props.onClick}
      >{this.props.value}</div>
    )
  }
}

class Display extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      power: true
    };
  }
  render() {
    return (
      <div id={this.props.id} className={this.props.className} style={this.props.style}>{this.props.value}</div>
    )
  }
}

class CalculatorContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: '0'
    };
    this.addToDisplay = this.addToDisplay.bind(this); 
  }
  
  addToDisplay(event) {
    let bText = event.target.outerText
    let prevV = this.state.display
    //console.log( typeof prevV)
    let lastNum = prevV.match(/[0-9.]*$/)[0]
    //console.log(lastNum)
      
    if (bText === 'CLR') { this.setState({ display: "0" }) //clear
    } else if (bText === '=') { this.setState({ display: eval(this.state.display).toString() }) //evaluate
    } else if (bText.match(/[+\-/\*]/)) { //handle operators
      //console.log('handle operators')
      let lastOper = prevV.match(/[+\-/\*]+$/)
      //console.log(lastOper )
      if (lastOper === null) { this.setState({ display: prevV + bText })
      } else if (bText === '-') {
        //console.log('Does lastOper: ' + lastOper + ' === "*" ?' + (lastOper === '*'))
        if (lastOper[0].length === 2) {
          //Do Nothing - last Operand can only be length two for *- or /-
        } else if (lastOper[0] === '*') {
          // Add - to the end for *- or /-
          this.setState({ display: prevV + bText })
        } else {
          //replace + with -
           this.setState({ display: this.state.display.slice(0,-1) + bText })  
        }
      } else {
        // * / +
        this.setState({ display: this.state.display.slice(0,-1*lastOper[0].length) + bText })
      } 
    } else if (bText === '0') { //handle 0
      if ( lastNum !== '0' ) { this.setState({ display: prevV + bText })}
    } else if (bText.match(/[1-9]/)) { //handle numbers
      if (lastNum === '0') {
        this.setState({ display: prevV.slice(0, -1) + bText })        
      } else {
        this.setState({ display: prevV + bText })
      }
    } else if ( bText === '.') { //handle .
      if (lastNum.indexOf('.') === -1) { this.setState({ display: prevV + bText }) }
    } 
  }
  
  render() {
    let itemButtons = this.props.items.map((item, i, itemArr) =>{
      //console.log(item)
      return (
        <CButton id={item.id} 
          className={item.class}
          style={item.style}
          onClick={this.addToDisplay}
          value={item.text} />
      )
    } )
    //console.log(itemButtons)
    return (
      <div className='calcContainer'>
        <Display 
          id="display"
          className='calc-display bkg1'
          style={{gridColumnStart: "span 4"}}
          value={this.state.display}
          />
        {itemButtons}
      </div>)
  }
}

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      power: true
    };
  }
  render() {
    return (
      <div className='inner-container' id='calculator'>
        <CalculatorContainer items={calcItems}/>
      </div>
    );
  }
}



ReactDOM.render(<Calculator />, document.getElementById('root'));


