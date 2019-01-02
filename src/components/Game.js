import React, { Component } from 'react';
import coordinates from '../lines/coordinates';

class Game extends Component {

  constructor(){
    super();
    this.state = {
      activeplayer: 'player',
      activebot: 'player',
      contents: '',
      selectItem: 'select-trik',
      selected: [],
      disabled: 'true',
      table: 'content',
      gameEvents: 'game-events',
      overText: 'hide',
      textOverGame: ''
    };

    this.clickedItem = this.clickedItem.bind(this);
    this.clickStart = this.clickStart.bind(this);
  }
   /* This possibilities for winner the game..
     key is 'X' or 'O'
    */
  findWin(key){

    let posibleWins = [];

    // Possibilities horizontals
    posibleWins[0] = `${key}1.1-${key}1.2-${key}1.3`.split('-').sort().join('-');
    posibleWins[1] = `${key}2.1-${key}2.2-${key}2.3`.split('-').sort().join('-');
    posibleWins[2] = `${key}3.1-${key}3.2-${key}3.3`.split('-').sort().join('-');

    // Possibilities verticals
    posibleWins[3] = `${key}1.1-${key}2.1-${key}3.1`.split('-').sort().join('-');
    posibleWins[4] = `${key}1.2-${key}2.2-${key}3.2`.split('-').sort().join('-');
    posibleWins[5] = `${key}1.3-${key}2.3-${key}3.3`.split('-').sort().join('-');

    // Possibilities crossed
    posibleWins[6] = `${key}1.1-${key}2.2-${key}3.3`.split('-').sort().join('-');
    posibleWins[7] = `${key}1.3-${key}2.2-${key}3.1`.split('-').sort().join('-');

    // bugs lol
    posibleWins[8]  = `${key}1.1-${key}2.2-${key}3.2-${key}3.3`;
    posibleWins[9]  = `${key}1.2-${key}1.3-${key}2.2-${key}3.2`;
    posibleWins[10] = `${key}1.1-${key}1.2-${key}2.1-${key}3.1`;
    posibleWins[11] = `${key}1.2-${key}2.2-${key}2.3-${key}3.2`;
    posibleWins[12] = `${key}1.2-${key}2.1-${key}2.2-${key}3.2`;
    posibleWins[13] = `${key}1.3-${key}2.1-${key}2.2-${key}3.1-${key}3.3`;
    posibleWins[14] = `${key}1.1-${key}1.2-${key}2.2-${key}3.3`;
    posibleWins[15] = `${key}1.3-${key}2.2-${key}2.3-${key}3.3`;
    posibleWins[16] = `${key}1.1-${key}2.2-${key}2.3-${key}3.3`;
    posibleWins[17] = `${key}1.1-${key}2.1-${key}2.2-${key}3.1`;
    posibleWins[18] = `${key}1.1-${key}1.3-${key}2.1-${key}3.1`;

    return posibleWins;

  }


  validateWin(){

    const {selected} = this.state;
 
    let winner = selected.map((item, i) => {
      item.index = item.index.replace(',', '.');
      return `${item.content}${item.index}`;
    }).sort().join('-');

    const winx = this.findWin('X').map((posible, i) =>{
      return winner.includes(posible);
    }); 

    const wino = this.findWin('Z').map((posible, i) =>{
      return winner.includes(posible);
    }); 

    //console.log(winner);
 
    if (winx.includes(true)) {
      this.setState({
        table: 'hide-template',
        gameEvents: 'game-over',
        textOverGame: 'Player X win :)',
        overText: 'over-text',
        activeplayer: 'player turn-player',
        activebot: 'player'
      });

    }else if(wino.includes(true)){
      this.setState({
        table: 'hide-template',
        gameEvents: 'game-over',
        textOverGame: 'Player O win :)',
        overText: 'over-text',
        activeplayer: 'player',
        activebot: 'player turn-player'
      });

    }else if(selected.length === 9 && !winx.includes(true) && !wino.includes(true)){
      this.setState({
        table: 'hide-template',
        gameEvents: 'game-over',
        textOverGame: 'X - O TIE ',
        overText: 'over-text',
        activeplayer: 'player turn-player',
        activebot: 'player turn-player'
      });

     }   


   }
 
  clickedItem(e){
    e.preventDefault();
    const {textContent} = e.target; 
    const {disabled, activeplayer, activebot} = this.state;
          
    if (activeplayer === 'player turn-player' && textContent === '*' && disabled === 'false') {
      e.target.textContent = 'X';
      e.target.className = 'select-trik bounceIn';
      this.setState({
        activeplayer: 'player',
        activebot: 'player turn-player'
      });
          // validation num 
      let data = {
        'index': e.target.id,
        'content': 'X'
      };

      this.setState(prevState => ({
        selected: [...prevState.selected, data]
      }));
               
    }else if(activebot === 'player turn-player' && textContent === '*' && disabled === 'false'){

      e.target.textContent = 'O';
      e.target.className = 'select-trik bounceIn';
      this.setState({
        activeplayer: 'player turn-player',
        activebot: 'player '
      });
         
      let data = {
        'index': e.target.id,
        'content': 'Z'
      };

      this.setState(prevState => ({
        selected: [...prevState.selected, data]
      }));
         
    }

     
    setTimeout(
      function() {
        this.validateWin();
      }.bind(this),
        500
    ); 


  }

  clickStart(e){
     
    e.target.className = 'hide';
    this.setState({
      activeplayer: 'player turn-player', 
      disabled: 'false'
    });

  }


  render() {
    
    const items = coordinates.map((item, i)=>{
        return <div className="select-trik" key={i} id={item.index} onClick={this.clickedItem} >*</div>
    });

    return (
      <div className="{this.state.gameContent}">
        <div className={this.state.activeplayer} id="player1">
          <span className="type-player">x</span>
        </div>

        <div className={this.state.activebot} id="bot">
          <span className="type-player">O</span>
        </div><br/>

        <div className={this.state.gameEvents}>
          <div className={this.state.overText}>
            {this.state.textOverGame}
          </div>

          <div className={this.state.table}>
            {items}
          </div><br/>
            <button className="button_start" onClick={this.clickStart}>start</button>  
        </div><br/>
           
       </div>
    );
  }
}

export default Game;