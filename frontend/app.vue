<script setup>
const config = 'http://localhost:3001/'

const account = ref({
  username: '',
  password: '',
  confirmpassword: ''
})

const accounts = ref([])

const product = ref({
  name: '',
  desc: '',
  img: '',
  price: ''
})

const products = ref([])

onMounted(async () => {
  try {
    const response = await fetch(config + 'products');
    const data = await response.json();
    products.value = data;
  } catch (error) {
    console.error('Error fetching products:', error);
  }
});

onMounted(async () => {
  try {
    const response = await fetch(config + 'accounts');
    const data = await response.json();
    accounts.value = data;
  } catch (error) {
    console.error('Error fetching products:', error);
  }
});

async function newaccount() {

  if (!(account.value.username && account.value.password && account.value.confirmpassword) || account.value.confirmpassword !== account.value.password) return alert('ผิดพลาด');

  const { data } = await useFetch(config + 'register', {
    method: "POST",
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      username: account.value.username,
      password: account.value.password,
    })
  })

  if (data.value) return alert('สำเร็จ')
  else return alert('ผิดพลาด')
}

async function newproduct() {

  if (product.value.name === '' || product.value.desc === '' || product.value.img === '' || product.value.price === '') return alert('ผิดพลาด')

  const { data } = await useFetch(config + 'product', {
    method: "POST",
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      name: product.value.name,
      desc: product.value.desc,
      img: product.value.img,
      price: product.value.price
    })
  })

  if (data.value) return alert('สำเร็จ')
  else return alert('ผิดพลาด')
}
</script>

<template>
  <div class="flex m-10">
    <div class="grid gap-10">
      <div class="grid gap-2">
        <h1
          class="text-2xl text-center font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-blue-400 to-purple-600">
          สมัครสมาชิก
        </h1>
        <input placeholder="ชื่อผู้ใช้"
          class="bg-white/20 text-white rounded-md p-2 outline-none transition-all hover:scale-105" type="text"
          v-model="account.username">
        <input placeholder="รหัสผ่าน"
          class="bg-white/20 text-white rounded-md p-2 outline-none transition-all hover:scale-105" type="password"
          v-model="account.password">
        <input placeholder="ยืนยันรหัสผ่าน"
          class="bg-white/20 text-white rounded-md p-2 outline-none transition-all hover:scale-105" type="password"
          v-model="account.confirmpassword">
        <button @click="newaccount"
          class="bg-gradient-to-br from-blue-400 to-purple-600 text-white font-semibold rounded-md p-1.5 outline-none transition-all hover:scale-105">สมัครสมาชิก</button>
      </div>

      <table class="table-auto text-white text-center">
        <thead>
          <tr>
            <th class="px-4 py-2">ชื่อผู้ใช้</th>
            <th class="px-4 py-2">รหัสผ่าน</th>
            <th class="px-4 py-2">แต้ม</th>
            <th class="px-4 py-2">เป็นแอดมินไหม?</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="account in accounts" :key="account.id">
            <td class="px-4 py-2">{{ account.username }}</td>
            <td class="px-4 py-2">{{ account.password }}</td>
            <td class="px-4 py-2">{{ account.point }}</td>
            <td class="px-4 py-2">{{ account.isadmin }}</td>
          </tr>
        </tbody>
      </table>

      <div class="grid gap-2">
        <h1
          class="text-2xl text-center font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-blue-400 to-purple-600">
          จัดการสินค้า
        </h1>
        <input placeholder="ชื่อ"
          class="bg-white/20 text-white rounded-md p-2 outline-none transition-all hover:scale-105" type="text"
          v-model="product.name">
        <input placeholder="รายละเอียด"
          class="bg-white/20 text-white rounded-md p-2 outline-none transition-all hover:scale-105" type="text"
          v-model="product.desc">
        <input placeholder="ลิ้งรูปภาพ"
          class="bg-white/20 text-white rounded-md p-2 outline-none transition-all hover:scale-105" type="text"
          v-model="product.img">
        <input placeholder="ราคา"
          class="bg-white/20 text-white rounded-md p-2 outline-none transition-all hover:scale-105" type="number"
          v-model="product.price">
        <button @click="newproduct"
          class="bg-gradient-to-br from-blue-400 to-purple-600 text-white font-semibold rounded-md p-1.5 outline-none transition-all hover:scale-105">เพิ่มสินค้า</button>
      </div>

      <table class="table-auto text-white text-center">
        <thead>
          <tr>
            <th class="px-4 py-2">ชื่อ</th>
            <th class="px-4 py-2">รายละเอียด</th>
            <th class="px-4 py-2">รูปภาพ</th>
            <th class="px-4 py-2">ราคา</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in products" :key="product.id">
            <td class="px-4 py-2">{{ product.name }}</td>
            <td class="px-4 py-2">{{ product.desc }}</td>
            <td class="px-4 py-2">
              <img :src="product.img" alt="Product Image" class="w-24 h-24 rounded-md">
            </td>
            <td class="px-4 py-2">{{ product.price }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Kanit:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

body {
  font-family: 'Kanit', sans-serif;
  background-color: rgb(32, 23, 32);
}

input[type=number]::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
</style>