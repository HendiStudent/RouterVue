<template>
  <section class="page-content">
    <h2>Produksi Kelapa Sawit</h2>
    <p>
      Produksi kelapa sawit melibatkan proses budidaya, panen, serta pengolahan buah sawit menjadi minyak sawit mentah (CPO).
      Indonesia adalah salah satu produsen utama minyak sawit di dunia.
    </p>
    <p>
      Penerapan teknologi modern dan praktik berkelanjutan sangat penting untuk menjaga produktivitas dan kelestarian lingkungan.
    </p>

    <!-- ✅ Penjualan Tahunan -->
    <h3 class="section-subtitle">Data Penjualan Tahunan</h3>
    <div class="market-table-container">
      <table class="market-table">
        <thead>
          <tr>
            <th>Tahun</th>
            <th>Penjualan Barang (Rp)</th>
            <th>Penjualan Jasa (Rp)</th>
            <th>Total Penjualan (Rp)</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(penjualan, index) in penjualanTahunan" :key="index">
            <td>{{ penjualan.tahun }}</td>
            <td>{{ penjualan.barang.total.toLocaleString('id-ID') }}</td>
            <td>{{ penjualan.jasa.total.toLocaleString('id-ID') }}</td>
            <td>{{ (penjualan.barang.total + penjualan.jasa.total).toLocaleString('id-ID') }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- ✅ Rincian Barang per Tahun -->
    <h3 class="section-subtitle">Rincian Penjualan Barang</h3>
    <div v-for="(penjualan, index) in penjualanTahunan" :key="'barang-' + index" class="rincian-container">
      <h4>Tahun {{ penjualan.tahun }}</h4>
      <ul>
        <li v-for="(barang, i) in penjualan.barang.rincian" :key="i">
          {{ barang.nama }}: Rp {{ barang.total.toLocaleString('id-ID') }}
        </li>
      </ul>
    </div>

    <!-- ✅ Rincian Jasa per Tahun -->
    <h3 class="section-subtitle">Rincian Penjualan Jasa</h3>
    <div v-for="(penjualan, index) in penjualanTahunan" :key="'jasa-' + index" class="rincian-container">
      <h4>Tahun {{ penjualan.tahun }}</h4>
      <ul>
        <li v-for="(jasa, i) in penjualan.jasa.rincian" :key="i">
          {{ jasa.nama }}: Rp {{ jasa.total.toLocaleString('id-ID') }}
        </li>
      </ul>
    </div>

  </section>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      penjualanTahunan: []
    };
  },
  mounted() {
    this.getPenjualanTahunan();
  },
  methods: {
    async getPenjualanTahunan() {
      try {
        const res = await axios.get('http://localhost:3001/penjualanTahunan');
        this.penjualanTahunan = res.data;
      } catch (err) {
        console.error('Error fetching penjualan tahunan:', err);
      }
    }
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

.market-table-container {
  overflow-x: auto;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-bottom: 30px;
}

.market-table {
  width: 100%;
  border-collapse: collapse;
  min-width: 600px;
}

.market-table th,
.market-table td {
  padding: 12px 16px;
  border-bottom: 1px solid #ddd;
  text-align: left;
}

.market-table th {
  background-color: #f5f5f5;
  font-weight: 600;
  color: #333;
}

.market-table tr:hover {
  background-color: #f9f9f9;
}

.rincian-container {
  background: #f8f9fa;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.rincian-container h4 {
  margin-bottom: 10px;
  color: var(--nav-bg);
}
</style>
