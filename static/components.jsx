


function ClassRow(props) {
    const { id, date, start_time, end_time, price, style, level, instructor, studio, handleAddClass } = props;

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
                    <span className="end time">{new Date(end_time).getHours()}:{new Date(end_time).getMinutes(2)}</span>
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
                    <span className="studio">{studio}</span>
                </td>
                <td>
                    <button
                        id="add-to-schedule"
                        type="button"
                        className="btn btn-sm btn-success d-inline-block"
                        onClick={() => handleAddClass(id)}
                    >
                        Add to Schedule
                    </button>
                </td>
            </tr>
      </React.Fragment>
    );
  }

function AllClasses(props) {
    const { classinstances, addClassToSchedule } = props;
    const classRows = [];
  
    for (const classinstance of Object.values(classinstances)) {
      const classRow = (
        <ClassRow
          id={classinstance.classinst_id}
          date={new Date(classinstance.date).toDateString()}
          start_time={classinstance.start_time}
          end_time={classinstance.end_time}
          price={classinstance.price}
          style={classinstance.style}
          level={classinstance.level}
          instructor={classinstance.instructor}
          studio={classinstance.studio}
          handleAddClass={addClassToSchedule}
        />
      );
  
      classRows.push(classRow);
    }
  
    return (
      <React.Fragment key={classinstances.id}>
        <h2>Upcoming Classes</h2>
        <div id="class-schedule">
            <div>
                <table className="class">
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
                    <tbody>
                        {classRows}
                    </tbody>
                </table>
            </div>
        </div>
      </React.Fragment>
    );
  }


//   function AllUsers(props) {
//     const { users, setUsers } = props;
//     const allUsers = [];
  
//     for (const user of Object.values(users)) {
//       const userRow = (
//         <UserRow
//           id={user.user_id}
//           fname={user.fname}
//           lname={user.lname}
//           email={user.email}
//         />
//       );
  
//       allUsers.push(userRow);
//     }
  
//     return (
//       <React.Fragment key={users.id}>
//         <h2>Users</h2>
//         <div id="users">
//             <div>
//                 <table className="users">
//                     <thead>
//                         <tr>
//                             <th>First Name</th>
//                             <th>Last Name</th>
//                             <th>Email</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {allUsers}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//       </React.Fragment>
//     );
//   }


//   function UserRow(props) {
//     const { id, fname, lname, email } = props;

//     return (
//         <React.Fragment>
//             <tr key={id}>
//                 <td>
//                     <span className="fname">{fname}</span>
//                 </td>
//                 <td>
//                     <span className="lname">{lname}</span>
//                 </td>
//                 <td>
//                     <span className="email">{email}</span>
//                 </td>
//             </tr>
//       </React.Fragment>
//     );
//   }



function Schedule(props) {
    const { schedule, classinstances } = props;
    const tableData = [];
    // let totalCost = 0;

    for (const classinst_id in schedule) {

        const newClass = classinstances[classinst_id];

        tableData.push(
        <tr key={classinst_id}>
            <td>{newClass.date}</td>
            {/* <td>${melonCost.toFixed(2)}</td> */}
            <td>
                    <button
                        type="button"
                        className="btn btn-sm btn-success d-inline-block"
                    >
                        Remove from Schedule
                    </button>
                </td>
        </tr>,
        );
    }

    return (
        <React.Fragment>
        <h1>My Schedule</h1>
        <div className="col-6">
            <table className="table">
            <thead>
                <tr>
                <th>Date</th>
                </tr>
            </thead>
            <tbody>{tableData}</tbody>
            </table>
            {/* <p className="lead">Total: ${totalCost.toFixed(2)}</p> */}
        </div>
        </React.Fragment>
    );
}



function Navbar({loggedIn}) {

  if (loggedIn){
    return (
        <nav>
          <section>
            <h4>
            <ReactRouterDOM.NavLink
              to="/"
              activeClassName="navlink-active"
              className="nav-link"
            >
              Home
            </ReactRouterDOM.NavLink>
            </h4>
    
            {/* <h4>
            <ReactRouterDOM.NavLink
              to="/all-users"
              activeClassName="navlink-active"
              className="nav-link"
            >
              All Users (Testing)
            </ReactRouterDOM.NavLink>
            </h4> */}
            <h4>
            <ReactRouterDOM.NavLink
              to="/schedule"
              activeClassName="navlink-active"
              className="nav-link"
            >
              My Schedule
            </ReactRouterDOM.NavLink>
            </h4>

            <h4>
            <ReactRouterDOM.NavLink
              to="/"
              activeClassName="navlink-active"
              className="nav-link"
            >
              Log Out
            </ReactRouterDOM.NavLink>
            </h4>
            
          </section>
        </nav>
    );
  } else {

    return (
        <nav>
        <section>
            <h4>
            <ReactRouterDOM.NavLink
            to="/"
            activeClassName="navlink-active"
            className="nav-link"
            >
            Home
            </ReactRouterDOM.NavLink>
            </h4>

            {/* <h4>
            <ReactRouterDOM.NavLink
            to="/all-users"
            activeClassName="navlink-active"
            className="nav-link"
            >
            All Users (Testing)
            </ReactRouterDOM.NavLink>
            </h4> */}

            <h4>
            <ReactRouterDOM.NavLink
            to="/login"
            activeClassName="navlink-active"
            className="nav-link"
            >
            Sign Up / Login
            </ReactRouterDOM.NavLink>
            </h4>
        </section>
        </nav>
    );
  }
}


// function UserInfo(props) {
//     const { email, password} = props;
//     const [values, setValues] = React.useState({
//         password: "",
//         showPassword: false,
//       });

//     return (
//         <form>
//             <label>
//                 Email:
//                 <input type="text" name="email" />
//             </label>
//             <label>
//                 Password:
//                 <input type={values.showPassword ? "text" : "password"} name="password" />
//             </label>
//         </form>
//     )
// }


function Login({handleLogin, setEmail, setPassword}) {

    const [values, setValues] = React.useState({
        password: "",
        showPassword: false,
      });

    

    return (
        <div>
            <form onSubmit={handleLogin}>
                <h4>
                    Login
                </h4>
                <label>
                Email:
                <input type="text" id="email" name="email" onChange={setEmail} />
                </label>
                <label>
                    Password:
                    <input type={values.showPassword ? "text" : "password"} id="password" name="password" onChange={setPassword} />
                </label>
                <input type="submit" value="Submit" />
            </form>
            <ReactRouterDOM.Link to='/create'>Create A New Account</ReactRouterDOM.Link>
        </div>
    );
}

function CreateAccount(props) {
    const [fname, setFName] = React.useState("");
    const [lname, setLName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const [values, setValues] = React.useState({
        password: "",
        showPassword: false,
      });

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
                email: email,
                password: password,
            }),
        });

        if(newUser.status===200){
            location.reload();
            alert("Congratulations, your account has been created and you can now login!");
        } else if (newUser.status===401) {
            alert("Sorry, that email is already being used. Please try again with a different email.");
        }
    };


    return (
        <form onSubmit={handleSubmit}>
            <h4>
                Create Account
            </h4>
            <label>
                First Name:
                <input type="text"  id="fname" name="fname" onChange={(evt) => setFName(evt.target.value)} />
            </label>
            <label>
                Last Name:
                <input type="text" id="lname" name="lname" onChange={(evt) => setLName(evt.target.value)}  />
            </label>
            <label>
                Account Type:
                <select>
                    <option defaultValue="student">Student</option>
                    <option value="instructor">Instructor</option>
                    <option value="studio">Studio</option>
                </select>
            </label>
            <label>
                Email:
                <input type="text" id="email" name="email" onChange={(evt) => setEmail(evt.target.value)} />
            </label>
            <label>
                Password:
                <input type={values.showPassword ? "text" : "password"} id="password" name="password" onChange={(evt) => setPassword(evt.target.value)} />
            </label>
            <input type="submit" value="Submit" />
        </form>

    )
    
}