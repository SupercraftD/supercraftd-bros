import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getDatabase, set, ref, onValue } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyADLw85AGSuGxXpZcJ33XLSQSd5nl4LEMM",
  authDomain: "beanbro.firebaseapp.com",
  projectId: "beanbro",
  storageBucket: "beanbro.appspot.com",
  messagingSenderId: "460034665543",
  appId: "1:460034665543:web:67a040b6c572d3fac39562",
  measurementId: "G-TFQB832JXX"
};

let existingServers = []

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app)

onValue(ref(db,'servers'),(snapshot)=>{
    existingServers = snapshot.val()
})

window.joinServer = function(){
    if (window.connectedServer in existingServers){
        //join as p2
        let cServerData
        onValue(ref(db,'servers/'+window.connectedServer),(s)=>{
            cServerData = s.val()
        })
        if (cServerData.p2Available){
            cServerData.p2Available = false
            cServerData.p2char = 'crim'
            set(ref(db,'servers/'+window.connectedServer),cServerData)
            window.pn = 2
        }else{
            alert('full server')
        }
    }else{
        //host
        let nServerData = {
            p1char:'crim',
            p1Inputs:{
                jump:false,
                left:false,
                right:false,
                down:false,
                atk:false,
                lastkey:0
            },
            p1Pos:{x:0,y:0},
            p2Available:true,
            p2char:'',
            p2Inputs:{
                jump:false,
                left:false,
                right:false,
                down:false,
                atk:false,
                lastkey:0
            },
            p2Pos:{x:0,y:0}
        }
        set(ref(db,'servers/'+window.connectedServer),nServerData)
        window.pn = 1
    }
    window.joined = true
    onValue(ref(db,'servers/'+window.connectedServer),(s)=>{
        window.serverData = s.val()
    })
    window.inputs1 = window.serverData.p1Inputs
    window.pos1 = window.serverData.p1Pos
    window.inputs2 = window.serverData.p2Inputs
    window.pos2 = window.serverData.p2Pos

    sLoop()
}

function sLoop(){
    console.log(window.inputs1,window.inputs2)
    if (window.pn==1){
        set(ref(db,'servers/'+window.connectedServer+'/p1Inputs'),window.inputs1)
        set(ref(db,'servers/'+window.connectedServer+'/p1Pos'),window.pos1)
        window.pos2 = window.serverData.p2Pos
        window.inputs2 = window.serverData.p2Inputs
    }else{
        set(ref(db,'servers/'+window.connectedServer+'/p2Inputs'),window.inputs2)
        set(ref(db,'servers/'+window.connectedServer+'/p2Pos'),window.pos2)
        window.pos1 = window.serverData.p1Pos
        window.inputs1 = window.serverData.p1Inputs
    }


    requestAnimationFrame(sLoop)
}
