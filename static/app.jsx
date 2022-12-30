function App() {
    const [classinstances, setClass] = React.useState({});
    // const [users, setUsers] = React.useState({});
    const [schedule, setSchedule] = React.useState({});

    const [user, setUser] = React.useState({id: Number(localStorage.getItem("userId")),
                                            fname: localStorage.getItem("userFName"),
                                            lname: localStorage.getItem("userLName"),
                                            email: localStorage.getItem("userEmail"),
                                            password: localStorage.getItem("userPassword"),
                                            usertype: localStorage.getItem("userType")});

    const [loggedIn, setLoggedIn] = React.useState(JSON.parse(localStorage.getItem("isLoggedIn")));
    


    // Fetch all class instances from rest API
    React.useEffect(() => {
      fetch("/api/classinstances")
        .then((response) => response.json())
        .then((classData) => {
          console.log(classData);
          const classes = Object.values(classData);
          console.log(classes);
          classes.sort(function(a,b){
            return new Date(a.date) - new Date(b.date)
          });
          console.log(classes);
          setClass(classes);
        });
    }, []);

    // React.useEffect(() => {
    //     fetch("/api/users")
    //     .then((response) => response.json())
    //     .then((userData) => {
    //       setUsers(userData);
    //     });
    // }, []);


    // Login & Logout
    let handleLogin = async (evt) => {
        evt.preventDefault();

        let checkUser = await fetch("/login", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({
                email: user.email,
                password: user.password
            }),
        });

        if(checkUser.status===200){
            
            let userData = await fetch("/login", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  },
                body: JSON.stringify({
                    email: user.email,
                    password: user.password
                }),
            })
            .then((response) => response.json())
            .then((result) => setUser({id: result.id,
                                        fname: result.fname,
                                        lname: result.lname,
                                        email: result.email,
                                        password: result.password,
                                        usertype: result.usertype
            }));
            setLoggedIn(true);
            localStorage.setItem("isLoggedIn", true);

        } else if (checkUser.status===401){
            alert(checkUser.statusText);
        }
    };

    function setSession() {
        localStorage.setItem("userId", user.id);
        localStorage.setItem("userFName", user.fname);
        localStorage.setItem("userLName", user.lname);
        localStorage.setItem("userEmail", user.email);
        localStorage.setItem("userPassword", user.password);
        localStorage.setItem("userType", user.usertype);
    }

    Promise.all([handleLogin, setSession()]);


    let handleLogOut = async (evt) => {
        evt.preventDefault();
        setLoggedIn(false);
        localStorage.setItem("isLoggedIn", false);
        setUser({id: "",
                fname:"",
                lname:"",
                email:"",
                password:"",
                usertype:""});
        
        let removeUser = await fetch("/logout", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
            body: JSON.stringify({
                email: user.email
            }),
        });
    };

    React.useEffect(() => {
        const isLoggedIn = localStorage.getItem("isLoggedIn");
        if (isLoggedIn === 'true') {
            setLoggedIn(true);
        } else {
            setLoggedIn(false);
        }
    }, []);


    // Add to / Remove from schedule

    function addClassToSchedule(classId) {

        let addClass = fetch(`/${user.id}`, {
            method: "POST",
            headers: {                
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({
                user_id: user.id,
                class_id: classId
            }),
        });

        if (addClass.status===401){
            alert(addClass.statusText);
        }
    }

    function removeClassFromSchedule(classId) {
        fetch(`/${user.id}/${classId}`, {
            method: "POST",
            headers: {                
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({
                user_id: user.id,
                class_id: classId
            }),
        });
    }

  
    return (
      <ReactRouterDOM.BrowserRouter>
        <div className="container-fluid">

          <Navbar loggedIn={loggedIn} handleLogOut={handleLogOut} />

          <ReactRouterDOM.Route exact path="/">
            <AllClasses classinstances={classinstances} 
                addClassToSchedule={addClassToSchedule} 
                loggedIn={loggedIn} />
          </ReactRouterDOM.Route>

          {/* <ReactRouterDOM.Route exact path="/all-users">
            <AllUsers users={users} />
          </ReactRouterDOM.Route> */}

          <ReactRouterDOM.Route exact path="/login">
          {loggedIn ? <ReactRouterDOM.Redirect to='/schedule' />:
            <Login handleLogin={handleLogin}
            setEmail={(evt) => setUser({ ...user, email: evt.target.value })}
            setPassword={(evt) => setUser({ ...user, password: evt.target.value })} />}
          </ReactRouterDOM.Route>

          <ReactRouterDOM.Route exact path="/create">
            <CreateAccount />
          </ReactRouterDOM.Route>

          <ReactRouterDOM.Route exact path="/schedule">
            {loggedIn ? <Schedule user={user}
                schedule={schedule}
                setSchedule={setSchedule}
                classinstances={classinstances} 
                removeClassFromSchedule={removeClassFromSchedule} />:
            <ReactRouterDOM.Redirect to='/' />}
          </ReactRouterDOM.Route>

        </div>
      </ReactRouterDOM.BrowserRouter>
    );
  }
  
  ReactDOM.render(<App />, document.querySelector('#class-schedule'));


