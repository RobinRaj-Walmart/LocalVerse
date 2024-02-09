import React from "react";
import WalmartLogo from './walmartLogo.svg'; // Import the logo


const SuStyle = {
    backgroundColor: '#ECECEC',
    display: 'flex',
    gap: '100px',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    width: '100vw',
    height: '100vh',
    position: 'relative',
    right: '50px',
    gap: '50px'
}
function collectData() {
    let team = document.getElementById('Team Name').value;
    let feature = document.getElementById('Feature Name').value;
    let stringInside = document.getElementById('String').value;
    if(team===''){
        alert('Team name not entered');
        return;
    }
    if(feature==='') {
        alert('Feature name not entered');
        return;
    }
    if(stringInside===''){
        alert('Please provide the string');
        return;
    }
    const sendData = {
        id: '1',
        featureName: feature,
        teamName: team,
        string: stringInside
    }
    console.log(sendData);
    alert("Your data has been sent to a linguist for approval. It will soon be available for use");
}

export default function SingleUpload() {
    return (
        <div style={SuStyle}>
            <img
                style={{ 
                    height: '50px',
                    width: 'auto',
                    position: 'relative',
                    bottom: '15px'

                }}
                src={WalmartLogo} 
                alt="Walmart-logo"
            />
            <h2>Enter your string with details</h2>
            <form>
                <label htmlFor="Team Name">Enter Team Name: </label>
                <input type="text" id="Team Name" />
            </form>
            <form>
                <label htmlFor="Feature Name">Enter Feature Name: </label>
                <input type="text" id="Feature Name" />
            </form>
            <form>
                <label htmlFor="String">Enter String: </label>
                <input type="text" id="String" />
            </form>
            <button type="submit" onClick={collectData}>Submit</button>
            
        </div>
    )
}

