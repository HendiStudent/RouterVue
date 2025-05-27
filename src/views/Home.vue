<template>
  <section class="home">
    <h1>SAWIT KITA</h1>
    <img src="../assets/logo.png" alt="Sawit Kita Logo" class="logo" />
    <h1>Selamat Datang di Sawit Kita</h1>
    <p>
      Platform informasi dan transaksi kelapa sawit terlengkap di Indonesia. Temukan berita terbaru,
      jual beli, dan jasa terkait kelapa sawit di sini.
    </p>
    <p>  
      Website resmi yang membahas segala hal tentang kelapa sawit, mulai dari sejarah, manfaat,
      produksi, hingga jual beli dan jasa terkait kelapa sawit.
    </p>
  </section>
</template>

<style scoped>
/* @import "tailwindcss"; */
.home {
  margin: 60px auto;
  max-width: 700px;
  padding: 0 20px;
  text-align: center;
}

.logo {
  width: 160px;
  margin-bottom: 25px;
  filter: drop-shadow(0 0 3px rgba(0, 0, 0, 0.15));
}

h1 {
  color: var(--nav-bg);
  font-weight: 700;
  font-size: 2.8rem;
  margin-bottom: 20px;
  letter-spacing: 0.05em;
}

p {
  font-size: 1.2rem;
  line-height: 1.7;
  color: var(--text-color);
  max-width: 90%;
  margin: 0 auto;
  font-weight: 400;
}
</style>
