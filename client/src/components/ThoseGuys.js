import React, { useState, useEffect } from "react"

const ThoseGuys = () => {
    const [thoseGuys, setThoseGuys] = useState([])
    //console.log('mode is: ' + process.env.NODE_ENV)

    useEffect(() => {
        fetch("/user/api/thoseguys")
            .then(res => res.json())
            .then(guys => setThoseGuys([
                ...thoseGuys, ...guys
            ]))
    }, [])

    //console.log(thoseGuys)

    return (
        <div className="those-guys" style={{backgroundColor: `white`}}>
            <h2>Those Guys</h2>
            {thoseGuys.map(guy => {
               return (
                   <div key={guy._id}>
                       <p>User name: {guy.username}</p>
                       <p>Email: {guy.email}</p>
                   </div>
               )        
            })}
        </div>
    )
}

export default ThoseGuys

