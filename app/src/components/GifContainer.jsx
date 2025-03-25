/* 
This component is meant to display gifs. However, there are two different sets of gifs that this component can display, depending on the user's actions. At first, they should see trending gifs but after submitting a search term in the GifSearch form, they should see gifs related to their search.

TODO:
- use the getTrendingGifs adapter to fetch trending gifs on the first render
- each time the user submits the form in GifSearch, use the getGifsBySearch adapter to fetch gifs according to the search term.
- render the list of fetched gifs (or the defaultGifs) as list items with an `img` inside. Remember to give each list item a unique key!
- Bonus: if at any point an error is returned, render the default gifs again.
*/

import defaultGifs from "../gifs.json";
import { getGifsBySearch, getTrendingGifs } from "../adapters/giphyAdapters";
import { useState, useEffect } from "react";

//we want our page to load the gifs instantly or upon refreshing
//Our component is already being used inside of app so it will render when loading or refreshing the page

const GifContainer = ({ searchTerm }) => {
  const [gifs, setGifs] = useState([]);
  //useEffect will help us to load the gifs instantly after openning the page or refreshing
  useEffect(() => {
    //we need to fetch the gifs, so we use a function
    // declare it as async so we can await our getTendingsGifs()
    const doFetch = async () => {
      //use a tuple to return the data or an error
      const [data, error] = searchTerm
        ? //the ternary statement is saying, if theres a search term we await getGifsBySearch
          //if there's no search term then we await the getTrendingGifs
          await getGifsBySearch(searchTerm)
        : await getTrendingGifs();
      if (error) {
        //here we return console.log(error) because we want to log the error and return to stop the function
        return console.log(error);
      }
      //if no error then from the tuple [gifs, setgifs]...
      //we use setGifs to update gifs from [] to the data (array of 3 gifObjects)
      console.log(data);
      setGifs(data);
    };
    //invoke the function immediately to utilize useEffect
    doFetch();
    //useEffect now listens for the search term and then re-renders upon the change of state
    //we place searchTerm inside of the dependency array
  }, [searchTerm]);

  return (
    <ul>
      {gifs?.map((gif) => {
        return (
          <li key={gif.id}>
            <h3>{gif.title}</h3>
            <img src={gif.images.original.url}></img>
          </li>
        );
      })}
    </ul>
  );
};

export default GifContainer;
