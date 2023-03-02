// Creating elements
const $app = document.getElementById('app'),

    $addForm = document.getElementById('add-form'),
    $surnameInput = document.getElementById('surname'),
    $nameInput = document.getElementById('name'),
    $middlenameInput = document.getElementById('middlename'),
    $facultyInput = document.getElementById('faculty'),
    $birthdayInput = document.getElementById('birth'),
    $studyStartInput = document.getElementById('studyStart'),
    $formValid = document.getElementById('form-valid'),
    $formBtn = document.getElementById('formBtn'),

    $formFilter = document.getElementById('filter-form'),
    $fullNameFilter = document.getElementById('filter-form__fullName-inp'),
    $facultyFilter = document.getElementById('filter-form__faculty-inp'),
    $studyStartFilter = document.getElementById('filter-form__adm-inp'),
    $graduateYearFilter = document.getElementById('filter-form__grad-inp'),

    $sortFullNameBtn = document.getElementById('sort__fullName'),
    $sortFacultyBtn = document.getElementById('sort__faculty'),
    $sortDbAgeBtn = document.getElementById('sort__DbAge'),
    $sortYearsAndCurseBtn = document.getElementById('sort__yearsAndCurse'),

    $table = document.createElement('table'),
    $tableHead = document.createElement('thead'),
    $tableBody = document.createElement('tbody'),

    $tableHeadTr = document.createElement('tr'),
    $tableHeadThName = document.createElement('th'),
    $tableHeadThFac = document.createElement('th'),
    $tableHeadThDB = document.createElement('th'),
    $tableHeadThDS = document.createElement('th'),
    $tableHeadTHDelete = document.createElement('th');

$table.classList.add('table', 'table-success', 'table-striped'),
$tableHeadThName.classList.add('table-head'),
$tableHeadThFac.classList.add('table-head'),
$tableHeadThDB.classList.add('table-head'),
$tableHeadThDS.classList.add('table-head'),
$tableHeadTHDelete.classList.add('table-head');

    $tableHeadThName.textContent = 'Full name',
    $tableHeadThFac.textContent = 'Faculty',
    $tableHeadThDB.textContent = 'Date of birth and age',
    $tableHeadThDS.textContent = 'Years of study',
    $tableHeadTHDelete.textContent = 'Delete';

$tableHeadThName.append($sortFullNameBtn),
$tableHeadThFac.append($sortFacultyBtn),
$tableHeadThDB.append($sortDbAgeBtn),
$tableHeadThDS.append($sortYearsAndCurseBtn),

$tableHeadTr.append($tableHeadThName),
$tableHeadTr.append($tableHeadThFac),
$tableHeadTr.append($tableHeadThDB),
$tableHeadTr.append($tableHeadThDS),
$tableHeadTr.append($tableHeadTHDelete),

$tableHead.append($tableHeadTr),
$table.append($tableHead),
$table.append($tableBody),

$app.append($table);

//Tr one user
function createUserTr(oneUser) {
  //Create user
  const $userTr = document.createElement('tr'),
        $userFullName = document.createElement('th'),
        $userFac = document.createElement('th'),
        $userDbAge = document.createElement('th'),
        $userDS = document.createElement('th'),
        $userDelete = document.createElement('th'),
        $userDeleteBtn = document.createElement('button');

      $userDeleteBtn.classList.add('btn', 'btn-primary', 'btn-delete');

    $userFullName.textContent = oneUser.fullName,
    $userFac.textContent = oneUser.faculty,
    $userDbAge.textContent = oneUser.DbAge,
    $userDS.textContent = oneUser.yearsAndCurse,
    $userDeleteBtn.textContent = 'Delete';

  $userTr.append($userFullName),
  $userTr.append($userFac),
  $userTr.append($userDbAge),
  $userTr.append($userDS),
  $userTr.append($userDelete),
  $userDelete.append($userDeleteBtn);

  //Delete user
  $userDeleteBtn.addEventListener('click', function() {
    if (confirm('Are you sure?')) {
      //From table
      $userTr.remove();
      //From array
      fetch(`http://localhost:3000/api/students/${oneUser.id}`, {
        method: 'DELETE',
      });
        return
      }
      render(copylistData)
    });

  return $userTr
}

// Render
async function render() {

  const response = await fetch('http://localhost:3000/api/students')
  const listData = await response.json()

  $tableBody.innerHTML = '';
  let copyListData = [...listData];

  // Preparation
  for (const oneUser of copyListData) {
    oneUser.fullName = oneUser.surname + ' ' + oneUser.name + ' ' + oneUser.middlename;

    oneUser.age = Math.round ((new Date() - (new Date(oneUser.birthday))) / (1000 * 60 * 60 * 24 * 365.25));

    userDateBirth = new Date(oneUser.birthday).getDate();
    if (userDateBirth < 10) {
      userDateBirth = '0' + userDateBirth;
    };
    userMonthBirth = String(new Date(oneUser.birthday).getMonth() + 1);
    if (userMonthBirth < 10) {
      userMonthBirth = '0' + userMonthBirth;
    };
    userYearBirth = String(new Date(oneUser.birthday).getFullYear());
    oneUser.DbAge = userDateBirth + '.' + userMonthBirth + '.' + userYearBirth + ' (' + oneUser.age + ' years)';

    let today = 1970 + Number(Date.now()) / (1000 * 60 * 60 * 24 * 365.25);
    oneUser.dateOfIssue = Number(oneUser.studyStart) + 4,75;
      if (today >= oneUser.dateOfIssue) {
        curse = ' (finished)';
      } else {
        curse = ' (' + Math.round(Number(today - oneUser.studyStart)) + ' сourse)';
        }
    oneUser.yearsAndCurse = oneUser.studyStart + ' - ' + (oneUser.dateOfIssue) + curse;
  };


  // Sorting
  copyListData = copyListData.sort(function(a, b) {
    let sort = a[sortColumnFlag] < b[sortColumnFlag];
    if (sortDirFlag === false) {
      sort = a[sortColumnFlag] > b[sortColumnFlag];
    }
      if (sort) return -1;
    });

  // Filtration
  if ($fullNameFilter.value.trim() !== "") {
    copyListData = copyListData.filter(function(oneUser) {
      if (oneUser.fullName.includes($fullNameFilter.value)) {return true};
        // If true - the element is added to the result and the iteration continues
        // If nothing is found, an empty array is returned.
    });
  };
  if ($facultyFilter.value.trim() !== "") {
    copyListData = copyListData.filter(function(oneUser) {
      if (oneUser.faculty.includes($facultyFilter.value)) {return true};
        // If true - the element is added to the result and the iteration continues
        // If nothing is found, an empty array is returned.
    });
  };
  if ($studyStartFilter.value.trim() !== "") {
    copyListData = copyListData.filter(function(oneUser) {
      if (oneUser.studyStart.includes($studyStartFilter.value)) {return true};
        // If true - the element is added to the result and the iteration continues
        // If nothing is found, an empty array is returned.
    });
  };
  if ($graduateYearFilter.value.trim() !== "") {
    copyListData = copyListData.filter(function(oneUser) {
      if (String(oneUser.dateOfIssue).includes($graduateYearFilter.value)) {return true};
        // If true - the element is added to the result and the iteration continues
        // If nothing is found, an empty array is returned.
    });
  };
  // Rendering
  for (const oneUser of copyListData) {
    const $newTr = createUserTr(oneUser);
    $tableBody.append($newTr);
  };
};
render()

// Addition
$addForm.addEventListener('submit', async function formInput(event) {
  event.preventDefault();
  // Validation

  if ($surnameInput.value.trim() == '') {
    $formValid.textContent ='Surname is not entered';
    return
  };
  if ($nameInput.value.trim() == '') {
    $formValid.textContent ='Name not entered';
    return
  };
  if ($facultyInput.value.trim() == '') {
    $formValid.textContent ='Faculty not entered';
    return
  };
  if ($birthdayInput.value.trim() == '') {
    $formValid.textContent ='Date of birth not specified';
    return
  };
  if ($birthdayInput.valueAsDate < (new Date(1900, 0, 1)) || $birthdayInput.valueAsDate > (new Date())) {
    $formValid.textContent ='Incorrect date of birth';
    return
  };
  if ($studyStartInput.value.trim() == '') {
    $formValid.textContent ='Start date not specified';
    return
  };
  if (parseInt($studyStartInput.value) < Number(new Date(2000, 0, 1).getFullYear()) || parseInt($studyStartInput.value) > Number(new Date().getFullYear())) {
    $formValid.textContent ='Wrong start year';
    return
  };
  //Adding to array
  const response = await fetch('http://localhost:3000/api/students', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      surname: $surnameInput.value.trim(),
      name: $nameInput.value.trim(),
      lastname: $middlenameInput.value.trim(),
      birthday: $birthdayInput.valueAsDate,
      studyStart: parseInt($studyStartInput.value),
      faculty: $facultyInput.value.trim()
      })
    });
  let listData = await response.json();

  render()

  event.target.reset();
});

let sortColumnFlag = 'fullName';
    sortDirFlag = true;
// Sorting clicks
$sortFullNameBtn.addEventListener('click', function() {
  sortColumnFlag = 'fullName';
  sortDirFlag = !sortDirFlag;
  render();
});
$sortFacultyBtn.addEventListener('click', function() {
  sortColumnFlag = 'faculty';
  sortDirFlag = !sortDirFlag;
  render();
});
$sortDbAgeBtn.addEventListener('click', function() {
  sortColumnFlag = 'age';
  sortDirFlag = !sortDirFlag;
  render();
});
$sortYearsAndCurseBtn.addEventListener('click', function() {
  sortColumnFlag = 'yearsAndCurse';
  sortDirFlag = !sortDirFlag;
  render();
});

// Filter
// Addition
$formFilter.addEventListener('submit', function(event) {
  event.preventDefault();
});

$fullNameFilter.addEventListener('input', function() {
  render();
});
$facultyFilter.addEventListener('input', function() {
  render();
});
$studyStartFilter.addEventListener('input', function() {
  render();
});
$graduateYearFilter.addEventListener('input', function() {
  render();
});
