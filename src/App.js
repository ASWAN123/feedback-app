import Categories from "./components/Categories";
import useLocalStorage from "use-local-storage";
import Logo from "./components/Logo";
import Roadmap from "./components/Roadmap";
import Header from "./components/Header";
import { getData } from "./components/data/data";
import { Userdata } from "./components/context/Contextfuncs";
import {  useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Roadmaplist from "./components/roadmap/Roadmaplist";
import Addfeedback from "./components/addfeedback/Addfeedback";
import Requestspage from "./components/requests page/Requestspage";
import Feedback from "./components/Feedback";
import Errorpage from "./components/Errorpage";

function App() {
  // set localstrage for data
  //  this  controls  the  side bar  menu  of  mobile  version
  
  const [data, setData] = useLocalStorage("data", JSON.stringify(getData()));


  const getposts = () => {
    return JSON.parse(data)["productRequests"].sort(
      (a, b) => b.upvotes - a.upvotes 
    );
  };

  let [posts, setPosts] = useState(getposts());
  let currentUser = JSON.parse(data)['currentUser'].username


  return (
    <div className="App md:w-[100%]   flex w-[90%] lg:w-full xl:flex-col  mx-auto md:p-0   my-4 mt-[20px]  md:rounded-none p-2 rounded-lg  gap-2 md:mt-5  sm:mt-0">
      <Userdata.Provider value={{ data, setData, posts, setPosts  }}>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <div className="sidebarmenu xl:w-full flex flex-col  xl:flex-row xl:justify-between xl:items-start gap-8 w-[280px] items-center px-2 xl:p-0 md:fixed md:flex-col md:max-w-[300px] md:items-center md:bg-gradient-to-r from-blue-600 to-pink-600        md:top-[115px] md:min-h-full md:justify-start md:p-2  md:right-[-1000px] ">
                  <Logo />
                  <Categories />
                  <Roadmap />
                </div>
                <div className="rightbar  flex flex-col gap-4 w-full md:mt-12 sm:mt-1 ">
                  <Header />
                  <Feedback />
                </div>
                </>
            }
          ></Route>
          <Route path="/roadmap" element={<Roadmaplist />}></Route>
          { currentUser ? <Route path="/add-feedback" element={<Addfeedback />}></Route> : <Route path="/add-feedback" element={< Errorpage />}></Route>   }
          { currentUser ?  <Route path="/add-feedback/edit/:id" element={<Addfeedback />}></Route> : <Route path="/add-feedback/edit/:id" element={< Errorpage />}></Route>   }
          <Route path="/Request/:id" element={<Requestspage />}  ></Route>
          <Route path="/Errorpage" element={<Errorpage />}  ></Route>
        </Routes>
      </Userdata.Provider>
    </div>
  );
}

export default App;
