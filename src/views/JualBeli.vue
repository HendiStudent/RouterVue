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
    <!-- ✅ Form Input Transaksi Sawit -->
    <div class="form-container">
      <h4>Input Transaksi Sawit</h4>
      <form @submit.prevent="addTransaksiSawit" class="add-form">
        <input v-model="newTransaksiSawit.namaPenjual" placeholder="Nama Penjual Sawit" required>
        <input v-model="newTransaksiSawit.alamatSawit" placeholder="Alamat Kebun Sawit" required>
        <input v-model.number="newTransaksiSawit.jumlahMobil" placeholder="Jumlah Mobil Penjemput" type="number" min="1" required>
        <button type="submit">Tambah Transaksi Sawit</button>
      </form>
    </div>

    <!-- ✅ Tabel Transaksi Sawit -->
    <div class="market-table-container">
      <table class="market-table">
        <thead>
          <tr>
            <th>Nama Penjual</th>
            <th>Alamat Sawit</th>
            <th>Jumlah Mobil</th>
            <th>Tanggal</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="transaksi in transaksiSawit" :key="transaksi.id">
            <td>{{ transaksi.namaPenjual }}</td>
            <td>{{ transaksi.alamatSawit }}</td>
            <td>{{ transaksi.jumlahMobil }}</td>
            <td>{{ formatDate(transaksi.tanggal) }}</td>
          </tr>
        </tbody>
      </table>
    </div>


    <!-- ✅ Admin Manajemen Barang -->
    <h3 class="section-subtitle">Manajemen Barang (Admin)</h3>

    <!-- Form Tambah Barang Baru -->
    <div class="form-container">
      <h4>Tambah Barang Baru</h4>
      <form @submit.prevent="addBarang" class="add-form">
        <input v-model="newBarang.nama" placeholder="Nama Barang" required>
        <select v-model="newBarang.jenis" required>
          <option value="">Pilih Jenis</option>
          <option value="Pupuk">Pupuk</option>
          <option value="Racun Rumput">Racun Rumput</option>
          <option value="Kelapa Sawit">Kelapa Sawit</option>
          <option value="Lainnya">Lainnya</option>
        </select>
        <input v-model.number="newBarang.harga" placeholder="Harga per Unit" type="number" required>
        <input v-model.number="newBarang.stok" placeholder="Stok Awal" type="number" required>
        <input v-model="newBarang.satuan" placeholder="Satuan (kg, liter, sak)" required>
        <button type="submit">Tambah Barang</button>
      </form>
    </div>

    <!-- Tabel Barang dengan Stok -->
    <div class="market-table-container">
      <table class="market-table">
        <thead>
          <tr>
            <th>Nama Barang</th>
            <th>Jenis</th>
            <th>Harga per Unit (Rp)</th>
            <th>Stok</th>
            <th>Satuan</th>
            <th>Status</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="barang in barangInventory" :key="barang.id" :class="{ 'low-stock': barang.stok < 10, 'out-of-stock': barang.stok <= 0 }">
            <td>
              <input v-if="barang.editing" v-model="barang.nama" />
              <span v-else>{{ barang.nama }}</span>
            </td>
            <td>
              <select v-if="barang.editing" v-model="barang.jenis">
                <option value="Pupuk">Pupuk</option>
                <option value="Racun Rumput">Racun Rumput</option>
                <option value="Kelapa Sawit">Kelapa Sawit</option>
                <option value="Lainnya">Lainnya</option>
              </select>
              <span v-else>{{ barang.jenis }}</span>
            </td>
            <td>
              <input v-if="barang.editing" v-model.number="barang.harga" type="number" />
              <span v-else>{{ barang.harga.toLocaleString('id-ID') }}</span>
            </td>
            <td>
              <input v-if="barang.editing" v-model.number="barang.stok" type="number" />
              <span v-else>{{ barang.stok }}</span>
            </td>
            <td>
              <input v-if="barang.editing" v-model="barang.satuan" />
              <span v-else>{{ barang.satuan }}</span>
            </td>
            <td>
              <span v-if="barang.stok <= 0" class="status-badge out-of-stock">Habis</span>
              <span v-else-if="barang.stok < 10" class="status-badge low-stock">Stok Rendah</span>
              <span v-else class="status-badge available">Tersedia</span>
            </td>
            <td>
              <button @click="editBarang(barang)" class="btn-edit">
                {{ barang.editing ? 'Simpan' : 'Edit' }}
              </button>
              <button @click="deleteBarang(barang.id)" class="btn-delete">Hapus</button>
              <button @click="restockBarang(barang)" class="btn-restock">Restock</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- ✅ Simulasi Pembelian -->
    <h3 class="section-subtitle">Simulasi Pembelian (Pembeli)</h3>
    <div class="purchase-container">
      <h4>Form Pembelian</h4>
      <form @submit.prevent="processPurchase" class="purchase-form">
        <input v-model="purchaseData.namaPembeli" placeholder="Nama Pembeli" required>
        <input v-model="purchaseData.nohp" placeholder="No HP" required>
        <select v-model="purchaseData.barangId" required>
          <option value="">Pilih Barang</option>
          <option v-for="barang in availableBarang" :key="barang.id" :value="barang.id">
            {{ barang.nama }} - {{ barang.harga.toLocaleString('id-ID') }}/{{ barang.satuan }} (Stok: {{ barang.stok }})
          </option>
        </select>
        <input v-model.number="purchaseData.jumlah" placeholder="Jumlah" type="number" min="1" required>
        <button type="submit" :disabled="!canPurchase">Beli Barang</button>
      </form>
      
      <div v-if="selectedBarang" class="purchase-info">
        <p><strong>Barang:</strong> {{ selectedBarang.nama }}</p>
        <p><strong>Harga per {{ selectedBarang.satuan }}:</strong> Rp {{ selectedBarang.harga.toLocaleString('id-ID') }}</p>
        <p><strong>Stok Tersedia:</strong> {{ selectedBarang.stok }} {{ selectedBarang.satuan }}</p>
        <p v-if="purchaseData.jumlah > 0"><strong>Total Harga:</strong> Rp {{ totalHarga.toLocaleString('id-ID') }}</p>
      </div>
    </div>

    <!-- ✅ Riwayat Transaksi -->
    <h3 class="section-subtitle">Riwayat Transaksi</h3>
    <div class="market-table-container">
      <table class="market-table">
        <thead>
          <tr>
            <th>Tanggal</th>
            <th>Nama Pembeli</th>
            <th>No HP</th>
            <th>Barang</th>
            <th>Jumlah</th>
            <th>Harga Satuan</th>
            <th>Total</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="transaksi in riwayatTransaksi" :key="transaksi.id">
            <td>{{ formatDate(transaksi.tanggal) }}</td>
            <td>{{ transaksi.namaPembeli }}</td>
            <td>{{ transaksi.nohp }}</td>
            <td>{{ transaksi.namaBarang }}</td>
            <td>{{ transaksi.jumlah }} {{ transaksi.satuan }}</td>
            <td>{{ transaksi.hargaSatuan.toLocaleString('id-ID') }}</td>
            <td>{{ transaksi.totalHarga.toLocaleString('id-ID') }}</td>
            <td>
              <span class="status-badge success">Berhasil</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal Restock -->
    <div v-if="showRestockModal" class="modal-overlay" @click="closeRestockModal">
      <div class="modal-content" @click.stop>
        <h4>Restock Barang: {{ restockItem.nama }}</h4>
        <p>Stok saat ini: {{ restockItem.stok }} {{ restockItem.satuan }}</p>
        <form @submit.prevent="confirmRestock">
          <input v-model.number="restockAmount" placeholder="Jumlah tambahan" type="number" min="1" required>
          <div class="modal-buttons">
            <button type="submit" class="btn-confirm">Konfirmasi Restock</button>
            <button type="button" @click="closeRestockModal" class="btn-cancel">Batal</button>
          </div>
        </form>
      </div>
    </div>

  </section>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      transaksiSawit: [],
      newTransaksiSawit: {
        namaPenjual: '',
        alamatSawit: '',
        jumlahMobil: 1
      },
      transactions: [],
      barangInventory: [],
      riwayatTransaksi: [],
      newBarang: {
        nama: '',
        jenis: '',
        harga: 0,
        stok: 0,
        satuan: ''
      },
      purchaseData: {
        namaPembeli: '',
        nohp: '',
        barangId: '',
        jumlah: 0
      },
      showRestockModal: false,
      restockItem: {},
      restockAmount: 0
    };
  },
  computed: {
    availableBarang() {
      return this.barangInventory.filter(barang => barang.stok > 0);
    },
    selectedBarang() {
      return this.barangInventory.find(barang => barang.id == this.purchaseData.barangId);
    },
    totalHarga() {
      if (this.selectedBarang && this.purchaseData.jumlah > 0) {
        return this.selectedBarang.harga * this.purchaseData.jumlah;
      }
      return 0;
    },
    canPurchase() {
      return this.selectedBarang && 
             this.purchaseData.jumlah > 0 && 
             this.purchaseData.jumlah <= this.selectedBarang.stok &&
             this.purchaseData.namaPembeli.trim() !== '' &&
             this.purchaseData.nohp.trim() !== '';
    }
  },
  mounted() {
    this.initializeData();
    this.getTransaksiSawit();

  },
  methods: {
    async getTransaksiSawit() {
      try {
        const res = await axios.get('http://localhost:3001/transaksiSawit');
        this.transaksiSawit = res.data.reverse(); // tampil terbaru di atas
      } catch (err) {
        console.error('Error fetching transaksi sawit:', err);
      }
    },

    async addTransaksiSawit() {
      try {
        const transaksiBaru = {
          ...this.newTransaksiSawit,
          tanggal: new Date()
        };
        const res = await axios.post('http://localhost:3001/transaksiSawit', transaksiBaru);
        this.transaksiSawit.unshift(res.data);
        this.newTransaksiSawit = { namaPenjual: '', alamatSawit: '', jumlahMobil: 1 };
        alert('Transaksi sawit berhasil ditambahkan!');
      } catch (err) {
        console.error('Error adding transaksi sawit:', err);
        alert('Gagal menambahkan transaksi sawit!');
      }
    },

    async initializeData() {
      try {
        const barangRes = await axios.get('http://localhost:3001/barangInventory');
        this.barangInventory = barangRes.data;

        const transaksiRes = await axios.get('http://localhost:3001/transaksi');
        this.riwayatTransaksi = transaksiRes.data.reverse();
      } catch (err) {
        console.error('Error initializing data:', err);
      }
    },

    async addBarang() {
      try {
        const res = await axios.post('http://localhost:3001/barangInventory', {
          ...this.newBarang,
          editing: false
        });

        this.barangInventory.push(res.data);
        this.newBarang = { nama: '', jenis: '', harga: 0, stok: 0, satuan: '' };
        alert('Barang berhasil ditambahkan!');
      } catch (err) {
        console.error('Error adding barang:', err);
        alert('Gagal menambahkan barang!');
      }
    },

    async editBarang(barang) {
      if (barang.editing) {
        try {
          await axios.put(`http://localhost:3001/barangInventory/${barang.id}`, barang);
          barang.editing = false;
          alert('Barang berhasil diupdate!');
        } catch (err) {
          console.error('Error updating barang:', err);
          alert('Gagal mengupdate barang!');
        }
      } else {
        barang.editing = true;
      }
    },

    async deleteBarang(id) {
      if (confirm('Apakah Anda yakin ingin menghapus barang ini?')) {
        try {
          await axios.delete(`http://localhost:3001/barangInventory/${id}`);
          this.barangInventory = this.barangInventory.filter(b => b.id !== id);
          alert('Barang berhasil dihapus!');
        } catch (err) {
          console.error('Error deleting barang:', err);
          alert('Gagal menghapus barang!');
        }
      }
    },

    restockBarang(barang) {
      this.restockItem = barang;
      this.restockAmount = 0;
      this.showRestockModal = true;
    },

    async confirmRestock() {
      try {
        this.restockItem.stok += this.restockAmount;
        await axios.put(`http://localhost:3001/barangInventory/${this.restockItem.id}`, this.restockItem);
        this.closeRestockModal();
        alert(`Restock berhasil! Stok ${this.restockItem.nama} bertambah ${this.restockAmount} ${this.restockItem.satuan}`);
      } catch (err) {
        console.error('Error restocking:', err);
        alert('Gagal melakukan restock!');
      }
    },

    closeRestockModal() {
      this.showRestockModal = false;
      this.restockItem = {};
      this.restockAmount = 0;
    },

    async processPurchase() {
      if (!this.canPurchase) {
        alert('Pembelian tidak valid!');
        return;
      }

      try {
        const barang = this.selectedBarang;
        const transaksi = {
          tanggal: new Date(),
          namaPembeli: this.purchaseData.namaPembeli,
          nohp: this.purchaseData.nohp,
          barangId: barang.id,
          namaBarang: barang.nama,
          jumlah: this.purchaseData.jumlah,
          hargaSatuan: barang.harga,
          totalHarga: this.totalHarga,
          satuan: barang.satuan
        };

        const res = await axios.post('http://localhost:3001/transaksi', transaksi);
        this.riwayatTransaksi.unshift(res.data);

        barang.stok -= this.purchaseData.jumlah;
        await axios.put(`http://localhost:3001/barangInventory/${barang.id}`, barang);

        this.purchaseData = { namaPembeli: '', nohp: '', barangId: '', jumlah: 0 };

        alert(`Pembelian berhasil! Total: Rp ${transaksi.totalHarga.toLocaleString('id-ID')}`);

        if (barang.stok < 10 && barang.stok > 0) {
          alert(`Peringatan: Stok ${barang.nama} tersisa ${barang.stok} ${barang.satuan}`);
        } else if (barang.stok <= 0) {
          alert(`Peringatan: Stok ${barang.nama} habis!`);
        }
      } catch (err) {
        console.error('Error processing purchase:', err);
        alert('Gagal memproses pembelian!');
      }
    },

    formatDate(date) {
      return new Date(date).toLocaleDateString('id-ID', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  }
};
</script>


<style scoped>
.page-content {
  max-width: 1200px;
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

.form-container {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 30px;
}

.form-container h4 {
  margin-bottom: 15px;
  color: var(--nav-bg);
}

.add-form {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  align-items: center;
}

.add-form input,
.add-form select {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  min-width: 150px;
}

.add-form button {
  padding: 8px 16px;
  background: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.add-form button:hover {
  background: #218838;
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
  min-width: 800px;
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

.low-stock {
  background-color: #fff3cd !important;
}

.out-of-stock {
  background-color: #f8d7da !important;
}

.status-badge {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 600;
}

.status-badge.available {
  background: #d4edda;
  color: #155724;
}

.status-badge.low-stock {
  background: #fff3cd;
  color: #856404;
}

.status-badge.out-of-stock {
  background: #f8d7da;
  color: #721c24;
}

.status-badge.success {
  background: #d4edda;
  color: #155724;
}

.btn-edit {
  background: #007bff;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 5px;
}

.btn-edit:hover {
  background: #0056b3;
}

.btn-delete {
  background: #dc3545;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 5px;
}

.btn-delete:hover {
  background: #c82333;
}

.btn-restock {
  background: #28a745;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
}

.btn-restock:hover {
  background: #218838;
}

.purchase-container {
  background: #e7f3ff;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 30px;
}

.purchase-container h4 {
  margin-bottom: 15px;
  color: var(--nav-bg);
}

.purchase-form {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  align-items: center;
  margin-bottom: 20px;
}

.purchase-form input,
.purchase-form select {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  min-width: 150px;
}

.purchase-form button {
  padding: 8px 16px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.purchase-form button:hover:not(:disabled) {
  background: #0056b3;
}

.purchase-form button:disabled {
  background: #6c757d;
  cursor: not-allowed;
}

.purchase-info {
  background: white;
  padding: 15px;
  border-radius: 4px;
  border: 1px solid #ddd;
}

.purchase-info p {
  margin: 5px 0;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 30px;
  border-radius: 8px;
  max-width: 400px;
  width: 90%;
}

.modal-content h4 {
  margin-bottom: 15px;
  color: var(--nav-bg);
}

.modal-content input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin: 10px 0;
}

.modal-buttons {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  margin-top: 20px;
}

.section-container {
  background: var(--bg-card);
  padding: 40px;
  margin-bottom: 60px;
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-md);
  border: 1px solid var(--border-color);
}

@media (max-width: 768px) {
  .section-container {
    padding: 25px;
  }
}

@media (max-width: 480px) {
  .section-container {
    padding: 20px;
  }
}

.btn-confirm {
  background: #28a745;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}

.btn-confirm:hover {
  background: #218838;
}

.btn-cancel {
  background: #6c757d;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}

.btn-cancel:hover {
  background: #5a6268;
}

@media (max-width: 768px) {
  .add-form,
  .purchase-form {
    flex-direction: column;
    align-items: stretch;
  }
  
  .add-form input,
  .add-form select,
  .purchase-form input,
  .purchase-form select {
    min-width: auto;
    width: 100%;
  }
}
</style>