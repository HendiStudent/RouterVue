<template>
  <section class="page-content">
    <h2>Jual Beli Kelapa Sawit</h2>
    <p>
      Pasar jual beli kelapa sawit dan produk turunannya sangat aktif di Indonesia dan internasional.
      Harga sawit dipengaruhi oleh permintaan global, kualitas produk, serta regulasi perdagangan.
    </p>
    <p>
      Kami menyediakan informasi terpercaya untuk pelaku usaha dan konsumen agar transaksi berjalan lancar dan transparan.
    </p>

    <h3 class="section-subtitle">Daftar Transaksi Sawit</h3>
    <div class="market-table-container">
      <table class="market-table">
        <thead>
          <tr>
            <th>Nama</th>
            <th>Lokasi</th>
            <th>Peran</th>
            <th>Harga per Kg (Rp)</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in transactions" :key="index">
            <td>{{ item.nama }}</td>
            <td>{{ item.lokasi }}</td>
            <td>{{ item.peran }}</td>
            <td>{{ item.harga.toLocaleString('id-ID') }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <h3 class="section-subtitle">Penjualan Pupuk & Racun Rumput</h3>
    <div class="market-table-container">
      <table class="market-table">
        <thead>
          <tr>
            <th>Nama Produk</th>
            <th>Jenis</th>
            <th>Harga per Sak/Liter (Rp)</th>
            <th>Stok</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in pupukDanRacun" :key="'produk-' + index">
            <td>{{ item.nama }}</td>
            <td>{{ item.jenis }}</td>
            <td>{{ item.harga.toLocaleString('id-ID') }}</td>
            <td>{{ item.stok }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      transactions: [
        { nama: 'Pak Joko', lokasi: 'Riau', peran: 'Penjual', harga: 1800 },
        { nama: 'Bu Sari', lokasi: 'Sumatera Utara', peran: 'Pembeli', harga: 1850 },
        { nama: 'CV Sawit Jaya', lokasi: 'Kalimantan Barat', peran: 'Penjual', harga: 1750 },
        { nama: 'PT Agro Palm', lokasi: 'Jambi', peran: 'Pembeli', harga: 1900 }
      ],
      pupukDanRacun: [
        { nama: 'Urea Nitrea', jenis: 'Pupuk', harga: 150000, stok: '50 sak' },
        { nama: 'KCL Murni', jenis: 'Pupuk', harga: 170000, stok: '40 sak' },
        { nama: 'Gramoxone', jenis: 'Racun Rumput', harga: 120000, stok: '35 liter' },
        { nama: 'Roundup', jenis: 'Racun Rumput', harga: 140000, stok: '60 liter' }
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
</style>
