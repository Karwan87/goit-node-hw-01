const contacts = require("./contacts");

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
