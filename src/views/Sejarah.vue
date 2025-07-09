<template>
  <section class="page-content">
    <div class="content-wrapper">
      <h2>Sejarah Kelapa Sawit</h2>
      <img src="../assets/sejarahSawit.jpg" alt="Sejarah Kelapa Sawit" class="sejarah-image" />
      <div class="content-text">
        <p>
          Kelapa sawit memiliki sejarah panjang yang bermula di Afrika Barat sebelum menyebar ke Asia dan Indonesia.
          Sawit mulai dibudidayakan secara luas di Indonesia pada abad ke-20 dan menjadi salah satu komoditas unggulan.
        </p>
        <p>
          Perkembangan industri sawit di Indonesia terus meningkat hingga saat ini dengan teknologi modern dan praktik berkelanjutan.
        </p>
        <p>
          Pada awalnya, kelapa sawit dibawa ke Indonesia oleh pemerintah kolonial Belanda sekitar tahun 1848 dan ditanam di Kebun Raya Bogor.
          Komoditas ini kemudian berkembang menjadi industri perkebunan besar yang berkontribusi pada ekonomi nasional hingga saat ini.
        </p>
      </div>
    </div>
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

.content-wrapper {
  background: var(--card-bg);
  border-radius: 16px;
  padding: 30px;
  box-shadow: var(--shadow);
  border: 2px solid transparent;
  background-clip: padding-box;
  position: relative;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.content-wrapper::before {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: var(--gradient-border);
  border-radius: 16px;
  z-index: -1;
}

.content-wrapper:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 30px rgba(255, 107, 53, 0.2);
}

h2 {
  font-size: 2.4rem;
  font-weight: 700;
  color: var(--accent-color);
  text-align: center;
  margin-bottom: 30px;
  text-transform: uppercase;
  letter-spacing: -0.5px;
}

.sejarah-image {
  width: 100%;
  max-height: 400px;
  object-fit: cover;
  border-radius: 12px;
  margin-bottom: 20px;
  border: 1px solid var(--border-color);
  transition: transform 0.3s ease;
}

.sejarah-image:hover {
  transform: scale(1.02);
}

.content-text {
  padding: 0 10px;
}

p {
  font-size: 1.15rem;
  line-height: 1.7;
  color: var(--text-color);
  margin-bottom: 20px;
}

/* Responsive Design */
@media (max-width: 768px) {
  .page-content {
    margin: 20px auto;
    padding: 0 15px;
  }

  .content-wrapper {
    padding: 20px;
  }

  h2 {
    font-size: 2rem;
  }

  .sejarah-image {
    max-height: 300px;
  }

  p {
    font-size: 1.05rem;
  }
}

@media (max-width: 480px) {
  .content-wrapper {
    padding: 15px;
  }

  h2 {
    font-size: 1.6rem;
  }

  .sejarah-image {
    max-height: 250px;
  }

  p {
    font-size: 0.95rem;
  }
}

/* Accessibility */
.content-wrapper:focus-within,
.sejarah-image:focus,
h2:focus,
p:focus {
  outline: 2px solid var(--accent-color);
  outline-offset: 2px;
}

/* Smooth transitions for theme changes */
* {
  transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
}
</style>