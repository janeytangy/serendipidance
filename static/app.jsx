function App() {
    const [classinstances, setClass] = React.useState({});
    // const [users, setUsers] = React.useState({});
    const [schedule, setSchedule] = React.useState({});

    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [loggedIn, setLoggedIn] = React.useState(false);
  
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

    let handleLogin = async (evt) => {
        evt.preventDefault();

        let checkUser = await fetch("/login", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        });

        if(checkUser.status===200){
            setLoggedIn(true);
            alert("You are logged in!");
        } else if (checkUser.status===401){
            alert(checkUser.statusText);
        }
    };


    let handleLogOut = (evt) => {
        evt.preventDefault();
        setLoggedIn(false);
        setEmail("");
        setPassword("");
        console.log(password);
    };

    function addClassToSchedule(classId) {

        setSchedule((currentSchedule) => {
  
        const newSchedule = { ...currentSchedule };

        if (newSchedule[classId]) {
            alert("You have already added this class to your schedule.")
        // } else if (newSchedule[classId].start_time) {
            
        } else {
            newSchedule[classId] = 1;
            document.querySelector('#add-to-schedule').innerText = "Added";
        }

        return newSchedule;
        });
    }
    
    
  
    return (
      <ReactRouterDOM.BrowserRouter>
        <div className="container-fluid">
          <Navbar loggedIn={loggedIn} handleLogOut={handleLogOut} />
          <ReactRouterDOM.Route exact path="/">
            <AllClasses classinstances={classinstances} addClassToSchedule={addClassToSchedule} loggedIn={loggedIn} />
          </ReactRouterDOM.Route>
          {/* <ReactRouterDOM.Route exact path="/all-users">
            <AllUsers users={users} />
          </ReactRouterDOM.Route> */}
          <ReactRouterDOM.Route exact path="/login">
          {loggedIn ? <ReactRouterDOM.Redirect to='/schedule' />:
            <Login handleLogin={handleLogin}
            setEmail={(evt) => setEmail(evt.target.value)}
            setPassword={(evt) => setPassword(evt.target.value)} />}
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


