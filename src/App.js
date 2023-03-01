import Categories from "./components/Categories";
import useLocalStorage from "use-local-storage";
import Logo from "./components/Logo";
import Roadmap from "./components/Roadmap";
import Header from "./components/Header";
import Comments from "./components/Comments";
import { getData } from "./components/data/data";
import { Userdata } from "./components/context/Contextfuncs";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Roadmaplist from "./components/roadmap/Roadmaplist";
import Addfeedback from "./components/addfeedback/Addfeedback";

function App() {
  // set localstrage for data
  const [data, setData] = useLocalStorage("data", JSON.stringify(getData()));

  const getposts = () => {
    return JSON.parse(data)["productRequests"].sort(
      (a, b) => b.upvotes - a.upvotes
    );
  };

  let [posts, setPosts] = useState(getposts());

  return (
    <div className="App w-[85%] h-screen mx-auto my-4 mt-[20px] p-2 rounded-lg flex gap-2 ">
      <Userdata.Provider value={{ data, setData, posts, setPosts }}>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <div className="flex flex-col gap-8 w-[280px] items-center px-2 ">
                <Logo />
                <Categories />
                <Roadmap />
              </div>
              <div className="rightbar flex flex-col gap-4 w-full">
                <Header />
                <Comments />
              </div>
              </>
            
          }
        ></Route>
        <Route path="/roadmap" element={<Roadmaplist />}></Route>
        <Route path="/add-feedback" element={<Addfeedback />}></Route>
      </Routes>
      </Userdata.Provider>
    </div>
  );
}

export default App;
