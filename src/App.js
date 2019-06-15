import React, {Component} from 'react';
import './App.css';
import axios from 'axios';
import { Bar, Pie, Line } from "react-chartjs-2";

class App extends Component {
  state = {
    graficoBarra: [],
    graficoPizza: [],
    graficoLinhaToday: [],
    graficoLinhaYesterday: []
}
async componentDidMount(){
        
  const res = await axios.get(`https://private-afe609-testefront.apiary-mock.com/anual-result`);
      this.setState({graficoBarra: res.data});
  const res2 = await axios.get(`https://private-afe609-testefront.apiary-mock.com/anual-percentage`);
      this.setState({graficoPizza: res2.data});
  const res3 = await axios.get(`https://private-afe609-testefront.apiary-mock.com/time-data`);
      this.setState({graficoLinhaToday: res3.data.today});
      this.setState({graficoLinhaYesterday: res3.data.yesterday});
    console.log(res.data);
    console.log('Teste:    ' + JSON.stringify(this.state.graficoLinhaToday));
    console.log('Teste:    ' + JSON.stringify(this.state.graficoLinhaYesterday));
      
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
  const opcoesPizza={
    responsive: true,
        legend: { display: false},
        title: {
            display: true,
            text: "PIE CHART",
            position: 'top',
            fontFamily: "arial",
            fontSize: 20,
            
          }
  };

  const opcoesLinha={
    // responsive: true,
        // legend: { display: false},
        title: {
            display: true,
            text: "LINE CHART",
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
  const data1={
    labels: this.state.graficoPizza.map( legend => legend.label),
        datasets: [{
        data: this.state.graficoPizza.map(valor => valor.value),
        backgroundColor: ['pink', 'blue', 'black']
        }]

  };

  const dataLine={
    labels: this.state.graficoLinhaToday.map( linha => linha.label),
    // this.state.graficoLinha.map( linha => linha.label),
        datasets: [{
          data: this.state.graficoLinhaToday.map(today => today.value),
          label: 'Today',
          borderColor: 'blue',
          fill: false
        } ,
        {
          
          data: this.state.graficoLinhaYesterday.map(yesterday => yesterday.value),
          label: 'yesteday',
          borderColor: 'red',
          fill: false
        }
      ]

  };
  return (
    <div>
      <Bar data={data} options={opcoes} />
      <Pie data={data1} options={opcoesPizza} />
      <Line data={dataLine} option={opcoesLinha} />      
      </div>
    );
  
}  
}

export default App;
