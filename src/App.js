import React, {Component} from 'react';
import './App.css';
import axios from 'axios';
import { Bar } from "react-chartjs-2";

class App extends Component {
  state = {
    graficoBarra: []
}
async componentDidMount(){
        
  const res = await axios.get(`https://private-afe609-testefront.apiary-mock.com/anual-result`);
      this.setState({graficoBarra: res.data});
    console.log(res.data);
      
}
render() {
  const opcoes={
    responsive: true,
        legend: { display: false},
        title: {
            display: true,
            text: "BARS CHART",
            position: 'top',
            fontFamily: "arial",
            fontSize: 20,
            
          }
  };
  const data={
    labels: this.state.graficoBarra.map( mes => mes.label.substring(0,3)),
        datasets: [{
        label: "Bars Chart",
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: this.state.graficoBarra.map(valor => valor.value),
        }]
  };
  return (
    <div>
      <Bar data={data} options={opcoes} />
      </div>
    );
  
}  
}

export default App;
