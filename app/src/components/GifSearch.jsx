/* 
This component is meant to contain a controlled form (a form whose input values) are controlled by a piece of React state (with useState). However, the final submitted value(s) of the form needs to be shared with the GifContainer so be careful about where you define your final submitted state!

TODO:
- Convert this form into a controlled form
- Handle form submissions by setting a searchTerm state value that can be shared with the GifContainer component
*/
import { useState } from "react";

function GifSearch({ setSearchTerm }) {
  const [query, setQuery] = useState("");
  const formSubmit = (e) => {
    e.preventDefault();
    setSearchTerm(query);
  };

  return (
    <form onSubmit={formSubmit}>
      <p>Query: {query}</p>
      <label htmlFor="searchInput">Enter a Search Term </label>
      <input
        type="text"
        className="form-control"
        id="searchInput"
        //value is whatever is inside of the search box
        //it is set to be the query state
        value={query}
        //onChange means upon the text inside the search box changing we invoke setQuery to be the event.target(searchBox).value
        onChange={(e) => {
          setQuery(e.target.value);
        }}
      />
      <button type="submit" className="btn btn-success">
        Search
      </button>
    </form>
  );
}

export default GifSearch;
