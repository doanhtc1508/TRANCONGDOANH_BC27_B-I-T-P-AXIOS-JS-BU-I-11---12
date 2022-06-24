// ======DOM======
document
  .getElementById("btnThemNguoiDung")
  .addEventListener("click", showAddModal);
function showAddModal() {
  // Thay đổi text của modal heading
  document.querySelector(".modal-title").innerHTML = "Thêm người dùng";
  document.querySelector(".modal-footer").innerHTML = `
    <button
      class="btn btn-primary"
      data-type="add"
    >
      Thêm
    </button>
    <button
      class="btn btn-secondary"
      data-toggle="modal"
      data-target="#myModal"
    >
      Huỷ
    </button>
  `;
  resetForm();
  document.getElementById("TaiKhoan").disabled = false;
}

// Uỷ quyền lắng nghe event của các button từ thẻ .modal-footer
document.querySelector(".modal-footer").addEventListener("click", handleSubmit);
// Các hàm callback được gọi tới khi event được kích hoạt đồng thời nhận được 1 tham số là đối tượng Event
function handleSubmit(event) {
  var type = event.target.getAttribute("data-type");

  switch (type) {
    case "add":
      addUser();
      break;
    case "chinhSua":
      updateUser();
      break;
    default:
      break;
  }
}

// Uỷ quyền lắng nghe tất cả event của button Xoá và Cập nhật trong table cho tbody
document
  .getElementById("tblDanhSachNguoiDung")
  .addEventListener("click", handleUserAction);

function handleUserAction(event) {
  // Loại button (delete || update)
  var type = event.target.getAttribute("data-type");
  // Id của người dùng
  var id = event.target.getAttribute("data-id");

  switch (type) {
    case "delete":
      deleteUser(id);
      break;
    case "update":
      {
        // Cập nhật giao diện cho modal và call API get thông tin của người dùng và fill lên form
        showUpdateModal(id);
      }
      break;

    default:
      break;
  }
}
