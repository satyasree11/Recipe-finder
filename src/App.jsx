import {useState} from 'react'
import Products from './Products'

function App() {

const [search,setSearch]=useState('')
const [data,setData]=useState([])
const YOUR_APP_ID="5e05d20d"
const YOUR_APP_KEY="8f9329e682922b11d652eba300089179"
const submitHandler =async (e)=>{
  e.preventDefault()
    try {
      const response = await fetch(
        `https://api.edamam.com/search?q=${search}&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}&from=0&to=30&calories=591-722&health=alcohol-free`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch');
      }
      const responseData = await response.json();
      setData(responseData.hits || []); // Set empty array if undefined
    } catch (error) {
      console.error('Error fetching data:', error);
    }
}
  return (
    <div>
      <center>
        <h4>Food Recipe App</h4>
        <form onSubmit={submitHandler}>
          <input type="text" value={search} onChange={ (e) =>setSearch(e.target.value)}/> <br/>
          <input type="submit" className='btn btn-primary' value="Search"/>

        </form>
        {data.length>=1 ? <Products data={data}/>: null}
      </center>
    </div>
  )
}

export default App
