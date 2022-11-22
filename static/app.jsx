function App() {
    const [classinstances, setClass] = React.useState({});
  
    React.useEffect(() => {
      fetch("/api/classinstances")
        .then((response) => response.json())
        .then((classData) => {
          setClass(classData);
        });
    }, []);
  
    return (
      <ReactRouterDOM.BrowserRouter>
        <div className="container-fluid">
          <Navbar />
          <ReactRouterDOM.Route exact path="/">
            <AllClasses classinstances={classinstances} />
          </ReactRouterDOM.Route>
          <ReactRouterDOM.Route exact path="/login">
            <UserInfo />
            <Login />
          </ReactRouterDOM.Route>
          <ReactRouterDOM.Route exact path="/create">
            <CreateAccount />
          </ReactRouterDOM.Route>
        </div>
      </ReactRouterDOM.BrowserRouter>
    );
  }
  
  ReactDOM.render(<App />, document.querySelector('#class-schedule'));
