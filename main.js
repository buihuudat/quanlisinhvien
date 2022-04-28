const form = document.forms['studentForm'];
const table = document.getElementById('table');

const setLocal = e => localStorage.setItem('student', JSON.stringify(e));
const GetLocal = JSON.parse(localStorage.getItem('student'));

const handleCheckDuplicate = (value) => new Set(value).size !== value.length;

const variableData = (data) => {
  if (data.msv == 0) {
    Swal.fire({
      icon: 'warning',
      title: 'Oops...',
      text: 'Mã sinh viên không được để trống!',
    })
  } else if (data.name == 0) {
    Swal.fire({
      icon: 'warning',
      title: 'Name error...',
      text: 'Tên sinh viên không được để trống!',
    })
  } else if (data.birthday == 0) {
    Swal.fire({
      icon: 'warning',
      title: 'Birthday error...',
      text: 'Bạn chưa nhập ngày sinh!',
    })
  } else if (data.phone == 0) {
    Swal.fire({
      icon: 'warning',
      title: 'Phone error...',
      text: 'Bạn chưa nhập số điện thoại!',
    })
  } else if (handleCheckDuplicate(data.msv) == true) {
    Swal.fire({
      icon: 'warning',
      title: 'Oops...',
      text: 'Mã sinh viên đã tồn tại!',
    })
  } else return 1;
}

let datas = [];
const formData = () => {
  const student = {
    msv: form.msv.value,
    name: form.name.value,
    birthday: form.birthday.value,
    sex: form.sex.value,
    phone: form.phone.value,
  }
  if(variableData(student)) {
    datas.push(student)
    setLocal(datas);
  }
  // console.log(datas)
  // console.log(GetLocal)
  return datas;
}

const showTable = () => {
  let html = '';
  GetLocal.forEach(e => {
    html += `<tr>
      <td>${e.msv}</td>
      <td>${e.name}</td>
      <td>${e.birthday}</td>
      <td>${e.sex == 'male' ? 'Nam' : 'Nữ'}</td>
      <td>${e.phone}</td>
      </tr>`;
    });
    document.getElementById('showData').innerHTML = html;
}

const handleSubmit = () => {
  if (GetLocal !== null) {
    Swal.fire({
      title: 'Successful!!',
      text: 'Dữ liệu đã được thêm vào danh sách!',
      icon: 'success',
    })
    table.hidden = false;
  }
  formData();
  showTable();
}

GetLocal ? table.hidden = false || showTable() : 0;

document.getElementById('form').addEventListener('submit', e => {
  // e.preventDefault();
  handleSubmit();
})