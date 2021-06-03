import React,{useState, useEffect} from 'react';
import './App.scss';
import { FaTwitter, FaQuoteLeft } from "react-icons/fa";
import colorsArr from "./colorsArray"
let quoteDBUrl = "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"

function App() {
  const[randomQuote,setRandomQuote]=useState("")
  
  const[randomNumber,setRandomNumber]= useState(0)
  const[quotesArray,setQuotesArray]= useState([])
  const[accentColor,setAccentColor]= useState("grey")
  const fetchQuotes = async (url)=>{
    const response = await fetch(url)
    const parsedJSON = await response.json()
    const parsedArray = parsedJSON.quotes
    setQuotesArray(parsedArray)
    const randIndex = Math.floor(Math.random()*parsedArray.length);
    console.log(parsedArray[randIndex])
    setRandomQuote(parsedArray[randIndex]) } 

  useEffect(()=>{
   fetchQuotes(quoteDBUrl)
  },[quoteDBUrl])
  const newRandomQuote =()=>{
    const randomIndex = Math.floor(Math.random()*quotesArray.length)
    setRandomQuote(quotesArray[randomIndex])
    const colorRandomIndex = Math.floor(Math.random()*colorsArr.length)
    setAccentColor(colorsArr[colorRandomIndex])

  }
  return (
    <div className="App" >
      <div className="App-header" style={{backgroundColor:accentColor}} >
        
        <div id="quote-box" >
            <p id="text" style={{color:accentColor}}>
            <i style={{fontSize:"1.75rem"},{marginRight:"15px"},{color:accentColor},{transition:".5ms"}}>
              <FaQuoteLeft />
            </i>  
           {randomQuote.quote}

            </p>
            <p id="author" style={{color:accentColor}} >
              - {randomQuote.author}
            </p> 
            <div className="buttons">
                <a id="tweet-quote" style={{backgroundColor:accentColor}} href={encodeURI(`http://www.twitter.com/intent/tweet?text= ${randomQuote.quote} -${randomQuote.author}`)}><FaTwitter /></a>
                <button id="new-quote" style={{backgroundColor:accentColor}}  onClick={()=>{
                  newRandomQuote()
                }}>New Quote</button>
            </div>
        
      </div>
        
      </div>
    </div>
  );
}

export default App;
