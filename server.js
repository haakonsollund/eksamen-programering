const express = require('express');
const app = express();
const cors = require('cors');
const port = 8080;


//setter en lokasjon for storagefil
const storagefile = './storage.json'

app.use(express.json())
app.use(cors())

//vi lager en route for og lagre data brukeren sender en string og vi bruker fs for legge denne til i arrayet i storage filen
app.post('/insertdata', async(req,res) => {
    //henter ut verdien til userdata fra body som blir sent fra frontend
    const {userdata} = req.body //console.log('userdata: '+userdata)
     
    //fs.read file functionen henter ut alt inholdet i tekst file i formen av en string
    //den  leser storagefile som har karaktersett sett utf8, viss den ikker finner filen eller finner feil vil den gå til error
    fs.readFile(storagefile,"utf8",function(err,unparseddata) {
        //sjekker om det er en error res.json send tilbake til brukeren att success = false og return slutter funksjonen
        if(err){res.json({success:false});return}
        //denne sjekker storagedata vilken datatype det er
        const data = JSON.parse(unparseddata)
        //den tar user data og pusher det in i storagedata.
        data.storagedata.push(userdata)
        
        //alt vi har fra user er lagt inn i variablen data og i vil nå legge hele variablen data i storage fil
        //storagefile er bare fillokasjon og den kan ku ta strings så den må stringifye data og går til func err vis det er feil og til data vis det er success.
        fs.writeFile(storagefile,JSON.stringify(data),function(err,data) {
            if(err)res.json({success:false})
            else res.json({success:true})
        })  
    })
})
//hær henter vi tilbake dataen fra storage file og sjekker karaktersette vis det er en error så kjører den err vis ikke så kjører den data
app.get('/getdata', async (req, res) => {
    fs.readFile(storagefile, 'utf8', function (err, data) {
        //vis det er en error sender vi en string med success false og sender storagedata null som betty vi sender fortsatt stringen men den er tom
        if (err) res.json({ success: false, storagedata: null });
        //vis det ikke er noe error vil vi sende i en string success true og storagedata blir parset som betyr den sender heller som json
        else res.json({ success: true, storagedata: JSON.parse(data).storagedata });
    });
});






app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

//vi får data i en string men på unstring det slik at vi kan manipuler det og så stringifye vi det på nytt slik at vi kan pushe den
//