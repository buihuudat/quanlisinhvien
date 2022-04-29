const form = document.forms['studentForm'];
const table = document.getElementById('table');

const setLocal = e => localStorage.setItem('student', JSON.stringify(e));

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
  } else return 1;
}

let datas = JSON.parse(localStorage.getItem('student')) || [];
let unique = [...new Set(datas.map(e => e.msv))];

const formData = () => {
  const student = {
    msv: form.msv.value,
    name: form.name.value,
    birthday: form.birthday.value,
    sex: form.sex.value,
    phone: form.phone.value,
  }
  
  datas.push(student);
  setLocal(datas);
  // return datas;
}

const showTable = () => {
  const GetLocal = JSON.parse(localStorage.getItem('student'));
  let html = '';
  GetLocal ? table.hidden = false : 0;
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
  formData();
  showTable();
}

window.localStorage.getItem('student') ?  table.hidden = true && showTable() : 0;

document.getElementById('form').addEventListener('submit', e => {
  e.preventDefault();
  handleSubmit();
})