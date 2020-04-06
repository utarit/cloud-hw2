import React, { useState, useEffect } from 'react';
import UserGallery from './UserGallery';
import InventionCard from './InventionCard';

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('userData')) || null);
  const [inventions, setInventions] = useState([]);
  const [error, setError] = useState('');
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);


  function onInputChange(e) {
    setInput(e.target.value);
  }

  async function fetchUser() {
    setLoading(true);
    try {
      const userResponse = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: input })
      });

      const userData = await userResponse.json();
      setLoading(false);
      // console.log(userData.data);
      if (userData.success) {
        setUser(userData.data);
        localStorage.setItem('userData', JSON.stringify(userData.data));
        setError('');
      } else {
        setError(userData.error)
      }

    } catch (error) {
      // console.log(error);
    }
  }

  useEffect(() => {
    fetchInventions()
  }, [])

  async function fetchInventions() {
    try {
      const response = await fetch('/api/inventions', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const res = await response.json();
      // console.log(res.data);
      if (res.success) {
        setInventions(res.data.filter(inv => inv.shown));
        setError('');
      } else {
        setError(res.error)
      }

    } catch (error) {
      // console.log(error);
    }
  }

  function onLoginClick() {
    fetchUser();
    fetchInventions();
  }

  async function onRegisterClick() {
    setLoading(true);
    if(!input) {
      setError("Enter a username");
      return;
    }
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: input })
      });
      const resData = await response.json();
      setLoading(false);
      if (resData.success) {
        setError('Registered');
      } else {
        setError(resData.error)
      }

    } catch (error) {
      // console.log(error);
    }
  }

  async function deleteUser() {
    setLoading(true);
    try {
      const response = await fetch('/api/user/' + user.username, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: input })
      });

      const resData = await response.json();
      setLoading(false);
      if (resData.success) {
        setUser(null);
        setError('Deleted User Successfully');
      } else {
        setError(resData.error)
      }

    } catch (error) {
      // console.log(error);
    }
  }

  function onLogoutClick() {
    setUser(null);
    localStorage.removeItem('userData');

  }

  return (
    <>
      <header>
        <nav className="navbar navbar-light bg-light">
          <div>
            <a className="navbar-brand" href="/">{loading ? "Loading..." : "Cloud Gallery"}</a>
          </div>
          <div className="d-flex flex-row align-items-baseline">
            {user === null ? <p className=" navbar-text">Not Logged In</p> :
              <div>
                <p className=" navbar-text">{"Welcome " + user.username}</p>
                <button onClick={onLogoutClick} className="btn btn-sm btn-outline-warning m-2" type="button">Log Out</button>
                <button onClick={deleteUser} className="btn btn-sm btn-outline-danger m-2" type="button">Delete User </button>
              </div>}
          </div>
        </nav>
      </header>
      <main className="container mt-4">
      {error !== "" ? <div className="alert alert-warning" role="alert">
            {error}
          </div> : null}
        {user === null ? <div className="d-flex flex-column">
          <input onChange={onInputChange} className="form-control" type="text" name="username" placeholder="Enter Username" />
          <div>
            <button onClick={onLoginClick} className="btn btn-primary m-2">Log In</button>
            <button onClick={onRegisterClick} className="btn btn-success m-2">Register</button>
          </div>
        </div> : <UserGallery setError={setError} user={user} setInventions={setInventions} inventions={inventions} />}
        <section>
          <h1>All Inventions</h1>
          <div className="row">
            {user === null ? <div className="alert alert-primary" role="alert">You need to login see inventions</div> : inventions.map(inv => <InventionCard setUser={setUser} key={inv._id} invention={inv} user={user} />)}
          </div>
        </section>
      </main>

    </>
  );
}

export default App;
