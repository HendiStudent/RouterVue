<template>
  <section class="page-content">
    <h2>Jasa Terkait Kelapa Sawit</h2>
    <p>
      Kami menyediakan layanan jasa konsultasi, pengolahan, dan distribusi produk kelapa sawit.
      Tim profesional kami siap membantu Anda dari budidaya hingga pemasaran produk.
    </p>

    <!-- Form Tambah Penjasa -->
    <h3 class="section-subtitle">Tambah Penjasa Baru</h3>
    <form @submit.prevent="addProvider" class="add-provider-form">
      <input v-model="newProvider.name" placeholder="Nama Penjasa" required />
      <input v-model="newProvider.wa" placeholder="No WA (628xxx)" required />
      <input type="file" @change="handlePhotoUpload" required />
      <button type="submit">Tambah Penjasa</button>
    </form>

    <h3 class="section-subtitle">Daftar Penjasa Sawit</h3>
    <div class="providers-container">
      <div class="provider-card" v-for="(provider, index) in providers" :key="provider.id">
        <img :src="provider.photo" :alt="provider.name" class="provider-photo" />

        <div v-if="!provider.editing">
          <p class="provider-name">{{ provider.name }}</p>
          <p>No WA: {{ provider.wa }}</p>
        </div>

        <div v-else>
          <input v-model="provider.name" placeholder="Nama Penjasa" />
          <input v-model="provider.wa" placeholder="No WA" />
          <input v-model="provider.photo" placeholder="URL Foto" />
        </div>

        <!-- Form pemesanan jasa -->
        <form @submit.prevent="submitRequest(provider, index)">
          <input v-model="userForms[index].nama" placeholder="Nama Anda" required />
          <input v-model="userForms[index].nohp" placeholder="No HP Anda" required />
          <input v-model="userForms[index].alamatKebun" placeholder="Alamat Kebun" required />
          <input v-model="userForms[index].jenisPekerjaan" placeholder="Jenis Pekerjaan" required />
          <button type="submit">Pesan Jasa Ini</button>
        </form>

        <a :href="`https://wa.me/qr/WKABAYCF4VWGH1 `" target="083197506424">
          Hubungi via WA
        </a>

        <!-- Tombol Edit & Delete -->
        <div class="provider-actions">
          <button @click="toggleEdit(provider)">{{ provider.editing ? 'Simpan' : 'Edit' }}</button>
          <button @click="deleteProvider(provider.id)">Delete</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      providers: [],
      userForms: [],
      newProvider: {
        name: '',
        wa: ''
      },
      photoFile: null
    };
  },
  mounted() {
    this.getProviders();
  },
  methods: {
    async getProviders() {
      try {
        const res = await axios.get('http://localhost:3001/providers');
        this.providers = res.data.map(p => ({ ...p, editing: false }));
        this.userForms = this.providers.map(() => ({
          nama: '',
          nohp: '',
          alamatKebun: '',
          jenisPekerjaan: ''
        }));
      } catch (err) {
        console.error('Error fetching providers:', err);
      }
    },

    handlePhotoUpload(event) {
      this.photoFile = event.target.files[0];
    },

    async addProvider() {
      if (!this.photoFile) {
        alert('Mohon upload foto penjasa.');
        return;
      }

      try {
        // Upload foto ke Cloudinary
        const formData = new FormData();
        formData.append('file', this.photoFile);
        formData.append('upload_preset', 'unsigned_preset_sawit');

        const cloudinaryRes = await axios.post(
          'https://api.cloudinary.com/v1_1/duqgyhzj1/image/upload',
          formData
        );

        const photoUrl = cloudinaryRes.data.secure_url;

        const newP = {
          name: this.newProvider.name,
          wa: this.newProvider.wa,
          photo: photoUrl
        };

        // POST ke json-server
        const res = await axios.post('http://localhost:3001/providers', newP);
        const createdProvider = res.data;

        this.providers.push({ ...createdProvider, editing: false });
        this.userForms.push({
          nama: '',
          nohp: '',
          alamatKebun: '',
          jenisPekerjaan: ''
        });

        this.newProvider = { name: '', wa: '' };
        this.photoFile = null;
        alert('Penjasa berhasil ditambahkan!');
      } catch (err) {
        console.error('Error adding provider:', err);
        alert('Gagal menambahkan penjasa.');
      }
    },

    toggleEdit(provider) {
      if (provider.editing) {
        // Simpan update
        axios.put(`http://localhost:3001/providers/${provider.id}`, provider)
          .then(() => alert('Penjasa berhasil diupdate!'))
          .catch(err => {
            console.error('Error updating provider:', err);
            alert('Gagal mengupdate penjasa.');
          });
      }
      provider.editing = !provider.editing;
    },

    async deleteProvider(id) {
      if (confirm('Yakin ingin menghapus penjasa ini?')) {
        try {
          await axios.delete(`http://localhost:3001/providers/${id}`);
          this.providers = this.providers.filter(p => p.id !== id);
          alert('Penjasa berhasil dihapus!');
        } catch (err) {
          console.error('Error deleting provider:', err);
          alert('Gagal menghapus penjasa.');
        }
      }
    },

    async submitRequest(provider, index) {
      const payload = {
        nama: this.userForms[index].nama,
        nohp: this.userForms[index].nohp,
        alamatKebun: this.userForms[index].alamatKebun,
        jenisPekerjaan: this.userForms[index].jenisPekerjaan,
        providerId: provider.id,
        providerName: provider.name
      };
      try {
        await axios.post('http://localhost:3001/detailpemesanjasa', payload);
        alert('Permintaan jasa berhasil dikirim!');
        this.userForms[index] = { nama: '', nohp: '', alamatKebun: '', jenisPekerjaan: '' };
      } catch (err) {
        console.error('Error submitting request:', err);
        alert('Gagal mengirim permintaan jasa.');
      }
    }
  }
};
</script>

<style scoped>
/* Use the same CSS variables as other components for consistency */
:root {
  --bg-color: #ffffff;
  --text-color: #333333;
  --navbar-bg: linear-gradient(135deg, #2d5a27 0%, #4a7c59 50%, #2d5a27 100%);
  --accent-color: #ff6b35;
  --card-bg: #f9f9f9;
  --border-color: rgba(0, 0, 0, 0.1);
  --shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.dark {
  --bg-color: #121212;
  --text-color: #e0e0e0;
  --navbar-bg: linear-gradient(135deg, #1a2e1a 0%, #2d4a2d 50%, #1a2e1a 100%);
  --accent-color: #ff8c66;
  --card-bg: #1e1e1e;
  --border-color: rgba(255, 255, 255, 0.1);
  --shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

.page-content {
  max-width: 1400px;
  margin: 40px auto;
  padding: 0 20px;
  color: var(--text-color);
  background-color: var(--bg-color);
  min-height: calc(100vh - 70px); /* Adjust for navbar height */
}

h2 {
  font-size: 2.4rem;
  font-weight: 700;
  color: var(--accent-color);
  text-align: center;
  margin-bottom: 20px;
  letter-spacing: -0.5px;
  text-transform: uppercase;
}

.section-subtitle {
  font-size: 1.8rem;
  font-weight: 600;
  color: var(--accent-color);
  margin: 40px 0 20px;
  text-align: left;
}

p {
  font-size: 1.15rem;
  line-height: 1.7;
  max-width: 800px;
  margin: 0 auto 30px;
  text-align: center;
}

.add-provider-form {
  max-width: 500px;
  margin: 0 auto 40px;
  padding: 20px;
  background: var(--card-bg);
  border-radius: 12px;
  box-shadow: var(--shadow);
}

.add-provider-form input,
.add-provider-form input[type="file"] {
  width: 100%;
  padding: 12px;
  margin: 10px 0;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  font-size: 1rem;
  background: var(--bg-color);
  color: var(--text-color);
  transition: border-color 0.3s ease;
}

.add-provider-form input:focus {
  border-color: var(--accent-color);
  outline: none;
}

.add-provider-form button {
  width: 100%;
  padding: 12px;
  background: linear-gradient(135deg, #ff6b35, #f7931e);
  color: white;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.add-provider-form button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(255, 107, 53, 0.4);
}

.providers-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.provider-card {
  background: var(--card-bg);
  border-radius: 12px;
  padding: 20px;
  box-shadow: var(--shadow);
  text-align: center;
  transition: transform 0.3s ease;
}

.provider-card:hover {
  transform: translateY(-5px);
}

.provider-photo {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid var(--border-color);
  margin-bottom: 15px;
  transition: transform 0.3s ease;
}

.provider-photo:hover {
  transform: scale(1.05);
}

.provider-name {
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--text-color);
  margin: 10px 0 5px;
}

.provider-card p {
  font-size: 1rem;
  color: var(--text-color);
  margin: 5px 0;
}

.provider-card form input {
  width: 100%;
  padding: 10px;
  margin: 8px 0;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  font-size: 0.95rem;
  background: var(--bg-color);
  color: var(--text-color);
  transition: border-color 0.3s ease;
}

.provider-card form input:focus {
  border-color: var(--accent-color);
  outline: none;
}

.provider-card form button {
  width: 100%;
  padding: 10px;
  background: linear-gradient(135deg, #ff6b35, #f7931e);
  color: white;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.95rem;
  margin-top: 10px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.provider-card form button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(255, 107, 53, 0.4);
}

.provider-card a {
  display: inline-block;
  margin: 10px 0;
  padding: 10px 20px;
  background: #25D366; /* WhatsApp green */
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.95rem;
  transition: background 0.3s ease, transform 0.3s ease;
}

.provider-card a:hover {
  background: #1EBE57;
  transform: translateY(-2px);
}

.provider-actions {
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-top: 15px;
}

.provider-actions button {
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: transform 0.3s ease, gray 0.3s ease;
}

.provider-actions button:first-child {
  background: var(--accent-color);
  color: rgb(221, 203, 203);
  border:#f7931e;
}

.provider-actions button:first-child:hover {
  background: #f7931e;
  transform: translateY(-2px);
}

.provider-actions button:last-child {
  background: transparent;
  color: #ff4444;
  border: 1px solid #ff4444;
}

.provider-actions button:last-child:hover {
  background: rgba(255, 68, 68, 0.1);
  transform: translateY(-2px);
}

/* Responsive Design */
@media (max-width: 768px) {
  .page-content {
    margin: 20px auto;
    padding: 0 15px;
  }

  h2 {
    font-size: 2rem;
  }

  .section-subtitle {
    font-size: 1.5rem;
  }

  .providers-container {
    grid-template-columns: 1fr;
  }

  .provider-card {
    padding: 15px;
  }

  .provider-photo {
    width: 100px;
    height: 100px;
  }
}

@media (max-width: 480px) {
  h2 {
    font-size: 1.6rem;
  }

  .section-subtitle {
    font-size: 1.3rem;
  }

  .add-provider-form,
  .provider-card form input,
  .provider-card form button,
  .provider-card a,
  .provider-actions button {
    font-size: 0.85rem;
    padding: 8px;
  }

  .provider-photo {
    width: 80px;
    height: 80px;
  }
}

/* Accessibility */
input:focus,
button:focus,
a:focus {
  outline: 2px solid var(--accent-color);
  outline-offset: 2px;
}

/* Smooth transitions for theme changes */
* {
  transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
}
</style>