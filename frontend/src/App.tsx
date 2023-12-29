import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { gql, useQuery } from '@apollo/client';

const COMPANIES = gql`
query{
  getCompanies {
    id
    name
  }
}
`;

class company {
  id!: number;
  name!: string;
}

function getCompanies(){
  const { loading, error, data} = useQuery(COMPANIES);
  if (loading) return <p>ロード中...</p>;
  if (error) return<p>エラー</p>;
  console.log(data.getCompanies[0].id);
  return data.getCompanies.map((company:company, index:number) => (
    <table className="table-auto">
      <th>
        <td>企業ID</td>
        <td>企業名</td>
      </th>
      <tr key={index}>
        <td>{company.id}</td>
        <td>{company.name}</td>
      </tr>
    </table>
  ));
}

function App() {
  return (
  <div className="App">
    {getCompanies()}
  </div>
  )
}

export default App
