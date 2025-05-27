<template>
  <section class="page-content">
    <h2>Kontak Kami</h2>
    <p>Jika Anda ingin menghubungi kami, silakan isi formulir di bawah ini atau gunakan informasi kontak berikut:</p>

    <div class="contact-info">
      <p><strong>Alamat:</strong> Jl. Sawit Raya No. 123, Jakarta, Indonesia</p>
      <p><strong>Telepon:</strong> +62 812 3456 7890</p>
      <p><strong>Email:</strong> info@sawitkita.co.id</p>
    </div>

    <form class="contact-form" @submit.prevent="submitForm">
      <label for="name">Nama Lengkap</label>
      <input type="text" id="name" v-model="form.name" required />

      <label for="email">Email</label>
      <input type="email" id="email" v-model="form.email" required />

      <label for="message">Pesan</label>
      <textarea id="message" rows="5" v-model="form.message" required></textarea>

      <button type="submit">Kirim Pesan</button>
    </form>

    <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
  </section>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const form = ref({
      name: '',
      email: '',
      message: ''
    })

    const successMessage = ref('')

    function submitForm() {
      // Simulasi submit form
      successMessage.value = `Terima kasih, ${form.value.name}. Pesan Anda sudah terkirim!`
      form.value.name = ''
      form.value.email = ''
      form.value.message = ''
    }

    return {
      form,
      successMessage,
      submitForm
    }
  }
}
</script>

<style scoped>
.page-content {
  max-width: 720px;
  margin: 50px auto;
  padding: 0 20px;
  color: var(--text-color);
  line-height: 1.6;
}

h2 {
  color: var(--nav-bg);
  font-size: 2.4rem;
  font-weight: 700;
  margin-bottom: 20px;
  letter-spacing: 0.04em;
}

.contact-info p {
  font-size: 1.1rem;
  margin-bottom: 12px;
  font-weight: 500;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 25px;
}

label {
  font-weight: 600;
  font-size: 1rem;
}

input,
textarea {
  padding: 10px 14px;
  font-size: 1rem;
  border: 1.5px solid var(--nav-bg);
  border-radius: 8px;
  outline-offset: 2px;
  transition: border-color 0.3s ease;
  background-color: var(--bg-color);
  color: var(--text-color);
}

input:focus,
textarea:focus {
  border-color: #fbc02d;
}

button {
  background-color: var(--nav-bg);
  border: none;
  color: white;
  padding: 12px 20px;
  font-weight: 700;
  font-size: 1.1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  user-select: none;
}

button:hover {
  background-color: #f9a825;
}

.success-message {
  margin-top: 20px;
  font-weight: 600;
  color: #4caf50;
  font-size: 1.1rem;
}
</style>
