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
    
  
  <div class="photo-gallery">
      <img src="../assets/kebun-sawit.jpg" alt="Kebun Kelapa Sawit" />
      <img src="../assets/buah-sawit.jpg" alt="Buah Kelapa Sawit" />
      <img src="../assets/produksi-miyak.jpg" alt="Produksi Minyak Sawit" />
    </div>
  </section>
</template>

<script>
export default {
  name: 'HomePage'
};

</script>

<style scoped>
/* Use the same CSS variables as the navbar and other components for consistency */
:root {
  --bg-color: #ffffff;
  --text-color: #333333;
  --navbar-bg: linear-gradient(135deg, #2d5a27 0%, #4a7c59 50%, #2d5a27 100%);
  --accent-color: #ff6b35;
  --card-bg: #f9f9f9;
  --border-color: rgba(0, 0, 0, 0.1);
  --shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}
.photo-gallery {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 30px;
}
.photo-gallery img {
  width: 300px;
  height: 200px;
  object-fit: cover;
  border-radius: 10px;
  box-shadow: var(--shadow);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.photo-gallery img:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 25px rgba(255, 107, 53, 0.4);
}

.home {
  max-width: 1400px;
  margin: 40px auto;
  padding: 40px 20px;
  text-align: center;
  background: var(--card-bg);
  border-radius: 12px;
  box-shadow: var(--shadow);
  color: var(--text-color);
  min-height: calc(100vh - 70px); /* Adjust for navbar height */
}

h1 {
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--accent-color);
  letter-spacing: -0.5px;
  margin: 20px 0;
  text-transform: uppercase;
}

h1:first-child {
  font-size: 3rem;
  background: var(--navbar-bg);
  
  -webkit-text-fill-color: transparent;
  margin-top: 0;
}

.logo {
  width: 150px;
  height: 150px;
  border-radius: 15px;
  border: 3px solid var(--border-color);
  margin: 20px auto;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.logo:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 25px rgba(255, 107, 53, 0.4);
}

p {
  font-size: 1.1rem;
  line-height: 1.6;
  color: var(--text-color);
  max-width: 800px;
  margin: 15px auto;
  padding: 0 20px;
}

p:first-of-type {
  font-weight: 600;
  font-size: 1.2rem;
}

/* Responsive Design */
@media (max-width: 768px) {
  .home {
    margin: 20px auto;
    padding: 20px 15px;
  }

  h1 {
    font-size: 2rem;
  }

  h1:first-child {
    font-size: 2.5rem;
  }

  .logo {
    width: 120px;
    height: 120px;
  }

  p {
    font-size: 1rem;
  }

  p:first-of-type {
    font-size: 1.1rem;
  }
}

@media (max-width: 480px) {
  h1 {
    font-size: 1.6rem;
  }

  h1:first-child {
    font-size: 2rem;
  }

  .logo {
    width: 100px;
    height: 100px;
  }

  p {
    font-size: 0.95rem;
  }

  p:first-of-type {
    font-size: 1rem;
  }
}

/* Accessibility */
h1:focus,
p:focus {
  outline: 2px solid var(--accent-color);
  outline-offset: 2px;
}

/* Smooth transitions for theme changes */
* {
  transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
}
</style>