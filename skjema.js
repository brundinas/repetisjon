regForm = document.getElementById('registrationForm')

regForm.addEventListener('submit', addParticipant)

function addParticipant(evt){
    evt.preventDefault();

    const firstName = regForm.firstName.value;
    const lastName = regForm.lastName.value;
    const address = regForm.address.value;
    const postalCode = regForm.postalCode.value;
    const city = regForm.city.value;
    const phone = regForm.phone.value;
    const password = regForm.password.value;
    const birthYear = parseInt(regForm.birthYear.value);

    if (!isPasswordValid(password, firstName, lastName)) {
        const errorDiv = document.getElementById('participantsListDiv');
        errorDiv.innerHTML = '<h2>Passordet må oppfylle minimumskravene!</h2>';
        return;
    }

    const participant = { firstName, lastName, address, postalCode, city, phone, password, birthYear };
    participants.push(participant);
    regForm.reset();


    displayParticipants(participants);
};

const participants = [];

function isPasswordValid(password, firstname, lastname) {
    let count = 0
    
    if (password.length >= 10) count++

    //Sjekk at det finnes minst en stor bokastav
    if (/[A-ZÆØÅ]/.test(password)) count++
    //Sjekk at det finnes minst en liten bokastav
    if (/[a-zæøå]/.test(password)) count++
    //sjekk at det finnes minst et tall
    if (/\d/.test(password)) count++
    //sjekk at det finnes minst et spesialtegn
    if (/[^A-ZÆØÅa-zæøå0-9]/.test(password)) count++

    //sjekk at passord ikke innholder fornavn eller etternavn ( /i gjør det case insensitive)
    if ( /firstname/i.test(password) || /lastname/i.test(password)) 
    {
        count = 0
        //dersom passord innholder fornavn eller etternavn, 
        //så nullstilles telleren slik at passordtesen ikke returner true
    }
    //sjekker at minst tre krav innfris
    return count >= 3
    
    
}

function displayParticipants(participants) {
    const listElement = document.getElementById('participantsList');
    listElement.innerHTML = '';
    let currentYear = new Date().getFullYear();
    for (let i=0; i<participants.length; i++){
        let age = currentYear - participants[i].birthYear;
        const participantElement = document.createElement('li');
        participantElement.textContent = `Navn: ${participants[i].firstName} ${participants[i].lastName}, Alder: ${age}`;
        listElement.appendChild(participantElement);
    };
}
