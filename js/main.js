//   elements
var nameInput = document.getElementById("fullNameInput");
var phoneNumberInput = document.getElementById("phoneNumberInput");
var emailInput = document.getElementById("emailInput");
var addressInput = document.getElementById("addressInput");
var selectInput = document.getElementById("selectInput");
var textareaInput = document.getElementById("textareaInput");
var imagePreview = document.getElementById("image-preview");
var employeeImage = document.getElementById("employeeImage");
var imageUpload = document.getElementById("imageUpload");
var btnAdd = document.getElementById("saveBtn");
var btnEdit = document.getElementById("editBtn");

//   section
var total = document.getElementById("totalContacts");
var favorites = document.getElementById("favoritesContacts");
var emergencys = document.getElementById("emergencyContacts");
var zzz = document.getElementById("star-badge");

//  side section
var favouritesList = document.getElementById("favourites-list");
var favoritesList = [];
var emergencysList = [];

//  cards section
var newContacts = document.getElementById("newContact");
var currentIndex = 0;
var contactList = [];

if (localStorage.getItem("contactContainer") !== null) {
  contactList = JSON.parse(localStorage.getItem("contactContainer"));

  displayData(contactList);
}

upLoadImgBtn.addEventListener("click", function () {
  imageUpload.click();
});

imageUpload.onchange = function () {
  var file = imageUpload.files[0];

  if (!file) return;

  employeeImage.value = file.name;

  imagePreview.innerHTML = `
   <div class="text-center p-3 d-flex flex-column">
      <i class="fas fa-file-image fa-3x mb-2"></i>
      ${file.name}
    </div>
  `;
};

function addContact() {
  var modalElement = document.getElementById("staticBackdrop");
  var modalInstance = bootstrap.Modal.getInstance(modalElement);

  if (
    nameInput.classList.contains("is-valid") &&
    emailInput.classList.contains("is-valid") &&
    phoneNumberInput.classList.contains("is-valid")
  ) {
    let contactHub = {
      fullName: nameInput.value,
      phoneNumber: phoneNumberInput.value,
      email: emailInput.value,
      address: addressInput.value,
      selectGroup: selectInput.value,
      textNotes: textareaInput.value,
      image: employeeImage.value.split("\\").pop(),
      id: contactList.length,
    };

    contactList.push(contactHub);
    localStorage.setItem("contactContainer", JSON.stringify(contactList));

    if (modalInstance) modalInstance.hide();

    displayData(contactList);

    updateNumber();

    clearform();

    Swal.fire({
      title: "Added!",
      text: "Contact has been added successfully",
      icon: "success",
      showConfirmButton: false,
      timer: 2000,
    });
  } else {
    Swal.fire({
      icon: "error",
      title: "  Missing Name",
      text: "Please enter a name for the contact!",
      confirmButtonColor: "#7066e0",
    });
  }
}

function deleteBtn(index) {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this contact!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "Cancel",
  }).then((result) => {
    if (result.isConfirmed) {
      contactList.splice(index, 1);
      localStorage.setItem("contactContainer", JSON.stringify(contactList));
      displayData(contactList);

      Swal.fire("Deleted!", "Your contact has been deleted.", "success");
    }
  });
}

function setUpdateInfo(index) {
  currentIndex = index;
  nameInput.value = contactList[index].fullName;
  phoneNumberInput.value = contactList[index].phoneNumber;
  emailInput.value = contactList[index].email;
  addressInput.value = contactList[index].address;
  selectInput.value = contactList[index].selectGroup;
  textareaInput.value = contactList[index].textNotes;

  btnAdd.classList.add("d-none");

  btnEdit.classList.remove("d-none");
}

function updateData() {
  var modalElement = document.getElementById("staticBackdrop");
  var modalInstance = bootstrap.Modal.getInstance(modalElement);

  var contactHub = {
    fullName: nameInput.value,
    phoneNumber: phoneNumberInput.value,
    email: emailInput.value,
    address: addressInput.value,
    selectGroup: selectInput.value,
    textNotes: textareaInput.value,
    image: "images/" + employeeImage.value,
  };

  contactList.splice(currentIndex, 1, contactHub);

  localStorage.setItem("contactContainer", JSON.stringify(contactList));

  if (modalInstance) modalInstance.hide();

  btnAdd.classList.remove("d-none");

  btnEdit.classList.add("d-none");

  displayData(contactList);

  clearform();

  Swal.fire({
    title: "Updated!",
    text: "Contact has been Updated successfully",
    icon: "success",
    showConfirmButton: false,
    timer: 2000,
  });
}

function clearform() {
  nameInput.value = null;
  phoneNumberInput.value = null;
  emailInput.value = null;
  addressInput.value = null;
  selectInput.value = null;
  textareaInput.value = null;
}

function displayData(list) {
  let cartona = ``;

  console.log(list);

  for (i = 0; i < list.length; i++)
    cartona += `
  <div class="col-md-6" >
          <div class="box-s rounded-4 bg-white gap-3 align-items-center p-3">
            <div class="">
              <div class="d-flex gap-3 mb-3">
                <div class="position-relative">

                  ${
                    list[i].image
                      ? `
                  <img
                    src="images/${list[i].image}"
                    class="img-fluid rounded-3"
                    style="width: 60px"
                  />
                    `
                      : `

                      <div
                    class="zzz justify-content-center d-flex align-items-center rounded-3 fw-bold text-white"
                  >
                    <span>${list[i].fullName[0].toUpperCase()}</span>
                  </div>
                
                  `
                  }

                  <div
                  id="starBadge-${i}" 
                  class="bg-white p-1 rounded-circle position-absolute top-0 start-100 translate-middle d-none"
                  >
                    <span
                      class="bg-star-abs bg-nav rounded-circle d-flex align-items-center justify-content-center"
                    >
                      <i class="fa-solid fa-star fa-xs text-white"></i>
                    </span>
                  </div>
                  <div
                  id="heartBadge-${i}" 
                    class="bg-white p-1 rounded-circle position-absolute start-100 translate-middle d-none"
                  >
                    <span
                      class="bg-pulse-abs bg-nav rounded-circle d-flex align-items-center justify-content-center"
                    >
                      <i class="fa-solid fa-heart-pulse fa-xs text-white"></i>
                    </span>
                  </div>
                </div>
                <div>
            <p class="fw-semibold mb-2">${list[i].fullName}</p>
            <p class="d-flex">
              <span
                class="phone-bg rounded-3 d-flex align-items-center justify-content-center me-2"
                ><i class="fa-solid fa-phone fa-2xs"></i
              ></span>
              ${list[i].phoneNumber}
            </p>
          </div>
        </div>
        <div class="d-flex align-items-center mb-3">
          <span class="bg-envelope ms-2 me-3">
            <i class="fa-solid fa-envelope fa-xs"></i>
          </span>
          <span class="text-black-50">${list[i].email}</span>
        </div>
        <div class="d-flex align-items-center">
          <span
            class="bg-location bg-nav rounded-3 d-flex align-items-center justify-content-center me-3"
          >
            <i class="fa-solid fa-location-dot fa-xs"></i>
          </span>
          <span> ${list[i].address}</span>
        </div>
        <div class="mt-3">
          <span class="badge bg-work-badge text-work-badge"
            >${list[i].selectGroup}</span
          >
          <span id="badgeEmergency-${i}" class="badge bg-Emergency text-Emergency d-none"
            ><i class="fa-solid fa-heart-pulse"></i
            >Emergency</span
          >
        </div>
        <div
          class="d-flex mt-3 align-items-center justify-content-between"
        >
          <div class="d-flex align-items-center">
            <span
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="Call"
              class="bg-phone bg-nav rounded-3 d-flex align-items-center justify-content-center me-2 text-success"
            >
              <i class="fa-solid fa-phone fa-xs"></i>
            </span>
            <span
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="Email"
              class="hover-envelope rounded-3 d-flex align-items-center justify-content-center"
            >
              <a href="mailto:example@email.com"
                ><i
                  class="fa-solid fa-envelope fa-xs text-work-badge"
                ></i
              ></a>
            </span>
          </div>
          <div class="d-flex align-items-center">
            <span
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="Favorite"
              onclick="toggelFav(${i})"
              class="bg-star-hover bg-nav rounded-3 cursor-p d-flex align-items-center justify-content-center me-2"
            >
              <i 
              id="star-${i}"
              class="fa-regular fa-star text-warning fa-xs"></i>
            </span>
            <span
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="Emergency"
              onclick="toggelEmergency(${i})"
              class="bg-star-hover bg-nav rounded-3 cursor-p d-flex align-items-center justify-content-center me-2"
            >
              <i id="heart-${i}" class="fa-regular fa-heart text-danger fa-xs"></i>
            </span>
            <span
                aria-current="page"
  data-bs-toggle="modal"
  data-bs-target="#staticBackdrop"
              title="Edit"
              onclick="setUpdateInfo(${i})"
              class="bg-location bg-nav rounded-3 cursor-p fa-pens d-flex align-items-center justify-content-center me-2"
            >
              <i class="fa-solid fa-pen fa-xs"></i>
            </span>
            <span
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="delete"
              id="deleteButton"
              onclick="deleteBtn(${i})"
              class="bg-location bg-nav rounded-3 cursor-p d-flex align-items-center trash justify-content-center"
            >
              <i class="fa-solid fa-trash fa-xs"></i>
            </span>
            <span class="d-none"> ${i + 1}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
`;
  newContacts.innerHTML = cartona;
  updateNumber();
}

function search(searchValue) {
  if (searchValue == "") {
    displayData(contactList);
    return;
  }

  var searchResult = [];

  for (var i = 0; i < contactList.length; i++) {
    var contactItem = contactList[i];
    if (
      contactItem.fullName.toLowerCase().includes(searchValue.toLowerCase())
    ) {
      searchResult.push(contactItem);
    }
  }

  displayData(searchResult);
}

function validateProductInput(element) {
  var regex = {
    fullNameInput: /^[a-zA-Z\s]{3,30}$/,
    emailInput: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    phoneNumberInput: /^(?:\+20|0020|0)?1[0125][0-9]{8}$/,
  };

  if (regex[element.id].test(element.value)) {
    element.nextElementSibling.classList.add("d-none");
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
  } else {
    element.nextElementSibling.classList.remove("d-none");
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
  }
}

function updateNumber() {
  total.innerHTML = contactList.length;
}

function toggelFav(index) {
  var icon = document.getElementById(`star-${index}`);
  var badge = document.getElementById(`starBadge-${index}`);
  var selectedContact = contactList[index];

  selectedContact.isFav = !selectedContact.isFav;

  if (selectedContact.isFav) {
    icon.classList.replace("fa-regular", "fa-solid");
  } else {
    icon.classList.replace("fa-solid", "fa-regular");
  }

  if (contactList[index].isFav == true) {
    badge.classList.remove("d-none");
  } else {
    badge.classList.add("d-none");
  }
  var count = 0;
  for (var i = 0; i < contactList.length; i++) {
    if (contactList[i].isFav) count++;
  }

  document.getElementById("favoritesContacts").innerHTML = count;

  displayFavourites();
}

function displayFavourites() {
  var cartona = "";
  var favCount = 0;
  for (var i = 0; i < contactList.length; i++) {
    if (contactList[i].isFav) {
      cartona += `  <div class="d-flex align-items-center gap-3 pt-2 bg-hov">
                         <div
                    class="zzz justify-content-center d-flex align-items-center rounded-3 fw-bold text-white"
                  >
                    <span>${contactList[i].fullName[0].toUpperCase()}</span>
                  </div>
                    <div>
                      <p class="fw-semibold mb-2 mb-0">${
                        contactList[i].fullName
                      }</</p>
                      <p class="text-black-50">${contactList[i].phoneNumber}</p>
                    </div>
                    <span
                      class="phone-bgz rounded-3 d-flex align-items-center justify-content-center ms-auto text-green"
                      ><i class="fa-solid fa-phone fa-xs"></i
                    ></span>
                  </div>`;
      favCount++;
    }
  }

  favouritesList.innerHTML = cartona;

  document.getElementById("favoritesContacts").innerHTML = favCount;
}

function toggelEmergency(index) {
  var selectedContact = contactList[index];
  var icon = document.getElementById(`heart-${index}`);
  var badge = document.getElementById(`heartBadge-${index}`);
  var badgeEmer = document.getElementById(`badgeEmergency-${index}`);

  selectedContact.isEmergency = !selectedContact.isEmergency;

  if (selectedContact.isEmergency) {
    badge.classList.remove("d-none");
    badgeEmer.classList.remove("d-none");
    if (icon) icon.classList.replace("fa-regular", "fa-solid");
  } else {
    badge.classList.add("d-none");
    badgeEmer.classList.add("d-none");
    if (icon) icon.classList.replace("fa-solid", "fa-regular");
  }

  displayEmergency();
}

function displayEmergency() {
  var cartona = "";
  var emergencyCount = 0;
  for (var i = 0; i < contactList.length; i++) {
    if (contactList[i].isEmergency) {
      cartona += `  <div class="d-flex align-items-center gap-3 pt-2 bg-hov">
                         <div
                    class="zzz justify-content-center d-flex align-items-center rounded-3 fw-bold text-white"
                  >
                    <span>${contactList[i].fullName[0].toUpperCase()}</span>
                  </div>
                    <div>
                      <p class="fw-semibold mb-2 mb-0">${
                        contactList[i].fullName
                      }</</p>
                      <p class="text-black-50">${contactList[i].phoneNumber}</p>
                    </div>
                    <span
                      class="phone-bgzz rounded-3 d-flex align-items-center justify-content-center ms-auto text-green"
                      ><i class="fa-solid fa-phone fa-xs"></i
                    ></span>
                  </div>`;
      emergencyCount++;
    }
  }
  document.getElementById("emergencyList").innerHTML = cartona;
  document.getElementById("emergencyContacts").innerHTML = emergencyCount;
}
