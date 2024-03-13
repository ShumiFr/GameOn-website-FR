// Récupération des éléments du DOM
const modalbg = document.querySelector(".bground"); // Fond de la modale
const modalBtn = document.querySelectorAll(".modal-btn"); // Boutons pour ouvrir la modale
const formData = document.querySelectorAll(".formData"); // Données du formulaire
const modalClose = document.querySelector(".close"); // Bouton pour fermer la modale
const closeButton = document.querySelector(".close-button"); // Bouton pour fermer la modale depuis la modaleThankYou
const submitButton = document.querySelector(".btn-submit"); // Bouton de soumission
const modal = document.querySelector(".content"); // Contenu de la modale

const modalForm = document.getElementById("modalForm");
const modalThankYou = document.getElementById("modalThankYou");

// Récupération des champs du formulaire
const firstName = document.getElementById("first"); // Prénom
const lastName = document.getElementById("last"); // Nom
const email = document.getElementById("email"); // Email
const birthdate = document.getElementById("birthdate"); // Date de naissance
const quantity = document.getElementById("quantity"); // Quantité de tournois
const radios = document.querySelectorAll('input[name="location"]'); // Lieu
const terms = document.getElementById("checkbox1"); // Conditions générales

// Fonction pour gérer le menu responsive
function editNav() {
  const x = document.getElementById("myTopnav");
  // Si le menu est en mode normal, passe en mode responsive
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    // Si le menu est en mode responsive, passe en mode normal
    x.className = "topnav";
  }
}

document.addEventListener("DOMContentLoaded", function () {
  // Événement pour ouvrir et fermer la modale
  modalBtn.forEach((btn) =>
    btn.addEventListener("click", launchModal)
  );
  modalClose.addEventListener("click", closeModal);

  // Fonction pour fermer la modale
  function closeModal() {
    modal.classList.add("closing"); // Ajoute la clase pour l'animation de fermeture
    modal.classList.remove("opening"); // Supprime la classe pour l'animation d'ouverture

    // Réinitialise les champs du formulaire
    document.querySelector("form").reset();

    // Ferme la modale après l'animation de fermeture
    setTimeout(function () {
      modalbg.style.display = "none";
      modal.classList.remove("closing");
    }, 500);
  }

  // Fonction pour ouvrir la modale
  function launchModal() {
    // Afficher la modale du formulaire
    modalThankYou.style.display = "none";
    modalForm.style.display = "block";

    // Réinitialiser le formulaire
    document.querySelector("form").reset();

    // Désactiver le bouton de soumission
    submitButton.disabled = true;
    submitButton.style.backgroundColor = "grey";
  }

  // Vérification que tous les champs sont remplis avant validation
  firstName.addEventListener("input", validateForm); // Prénom
  lastName.addEventListener("input", validateForm); // Nom
  email.addEventListener("input", validateForm); // Email
  birthdate.addEventListener("input", validateBirthdate); // Date de naissance
  quantity.addEventListener("input", validateForm); // Quantité de tournois
  radios.forEach((r) => r.addEventListener("input", validateForm)); // Lieu
  terms.addEventListener("input", validateForm); // Conditions générales

  // Fonction pour valider le formulaire
  function validateForm() {
    // Vérifie si au moins un champ est rempli pour activer le bouton de soumission
    const isFormFilled =
      firstName.value ||
      lastName.value ||
      email.value ||
      birthdate.value ||
      quantity.value ||
      document.querySelector('input[name="location"]:checked') ||
      terms.checked;

    // Active ou désactive le bouton de soumission
    submitButton.disabled = !isFormFilled;

    // Change la couleur du bouton de soumission si désactivé
    if (submitButton.disabled) {
      submitButton.style.backgroundColor = "grey";
    } else {
      submitButton.style.backgroundColor = ""; // Reset à la couleur par default
    }

    // Enlève les messages d'erreur et les bordures rouges si tous les champs sont remplis correctement
    clearError(firstName);
    clearError(lastName);
    clearError(email);
    clearError(birthdate);
    clearError(quantity);
    clearError(document.querySelector('input[name="location"]'));
    clearError(terms);
  }

  // Fonction pour valider la date de naissance
  function validateBirthdate() {
    clearError(birthdate);

    const birthdateValue = new Date(birthdate.value);

    // Vérifie si la date de naissance est valide
    if (!birthdate.value || isNaN(birthdateValue.getTime())) {
      displayError(
        birthdate,
        "La date de naissance n'est pas valide"
      );
      return false;
    }
    return true;
  }

  // Fonctions pour afficher et enlever les messages d'erreur
  function clearError(input) {
    // Retire le message d'erreur s'il existe
    const existingError =
      input.parentElement.querySelector(".error-message");
    if (existingError) {
      existingError.remove();
    }

    // Reset la couleur de la bordure
    input.style.borderColor = "";
  }

  // Fonction pour afficher un message d'erreur
  function displayError(input, message) {
    // Créer un élément pour le message d'erreur avec la classe "error-message" et le texte du message
    const error = document.createElement("div");
    error.className = "error-message";
    error.textContent = message;

    // Ajoute le message d'erreur après l'élément parent de l'input
    input.parentElement.appendChild(error);

    // Change la couleur de la bordure de l'input en rouge
    input.style.borderColor = "red";
  }

  // Événement pour soumettre le formulaire
  document
    .querySelector("form")
    .addEventListener("submit", function (event) {
      // Prévient le comportement par défaut du formulaire
      event.preventDefault();

      // Valide les champs du formulaire
      let isValid = true;

      // Vérifie si les champs sont remplis correctement
      if (firstName.value.length < 2) {
        displayError(
          firstName,
          "Le prénom doit comporter au moins 2 caractères"
        ); // Si le prénom est vide ou a moins de 2 caractères, affiche un message d'erreur
        isValid = false;
      } else if (lastName.value.length < 2) {
        displayError(
          lastName,
          "Le nom de famille doit comporter au moins 2 caractères" // Si le nom est vide ou a moins de 2 caractères, affiche un message d'erreur
        );
        isValid = false;
      } else if (!email.value.includes("@")) {
        displayError(
          email,
          "L'adresse électronique n'est pas valide"
        ); // Si l'email ne contient pas de @, affiche un message d'erreur
        isValid = false;
      } else if (!validateBirthdate()) {
        isValid = false; // On ne fait rien ici, la validation de la date de naissance est faite dans validateBirthdate()
      } else if (isNaN(quantity.value) || quantity.value === "") {
        displayError(
          quantity,
          "Le nombre de tournois doit être inscrit"
        ); // Si la quantité de tournois est vide, affiche un message d'erreur
        isValid = false;
      } else if (isNaN(quantity.value)) {
        displayError(
          quantity,
          "Le nombre de tournois doit être une valeur numérique" // Si la quantité de tournois n'est pas un nombre, affiche un message d'erreur
        );
        isValid = false;
      } else if (
        !document.querySelector('input[name="location"]:checked')
      ) {
        displayError(
          document.querySelector('input[name="location"]'),
          "Un lieu doit être sélectionné" // Si aucun lieu n'est sélectionné, affiche un message d'erreur
        );
        isValid = false;
      } else if (!terms.checked) {
        displayError(
          terms,
          "Les conditions générales doivent être acceptées"
        ); // Si les conditions générales ne sont pas acceptées, affiche un message d'erreur
        isValid = false;
      }

      // Validation du formulaire uniquement si tous les champs sont remplis
      if (isValid) {
        // Récupère le contenu de la modale
        const modalForm = document.getElementById("modalForm");
        const modalThankYou =
          document.getElementById("modalThankYou");

        // Masquer la première modale (modalForm)
        modalForm.style.display = "none";

        // Afficher la deuxième modale (modalThankYou)
        modalThankYou.style.display = "block";
      }
    });

  // Gestionnaire d'événement pour le bouton close de la modalThankYou
  closeButton.addEventListener("click", function () {
    // Ajouter la classe d'animation de fermeture
    modalThankYou.classList.add("closing");

    // Attendre la fin de l'animation avant de masquer la modalThankYou
    setTimeout(function () {
      // Fermer la modaleThankYou
      modalThankYou.style.display = "none";

      // Supprimer la classe d'animation de fermeture pour une utilisation future
      modalThankYou.classList.remove("closing");
    }, 300); // Le délai doit correspondre à la durée de l'animation définie dans le CSS
  });
});
