const fs = require("fs");
const path = require("path");
const fsPromises = require("fs").promises;

const contactsPath = path.join(__dirname, "db", "contacts.json");
console.log("./db/contacts.json", contactsPath);

// loading contacts

function listContacts() {
  fs.readFile(contactsPath, "utf-8", (err, data) => {
    if (err) {
      console.error("Błąd odczytu pliku contacts.json:", err);
      return;
    }
    console.log("Kontakty:", JSON.parse(data));
  });
}

// loading contacts by ID
function getContactById(contactId) {
  fs.readFile(contactsPath, "utf-8", (err, data) => {
    if (err) {
      console.error("Błąd odczytu pliku contacts.json:", err);
      return;
    }

    const contacts = JSON.parse(data);
    const contact = contacts.find((item) => item.id === contactId);

    if (!contact) {
      console.log("Kontakt o podanym ID nie istnieje.");
      return;
    }

    console.log("Kontakt o podanym ID:", contact);
  });
}

// delete contacts by ID
function removeContact(contactId) {
  console.log("Rozpoczęto usuwanie kontaktu o ID:", contactId);

  fs.readFile(contactsPath, "utf-8", (err, data) => {
    if (err) {
      console.error("Błąd odczytu pliku contacts.json:", err);
      return;
    }

    const contacts = JSON.parse(data);
    const updatedContacts = contacts.filter((item) => item.id !== contactId);
    fsPromises
      .writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2))
      .then(() => {
        console.log("Usunięto kontakt o ID", contactId);
      })
      .catch((err) => {
        console.error("Błąd zapisu pliku contacts.json:", err);
      });
  });
}

// creating new contacts

function addContact(name, email, phone) {
  fs.readFile(contactsPath, "utf-8", (err, data) => {
    if (err) {
      console.error("Błąd odczytu pliku contacts.json:", err);
      return;
    }

    const contacts = JSON.parse(data);
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

// functions export
module.exports = { listContacts, getContactById, removeContact, addContact };
