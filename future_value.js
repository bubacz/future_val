var $ = function (id) {
    return document.getElementById(id);
}

var calculate_click = function () {
	
    var investment = parseFloat( $("investment").value );
    var annualRate = parseFloat( $("rate").value );
    var years = parseInt( $("years").value );

	$("futureValue").value = "";
	
	if (isNaN(investment) || investment <= 0) {
		alert("Investment must be a valid number\nand greater than zero.");
	} else if(isNaN(annualRate) || annualRate <= 0) {
		alert("Annual rate must be a valid number\nand greater than zero.");
	} else if(isNaN(years) || years <= 0) {
		alert("Years must be a valid number\nand greater than zero.");
	} else {
		var yearlyRate = annualRate / 100;
		var monthlyRate = annualRate / 12 / 100;
		var months = years * 12;
		var futureValueMonthly = investment;
		var futureValueYearly = investment;
		
		// calc future value with monthly interest
		for ( i = 1; i <= months; i++ ) {
			futureValueMonthly = futureValueMonthly  * (1 + monthlyRate);
		}
		
		// calc future value with yearly interest
		for ( i = 1; i <= years; i++ ) {
			futureValueYearly = futureValueYearly * (1 + yearlyRate);
		}
		
		if ( $("monthly").checked ) {
			$("futureValue").value = futureValueMonthly.toFixed(2);
		} else {
			$("futureValue").value = futureValueYearly.toFixed(2);
		}
		
		if ( $("display").checked ) {
			var textAreaMessage = "Future Value of $" + investment + "\n\n";
			
			textAreaMessage += "When compounded monthly: " + futureValueMonthly.toFixed(2) + "\n";
			
			textAreaMessage += "When compounded yearly: " + futureValueYearly.toFixed(2);
		} else {
			textAreaMessage = "";
		}
		$("results").value = textAreaMessage;
	} 
}

var investment_change = function () {
	var years = parseInt( $("years").value );
	if ( !isNaN(years) ) {
		calculate_click();
	}
}

var years_dblclick = function () {
	$("years").value = "";
}

window.onload = function () {
    $("calculate").onclick = calculate_click;
	$("years").ondblclick = years_dblclick;
	$("years").onchange = investment_change;
    $("years").focus();
}
