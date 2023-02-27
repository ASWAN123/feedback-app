
import Categories from './components/Categories'
import Logo from './components/Logo'
import Roadmap from './components/Roadmap'
import Header from './components/Header'
import Comments from './components/Comments'


function App() {

  return (
    <div className="App w-[70%] h-screen mx-auto my-4 p-2 border rounded-lg bg-[#f4f4f4] flex gap-2 " >
      <div className="flex flex-col gap-8 w-[280px] items-center px-2 " >
      <Logo />
      <Categories />
      <Roadmap />
      </div>

      <div className="rightbar flex-1 flex-col " >
        <Header />
        {/* <Comments /> */}
      </div>
    </div>
  );
}

export default App;
