const contacts = require("./contacts");

// show contacts list
// console.time("listContacts");
// contacts.listContacts();
// console.timeEnd("listContacts");

// OPERATORS - UNCOMMENT SINGLE TO CHECK THE FUNCTIONS IS WORKING

// add new contact
// console.time("addContact");
// contacts.addContact("Nowy Kontakt", "nowy@example.com", "123456789");
// console.timeEnd("addContact");

// get contact by id
// console.time("getContactById");
// contacts.getContactById("rsKkOQUi80UsgVPCcLZZW");
// console.timeEnd("getContactById");

// delete contact by id
// console.time("removeContact");
// contacts.removeContact(1692211841855);
// console.timeEnd("removeContact");

const { Command } = require("commander");
const program = new Command();

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

function invokeAction({ action, id, name, email, phone }) {
  const contacts = require("./contacts"); // Import modułu contacts.js

  switch (action) {
    case "list":
      contacts.listContacts();
      break;

    case "get":
      if (id) {
        contacts.getContactById(id);
      } else {
        console.error("Please provide an ID using the -i option.");
      }
      break;

    case "add":
      if (name && email && phone) {
        contacts.addContact(name, email, phone);
      } else {
        console.error(
          "Please provide name, email, and phone using the -n, -e, -p options."
        );
      }
      break;

    case "remove":
      if (id) {
        contacts.removeContact(id);
      } else {
        console.error("Please provide an ID using the -i option.");
      }
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
