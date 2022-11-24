function App() {
    const [classinstances, setClass] = React.useState({});
    // const [users, setUsers] = React.useState({});
    const [schedule, setSchedule] = React.useState({});
  
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

    function addClassToSchedule(classId) {

        setSchedule((currentSchedule) => {
  
        const newSchedule = { ...currentSchedule };

        if (newSchedule[classId]) {
            alert("You have already added this class to your schedule.")
        // } else if (newSchedule[classId].start_time) {
            
        } else {
            newSchedule[classId] = 1;
        }

        return newSchedule;
        });
    }
    
    
  
    return (
      <ReactRouterDOM.BrowserRouter>
        <div className="container-fluid">
          <Navbar />
          <ReactRouterDOM.Route exact path="/">
            <AllClasses classinstances={classinstances} addClassToSchedule={addClassToSchedule} />
          </ReactRouterDOM.Route>
          <ReactRouterDOM.Route exact path="/login">
            <Login />
          </ReactRouterDOM.Route>
          <ReactRouterDOM.Route exact path="/create">
            <CreateAccount />
          </ReactRouterDOM.Route>
          <ReactRouterDOM.Route exact path="/schedule">
            <Schedule schedule={schedule} classinstances={classinstances} />
          </ReactRouterDOM.Route>
        </div>
      </ReactRouterDOM.BrowserRouter>
    );
  }
  
  ReactDOM.render(<App />, document.querySelector('#class-schedule'));


