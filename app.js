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
      mainMenu(foundPerson[0], people);
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
    return app(people); // 
  }

  var displayOption = promptFor("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'", chars);

  switch(displayOption){
    case "info":
    // TODO: get person's info - done
		displayPerson(person);
    break;
    case "family":
    // TODO: get person's family - done
		displayFamily(people, person);
    break;
    case "descendants":
    // TODO: get person's descendants
    displayDescendants(people, person);
    break;
    case "restart":
    app(people); // restart
    return;
    case "quit":
    break; // stop execution
    default:
    return mainMenu(person, people); // ask again
  }
}

//searches by name - default validates the input, filters the data with the user input
//changed the casing
function searchByName(people){
  var firstName = promptFor("What is the person's first name?", validateAlphabets);
  var lastName = promptFor("What is the person's last name?", validateAlphabets);

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

  var personInfo = "First Name: " + person.firstName + "\n"; 
  personInfo += "Last Name: "+person.lastName+"\n"+"Gender: "+person.gender+"\n"+"Height: "+ person.height+" inches"+"\n"+"Weight: "+person.weight+" lbs"+"\n"+"Occupation: "+person.occupation+"\n"+"Eye Color: "+person.eyeColor;     
  // TODO: finish getting the rest of the information to display
  //got all traits displayed, waiting for age to be done
  alert(personInfo);
}

//DISPLAY FUNCTIONS 

function displayFamily(people, foundPerson){
  let displaySpouse = findSpouse(people, foundPerson);
  let displayChildren = findChildren(people, foundPerson);
	var personFamily = "Spouse: " + displaySpouse[0].firstName+" "+displaySpouse[0].lastName+ "\n";
	    personFamily += "Children: " + displayChildren.join(", ")+"."+ "\n";
		  personFamily += "Parents: " + findParents(people, foundPerson) + "\n";
    alert(personFamily);
    return;
}

// function to find for spouse and returns it
function findSpouse(people, foundPerson){
		let spouse = people.filter(function(el){
			return el.currentSpouse===foundPerson.id		
	});
    if(foundPerson.currentSpouse){
    }
    else{
      spouse = [{"firstName" : "Not found in", "lastName" : "database."}]; //in case of spouse being null value
    }
    return spouse;
  }

//function to find for children, checks if there aren't , returns it -- need to correct for parent[index 1]
function findChildren(people, foundPerson){
		var children = people.filter(function(el){
    return el.parents[0]===foundPerson.id || el.parents[1] === foundPerson.id;
	});
  	if(children.length >= 1){
      children = children.map(function(el){
        return el.firstName + " " + el.lastName;
      });
    }
    else{
      children = ["None"];
    }
    return children;
}

//find children recursion
function findDescendants(people, foundPerson){
   let descendantsFound = people.filter(function(el){
    return el.parents[0]===foundPerson.id || el.parents[1] === foundPerson.id;
  });
  if(descendantsFound.length > 1){
    var grandChildren = findDescendants(people, descendantsFound[descendantsFound.length - 1]);
    descendantsFound.push(grandChildren);
    return descendantsFound;
  }
  else if(descendantsFound.length == 1){
    return descendantsFound;
  }
  else{
    return descendantsFound = [{"firstName": "None", "lastName": "Found"}];
  }
  return descendantsFound;
}

function displayDescendants(people, foundPerson){
   let personChildren = people.filter(function(el){
    return el.parents[0]===foundPerson.id || el.parents[1] === foundPerson.id;
  });
   if(personChildren.length > 0){
      for(let i = 0; i < personChildren.length; i++){
        var descendants = findDescendants(people, personChildren[i]);
      }
        var displayDescendants = "Children: "+findChildren(people, foundPerson).join(", ")+"\n";
      if(descendants.length > 0){
        displayDescendants += "Grand Children: "+descendants.map(function(el){
        return el.firstName+" "+el.lastName;
        });
      }
    else{
       displayDescendants += "No Grand Children.";
      }
    }
    else{
      displayDescendants = "No descendants to display."
    }

  alert(displayDescendants);
}

// function to find for parents, as parents were in an array in database, checks for if there arent, return appropriately
function findParents(people, foundPerson){
    let parents = [];
    for(let i = 0; i < 2; i++){
		parents.push(people.filter( function(el){
		  return el.id === parseInt(foundPerson.parents[i]);
    }));
  }
    if(parents[0].length >= 1){
      let parentsOneArray = parents[0];
      let parentsTwoArray = parents[1];
      // let displayParents = parents[0][0].firstName+" "+parents[0][0].lastName+", ";
      // displayParents += parents[1][0].firstName+" "+parents[1][0].lastName+".";
      if(parentsOneArray.length == 1 && parentsTwoArray.length == 0){  //if person have only 1 parent
      let displayParent = parentsOneArray.map(function(el){
        return el.firstName + " " + el.lastName;
      });
        return displayParent;
      }
      else if(parentsOneArray.length == 1 && parentsTwoArray.length == 1){ //if person have 2 parents
      let displayParents = parents.map(function(el){
        return el[0].firstName + " " + el[0].lastName;
      });
        return displayParents;
      }
      else{
        return;
      }
    }
    else{
      let noParents = "No Parents Found in database";
      return noParents;
    } 
    
}

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
  let searchTypeByTrait = prompt("How do you want to perform your search? Enter \n'0' to ENTER MULTIPLE TRAITS. \n'1' for GENDER. \n'2' for Age. \n'3' for DATE OF BIRTH. \n'4' for HEIGHT. \n'5' for WEIGHT. \n'6' for EYECOLOR. \n'7' for OCCUPATION. \n'8' to RESTART. \n'9' to QUIT.");
  switch(searchTypeByTrait){
    case '0': //for Multiple Traits
      searchByMultipleTraits(people);
    case '1': //search by gender
      searchByGender(people);
      break;
    case '2': //search by Age
      searchByAge(people);
      break;   
    case '3': // search by date of birth
      searchByDateOfBirth(people);
      break;
    case '4': //search by Height
      searchByHeight(people);
      break;
    case '5': //seacrh by weight
      searchByWeight(people);
      break;
    case '6': //search by eye color
      searchByEyeColor(people);
      break;
    case '7': // search by occupation
      searchByOccupation(people);
      break;
    case '8':  //goes back to main function app
      app(people);
    case '9': //to quit from the application
      exit();
    default:
      searchByTraits(people); // restart app
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

function searchByAge(people){
  let ageSearched = promptFor("Please enter the person's age in years:", validateAge);
  let displayPeopleByAge = people.filter(function(el){
    return el.age == ageSearched;
  });
  alert(displayPeopleByAge.length+" persons found based on your search.");
  while(displayPeopleByAge.length == 0){
    searchByTraits(people);
  }
  displayPeople(displayPeopleByAge);
  alert("Please enter the name of the person now:")
  let personFoundByAge = searchByName(displayPeopleByAge);
  mainMenu(personFoundByAge[0], people);   //couldn't pass this as object in main menu function, so did this little trick?Question?is this right way??
}

function searchByHeight(people){
  let heightSearched = promptFor("Please enter the person height in inches:", validateNumber);
  let displayPeopleByHeight = people.filter(function(el){
    return el.height == heightSearched;
  });
  alert(displayPeopleByHeight.length+" persons found based on your search.");
  while(displayPeopleByHeight.length == 0){
    searchByTraits(people);
  }
  displayPeople(displayPeopleByHeight);
  alert("Please enter the name of the person now:")
  let personFoundByHeight = searchByName(displayPeopleByHeight);
  mainMenu(personFoundByHeight[0], people);   //couldn't pass this as object in main menu function, so did this little trick?Question?is this right way??
}

function searchByWeight(people){
  let weightSearched = promptFor("Please enter the person weight in lbs:", validateNumber);
  let displayPeopleByWeight = people.filter(function(el){
      return el.weight == weightSearched;
  });
  alert(displayPeopleByWeight.length+" persons found based on your search.");
  while(displayPeopleByWeight.length == 0){
    searchByTraits(people);
  }
  displayPeople(displayPeopleByWeight);
  alert("Please enter the name of the person now");
  let personFoundByWeight = searchByName(displayPeopleByWeight);
  mainMenu(personFoundByWeight[0], people);
}

function searchByEyeColor(people){
  let searchedColor = promptFor("Please enter the Eye Color:", validateAlphabets);
  let displayPeopleByEyeColor = people.filter(function(el){
    return el.eyeColor.toLowerCase() == searchedColor.toLowerCase();
  });
  alert(displayPeopleByEyeColor.length+" persons found based on your search");
  while(displayPeopleByEyeColor.length == 0){
    searchByTraits(people);
  }
  displayPeople(displayPeopleByEyeColor);
  alert("Please enter the name of the person now:");
  let personFoundByEyeColor = searchByName(displayPeopleByEyeColor);
  mainMenu(personFoundByEyeColor[0], people);
}

function searchByOccupation(people){
  let searchedOccupation = promptFor("Please enter the person's Occupation:", validateAlphabets);
  let displayPeopleByOccupation = people.filter(function(el){
    return el.occupation.toLowerCase() == searchedOccupation.toLowerCase();
  });
  alert(displayPeopleByOccupation.length+" persons found based on your search.");
  while(displayPeopleByOccupation == 0){
    searchByTraits(people);
  }
  displayPeople(displayPeopleByOccupation);
  alert("Please enter the name of the person now:");
  let personFoundByOccupation = searchByName(displayPeopleByOccupation);
  mainMenu(personFoundByOccupation[0], people);
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

//name validation, can only input english aplhabets
function validateAlphabets(input){
   let acceptedNameLetters = /^[A-Za-z]+$/;
   if(input.match(acceptedNameLetters)){
    return true;
   }
   else{
    alert("Please input aplhabet characters only");
    return false;
   }
}

// function to validate height and weight are only numbers
function validateAge(input){
  if(!isNaN(input)){
      if (0 < input < 2018){
      return true;
    }
    
      else{
    return false;
    }
  }
  else{
    return false; 
  }
}

// function to validate height and weight are only numbers
function validateNumber(input){
  if(!isNaN(input)){
    return true;
  }
  else{
    return false; 
  }
}


//MULTIPLE TRAITS SEARCH FUNCTIONALITY - NOT DONE YET

function searchByMultipleTraits(people) {
  var filteredPeople = people;
 
  alert("Enter each desired trait to search for: ");
 

    filteredPeople = multiSearchByGender
    

    filteredPeople = multiSearchByDateOfBirth(filteredPeople);
      

    filteredPeople = multiSearchByHeight(filteredPeople);
      

    filteredPeople = multiSearchByWeight(filteredPeople);
      

    filteredPeople = multiSearchByEyeColor(filteredPeople);

    filteredPeople = multiSearchByAge(filteredPeople);
    
    displayPeople(filteredPeople);
    
    alert("Please enter the name of the person now:");
    
    let personFoundByMultiSearch = searchByName(people);
    
    mainMenu(personFoundByMultiSearch[0], people);
}

function multiSearchByGender(people){
    let yesNoQuestion = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
    
    switch(yesNOQuestion){
    case 'yes':
    let typeGender = promptFor("Enter 'male' or 'female'", validateGender);
    let filteredPeople = people.filter(function(el){
        return el.gender == typeGender.toLowerCase(); 
    });
    alert("Total "+filteredPeople.length+" persons found based on your search");
    displayPeople(filteredPeople);
    return filteredPeople;
    case 'no':
      break;
      default:
      searchByMultipleTraits(people);
      break;
    }
}

function multiSearchByDateOfBirth(filteredPeople){
  let dateOfBirth = promptFor("Please enter the date of birth: xx/xx/xxxx format", validateDate);
  let filteredByDob = filteredPeople.filter(function(el){
      return el.dob == dateOfBirth;   //gotta fix the comparison of one digit month to two digit month.      
  });
  alert("Total "+filteredByDob.length+" persons found based on your search");
    displayPeople(filteredByDob);
    return filteredByDob;
  }
    

function multiSearchByAge(filteredPeople){
  let ageSearched = promptFor("Please enter the person's age in years:", validateAge);
  let filteredByAge = filteredPeople.filter(function(el){
      return el.age == ageSearched;
  });
 alert("Total "+filteredByAge.length+" persons found based on your search");
    displayPeople(filteredByAge);
    return filteredByAge;
  }
    
    

function multiSearchByHeight(people){
  let heightSearched = promptFor("Please enter the person height in inches:", validateNumber);
  let filteredByHeight = filteredPeople.filter(function(el){
    return el.height == heightSearched;
  });
alert("Total "+filteredByHeight.length+" persons found based on your search");
    displayPeople(filteredByHeight);
    filteredByHeight;
  }
    

function multiSearchByWeight(people){
  let weightSearched = promptFor("Please enter the person weight in lbs:", validateNumber);
  let filteredByWeight = filteredPeople.filter(function(el){
      return el.weight == weightSearched;
  });
  alert("Total "+filteredByWeight.length+" persons found based on your search");
    displayPeople(filteredByWeight);
    return filteredByWeight;
  }
    
function multiSearchByEyeColor(people){
  let searchedColor = promptFor("Please enter the Eye Color:", validateAlphabets);
  let filteredByEye = filteredPeople.filter(function(el){
    return el.eyeColor.toLowerCase() == searchedColor.toLowerCase();
  });
   alert("Total "+filteredByEye.length+" persons found based on your search");
    displayPeople(filteredByEye);
    return filteredByEye;
  }
    

function multiSearchByOccupation(people){
  let searchedOccupation = promptFor("Please enter the person's Occupation:", validateAlphabets);
  let filteredByOcc = filteredPeople.filter(function(el){
    return el.occupation.toLowerCase() == searchedOccupation.toLowerCase();
  });
 alert("Total "+filteredByOcc.length+" persons found based on your search");
    displayPeople(filteredByOcc);
    return filteredByOcc;
  }