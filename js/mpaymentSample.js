//CARDHOLDER

document.getElementById('pedirCartao').addEventListener('click', pedirCartao);
document.getElementById('cadastrarNaWallet').addEventListener('click', cadastrarNaWallet);
document.getElementById('enviarOTP').addEventListener('click', enviarOTP);

function pedirCartao () {
	$('#step1').css({'display':'none'});
	$('#step2').fadeIn();
	nameInputtedByUser = document.getElementById('cardholderName').value;
	document.getElementById('cartoesSolicitados').innerHTML += '<li class="pedidosDeCartao">'+nameInputtedByUser+'</li>'
	document.getElementById('cardholderName').value = '';
	document.getElementById('pedirCartao').removeEventListener('click', pedirCartao);
}

function cadastrarNaWallet(){
	$('#step5').fadeIn();
	$('#step6').fadeIn();
	$('#step7').fadeIn();
	$('#step8').fadeIn();
	numberInputtedByUser = document.getElementById('cardholderNumber').value;
	document.getElementById('enrollmentSolicitations').innerHTML += '<li>' + numberInputtedByUser + ' solicitado</li>'
	if (solicitarEnrollmentTSP()) {
		$('#step4').css({'display':'none'});
		$('#step9').fadeIn();
		document.getElementById('enrollmentApproval').innerHTML += '<li>' + numberInputtedByUser + ' aprovado</li>'
		document.getElementById('aceitarTermos').addEventListener('click', aceitarTermos);
	}else{
		document.getElementById('enrollmentApproval').innerHTML += '<li>' + numberInputtedByUser + ' negado</li>'
	};
}

function aceitarTermos(){
	$('#step5').css({'display':'none'});
	$('#step6').css({'display':'none'});
	$('#step7').css({'display':'none'});
	$('#step8').css({'display':'none'});
	$('#step9').css({'display':'none'});
	$('#step10').fadeIn();
	$('#step11').fadeIn();
	$('#step12').fadeIn();
	$('#step13').fadeIn();
	$('#step14').fadeIn();
	$('#step15').fadeIn();
	document.getElementById('provisioningSolicitations').innerHTML += '<li>' + numberInputtedByUser + ' solicitado</li>'
	askProvisioning()
}

function mostrarSMS(){
	document.getElementById('sms').innerHTML = 'Seu código é: ' + otp;
}

function enviarOTP(){
	if(verifyOTP()){
		$('#step15').css({'display':'none'});
		$('#step16').fadeIn();
		$('#step17').fadeIn();
	} else {
		alert('Código errado.')
	}
}



//WSP
function solicitarEnrollmentTSP(){
	document.getElementById('enrollmentSolicitationsTSP').innerHTML += '<li>' + numberInputtedByUser + ' solicitado</li>'
	if (solicitarEnrollmentIssuer()) {
		document.getElementById('enrollmentApprovalTSP').innerHTML += '<li>' + numberInputtedByUser + ' aprovado</li>'
		return true
	}else{
		document.getElementById('enrollmentApprovalTSP').innerHTML += '<li>' + numberInputtedByUser + ' negado</li>'
		return false
	};
}

function askProvisioning(){
	document.getElementById('provisioningSolicitationsTSP').innerHTML += '<li>' + numberInputtedByUser + ' solicitado</li>'
	askEligibility()
	if(verifyEligibility()) { 
		document.getElementById('provisioningApproval').innerHTML += '<li>' + numberInputtedByUser + ' provisionamento aprovado, token: </li>' + token;
		return true 
	} else { 
		document.getElementById('provisioningApprovalTSP').innerHTML += '<li>' + numberInputtedByUser + ' provisionamento negado</li>';
		return false 
	}
}




//TSP
function solicitarEnrollmentIssuer(){
	var allCards = document.getElementsByClassName('generatedCardNumber');
	for (var i = 0; i < allCards.length; i++) {
		if (numberInputtedByUser == allCards[i].innerHTML) {
			return true
		}else{
			return false
		};
	};
}

function askEligibility(){
	if(verifyEligibility()) { 
		generateToken();
		document.getElementById('provisioningApprovalTSP').innerHTML += '<li>' + numberInputtedByUser + ' elegivel, token: </li>' + token;
		return true 
	} else { 
		document.getElementById('provisioningApprovalTSP').innerHTML += '<li>' + numberInputtedByUser + ' não elegivel</li>'
		return false 
	}
}

function generateToken(){
	token = Math.floor(Math.random() * 100000000);
}



// Issuer

document.getElementById('gerarCartao').addEventListener('click', gerarCartao);

function gerarCartao(){
	$('#step2').css({'display':'none'});
	$('#step1').css({'display':'none'});
	$('#step3').fadeIn();
	$('#step4').fadeIn();
	var nameToBeAdded = document.getElementsByClassName('pedidosDeCartao')[0].innerHTML;
	var cardNumber = Math.floor(Math.random() * 100000000);
 	document.getElementById('cartoesGerados').innerHTML += '<tr><td class="generatedCard col-md-6">' + nameToBeAdded + '</td><td class="generatedCardNumber col-md-6">' + cardNumber + '</td></tr>'
 	document.getElementById('cartoesSolicitados').innerHTML = '';
 	$('#sampleCardName').html(nameToBeAdded);
 	$('#sampleCardNumber').html(cardNumber);
}

function verifyEligibility(){
	gerarOTP();
	return true
}

function gerarOTP(){
	otp = Math.floor(Math.random() * 10000).toString();
	document.getElementById('otpList').innerHTML = 'OTP gerado: ' + otp;
	mostrarSMS();
}

function verifyOTP(){
	var inputedOTP = document.getElementById('OTPInput').value;
	if (inputedOTP === otp) { return true } else { return false };
	console.log(inputedOTP,otp)
}









