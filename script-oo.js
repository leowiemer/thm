/**
 * Usermanager
 * Autor: Manuel Groh
 * Version: 2.1 (07.04.2019)
 */
/**
 * Definition der User-Klasse bestehend aus den Attributen Vor-, Zu- und Username sowie Passwort.
 * Außer dem Passwort sind alle Attribute öffentlich einsehbar (public).
 * Der Username ist zudem unveränderlich (readonly)
 */
var User = /** @class */ (function () {
    function User(fName, lName, uName, password) {
        this.fName = fName;
        this.lName = lName;
        this.uName = uName;
        this.password = password;
    }
    return User;
}());
/**
 * Definition der globalen Variablen
 * Hier sind es die benötigten HTML-Elemente und das User-Array.
 */
var inputFName;
var inputLName;
var inputUName;
var inputPassword;
var formInput;
var formEdit;
var tableUser;
var editModal;
var editID;
var editFName;
var editLName;
var suche;
var users = [];
/**
 * Die Callback-Funktion initialisiert nach dem Laden des DOMs die JQuery-Variablen
 * und registriert die Eventhandler.
 */
$(function () {
    inputFName = $("#inputFName");
    inputLName = $("#inputLName");
    inputUName = $("#inputUName");
    inputPassword = $("#inputPassword");
    formInput = $("#formInput");
    formEdit = $("#formEdit");
    tableUser = $("#tableUser");
    editModal = $("#editModal");
    editID = $("#editID");
    editFName = $("#editFName");
    editLName = $("#editLName");
    suche = $("#suche");
    formInput.on("submit", addUser);
    formEdit.on("submit", editUser);
    tableUser.on("click", ".btnEdit", null, startEdit);
    tableUser.on("click", ".btnDel", null, deleteUser);
    suche.on("keypress", sucheUser);
});
/**
 * Die Funktion liest die benötigten Werte aus den Inputfeldern und kürzt überflüssige Leerzeichen raus.
 * Sollte ein Feld nicht ausgefüllt sein werden die gekürzten Werte zurückgeschrieben und das Formular erneut validiert.
 * Andernfalls wird ein neuer User erzeugt und dem Array hinzugefügt.
 * @param event zum Unterdrücken des Standardverhaltens (Neuladen der Seite)
 */
function addUser(event) {
    event.preventDefault();
    var fName = inputFName.val().toString().trim();
    var lName = inputLName.val().toString().trim();
    var uName = inputUName.val().toString().trim();
    var password = inputPassword.val().toString().trim();
    if (fName.length === 0 || lName.length === 0 || uName.length === 0 || password.length === 0) {
        inputFName.val(fName);
        inputLName.val(lName);
        inputUName.val(uName);
        inputPassword.val(password);
        formInput.get(0).reportValidity();
    }
    else {
        users.push(new User(fName, lName, uName, password));
        formInput.trigger("reset");
        renderUserList();
    }
}
/**
 * Die Funktion wird zu Beginn des Editiervorgangs aufgerufen.
 * Sie überträgt die ID des aktuellen Elements in das Modalfenster und zeigt es an.
 * @param event zur Auswahl des angeklickten Elements
 */
function startEdit(event) {
    var id = $(event.currentTarget).data("id");
    editID.val(id);
    editFName.val(users[id].fName);
    editLName.val(users[id].lName);
    editModal.modal("show");
}
/**
 * Die Funktion wird aufgerufen, wenn das Editieren quittiert wird.
 * Die benötigten Felder werden analog zur Funktion addUser ausgelesen und validiert.
 * Zuletzt wird das Formular zurückgesetzt und das Modalfenster ausgeblendet.
 * @param event zum Unterdrücken des Standardverhaltens (Neuladen der Seite)
 */
function editUser(event) {
    event.preventDefault();
    var fName = editFName.val().toString().trim();
    var lName = editLName.val().toString().trim();
    var id = Number(editID.val());
    if (fName.length === 0 || lName.length === 0) {
        editFName.val(fName);
        editLName.val(lName);
        formEdit.get(0).reportValidity();
    }
    else {
        users[id].fName = fName;
        users[id].lName = lName;
        formEdit.trigger("reset");
        editModal.modal("hide");
        renderUserList();
    }
}
/**
 * Schneidet das aktuelle Element aus der Liste der User aus.
 * @param event zur Auswahl des angeklickten Elements
 */
function deleteUser(event) {
    var id = $(event.currentTarget).data("id");
    users.splice(id, 1);
    renderUserList();
}
/**
 * Löscht die Inhalte der Tabelle und baut sie auf Grundlage der Userliste neu auf.
 */
function renderUserList() {
    tableUser.empty();
    for (var i = 0; i < users.length; i++) {
        var user = users[i];
        var tr = $("\n        <tr>\n            <td>" + user.fName + "</td>\n            <td>" + user.lName + "</td>\n            <td>" + user.uName + "</td>\n            <td>\n                <button class=\"btn btn-outline-dark btn-sm btnEdit\" data-id=\"" + i + "\">\n                    <i class=\"fa fa-pencil-alt\"></i>\n                </button>\n                <button class=\"btn btn-outline-dark btn-sm btnDel\" data-id=\"" + i + "\">\n                    <i class=\"fa fa-trash\"></i>\n                </button>\n            </td>\n        </tr>\n        ");
        tableUser.append(tr);
    }
}
function sucheUser() {
    var suchen = $(".suche").val().toString();
    user.search();
    console.log(suchen);
}
