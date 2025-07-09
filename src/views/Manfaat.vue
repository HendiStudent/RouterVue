<template>
  <section class="page-content">
    <h2>Manfaat Kelapa Sawit</h2>
    <ul class="benefits-list">
      <li class="benefit-item">
        <img src="../assets/nabati.jpg" alt="Minyak Nabati" class="benefit-image" />
        <div class="benefit-content">
          <h3>Minyak Nabati</h3>
          <p>Menyediakan minyak nabati yang penting untuk kebutuhan pangan dan industri.</p>
        </div>
      </li>
      <li class="benefit-item">
        <img src="../assets/lapangan-kerja.jpg" alt="Lapangan Kerja" class="benefit-image" />
        <div class="benefit-content">
          <h3>Lapangan Kerja</h3>
          <p>Menjadi sumber pendapatan dan lapangan pekerjaan bagi jutaan orang.</p>
        </div>
      </li>
      <li class="benefit-item">
        <img src="../assets/kosmetik.jpeg" alt="Produk Rumah Tangga" class="benefit-image" />
        <div class="benefit-content">
          <h3>Produk Rumah Tangga</h3>
          <p>Mendukung produk-produk rumah tangga seperti sabun, kosmetik, dan bahan bakar nabati.</p>
        </div>
      </li>
      <li class="benefit-item">
        <img src="../assets/rm-tangga.jpg" alt="Perekonomian Daerah" class="benefit-image" />
        <div class="benefit-content">
          <h3>Perekonomian Daerah</h3>
          <p>Meningkatkan perekonomian daerah penghasil sawit di Indonesia.</p>
        </div>
      </li>
      <li class="benefit-item">
        <img src="../assets/biodiesel.jpg" alt="Biodiesel" class="benefit-image" />
        <div class="benefit-content">
          <h3>Biodiesel</h3>
          <p>Berperan dalam pengembangan biodiesel sebagai energi terbarukan.</p>
        </div>
      </li>
      <li class="benefit-item">
        <img src="../assets/farmasi.jpg" alt="Farmasi dan Oleokimia" class="benefit-image" />
        <div class="benefit-content">
          <h3>Farmasi dan Oleokimia</h3>
          <p>Produk turunan sawit digunakan dalam industri farmasi dan oleokimia.</p>
        </div>
      </li>
    </ul>
  </section>
</template>

<style scoped>
/* Use the same CSS variables as other components for consistency */
:root {
  --bg-color: #ffffff;
  --text-color: #333333;
  --navbar-bg: linear-gradient(135deg, #2d5a27 0%, #4a7c59 50%, #2d5a27 100%);
  --accent-color: #ff6b35;
  --card-bg: #f9f9f9;
  --border-color: rgba(0, 0, 0, 0.1);
  --shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  --gradient-border: linear-gradient(135deg, #2d5a27, #4a7c59);
}

.dark {
  --bg-color: #121212;
  --text-color: #e0e0e0;
  --navbar-bg: linear-gradient(135deg, #1a2e1a 0%, #2d4a2d 50%, #1a2e1a 100%);
  --accent-color: #ff8c66;
  --card-bg: #1e1e1e;
  --border-color: rgba(255, 255, 255, 0.1);
  --shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  --gradient-border: linear-gradient(135deg, #1a2e1a, #2d4a2d);
}

.page-content {
  max-width: 1200px;
  margin: 40px auto;
  padding: 0 20px;
  background-color: var(--bg-color);
  color: var(--text-color);
  min-height: calc(100vh - 70px); /* Adjust for navbar height */
}

h2 {
  font-size: 2.4rem;
  font-weight: 700;
  color: var(--accent-color);
  text-align: center;
  margin-bottom: 40px;
  text-transform: uppercase;
  letter-spacing: -0.5px;
}

.benefits-list {
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.benefit-item {
  display: flex;
  flex-direction: column;
  background: var(--card-bg);
  border-radius: 12px;
  box-shadow: var(--shadow);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 2px solid transparent;
  background-clip: padding-box;
  position: relative;
}

.benefit-item::before {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: var(--gradient-border);
  border-radius: 12px;
  z-index: -1;
}

.benefit-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 30px rgba(255, 107, 53, 0.2);
}

.benefit-image {
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-bottom: 2px solid var(--border-color);
}

.benefit-content {
  padding: 20px;
  text-align: center;
}

.benefit-content h3 {
  font-size: 1.4rem;
  font-weight: 600;
  color: var(--text-color);
  margin-bottom: 10px;
}

.benefit-content p {
  font-size: 1.1rem;
  line-height: 1.6;
  color: var(--text-color);
  margin: 0;
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

  .benefits-list {
    grid-template-columns: 1fr;
  }

  .benefit-image {
    height: 160px;
  }

  .benefit-content h3 {
    font-size: 1.3rem;
  }

  .benefit-content p {
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  h2 {
    font-size: 1.6rem;
  }

  .benefit-image {
    height: 140px;
  }

  .benefit-content {
    padding: 15px;
  }

  .benefit-content h3 {
    font-size: 1.2rem;
  }

  .benefit-content p {
    font-size: 0.95rem;
  }
}

/* Accessibility */
.benefit-item:focus-within,
.benefit-image:focus,
.benefit-content h3:focus,
.benefit-content p:focus {
  outline: 2px solid var(--accent-color);
  outline-offset: 2px;
}

/* Smooth transitions for theme changes */
* {
  transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
}
</style>