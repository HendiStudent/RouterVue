<template>
  <section class="page-content">
    <h2>Jasa Terkait Kelapa Sawit</h2>
    <p>
      Kami menyediakan layanan jasa konsultasi, pengolahan, dan distribusi produk kelapa sawit.
      Tim profesional kami siap membantu Anda dari budidaya hingga pemasaran produk.
    </p>
    <ul class="services-list">
      <li>Konsultasi budidaya sawit berkelanjutan</li>
      <li>Pengolahan dan pemurnian minyak sawit</li>
      <li>Distribusi dan logistik produk sawit</li>
      <li>Pelatihan dan edukasi petani sawit</li>
    </ul>

    <h3 class="section-subtitle">Daftar Penjasa Sawit</h3>
    <div class="providers-container">
      <div class="provider-card" v-for="(provider, index) in providers" :key="index">
        <img :src="provider.photo" :alt="provider.name" class="provider-photo" />
        <p class="provider-name">{{ provider.name }}</p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      providers: [
        {
          name: 'Andi Prasetyo',
          photo: 'https://via.placeholder.com/100x100?text=Andi'
        },
        {
          name: 'Siti Rahmawati',
          photo: 'https://via.placeholder.com/100x100?text=Siti',
        },
        {
          name: 'Budi Santosa',
          photo: 'https://via.placeholder.com/100x100?text=Budi'
        },
        {
          name: 'Lina Marlina',
          photo: 'https://via.placeholder.com/100x100?text=Lina'
        }
      ]
    };
  }
};
</script>

<style scoped>
.page-content {
  max-width: 720px;
  margin: 50px auto;
  padding: 0 20px;
  color: var(--text-color);
  line-height: 1.7;
}

h2 {
  color: var(--nav-bg);
  font-size: 2.4rem;
  font-weight: 700;
  margin-bottom: 20px;
  letter-spacing: 0.04em;
}

.section-subtitle {
  font-size: 1.5rem;
  margin-top: 40px;
  margin-bottom: 20px;
  color: var(--nav-bg);
}

p {
  font-size: 1.15rem;
  margin-bottom: 18px;
  font-weight: 400;
}

.services-list {
  list-style: inside circle;
  font-size: 1.15rem;
  font-weight: 400;
  padding-left: 0;
}

.services-list li {
  margin-bottom: 14px;
}

.providers-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 20px;
  margin-top: 10px;
}

.provider-card {
  text-align: center;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #f9f9f9;
}

.provider-photo {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 10px;
}

.provider-name {
  font-weight: 600;
  color: var(--text-color);
}
</style>
