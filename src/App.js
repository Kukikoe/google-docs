import React from 'react';
import ReactGoogleAuth from 'react-google-auth';
import GooglePicker from 'react-google-picker';

const CLIENT_ID = '1058328852903-6f2lnvqmbhnbvhe862nmo2qdjf2akg3i.apps.googleusercontent.com';
const API_KEY = 'AIzaSyCriSfVhTt2v11Y1tDsczOphZ5lfEyI_oc';
const APP_ID = "attendance-report-224414";
const DISCOVERY_DOCS = "https://sheets.googleapis.com/$discovery/rest?version=v4";
const DISCOVERY_DISC = "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest";
const SCOPE = "https://www.googleapis.com/auth/spreadsheets https://www.googleapis.com/auth/drive";

function setSheetOne(data) {
    if (data.action == window.google.picker.Action.PICKED) {
        console.log("data.docs[0].id", data.docs[0].id);
        console.log("data.docs[0].embedUrl", data.docs[0].embedUrl);
    }

}

function Example(props) {
    //console.log("gapi exists", gapi);
    return <div>
        <h1>App goes here</h1>
        <GooglePicker clientId={CLIENT_ID}
                      developerKey={API_KEY}
                      scope={['https://www.googleapis.com/auth/spreadsheets', 'https://www.googleapis.com/auth/drive']}
                      onChange={data => setSheetOne(data)}
                      onAuthFailed={data => console.log('on auth failed:', data)}
                      multiselect={true}
                      navHidden={true}
                      authImmediate={false}
                      mimeTypes={['application/vnd.google-apps.spreadsheet']}
                      //query={'Spreadsheets'}
                      viewId={'DOCS'}>
        </GooglePicker>
        <button onClick={props.onSignOutClick}>Sign out</button>
    </div>;
}

function Loader(props) {
    return <div>Loading...</div>;
}

function SignIn(props) {
    if(props.initializing) {
        return <div className="Text Text-emphasis">Initializing...</div>;
    }
    if(props.error) {
        console.log('Error', props.error);
        return <div className="Text Text-strong">Error!</div>;
    }
    return <div>
        <button className="Button Button-primary" onClick={props.onSignInClick}>Sign in</button>
        {props.signingIn && <div>Signing in...</div>}
    </div>;
}



export default ReactGoogleAuth({
    clientId: "1058328852903-6f2lnvqmbhnbvhe862nmo2qdjf2akg3i.apps.googleusercontent.com",
    discoveryDocs: ["https://sheets.googleapis.com/$discovery/rest?version=v4"],
    loader: Loader,
    scope: "https://www.googleapis.com/auth/spreadsheets https://www.googleapis.com/auth/drive",
    signIn: SignIn
})(Example);
