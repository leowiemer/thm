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
class User {
    public readonly uName: string;
    public fName: string;
    public lName: string;
    private password: string;

    constructor(fName: string, lName: string, uName: string, password: string) {
        this.fName = fName;
        this.lName = lName;
        this.uName = uName;
        this.password = password;
    }
}

/**
 * Definition der globalen Variablen
 * Hier sind es die benötigten HTML-Elemente und das User-Array.
 */
let inputFName: JQuery;
let inputLName: JQuery;
let inputUName: JQuery;
let inputPassword: JQuery;
let formInput: JQuery;
let formEdit: JQuery;
let tableUser: JQuery;
let editModal: JQuery;
let editID: JQuery;
let editFName: JQuery;
let editLName: JQuery;
let suche: JQuery;
const users: User[] = [];

/**
 * Die Callback-Funktion initialisiert nach dem Laden des DOMs die JQuery-Variablen
 * und registriert die Eventhandler.
 */
$(() => {
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
function addUser(event: Event) {
    event.preventDefault();

    const fName: string = inputFName.val().toString().trim();
    const lName: string = inputLName.val().toString().trim();
    const uName: string = inputUName.val().toString().trim();
    const password: string = inputPassword.val().toString().trim();

    if (fName.length === 0 || lName.length === 0 || uName.length === 0 || password.length === 0) {
        inputFName.val(fName);
        inputLName.val(lName);
        inputUName.val(uName);
        inputPassword.val(password);
        (formInput.get(0) as HTMLFormElement).reportValidity();
    } else {
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
function startEdit(event: Event) {
    const id: number = $(event.currentTarget).data("id");
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
function editUser(event: Event) {
    event.preventDefault();

    const fName: string = editFName.val().toString().trim();
    const lName: string = editLName.val().toString().trim();
    const id: number = Number(editID.val());

    if (fName.length === 0 || lName.length === 0) {
        editFName.val(fName);
        editLName.val(lName);
        (formEdit.get(0) as HTMLFormElement).reportValidity();
    } else {
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
function deleteUser(event: Event) {
    const id: number = $(event.currentTarget).data("id");
    users.splice(id, 1);
    renderUserList();
}

/**
 * Löscht die Inhalte der Tabelle und baut sie auf Grundlage der Userliste neu auf.
 */
function renderUserList() {
    tableUser.empty();

    for (let i: number = 0; i < users.length; i++) {
        const user: User = users[i];
        const tr: JQuery = $(`
        <tr>
            <td>${user.fName}</td>
            <td>${user.lName}</td>
            <td>${user.uName}</td>
            <td>
                <button class="btn btn-outline-dark btn-sm btnEdit" data-id="${i}">
                    <i class="fa fa-pencil-alt"></i>
                </button>
                <button class="btn btn-outline-dark btn-sm btnDel" data-id="${i}">
                    <i class="fa fa-trash"></i>
                </button>
            </td>
        </tr>
        `);

        tableUser.append(tr);

    }
}

function sucheUser() {

    const suchen: string = $(".suche").val().toString();
    user.search();
    console.log(suchen);


}
