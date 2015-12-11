/**
 * Created by Amitai CS on 10/12/2015.
 */
function createPlayerContact(){


    var contact = navigator.contacts.create();
    var playername=document.getElementById('name').value;
    contact.displayName = playername;
    contact.nickname = playername;
    // specify both to support all devices
    // populate some fields
    var name = new ContactName();
    name.givenName = playername;
    name.familyName = "Ping Pong";
    contact.name = name;

    var playerphone=document.getElementById('phone').value;
    var phoneNums = [];
    phoneNums[0] = new ContactField('mobile', playerphone, false);
    contact.phoneNumbers = phoneNums;
    contact.save(onSuccess,onError);

}

function onError(contactError) {
    alert("Error = " + contactError.code);
}


function onSuccess(contact) {
    alert("Contact Saved Succesfully.");
}
