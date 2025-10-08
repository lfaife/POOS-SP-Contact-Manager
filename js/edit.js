// // Brings up inline editing for the selected contact
//         function editContact(id) {
//             var rowElement = document.getElementById("row" + id);
            
//             // Check if already editing
//             if(rowElement.classList.contains('editing')) {
//                 saveChangedContact(id);
//                 return;
//             }

//             var consFirstName = document.getElementById("first_Name" + id);
//             var consLastName = document.getElementById("last_Name" + id);
//             var consEmail = document.getElementById("email" + id);
//             var consPhone = document.getElementById("phone" + id);

//             var mod_fname = consFirstName.querySelector('span').innerText;
//             var mod_lname = consLastName.querySelector('span').innerText;
//             var mod_email = consEmail.querySelector('span').innerText;
//             var mod_phone = consPhone.querySelector('span').innerText;

//             consFirstName.innerHTML = "<input type='text' id='fname_text" + id + "' value='" + mod_fname + "'>";
//             consLastName.innerHTML = "<input type='text' id='lname_text" + id + "' value='" + mod_lname + "'>";
//             consEmail.innerHTML = "<input type='text' id='email_text" + id + "' value='" + mod_email + "'>";
//             consPhone.innerHTML = "<input type='text' id='phone_text" + id + "' value='" + mod_phone + "'>";

//             // Change button to save button
//             var editButton = document.getElementById("edit_button" + id);
//             editButton.className = "w3-button w3-circle w3-green";
//             editButton.innerHTML = "&#10004;";
//             editButton.setAttribute('aria-label', 'Save contact');

//             // Mark row as editing
//             rowElement.classList.add('editing');
//         }

//         // Saves the changes made in inline editing
//         function saveChangedContact(rownum) {
//             var fname_val = document.getElementById("fname_text" + rownum).value;
//             var lname_val = document.getElementById("lname_text" + rownum).value;
//             var email_val = document.getElementById("email_text" + rownum).value;
//             var phone_val = document.getElementById("phone_text" + rownum).value;
//             var conid_val = cids[rownum];

//             let tmp = {
//                 firstName: fname_val,
//                 lastName: lname_val,
//                 phone: phone_val,
//                 email: email_val,
//                 contactId: conid_val,
//                 userId: userID
//             };// Brings up inline editing for the selected contact
//         function editContact(id) {
//             var rowElement = document.getElementById("row" + id);
            
//             // Check if already editing
//             if(rowElement.classList.contains('editing')) {
//                 saveChangedContact(id);
//                 return;
//             }

//             var consFirstName = document.getElementById("first_Name" + id);
//             var consLastName = document.getElementById("last_Name" + id);
//             var consEmail = document.getElementById("email" + id);
//             var consPhone = document.getElementById("phone" + id);

//             var mod_fname = consFirstName.querySelector('span').innerText;
//             var mod_lname = consLastName.querySelector('span').innerText;
//             var mod_email = consEmail.querySelector('span').innerText;
//             var mod_phone = consPhone.querySelector('span').innerText;

//             consFirstName.innerHTML = "<input type='text' id='fname_text" + id + "' value='" + mod_fname + "'>";
//             consLastName.innerHTML = "<input type='text' id='lname_text" + id + "' value='" + mod_lname + "'>";
//             consEmail.innerHTML = "<input type='text' id='email_text" + id + "' value='" + mod_email + "'>";
//             consPhone.innerHTML = "<input type='text' id='phone_text" + id + "' value='" + mod_phone + "'>";

//             // Change button to save button
//             var editButton = document.getElementById("edit_button" + id);
//             editButton.className = "w3-button w3-circle w3-green";
//             editButton.innerHTML = "&#10004;";
//             editButton.setAttribute('aria-label', 'Save contact');

//             // Mark row as editing
//             rowElement.classList.add('editing');
//         }

//         // Saves the changes made in inline editing
//         function saveChangedContact(rownum) {
//             var fname_val = document.getElementById("fname_text" + rownum).value;
//             var lname_val = document.getElementById("lname_text" + rownum).value;
//             var email_val = document.getElementById("email_text" + rownum).value;
//             var phone_val = document.getElementById("phone_text" + rownum).value;
//             var conid_val = cids[rownum];

//             let tmp = {
//                 firstName: fname_val,
//                 lastName: lname_val,
//                 phone: phone_val,
//                 email: email_val,
//                 contactId: conid_val,
//                 userId: userID
//             }