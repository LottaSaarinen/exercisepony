import React, { useEffect, useState } from 'react';
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, BarChart, Bar, Cell, CartesianGrid, Legend } from 'recharts';
import Button from '../../shared/buttons';
import styles from './Stats.module.scss';
import { ComposedChart } from 'recharts';

function Stats(props) {
  const [chartData, setChartData] = useState([]);
  const [timeRange, setTimeRange] = useState(30); // Aikaraja (default 2 viikkoa)
  const [linedata, setLinedata] = useState([]);
  
  const locale = "fi-FI";
  const colorMap = {
    "vapaapäivä": "#ebfffc",  // vaalea harmaa
    "kävely": "#dedcdc",  // vaalean harmaa
    "juoksutus": "#588c63",  // sammal vihreä
    "maastatyöskentely": "#abc9b1", // haalea vihreä
   

    "kevyt treeni": "#faf4c3",  // vaalean kelt
    "normaali treeni": "#00ffd0",  // minttu
    "raskas treeni": "#8c0f3b",  // tumma punainen

    "kevyt puomityöskentely": "#f2c89b",  // vaaleanoranssi
    "normaali puomityöskentely": "#fcb262",  // keski oranssi
    "raskas puomityöskentely": "#d44d04",  // tumma oranssi

    "kevyt estetyöskentely": "#bff4f5",  // vaaleansininen
    "normaali estetyöskentely": "#5355d4",  // keski sininen
    "raskas estetyöskentely": "#15405e",  // tummempi sininen

    "kilpailut": "#f7cccb",  // kirkas vaaleanpunainen
    "estekilpailut": "#f0659c",  // kirkas pinkki
    "kenttäkilpailut": "#822c4f",  // kirkas magenta
    "valjakkokilpailut": "#704a59",  // tumma lila
    "koulukilpailut": "#f78e8b",  // tumma lohi
    "ravikilpailut": "#960c23",  // kirkkaan punanen

    "maastoilu": "#780c96",  // lila
    "kevyt maastoilu": "#d2b6d9",  // vaaleanlila
    "normaali maastoilu": "#e37efc",  // keskilila
    "raskas maastoilu": "#69236b",  // tummanlila

    "valmennus": "#5e5a2c",  // veltasen vihreä
    "estevalmennus": "#bab57f",  // harmaan keltainen
    "kouluvalmennus": "#7d7732",  // tumma keltainen
    "kenttävalmennus": "#d6c50d",  // kirkas keltainen
    "valjakkovalmennus": "#3b3605",  // vihreän ruskea

    "kevyt ajaminen": "#d4bba5",  // vaalean ruskea
    "normaali ajaminen": "#85674d",  // tumman ruskea
    "raskas ajaminen": "#662d04",  // punasen ruskea
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
      <h1>Suoritusajat treenityypeille</h1>
      <br />
      <div>
      <div className={styles.stats}>
        <label><h2>Valitse ajanjakso:</h2> </label>
        <select onChange={handleTimeRangeChange} value={timeRange}>
          <option value={7}>Viikko</option>
          <option value={14}>Kaksi viikkoa</option>
          <option value={30}>Kuukausi</option>
          <option value={90}>Kolme kuukautta</option>
          <option value={180}>Puoli vuotta</option>
          <option value={365}>Vuosi</option>
        </select>
      </div>
      </div>
       <div className={styles.stats}>
      <h2>Yhteen laskettu</h2>
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

<h2>Päivämäärän mukaan</h2>
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

