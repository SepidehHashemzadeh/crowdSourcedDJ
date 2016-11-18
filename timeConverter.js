export function formatDateTime(timestamp) {
	var year = timestamp.substring(0,4);
	var month = timestamp.substring(5,7);
	var date = timestamp.substring(8,10);

	var hour = timestamp.substring(11,13);
	var minute = timestamp.substring(14,16);
	var period = "AM";

	if (hour == "13" | hour == "14" | hour == "15" | hour == "16" | hour == "17" | hour == "18" | hour == "19" | hour == "20" | hour == "21" | hour == "22" | hour == "23")
		period = "PM";

	if (month == "01") month = "January";
	else if (month == "02") month = "February";
	else if (month == "03") month = "March";
	else if (month == "04") month = "April";
	else if (month == "05") month = "May";
	else if (month == "06") month = "June";
	else if (month == "07") month = "July";
	else if (month == "08") month = "August";
	else if (month == "09") month = "September";
	else if (month == "10") month = "October";
	else if (month == "11") month = "November";
	else if (month == "12") month = "December";

	if (date == "01" | date == "02" | date == "03" | date == "04" | date == "05" | date == "06" | date == "07" | date == "08" | date == "09")
		date = date.substring(1,2);

	if (hour == "01" | hour == "02" | hour == "03" | hour == "04" | hour == "05" | hour == "06" | hour == "07" | hour == "08" | hour == "09")
		hour = hour.substring(1,2);
	else if (hour == "13")	hour = "1";
	else if (hour == "14")	hour = "2";
	else if (hour == "15")	hour = "3";
	else if (hour == "16")	hour = "4";
	else if (hour == "17")	hour = "5";
	else if (hour == "18")	hour = "6";
	else if (hour == "19")	hour = "7";
	else if (hour == "20")	hour = "8";
	else if (hour == "21")	hour = "9";
	else if (hour == "22")	hour = "10";
	else if (hour == "23")	hour = "11";
	else if (hour == "00")	hour = "12";

	var formattedDateTime = month.concat(" ", date, ", ", year, " at ", hour, ":", minute, " ", period);

	return formattedDateTime;
};