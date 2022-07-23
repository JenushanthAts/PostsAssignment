// import logo from "./logo.svg";
// import { data } from "autoprefixer";
import { useEffect, useState } from "react";
import "./App.css";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
function App() {
  const [fetchedposts, setFetchedPosts] = useState([]);
  const [actions, setActions] = useState([]);
  //Method for fetching posts
  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts`)
      .then((response) => response.json())
      .then((actualData) => setFetchedPosts(actualData.slice(0, 5)));
  }, []);

  //method for moving down position
  const handleToDown = (ind, id) => {
    //swap elements
    [fetchedposts[ind + 1], fetchedposts[ind]] = [
      fetchedposts[ind],
      fetchedposts[ind + 1],
    ];
    // console.log(fetchedposts);
    let obj = {
      argument: `Moved post ${id} from index ${ind} to index ${ind + 1}`,
      currentIndex: ind,
      nextIndex: ind + 1,
    };
    setActions((prev) => [obj, ...prev]);
    // console.log(arugument);
  };
  //method for moving up the position
  const handleToUp = (ind, id) => {
    [fetchedposts[ind - 1], fetchedposts[ind]] = [
      fetchedposts[ind],
      fetchedposts[ind - 1],
    ];
    // console.log(fetchedposts);
    let obj = {
      argument: `Moved post ${id} from index ${ind} to index ${ind - 1}`,
      currentIndex: ind,
      nextIndex: ind - 1,
    };
    setActions((prev) => [obj, ...prev]);
    // console.log(arugument);
  };
  // console.log(fetchedposts);
  //method for time travelling
  const timeTravel = (ind) => {
    console.log(ind);
    console.log(fetchedposts);

    console.log(actions);

    actions.forEach((element, ind, array) => {
      console.log(ind);
      [fetchedposts[element.currentIndex], fetchedposts[element.nextIndex]] = [
        fetchedposts[element.nextIndex],
        fetchedposts[element.currentIndex],
      ];
      console.log(array);
    });
    setActions([]);
  };
  return (
    <>
      <div className="header"></div>
      <div className="wrapper">
        {/* post items */}
        <div className="postList">
          <span>Sortable Post List</span>
          {fetchedposts?.map((ele, index) => (
            <div className="posts" key={index}>
              <span>Post {ele.id}</span>
              <div className="icons">
                {index === 0 && (
                  <IoIosArrowDown onClick={() => handleToDown(index, ele.id)} />
                )}
                {index === fetchedposts.length - 1 && (
                  <IoIosArrowUp onClick={() => handleToUp(index, ele.id)} />
                )}
                {index !== fetchedposts.length - 1 && index !== 0 && (
                  <>
                    <IoIosArrowUp onClick={() => handleToUp(index, ele.id)} />
                    <IoIosArrowDown
                      onClick={() => handleToDown(index, ele.id)}
                    />
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
        {/* card and actions */}
        <div className="card">
          <div className="container">
            <div className="actionTitle">
              <span>List of actions commited</span>
            </div>

            {actions?.map((ele, index) => (
              <div className="actions" key={index}>
                <span>{ele.argument}</span>
                <button className="btn" onClick={() => timeTravel(index)}>
                  Time travel
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
