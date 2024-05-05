//mendefinisikan fungsi
let submenu = document.getElementById("submenu");

function toggleMenu() {
  submenu.classList.toggle("open-menu");
}
//menambahkan event listener
document.querySelector("#button-create").addEventListener("click", function () {
  document.querySelector(".popup").classList.add("active");
});
//menambahkan event listener
document
  .querySelector(".popup .close-btn")
  .addEventListener("click", function () {
    document.querySelector(".popup").classList.remove("active");
  });
//menambahkan event listener
document
  .getElementById("close-btn-edit")
  .addEventListener("click", function () {
    document.querySelector("#edit").classList.remove("active");
  });
//menambahkan event listener
document
  .querySelector("#button-create-submit")
  .addEventListener("click", function () {
    document.querySelector(".popup").classList.remove("active");
  });
//menambil nilai dari elemen
async function createItem() {
  let title = document.getElementById("title").value;
  let subtitle = document.getElementById("subtitle").value;
  let titleColor = document.getElementById("title-color").value;
  let due = document.getElementById("due").value;
  let dateColor = document.getElementById("date-color").value;
  let description = document.getElementById("description").value;
  let urgent = document.getElementById("urgent").checked;
  const categoryInputs = document.querySelectorAll('input[name="category"]');

  // Variabel untuk menyimpan nilai yang dipilih
  let category = null;

  // Iterasi melalui setiap elemen input
  categoryInputs.forEach(input => {
    // Periksa apakah elemen input terceklis
    if (input.checked) {
      // Jika diceklis, simpan nilai value-nya
      category = input.value;
    }
  });

//membuat dan menyimpan kedalam 'data'
  const data = {
    title: title,
    subtitle: subtitle,
    titleBg: titleColor,
    duedate: due,
    urgent: urgent,
    description: description,
    dateColor: dateColor,
    category: category
  };
//mendapatkan nilai cookie
  const id = getCookie("id");
//membuat objek headers baru 
  const myHeaders = new Headers();
  //menambahkan header ke objek
  myHeaders.append("Content-Type", "application/json");
//mengubah menjadi string json
  const raw = JSON.stringify(data);

  const requestOptions = {
    method: "PUT",// Menentukan metode permintaan sebagai PUT
    headers: myHeaders,//Menentukan header yang akan digunakan untuk permintaan
    body: raw,// Menentukan data yang akan dikirim dalam permintaan, dalam hal ini adalah data yang telah diubah menjadi string JSON
    redirect: "follow",// Menentukan bagaimana browser harus menangani pengalihan setelah permintaan selesai
  };

  fetch(`/api/todos/${id}`, requestOptions)
    .then((response) => {
      alert("success create todo");// Menampilkan pesan sukses kepada pengguna
      window.location.reload();// Menyegarkan halaman setelah berhasil membuat todo
    })
    .then((result) => console.log(result))// Menampilkan hasil (jika ada) dari permintaan
    .catch((error) => console.error(error));// Menangani kesalahan jika permintaan gagal
}
// Menyelesaikan item todo dengan ID tertentu
function doneItem(id) {
  const idUser = getCookie("id");// Mendapatkan ID pengguna dari cookie
  const myHeaders = new Headers();// Persiapan header
  myHeaders.append("Content-Type", "application/json");// Persiapan data JSON
// Persiapan data JSON untuk menandai item todo sebagai selesai
  const raw = JSON.stringify({
    todoId: id,
    status: true,
  });
// Cetak data JSON yang telah disiapkan
  console.log(raw);
// Opsi untuk permintaan PUT
  const requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };
// Melakukan permintaan PUT untuk menandai item todo sebagai selesai
  fetch(`/api/todos/${idUser}/status`, requestOptions)
    .then((result) => {
      alert("Berhasil menyelesaikan todo");
      window.location.reload();
    })
    .catch((error) => {
      alert(error.message);
    });
}
// Fungsi untuk mengambil item-item todo berdasarkan kriteria tertentu
async function getItem(
  title = "",
  status = null,
  start_date = null,
  end_date = null
) {
  // Mendapatkan ID pengguna dari cookie
  const id = getCookie("id");

  // Panggil API dengan ID
  const response = await fetch(`/api/todos/${id}`);


  // Periksa status respons
  if (response.ok) {
    // Respons berhasil
    const todoResponse = await response.json();

    // Hapus semua todos yang ditampilkan sebelumnya
    document.getElementById("todo-border-box").innerHTML = "";
    document.getElementById("todo-border-complete").innerHTML = "";
    document.getElementById('name_user').textContent = todoResponse.name;

// Mengiterasi melalui daftar todoResponse.todos
    for (const todo of todoResponse.todos) {
      // Membuat kartu todo menggunakan data dari objek todo
      const cardTodo = card(
        todo.urgent,
        todo.titleBg,
        todo.title,
        todo.subtitle,
        todo.duedate,
        todo.dateColor,
        todo.description,
        todo.id,
        todo.status
      );

      // Filter based on title, urgent status, and date range
      const isTitleMatch =
        title === "" || todo.title.toLowerCase().includes(title.toLowerCase());
      const isStatusMatch = status === null || todo.urgent === status;
      const isDateInRange =
        start_date !== null && end_date !== null
          ? todo.duedate >= start_date && todo.duedate <= end_date
          : true;

      if (isTitleMatch && isStatusMatch && isDateInRange) {
        // Tampilkan item jika cocok dengan kriteria
        if (!todo.status) {
          document.getElementById("todo-border-box").appendChild(cardTodo);
        } else {
          document.getElementById("todo-border-complete").appendChild(cardTodo);
        }
      }
    }
  } else {
    // Respons gagal
    const error = await response.text();
    alert(error);
  }
}
// Fungsi untuk mencari item todo berdasarkan kata kunci
async function cari() {
  let keyword = document.getElementById("keyword").value;
  getItem(keyword);
}
// Fungsi untuk menyaring item todo berdasarkan rentang tanggal
function filterByDate() {
  var start_date = document.getElementById("start_date").value;
  var end_date = document.getElementById("end_date").value;
  if (start_date == "") {
    alert("pilih start date");
  } else {
    getItem("", null, start_date, end_date);
  }
}
// Fungsi untuk menyaring item todo berdasarkan status urgent
function filterUrgent() {
  let checkBox = document.getElementById("urgent_filter");
  let isChecked = checkBox.checked;
  if(isChecked){
    getItem("", isChecked);
  }else{
    getItem("");
  }
}
// Fungsi untuk menghapus item todo dengan ID tertentu
async function deleteItem(id) {
  const idUser = getCookie("id");
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
// Persiapan data JSON untuk permintaan penghapusan item todo
  const raw = JSON.stringify({
    todoId: id,
  });

  console.log(raw);
// Opsi untuk permintaan DELETE
  const requestOptions = {
    method: "delete",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };
// Melakukan permintaan DELETE untuk menghapus item todo
  fetch(`/api/todos/${idUser}/delete`, requestOptions)
    .then((result) => {
      alert("Berhasil hapus todo");
      window.location.reload();
    })// Menangani kesalahan jika permintaan gagal
    .catch((error) => {
      alert(error.message);
    });
}
// Fungsi untuk memperbarui item todo
async function update() {
  let title = document.getElementById("title_edit").value;
  let subtitle = document.getElementById("subtitle_edit").value;
  let description = document.getElementById("description_edit").value;
  let idTodo = document.getElementById("id_todo").value;
// Mendapatkan ID pengguna dari cookie
  const idUser = getCookie("id");
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
// Persiapan data JSON untuk permintaan pembaruan item todo
  const raw = JSON.stringify({
    todoId: idTodo,
    title: title,
    subtitle: subtitle,
    description: description,
  });

  console.log(raw);
// Opsi untuk permintaan PUT
  const requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };
// Melakukan permintaan PUT untuk memperbarui item todo
  fetch(`/api/todos/${idUser}/update`, requestOptions)
    .then((result) => {
      alert("Berhasil update todo");
      window.location.reload();
    })
    .catch((error) => {
      alert(error.message);// Menampilkan pesan kesalahan jika permintaan gagal
    });
}
// Fungsi untuk menampilkan formulir pengeditan item todo
async function edit(id) {
  var idUser = getCookie("id");
  document.querySelector("#edit").classList.add("active");
  const response = await fetch(`/api/todos/${idUser}`);
  if (response.ok) {
    const res = await response.json();
    let todos = res.todos;// Mencari todo dengan ID yang sesuai
    const foundTodo = todos.find((todo) => todo.id === id);
    // Mengisi formulir pengeditan dengan nilai-nilai dari todo yang ditemukan
    document.getElementById("title_edit").value = foundTodo.title;
    document.getElementById("subtitle_edit").value = foundTodo.subtitle;
    document.getElementById("description_edit").value = foundTodo.description;
    document.getElementById("id_todo").value = foundTodo.id;
  } else {
    alert("please login again");// Menampilkan pesan jika terjadi kesalahan saat mengambil data todo

    window.location = "/";// Mengarahkan pengguna ke halaman login jika terjadi kesalahan
  }
}
// Fungsi untuk membuat kartu todo
function card(
  urgent,
  titleColor,
  title,
  subtitle,
  due,
  dateColor,
  description,
  id,
  status,
  category
) {
  // Membuat elemen div untuk kartu todo
  let wrapper = document.createElement("div");
  wrapper.classList.add("card");
  wrapper.classList.add("card-wrapper");
  wrapper.style.width = "18rem";
  wrapper.style.borderRadius = "20px";
  wrapper.setAttribute("id", "card-wrapper-id");
// Memeriksa apakah todo memiliki status urgent
  console.log(urgent);
  if (urgent == true) {
    wrapper.style.backgroundColor = "#ffb2c5";
  }
// Membuat elemen div untuk bagian badan kartu
  let body = document.createElement("div");
  body.classList.add("card-body");
// Membuat elemen div untuk latar belakang judul kartu
  let cardTitle = document.createElement("div");
  cardTitle.classList.add("card-title-background");
  cardTitle.style.backgroundColor = titleColor;
// Membuat elemen h5 untuk judul kartu
  let h5 = document.createElement("h5");
  h5.classList.add("card-title");
  h5.textContent = title;
  h5.setAttribute("id", "card-title-value");

// Membuat elemen h6 untuk subjudul kartu
  let h6 = document.createElement("h6");
  h6.classList.add("card-subtitle");
  h6.classList.add("mb-2");
  h6.classList.add("text-body-secondary");
  h6.textContent = subtitle;
  h6.setAttribute("id", "card-subtitle");

  let buttonContent = document.createElement("div");
  buttonContent.classList.add("row");
  buttonContent.classList.add("container");
  buttonContent.classList.add("gap-2");
  buttonContent.classList.add("justify-content-between");
  //   buttonContent.classList.add("")

  if (status) {
    let button = document.createElement("button");
    button.textContent = "Delete";
    button.classList.add("btn");
    button.classList.add("btn-danger");
    // button.classList.add("button-done");
    button.classList.add("col-5");
    button.setAttribute("onclick", `deleteItem('${id}')`);
    button.setAttribute("id", "button-done");
    buttonContent.appendChild(button);
   
  } else {// Membuat elemen tombol untuk menyelesaikan todo
    let button = document.createElement("button");
    button.classList.add("btn");
    button.textContent = "Done";
    button.classList.add("btn-success");
    button.classList.add("button-done");
    button.style.widht = "100%";
    button.setAttribute("onclick", `doneItem('${id}')`);
    button.setAttribute("id", "button-done");
    buttonContent.appendChild(button);

// Membuat elemen tombol untuk mengedit todo
    let btnEdit = document.createElement("button");
    btnEdit.textContent = "Edit";
    btnEdit.classList.add("btn");
    btnEdit.classList.add("btn-primary");
    btnEdit.classList.add("col-5");
    btnEdit.setAttribute("onclick", `edit('${id}')`);
    btnEdit.setAttribute("id", "button-edit");
    buttonContent.appendChild(btnEdit);
  }
// Membuat elemen h6 untuk menampilkan tanggal jatuh tempo
  let h6p2 = document.createElement("h6");
  h6p2.classList.add("card-subtitle");
  h6p2.classList.add("mb-2");
  h6p2.classList.add("text-body-secondary");
  h6p2.classList.add("due-date");
  h6p2.style.backgroundColor = dateColor;
  h6p2.textContent = due;
  h6p2.setAttribute("id", "card-due");
// Membuat elemen p untuk menampilkan deskripsi todo
  let p = document.createElement("p");
  p.classList.add("card-text");
  p.textContent = description;
  p.setAttribute("id", "card-text-value");
  // Menambahkan elemen-elemen ke dalam wrapper
  wrapper.appendChild(body);
  body.append(cardTitle);
  cardTitle.append(h5);
  cardTitle.append(h6);
  body.append(h6p2);
  body.append(buttonContent);
  body.append(p);
  return wrapper;// Mengembalikan elemen wrapper yang telah dibuat
}
// Fungsi untuk mendapatkan nilai dari cookie berdasarkan nama cookie
function getCookie(cookieName) {
  const cookies = document.cookie.split(";");
  for (const cookie of cookies) {
    const [key, value] = cookie.trim().split("=");
    if (key === cookieName) {
      return value;// Mengembalikan nilai cookie
    }
  }
  return null; // Cookie not found
}








getItem();
