
function ClassRow(props) {
    const { id, date, start_time, end_time, price, style, level, instructor, studio, website, handleAddClass, loggedIn, usertype, schedule } = props;
    const [registered, setRegistered] = React.useState("");

    React.useEffect(() => {
        checkRegistered();
    }, [schedule]);

    const checkRegistered = () => {
        for (const classinst_id in schedule) {

            const registration = schedule[Number(classinst_id)];
    
            if (registration["classinst_id"] === id) {
                setRegistered(true);
            }    
        }
    }

    if (loggedIn && usertype == "student") {
        return (
            <React.Fragment>
                <tr key={id}>
                    <td>
                        <span className="date">{date}</span>
                    </td>
                    <td>
                        <span className="start time">{start_time}</span>
                    </td>
                    <td>
                        <span className="end time">{end_time}</span>
                    </td>
                    <td>
                        <span className="price">${price.toFixed(2)}</span>
                    </td>
                    <td>
                        <span className="style">{style}</span>
                    </td>
                    <td>
                        <span className="level">{level}</span>
                    </td>
                    <td>
                        <span className="instructor">{instructor}</span>
                    </td>
                    <td>
                        <a href={`${website}`} target="_blank" className="studio-website">
                        <span className="studio">{studio}</span>
                        </a>
                    </td>
                    <td name="add-to-schedule">
                        <button
                            type="button"
                            name="add-to-schedule"
                            className={ registered ? "btn btn-sm btn-warning d-inline-block" : 
                                                    "btn btn-sm btn-success d-inline-block" }
                            disabled={ registered ? true : false }
                            onClick={() => handleAddClass(id)}
                            >
                            Add
                        </button>
                    </td>
                </tr>
        </React.Fragment>
        );
    } else {
        return (
            <React.Fragment>
                <tr key={id}>
                    <td>
                        <span className="date">{date}</span>
                    </td>
                    <td>
                        <span className="start time">{start_time}</span>
                    </td>
                    <td>
                        <span className="end time">{end_time}</span>
                    </td>
                    <td>
                        <span className="price">${price.toFixed(2)}</span>
                    </td>
                    <td>
                        <span className="style">{style}</span>
                    </td>
                    <td>
                        <span className="level">{level}</span>
                    </td>
                    <td>
                        <span className="instructor">{instructor}</span>
                    </td>
                    <td>
                        <a href={`${website}`} target="_blank" className="studio-website">
                        <span className="studio">{studio}</span>
                        </a>
                    </td>
                </tr>
        </React.Fragment>
        );
    }
}

function AllClasses(props) {
    const { classinstances, addClassToSchedule, loggedIn, usertype, schedule } = props;
    const classRows = [];
  
    for (const classinstance of Object.values(classinstances)) {
        
      const classRow = (
        <ClassRow
          id={classinstance.classinst_id}
          date={new Date(classinstance.date).toUTCString().split(' ').slice(0, 4).join(' ')}
          start_time={new Date(classinstance.start_time).toLocaleTimeString("en-US", { timeZone: 'UTC', hour: "2-digit", minute: "2-digit", hour12: true })}
          end_time={new Date(classinstance.end_time).toLocaleTimeString("en-US", { timeZone: 'UTC', hour: "2-digit", minute: "2-digit", hour12: true })}
          price={classinstance.price}
          style={classinstance.style}
          level={classinstance.level}
          instructor={classinstance.instructor}
          studio={classinstance.studio}
          website={classinstance.website}
          handleAddClass={addClassToSchedule}
          loggedIn={loggedIn}
          usertype={usertype}
          schedule={schedule}
        />
      );
        
      classRows.push(classRow);

    }

    return (
      <React.Fragment key={classinstances.id}>
        <div id="class-schedule">
            <div id="all-classes">
                <div id="intro">
                    <h2>serendipidance</h2>
                    <h6 className="classes mb-4"><em>noun /ˌserənˈdipə dance/</em>
                    <br />discovering fun dance classes by chance</h6>
                    <h6 className="classes mb-4" hidden={ loggedIn ? true : false }>login to start scheduling!</h6>
                </div>
            <h4 className="classes mb-4">Upcoming Classes</h4>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Date</th>
                            <th scope="col">Start Time</th>
                            <th scope="col">End Time</th>
                            <th scope="col">Price</th>
                            <th scope="col">Style</th>
                            <th scope="col">Level</th>
                            <th scope="col">Instructor</th>
                            <th scope="col">Studio</th>
                            <th hidden={ usertype !== 'student' ? true : false }></th>
                        </tr>
                    </thead>
                    <tbody>
                    {classRows}
                    </tbody>
                </table>
            </div>
        </div>
      </React.Fragment>
    );
}

function Schedule(props) {
    const { user, schedule, setSchedule, removeClassFromSchedule } = props;

    function createPrevSchedule(schedule, data) {
        for (const classinst_id in schedule) {

            const newClass = schedule[Number(classinst_id)];
    
            data.push(
            <tr key={classinst_id}>
                <td>{new Date(newClass.date).toUTCString().split(' ').slice(0, 4).join(' ')}</td>
                <td>{new Date(newClass.start_time).toLocaleTimeString("en-US", { timeZone: 'UTC', hour: "2-digit", minute: "2-digit", hour12: true })}</td>
                <td>{new Date(newClass.end_time).toLocaleTimeString("en-US", { timeZone: 'UTC', hour: "2-digit", minute: "2-digit", hour12: true })}</td>
                <td>${newClass.price.toFixed(2)}</td>
                <td>{newClass.style}</td>
                <td>{newClass.level}</td>
                <td>{newClass.instructor}</td>
                <td hidden={ user.usertype === "studio" ? true : false }>
                    <a href={`${newClass.website}`} target="_blank" className="studio-website">
                        {newClass.studio}
                    </a>
                </td>
            </tr>
            );
        }
    }

    function createSchedule(schedule, data) {
        for (const classinst_id in schedule) {

            const newClass = schedule[Number(classinst_id)];
    
            totalCost += newClass.price;
    
            data.push(
            <tr key={classinst_id}>
                <td>{new Date(newClass.date).toUTCString().split(' ').slice(0, 4).join(' ')}</td>
                <td>{new Date(newClass.start_time).toLocaleTimeString("en-US", { timeZone: 'UTC', hour: "2-digit", minute: "2-digit", hour12: true })}</td>
                <td>{new Date(newClass.end_time).toLocaleTimeString("en-US", { timeZone: 'UTC', hour: "2-digit", minute: "2-digit", hour12: true })}</td>
                <td>${newClass.price.toFixed(2)}</td>
                <td>{newClass.style}</td>
                <td>{newClass.level}</td>
                <td>{newClass.instructor}</td>
                <td hidden={user.usertype === "studio" ? true : false}>
                    <a href={`${newClass.website}`} target="_blank" className="studio-website">
                        {newClass.studio}
                    </a>
                </td>
                <td>
                        <button
                            type="button"
                            className="btn btn-sm btn-danger d-inline-block"
                            onClick={() => user.usertype === "student" ? onClick(newClass.classinst_id) : onStudioClick(newClass.classinst_id)}>
                            Remove
                        </button>
                    </td>
            </tr>
            );
        }
    
    }

    // Student Schedule

    const [ prevSchedule, setPrevSchedule ] = React.useState("");
    const tableData = [];
    const prevTableData = [];
    let totalCost = 0;

    const onClick = (classinst_id) => {
        removeClassFromSchedule(classinst_id);
        location.reload();
        fetchSchedule();
    }

    React.useEffect(() => {
        fetchSchedule();
    }, []);

    React.useEffect(() => {
        fetchPrevSchedule();
    }, []);

    const fetchSchedule = () => {
        fetch(`/api/${user.id}`)
        .then((response) => response.json())
        .then((result) => {
        const classes = Object.values(result);
        classes.sort(function(a,b){
            return new Date(a.date) - new Date(b.date)
        });
        const current = new Date();
        const filteredClasses = classes.filter(c => new Date(c.date) - current >= 0);
        const prevClasses = classes.filter(c => new Date(c.date) - current < 0);
        setSchedule(filteredClasses);
        setPrevSchedule(prevClasses);
        });
    }

    const fetchPrevSchedule = () => {
        fetch(`/api/${user.id}`)
        .then((response) => response.json())
        .then((result) => {
        const classes = Object.values(result);
        classes.sort(function(a,b){
            return new Date(a.date) - new Date(b.date)
        });
        const current = new Date();
        const filteredClasses = classes.filter(c => new Date(c.date) - current < 0);
        setPrevSchedule(filteredClasses);
        });
      }

    createSchedule(schedule, tableData);

    createPrevSchedule(prevSchedule, prevTableData);


    // Studio Schedule

    const [classtype, setClasstype] = React.useState("");
    const [startDate, setStartDate] = React.useState("");
    const [endDate, setEndDate] = React.useState("");
    const [startTime, setStartTime] = React.useState("");
    const [endTime, setEndTime] = React.useState("");
    const [price, setPrice] = React.useState("");
    const [style, setStyle] = React.useState("");
    const [level, setLevel] = React.useState("");
    const [instructor, setInstructor] = React.useState("");
    const [studioSchedule, setStudioSchedule] = React.useState("");
    const [prevStudioSchedule, setPrevStudioSchedule] = React.useState("");

    const today = new Date().toISOString().substring(0,10);

    const classOptions = ["Choose below", "One-Time", "Weekly"];
    const styleOptions = ["Choose below", "FOUNDATIONS", "HIPHOP", "KPOP"];
    const levelOptions = ["Choose below", 
                            "BEGINNER", "INTERMEDIATE", "ADVANCED",
                            "MASTER", "ALL"];
    
    const studioData = [];
    const prevStudioData = [];

    const onStudioClick = (classinst_id) => {
        removeStudioClass(classinst_id);
        location.reload();
        fetchStudioSchedule();
    }
    const fetchStudioSchedule = () => {
        fetch(`/api/studio/${user.id}`)
        .then((response) => response.json())
        .then((result) => {
          const classes = Object.values(result);
          classes.sort(function(a,b){
            return new Date(a.date) - new Date(b.date)
          });
          const current = new Date();
          const filteredClasses = classes.filter(c => new Date(c.date) - current >= 0);
          const prevClasses = classes.filter(c => new Date(c.date) - current < 0);
          setStudioSchedule(filteredClasses);
          setPrevStudioSchedule(prevClasses);
        });
    }
    function removeStudioClass(classId) {
        fetch(`/studio/${user.id}/${classId}`, {
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

    React.useEffect(() => {
        fetchStudioSchedule();
    }, []);

    createSchedule(studioSchedule, studioData);

    createPrevSchedule(prevStudioSchedule, prevStudioData);

    function setDate(date) {
        setStartDate(date);
        setEndDate(date);
    }

    function addClassInstanceToSchedule() {

        let addClassInstance = fetch(`/studio/${user.id}`, {
            method: "POST",
            headers: {                
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
            body: JSON.stringify({
                user_id: user.id,
                start_date: startDate,
                end_date: endDate,
                start_time: startTime, 
                end_time: endTime, 
                price: price, 
                style: style, 
                level: level, 
                instructor: instructor, 
                sname: user.sname,
                website: user.website
            }),
            
        });
    }

    if (user.usertype === "student"){
        return (
            <React.Fragment>
                <div className="student">
                    <h3 className="classes">Hi, {user.fname}!</h3>
                    <h4 className="classes">Your Current Schedule</h4>
                    <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Start Time</th>
                            <th>End Time</th>
                            <th>Price</th>
                            <th>Style</th>
                            <th>Level</th>
                            <th>Instructor</th>
                            <th>Studio</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>{tableData}</tbody>
                    </table>
                    <div>
                        <h4 className="classes" align="right">Total: ${totalCost.toFixed(2)}</h4>
                    </div>
                </div>
                <div className="student">
                    <h4 className="classes">Past Schedule</h4>
                    <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Start Time</th>
                            <th>End Time</th>
                            <th>Price</th>
                            <th>Style</th>
                            <th>Level</th>
                            <th>Instructor</th>
                            <th>Studio</th>
                        </tr>
                    </thead>
                    <tbody>{prevTableData}</tbody>
                    </table>
                </div>
            </React.Fragment>
        );
    } else if (user.usertype === "studio") {
        return (
            <React.Fragment>
            <div>
                <form id="add-class" className="col-sm-7 col-md-6 col-lg-5" onSubmit={addClassInstanceToSchedule}>
                    <h3 className="mb-4">{user.sname}</h3>
                    <div className="mb-3">
                        <label>
                            Please select the type of class you'd like to submit:
                            <select 
                                id="classtypes" 
                                value={classtype} 
                                required={true} 
                                onChange={(evt) => setClasstype(evt.target.value)}
                                >
                                {classOptions.map((value) => (
                                <option value={value} key={value}>
                                    {value}
                                </option>
                                ))}
                            </select>
                        </label>
                    </div>
                    <div className="mb-2">
                        <label hidden={ classtype !== 'One-Time' ? true : false }>
                            Date:
                            <input type="date" min={today} 
                                    id="date"
                                    className="form-control"
                                    name="date" 
                                    hidden={ classtype !== 'One-Time' ? true : false } 
                                    required={ classtype === 'One-Time' ? true : false }
                                    onChange={(evt) => setDate(evt.target.value)} />
                        </label>
                        <label hidden={ classtype !== 'Weekly' ? true : false }>
                            Start Date:
                            <input type="date" min={today} 
                                    id="start_date"
                                    className="form-control" 
                                    name="start_date" 
                                    hidden={ classtype !== 'Weekly' ? true : false } 
                                    required={ classtype === 'Weekly' ? true : false }
                                    onChange={(evt) => setStartDate(evt.target.value)} />
                        </label>
                        <label hidden={ classtype !== 'Weekly' ? true : false }>
                            End Date:
                            <input type="date" min={today} 
                                    id="end_date"
                                    className="form-control" 
                                    name="end_date" 
                                    hidden={ classtype !== 'Weekly' ? true : false } 
                                    required={ classtype === 'Weekly' ? true : false }
                                    onChange={(evt) => setEndDate(evt.target.value)} />
                        </label>
                    </div>
                    <div className="mb-2">
                        <label>
                            Start Time:
                            <input type="time"
                                    id="start_time"
                                    className="form-control"
                                    value={startTime}
                                    required={true}
                                    onChange={(evt) => setStartTime(evt.target.value)} />
                        </label>
                        <label>
                            End Time:
                            <input type="time"
                                    id="end_time"
                                    className="form-control"
                                    value={endTime}
                                    required={true}
                                    onChange={(evt) => setEndTime(evt.target.value)} />
                        </label>
                        <label>
                            Price per Student ($USD):
                            <input type="number" min="1" step="1" placeholder="0.00"
                                    id="price"
                                    className="form-control"
                                    value={price}
                                    required={true}
                                    onChange={(evt) => setPrice(evt.target.value)} />
                        </label>
                    </div>
                    <div className="mb-2">
                        <label>
                            Style:
                            <select 
                                id="style"
                                className="form-control" 
                                value={style} 
                                required={true} 
                                onChange={(evt) => setStyle(evt.target.value)}
                                >
                                {styleOptions.map((value) => (
                                <option value={value} key={value}>
                                    {value}
                                </option>
                                ))}
                            </select>
                        </label>
                        <label>
                            Level:
                            <select 
                                id="level"
                                className="form-control" 
                                value={level} 
                                required={true} 
                                onChange={(evt) => setLevel(evt.target.value)}
                                >
                                {levelOptions.map((value) => (
                                <option value={value} key={value}>
                                    {value}
                                </option>
                                ))}
                            </select>
                        </label>
                        <label>
                            Instructor:
                            <input type="text"
                            id="instructor"
                            className="form-control" 
                            value={instructor} 
                            required={true} 
                            onChange={(evt) => setInstructor(evt.target.value)}
                            />
                        </label>
                    </div>
                    <div>
                        <input type="submit" className="btn submit" value="Submit" />
                    </div>
                </form>
            </div>
            <div className="studio">
            <h4 className="classes">Current Schedule</h4>
                <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Start Time</th>
                        <th>End Time</th>
                        <th>Price</th>
                        <th>Style</th>
                        <th>Level</th>
                        <th>Instructor</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {studioData}
                </tbody>
                </table>
            </div>
            <div className="studio">
            <h4 className="classes">Past Schedule</h4>
                <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Start Time</th>
                        <th>End Time</th>
                        <th>Price</th>
                        <th>Style</th>
                        <th>Level</th>
                        <th>Instructor</th>
                    </tr>
                </thead>
                <tbody>
                    {prevStudioData}
                </tbody>
                </table>
            </div>
            </React.Fragment>
        );
    }

    
}

function Navbar({loggedIn, handleLogOut}) {

  if (loggedIn){
    return (
        <React.Fragment>
        <nav className="navbar navbar-expand-lg navbar-fixed-top">
            <div className="container-fluid">
                <ReactRouterDOM.NavLink
                        to="/"
                        className="navbar-brand">
                        serendipidance
                </ReactRouterDOM.NavLink>
                <div>
                <ul className="navbar-nav ms-auto">
                    <li className="nav-item">
                        <ReactRouterDOM.NavLink
                        to="/"
                        activeClassName="navlink-active"
                        className="nav-link"
                        >
                        Home
                        </ReactRouterDOM.NavLink>
                    </li>
                    <li className="nav-item">
                        <ReactRouterDOM.NavLink
                        to="/schedule"
                        activeClassName="navlink-active"
                        activeStyle={{
                            fontWeight: "bold",
                            color: "white"
                          }}
                        className="nav-link"
                        >
                        Schedule
                        </ReactRouterDOM.NavLink>
                    </li>
                    <li className="nav-item">
                        <ReactRouterDOM.NavLink
                        to="/"
                        onClick={handleLogOut}
                        className="nav-link"
                        >
                        Log Out
                        </ReactRouterDOM.NavLink>
                    </li>
                </ul>
                </div>
            </div>
        </nav>
        </React.Fragment>
    );
  } else {

    return (
        <React.Fragment>
        <nav className="navbar navbar-expand-lg">
            <div className="container-fluid">
                <ReactRouterDOM.NavLink
                        to="/"
                        className="navbar-brand">
                        serendipidance
                </ReactRouterDOM.NavLink>
                <div>
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <ReactRouterDOM.NavLink
                            to="/"
                            activeClassName="navlink-active"
                            className="nav-link">
                            Home
                            </ReactRouterDOM.NavLink>
                        </li>
                        <li className="nav-item">
                            <ReactRouterDOM.NavLink
                            to="/login"
                            activeClassName="navlink-active"
                            activeStyle={{
                                fontWeight: "bold",
                                color: "white"
                              }}
                            className="nav-link">
                            Sign Up / Login
                            </ReactRouterDOM.NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        </React.Fragment>
    );
  }
}

function Login({handleLogin, setEmail, setPassword}) {

    const [values, setValues] = React.useState({
        password: "",
        showPassword: false,
      });

    

    return (
        <div>
            <form className="col-sm-5 col-md-4 col-lg-3" onSubmit={handleLogin}>
                <h4 className="mb-3">
                    Login
                </h4>
                <div className="mb-2">
                    <input type="text"
                            className="form-control mb-2" 
                            id="email" 
                            name="email" 
                            onChange={setEmail}
                            placeholder="Email" aria-label="Email" />

                    <input type={values.showPassword ? "text" : "password"} 
                            className="form-control mb-2"
                            id="password" 
                            name="password" 
                            onChange={setPassword}
                            placeholder="Password" aria-label="Password" />
                </div>
                <div className="container-fluid">
                    <input type="submit" className="btn submit mb-2" value="Submit" />
                    <ReactRouterDOM.Link to='/create' className="btn create-login mb-2">Create A New Account</ReactRouterDOM.Link>
                </div>
            </form>
        </div>
    );
}

function CreateAccount(props) {
    const [fname, setFName] = React.useState("");
    const [lname, setLName] = React.useState("");
    const [usertype, setUsertype] = React.useState("");
    const [sname, setSName] = React.useState("");
    const [website, setWebsite] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const [values, setValues] = React.useState({
        password: "",
        showPassword: false,
      });

    const options = ["Choose below", "student", "studio"];

    let handleSubmit = async (evt) => {
        evt.preventDefault();

        let newUser = await fetch("/create", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({
                fname: fname,
                lname: lname,
                usertype: usertype,
                sname: sname,
                website: website,
                email: email,
                password: password,
            }),
        });

        if(newUser.status===200){
            alert("Congratulations, your account has been created and you can now login!");
            location.reload();

        } else if (newUser.status===401) {
            alert("Sorry, that email is already being used. Please try again with a different email.");
            location.reload();

        }
    };


    return (
        <div>
            <form className="col-sm-5 col-md-4 col-lg-3" onSubmit={handleSubmit}>
                <h4 className="mb-3">
                    Create Account
                </h4>
                <label>
                    Account Type:
                    <select 
                        id="usertypes"
                        value={usertype} 
                        required={true} 
                        onChange={(evt) => setUsertype(evt.target.value)}>
                        {options.map((value) => (
                        <option value={value} key={value}>
                            {value}
                        </option>
                        ))}
                    </select>
                </label>
                <input type="text"  
                    id="fname" 
                    className="form-control mb-2"
                    name="fname" 
                    hidden={ usertype !== 'student' ? true : false } 
                    required={ usertype === 'student' ? true : false } 
                    onChange={(evt) => setFName(evt.target.value)}
                    placeholder="First Name" aria-label="First Name" />
                <input type="text" 
                    id="lname" 
                    className="form-control mb-2"
                    name="lname" 
                    hidden={ usertype !== 'student' ? true : false } 
                    required={ usertype === 'student' ? true : false } 
                    onChange={(evt) => setLName(evt.target.value)}
                    placeholder="Last Name" aria-label="Last Name"  />
                <input type="text" 
                    id="sname" 
                    className="form-control mb-2"
                    name="sname" 
                    hidden={ usertype !== 'studio' ? true : false } 
                    required={ usertype === 'studio' ? true : false } 
                    onChange={(evt) => setSName(evt.target.value)}
                    placeholder="Studio Name" aria-label="Studio Name"  />
                <input type="text"
                    id="website"
                    className="form-control mb-2"
                    name="website" 
                    hidden={ usertype !== 'studio' ? true : false } 
                    required={ usertype === 'studio' ? true : false } 
                    onChange={(evt) => setWebsite(evt.target.value)}
                    placeholder="Studio Website" aria-label="Studio Website"  />
                <input type="text" 
                    id="email" 
                    className="form-control mb-2"
                    name="email" 
                    required={true} 
                    onChange={(evt) => setEmail(evt.target.value)}
                    placeholder="Email" aria-label="Email" />
                <input type={values.showPassword ? "text" : "password"} 
                    id="password" 
                    className="form-control mb-2"
                    name="password" 
                    required={true} 
                    onChange={(evt) => setPassword(evt.target.value)}
                    placeholder="Password" aria-label="Password" />
                <input type="submit" className="btn submit mb-2" value="Submit" />
                <ReactRouterDOM.Link to='/login' className="btn create-login mb-2">Login</ReactRouterDOM.Link>
            </form>
        </div>

    )
    
}