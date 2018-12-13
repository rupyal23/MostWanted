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

function searchByName(people){
  var firstName = promptFor("What is the person's first name?", chars);
  var lastName = promptFor("What is the person's last name?", chars);

	let person = people.filter(function(el){
    if(el.firstName === firstName && el.lastName === lastName){
      return true;
    }
  });

	
  // TODO: find the person using the name they entered
  return person[0];
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
  var personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
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