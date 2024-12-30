const strengthMeter = document.getElementById('strength-meter')
const passwordInput = document.getElementById('password-input')
const reasonsContainer = document.getElementById('reasons')

passwordInput.addEventListener('input' , updateStrengthMeter)
updateStrengthMeter()

function updateStrengthMeter(){
    const weaknesses = calculatePasswordStrength(passwordInput.value)
    let strength = 100
    reasonsContainer.innerHTML = ""
    weaknesses.forEach(weakness => {
        if(weakness == null)return
        strength -= weakness.deduction
        const messageElement = document.createElement('div')
        messageElement.innerText = weakness.message
        reasonsContainer.appendChild(messageElement)
    })
    strengthMeter.style.setProperty('--strength' , strength)
}


function calculatePasswordStrength(password){
    const weaknesses = []
    weaknesses.push(lengthWeakness(password))
    weaknesses.push(lowercaseWeakness(password))
    weaknesses.push(uppercaseWeakness(password))
    weaknesses.push(numberWeakness(password))
    weaknesses.push(specialCharacterWeakness(password))
    weaknesses.push(repeatCharacterWeakness(password))
    return weaknesses
}


function lengthWeakness(password){
    const length = password.length

    if(length<=5){
        return {
            message : 'your password is too short',
            deduction : 40
        }
    }


    if(length <= 10){
        return {
            message : 'your password is still a bit too short',
            deduction : 15
        }
    }

}
function lowercaseWeakness(password){
    return characterTypeWeakness(password , /[a-z]/g , 'lowercase characters')
     
}
function uppercaseWeakness(password){
    return characterTypeWeakness(password , /[A-Z]/g , 'uppercase characters')
     
}
function numberWeakness(password){
    return characterTypeWeakness(password , /[0-9]/g , 'numbers')
}
function specialCharacterWeakness(password){
    return characterTypeWeakness(password , /[^0-9a-zA-Z\s]/g , 'special characters')
}
function characterTypeWeakness(password , regex , type){
    const matches = password.match(regex)||[]


    if(matches.length === 0){
        return {
            message : `your password has no ${type}` ,
            deduction : 20
        }
    }

    if(matches.length <= 2){
        return {
            message : `your password could use more ${type}` ,
            deduction : 5
        }
    }


}
function repeatCharacterWeakness(password){
    const matches = password.match(/(.) \1/g)||[]
    if(matches.length > 0){
        return {
            message : 'your passwrod has repeat characters' ,
            deduction : matches.length * 10
        }
    }
}
