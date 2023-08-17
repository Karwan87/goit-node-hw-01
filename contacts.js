const fs = require("fs");
const path = require("path");

const contactsPath = path.join(__dirname, "db", "contacts.json");
console.log("./db/contacts.json", contactsPath);

function readContactsFile(callback) {
  fs.readFile(contactsPath, "utf-8", (err, data) => {
    if (err) {
      console.error("Błąd odczytu pliku contacts.json:", err);
      callback(err);
      return;
    }
    callback(null, JSON.parse(data));
  });
}

function listContacts() {
  readContactsFile((err, contacts) => {
    if (!err) {
      console.log("Kontakty:", contacts);
    }
  });
}

function getContactById(contactId) {
  readContactsFile((err, contacts) => {
    if (err) {
      return;
    }

    const contact = contacts.find((item) => item.id === contactId);

    if (!contact) {
      console.log("Kontakt o podanym ID nie istnieje.");
      return;
    }

    console.log("Kontakt o podanym ID:", contact);
  });
}

function removeContact(contactId) {
  console.log("Rozpoczęto usuwanie kontaktu o ID:", contactId);

  readContactsFile((err, contacts) => {
    if (err) {
      return;
    }

    const updatedContacts = contacts.filter((item) => item.id !== contactId);

    fs.writeFile(
      contactsPath,
      JSON.stringify(updatedContacts, null, 2),
      (err) => {
        if (err) {
          console.error("Błąd zapisu pliku contacts.json:", err);
          return;
        }
        console.log("Usunięto kontakt o ID", contactId);
      }
    );
  });
}

function addContact(name, email, phone) {
  readContactsFile((err, contacts) => {
    if (err) {
      return;
    }

    const newContact = { id: Date.now().toString(), name, email, phone };
    contacts.push(newContact);

    fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2), (err) => {
      if (err) {
        console.error("Błąd zapisu pliku contacts.json:", err);
        return;
      }
      console.log("Nowy kontakt został dodany:", newContact);
    });
  });
}

module.exports = { listContacts, getContactById, removeContact, addContact };
