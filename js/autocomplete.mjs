import { debounce } from "./utils.mjs";

const createAutoComplete = ({
  root,
  renderOption,
  onOptionSelect,
  inputValue,
  fetchData,
}) => {
  //generate the html here
  //everything related the dropdown menu and its items is pertained here to root
  root.innerHTML = `
  <div class="search">
          <i class="fas fa-search"></i>
          <form autocomplete="off">
            <input type="text" 
            id="place-search-input"
            placeholder="Search for places..." />
          </form>
   
        <div class='dropdown'>
        <div class='dropdown-menu'>
          <div class='dropdown-content results'></div>
      </div>
    </div>
  </div>  
`;

  /* </div>
  <div class="search-outer">

      <i class="fas fa-search"></i><input
              id="place-search-input"
              type="text"
              placeholder="Search location"
      />  */
  //DOM inputs here, since { root } is destrucutered, we can refer to it down here for DOM inputs
  const input = root.querySelector("input");
  const dropdown = root.querySelector(".dropdown");
  const resultswrapper = root.querySelector(".results");

  //must be treated as async/await function as fetchData is a async function
  const onInput = async (e) => {
    //call fetchData() using the value of e.target.value
    //recall that fetchdata() is an async function, so it must await before it can return a value, so add the await keyword
    const items = await fetchData(e.target.value);

    //handling empty user input. Returns nothing and removes dropdown template
    if (!items.length) {
      dropdown.classList.remove("is-active");
      return;
    }
    //This simply clears the dropdown menu when a new search is ran
    resultswrapper.innerHTML = "";
    //.classList.add() adds a new class to the selected element. 'is-active' is a class from the Bulma.css library that shows/activated the dropdown menu
    dropdown.classList.add("is-active");
    for (let item of items) {
      const option = document.createElement("a");

      //the class 'dropdown-item' is a Buma.css class that allows us to display the content as individual items
      option.classList.add("dropdown-item");
      //can use string template literal (``) to create multi-line string to insert into the html
      option.innerHTML = renderOption(item);
      //allowing us to close the dropdown menu after clicking a movie
      option.addEventListener("click", () => {
        dropdown.classList.remove("is-active");
        //because of Closure, we have access to movie.Title from here
        input.value = inputValue(item);
        input.value = "";
        onOptionSelect(item);
      });

      resultswrapper.appendChild(option);
    }
  };
  //the 'input' event is triggered every time the user types in a new character
  //must find a way to only do a 'search' when user has stopped typing, otherwise we will be using too many API requests
  input.addEventListener("input", debounce(onInput));

  //addingm a global event handler to the entire document
  document.addEventListener("click", (e) => {
    //allowing us to 'close' (removing the 'is-active' class) the dropdown menu by clicking anywhere outside of the 'root' container
    if (!root.contains(e.target)) {
      dropdown.classList.remove("is-active");
    }
  });
};

export { createAutoComplete };
