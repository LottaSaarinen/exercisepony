import React, { useEffect, useState } from 'react';
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, BarChart, Bar, Cell, CartesianGrid, Legend } from 'recharts';
import Button from '../../shared/buttons';
import styles from './Stats.module.scss';
import { ComposedChart } from 'recharts';

function Stats(props) {
  const [chartData, setChartData] = useState([]);
  const [timeRange, setTimeRange] = useState(14); 
  const [linedata, setLinedata] = useState([]);
  
  const locale = "fi-FI";
  const colorMap = {
    "rest day": "#ebfffc",  // vaalea harmaa
    "walking": "#dedcdc",  // vaalean harmaa
    "lunging": "#588c63",  // sammal vihreä
    "groundwork": "#abc9b1", // haalea vihreä
   

    "light work out": "#faf4c3",  // vaalean kelt
    "regular work out": "#00ffd0",  // minttu
    "intense work out": "#8c0f3b",  // tumma punainen

  

   
    "light trail exercise": "#d2b6d9",  // vaaleanlila
    "regular trail exercise": "#e37efc",  // keskilila
    "intense trail exercise": "#69236b",  // tummanlila

    "light pole exercise": "#f2c89b",  // vaaleanoranssi
    "regular pole exercise": "#fcb262",  // keski oranssi
    "intense pole exercise": "#d44d04",  // tumma oranssi

    "light s-jumping": "#bff4f5",  // vaaleansininen
    "normal s-jumping": "#5355d4",  // keski sininen
    "intense s-jumping": "#15405e",  // tummempi sininen
     "cross country jumping": 	'#808080', //harmaa

    "competitions": "#f7cccb",  // kirkas vaaleanpunainen
    "jumping competitions": "#f0659c",  // kirkas pinkki
    "eventing competitions": "#822c4f",  // kirkas magenta
    "driving competitions": "#704a59",  // tumma lila
    "dressage competitions": "#f78e8b",  // tumma lohi
    "trotting race": "#960c23",  // kirkkaan punanen

  

    "coaching session": "#5e5a2c",  // veltasen vihreä
    "jumping coaching": "#bab57f",  // harmaan keltainen
    "dressage coaching": "#7d7732",  // tumma keltainen
    "eventing coaching": "#d6c50d",  // kirkas keltainen
    "driving coaching": "#3b3605",  // vihreän ruskea

    "light driving": "#d4bba5",  // vaalean ruskea
    "regular driving": "#85674d",  // tumman ruskea
    "intense driving": "#662d04",  // punasen ruskea
};

  
  
  const getTimeRangeInMilliseconds = (timeRange) => {
    const now = new Date();
    switch (timeRange) {
      case 7:
        return 7 * 24 * 60 * 60 * 1000;
      case 14:
        return 14 * 24 * 60 * 60 * 1000;
      case 30:
        return 30 * 24 * 60 * 60 * 1000;
      case 90:
        return 90 * 24 * 60 * 60 * 1000;
      case 180:
        return 180 * 24 * 60 * 60 * 1000;
      case 365:
        return 365 * 24 * 60 * 60 * 1000;
      default:
        return 14 * 24 * 60 * 60 * 1000;
    }
  };

  const processLineData = (data) => {
    return data.map(
      (item) => ({
        date: new Date(item.exerciseDate).getTime(),
        duration: item.duration,
        type: item.type
      })
    );
  };

  const reducer = (resultData, item) => {
    const index = resultData.findIndex(arrayItem => arrayItem.type === item.type);
    if (index >= 0) {
      resultData[index].duration = parseFloat(resultData[index].duration) + parseFloat(item.duration);
    } else {
      resultData.push({
        type: item.type, duration: item.duration
      });
    }
    return resultData;
  };

  useEffect(() => {
    const now = new Date();
    const timeLimit = new Date(now.getTime() - getTimeRangeInMilliseconds(timeRange));

    const filteredData = props.data.filter(item => {
      const exerciseDate = new Date(item.exerciseDate);
      return exerciseDate >= timeLimit && exerciseDate <= now;
    });

    setLinedata(processLineData(filteredData));

    const processedData = filteredData.reduce(reducer, []);
    setChartData(processedData);
  }, [props.data, timeRange]);

  const handleTimeRangeChange = (event) => {
    setTimeRange(Number(event.target.value));
  };

  return (
    <div className={styles.stats}>
      <h1>Stats</h1>
      <br />
      <div>
      <div className={styles.stats}>
        <label><h2>Select time period:</h2> </label>
        <select onChange={handleTimeRangeChange} value={timeRange}>
          <option value={7}>Week</option>
          <option value={14}>Two weeks</option>
          <option value={30}>Month</option>
          <option value={90}>Three months</option>
          <option value={180}>Half year</option>
          <option value={365}>Year</option>
        </select>
      </div>
      </div>
       <div className={styles.stats}>
      <h2>Total exercise types</h2>
<ResponsiveContainer  height={400} width={650}>
  <BarChart data={chartData}>
    <CartesianGrid strokeDasharray="9 9" />
    <XAxis 
      dataKey="type" 
      angle={20} 
      textAnchor="start" 
      fontSize={'0.7em'}
      interval={0}
    />
    <YAxis />
    <Tooltip formatter={(value) => `${value} min`} />
    <Legend />
    <Bar dataKey="duration">
      {chartData.map((entry, index) => (
        <Cell key={`cell-${index}`} fill={colorMap[entry.type] || "#888888"} />
      ))}
    </Bar>
  </BarChart>
</ResponsiveContainer>
<br></br><br></br>

<h2>By date</h2>
<ResponsiveContainer   height={450} width={800}>
  
  <ComposedChart data={linedata}>
  <CartesianGrid strokeDasharray="9 9" />
  
   
    <Bar dataKey="duration">
      {linedata.map((entry, index) => (
        <Cell key={`cell-${index}`} fill={colorMap[entry.type] || "#88866"} />
      ))}
    </Bar>
    <XAxis
      dataKey="date"
      tickFormatter={(value) => new Date(value).toLocaleDateString(locale)}
      angle={90} 
      textAnchor="start" 
      fontSize={'0.7em'}
      interval={0}
     
    />
    <YAxis />
    
    <Tooltip
    
      formatter={(value, name, props) => {
      
        return ` ${ props.payload?.type}`; 
          }}
   
    />
   

    <Legend />
  
  </ComposedChart>
</ResponsiveContainer>

</div>
    </div>
  );
}

export default Stats;

