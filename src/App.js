import React, { Component } from 'react';

import Myform from './Myform';
import './Assets/css/default.min.css';

class App extends Component {
  state = {
    isLoading: false,
    data: [],    
    errorMsg: ''
  }   
  
  onSearch = async (e) =>{ 
    e.preventDefault();     
    const myValue = e.target.elements.search.value;
    if(myValue !== ''){
      this.setState({isLoading: true}); 
      try{
        const dataFromApi = await fetch(`https://api.github.com/search/repositories?q=${myValue}`);
        const mainData = await dataFromApi.json(); 
        document.getElementById("comm").value = '';            
        this.setState({                                           
          data: mainData.items,
          isLoading: false,
          errorMsg: ''
        }) 
      } catch(error){
        console.log(error);
      }     
    }else{console.log("error on page");}
        
  }  

  render() {
    const {isLoading, data} = this.state;

    let  records = data.map((dynamic, index) =>{     
        return (
          <div key={index} className="profile">          
            <img src={dynamic.owner.avatar_url} alt={dynamic.name} />
            <div className="caption">
              <strong>{"Repo Name: "+ dynamic.full_name}</strong>
            </div><br/>
            <div className="detail">
            <span><strong>Forks:</strong> {dynamic.forks_count} </span>
            <span><strong>Open Issues:</strong> {dynamic.open_issues_count}</span><br/>
            <span><strong>Watches:</strong> {dynamic.watchers_count}</span>
            <span><strong>Size:</strong> {dynamic.size}</span><br/>           
            </div>
          </div>
        );
      })
    

    return (
      <div id="myContainer" className={`${isLoading ? 'is-loading' : ''}`}>       
       <Myform triggerSearch={this.onSearch} />
        {
          !isLoading && data.length > 0 
            ? records
            : null          
        }
        <div className="loader">
            <div className="icon"></div>
        </div>
      </div>
    );
  }
}

export default App;
