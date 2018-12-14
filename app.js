"use strict"
/*
Build all of your functions for displaying and gathering information below (GUI).
*/

// app is the function called to start the entire application
function app(people){
  var searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  switch(searchType){
    case 'yes':
      var foundPerson = searchByName(people);
      mainMenu(foundPerson, people);
      break;
    case 'no':
      // TODO: search by traits
      searchByTraits(people);
      break;
      default:
    app(people); // restart app
      break;
  }
}

// Menu function to call once you find who you are looking for
function mainMenu(person, people){

  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

  if(!person){
    alert("Could not find that individual.");
    return app(people); // restart
  }

  var displayOption = promptFor("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'", chars);

  switch(displayOption){
    case "info":
    // TODO: get person's info
		displayPerson(person);
    break;
    case "family":
    // TODO: get person's family
		displayFamily(people, person);
    break;
    case "descendants":
    // TODO: get person's descendants
    break;
    case "restart":
    app(people); // restart
    break;
    case "quit":
    return; // stop execution
    default:
    return mainMenu(person, people); // ask again
  }
}

//searches by name - default validates the input, filters the data with the user input
//changed the casing
function searchByName(people){
  var firstName = promptFor("What is the person's first name?", chars);
  var lastName = promptFor("What is the person's last name?", chars);

	let person = people.filter(function(el){
    if(el.firstName.toLowerCase() === firstName.toLowerCase() && el.lastName.toLowerCase() === lastName.toLowerCase()){
      return true;
    }
    else
    {
      return false;
    }
  });

  // TODO: find the person using the name they entered
  return person;
}

// alerts a list of people
function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

function displayPerson(person){
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  var personInfo = "First Name: " + person[0].firstName + "\n"; //temporary put index 0 to check output -k
  personInfo += "Last Name: " + person[0].lastName + "\n";      // should replace with 'el' using map or filter, i guess -k
  // TODO: finish getting the rest of the information to display
  alert(personInfo);
}

//family search functions

function displayFamily(people, foundPerson){
	var personFamily = "Spouse: " + displaySpouse(people, foundPerson) + "\n";
		personFamily += "Children: " + displayChildren(people, foundPerson) + "\n";
		personFamily += "Parents: " + displayParents(people, foundPerson) + "\n";
}

function displaySpouse(people, foundPerson){
		var spouse = people.filter( function(el){
			if (el.currentSpouse===foundPerson.id){
			console.log(el.firstName + " " + el.lastName);
			return;
		}
		else	
			return false;
	});
}

//function displayChildren(people, foundPerson){
//		var children = people.filter( function(el){
//		if (el.parents===foundPerson.id){
//		return children;
//		}
//		else
//			return false;
//	});
///}

//function displayParents(people, foundPerson){
//		var parents = people.filter( function(el){
	//	if (el.id===foundPerson.parents){
	//	return true;
	//	}
	//	else
	//		return false;
//});
//}


// function that prompts and validates user input
function promptFor(question, valid){
  do{
    var response = prompt(question).trim();
  } while(!response || !valid(response));
  return response;
}



// helper function to pass into promptFor to validate yes/no answers
function yesNo(input){
  return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}

// helper function to pass in as default promptFor validation
function chars(input){
  return true; // default validation only
}

function searchByTraits(people){
  let searchTypeByTrait = prompt("How do you want to perform your search? Enter \n'1' for GENDER. \n'2' for DATE OF BIRTH. \n'3' for HEIGHT. \n'4' for WEIGHT. \n'5' for EYECOLOR. \n'6' for OCCUPATION.");
  switch(searchTypeByTrait){
    case '1': //search by gender
      searchByGender(people);     
    case '2': // search by date of birth
      searchByDateOfBirth(people);
      break;
      default:
    app(people); // restart app
      break;
  }
}

//search by Gender function - completed
function searchByGender(people){
    let typeGender = promptFor("Enter 'male' or 'female'", validateGender);
    let displayPeopleByGender = people.filter(function(el){
      return el.gender == typeGender.toLowerCase();
    });
    alert("Total "+displayPeopleByGender.length+" persons found based on your search");
    displayPeople(displayPeopleByGender);
    alert("Please enter the Name now:");
    let personFoundByGender = searchByName(displayPeopleByGender);
    //displayPerson(personFoundByGender);
    mainMenu(personFoundByGender[0], people);   //couldn't pass this as object, so did this little trick?Question?
}

//search by date of birth- validates date and displays the person.
function searchByDateOfBirth(people){
  let dateOfBirth = promptFor("Please enter the date of birth: xx/xx/xxxx format", validateDate);
  let displayPeopleByDob = people.filter(function(el){
      return el.dob == dateOfBirth;   //gotta fix the comparison of one digit month to two digit month.      
  });
  alert(displayPeopleByDob.length+" person found.");
  // displayPeople(displayPeopleByDob);
  // alert("Please enter the Name now:");
  // let personFoundByDob = searchByName(displayPeopleByDob);
  mainMenu(displayPeopleByDob[0], people);
}

function searchByHeight(people){

}

function searchByWeight(people){

}

function searchByEyeColor(people){

}

function searchByOccupation(people){

}

//helper function to validate gender
function validateGender(input){
  if(input.toLowerCase() == "male" || input.toLowerCase() == "female"){
    return true;
  }
  else{
    return false;
  }
}


//to check if date is valid format and is between range of year 1900 - current
function validateDate(input){
  let acceptedFormat = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
  if(input.match(acceptedFormat)){
    let enteredDate = input.split("/");
    if(enteredDate[0] <1 || enteredDate[0] > 13 || enteredDate[1] < 1 || enteredDate [1] > 31 || enteredDate[2] > new Date().getFullYear() || enteredDate[2] < 1900 ){
      alert("Not a valid date. Please enter again")
      return false;
    }
    else{
      return true;
    }
  }
  else{
    alert("Not a valid format");
    return false;
  
  }
}