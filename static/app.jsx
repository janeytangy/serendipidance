function App() {
    const [classinstances, setClass] = React.useState({});
    const [users, setUsers] = React.useState({});
  
    React.useEffect(() => {
      fetch("/api/classinstances")
        .then((response) => response.json())
        .then((classData) => {
          setClass(classData);
        });
    }, []);

    // React.useEffect(() => {
    //     fetch("/api/users")
    //     .then((response) => response.json())
    //     .then((userData) => {
    //       setUsers(userData);
    //     });
    // }, []);
    
    
  
    return (
      <ReactRouterDOM.BrowserRouter>
        <div className="container-fluid">
          <Navbar />
          <ReactRouterDOM.Route exact path="/">
            <AllClasses classinstances={classinstances} />
          </ReactRouterDOM.Route>
          <ReactRouterDOM.Route exact path="/login">
            <Login />
          </ReactRouterDOM.Route>
          <ReactRouterDOM.Route exact path="/create">
            <CreateAccount />
          </ReactRouterDOM.Route>
          <ReactRouterDOM.Route exact path="/schedule">
            <Schedule />
          </ReactRouterDOM.Route>
        </div>
      </ReactRouterDOM.BrowserRouter>
    );
  }
  
  ReactDOM.render(<App />, document.querySelector('#class-schedule'));


