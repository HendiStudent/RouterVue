<template>
  <section class="page-content">
    <h2>Detail Pemesanan Jasa</h2>

    <table v-if="requests.length > 0" class="request-table">
      <thead>
        <tr>
          <th>Nama Pemesan</th>
          <th>No HP</th>
          <th>Alamat Kebun</th>
          <th>Jenis Pekerjaan</th>
          <th>Penjasa</th>
          <th>No WA Penjasa</th>
          <th>Foto Penjasa</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="req in requests" :key="req.id">
          <td>{{ req.nama }}</td>
          <td>{{ req.nohp }}</td>
          <td>{{ req.alamatKebun }}</td>
          <td>{{ req.jenisPekerjaan }}</td>
          <td>{{ req.providerName }}</td>
          <td>{{ getProviderWa(req.providerId) }}</td>
          <td>
            <img :src="getProviderPhoto(req.providerId)" alt="foto" width="60" />
          </td>
        </tr>
      </tbody>
    </table>

    <p v-else>Tidak ada data pemesanan jasa.</p>
  </section>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      requests: [],
      providers: []
    };
  },
  async created() {
    await this.fetchProviders();
    await this.fetchRequests();
  },
  methods: {
    async fetchProviders() {
      try {
        const res = await axios.get('http://localhost:3001/providers');
        this.providers = res.data;
      } catch (err) {
        console.error('Error fetching providers:', err);
      }
    },
    async fetchRequests() {
      try {
        const res = await axios.get('http://localhost:3001/detailpemesanjasa');
        this.requests = res.data;
      } catch (err) {
        console.error('Error fetching requests:', err);
      }
    },
    getProviderPhoto(id) {
      const provider = this.providers.find(p => p.id === id);
      return provider ? provider.photo : '';
    },
    getProviderWa(id) {
      const provider = this.providers.find(p => p.id === id);
      return provider ? provider.wa : '';
    }
  }
};
</script>

<style scoped>
.page-content {
  max-width: 900px;
  margin: 50px auto;
  padding: 0 20px;
  color: var(--text-color);
  line-height: 1.7;
}
h2 {
  color: var(--nav-bg);
  font-size: 2rem;
  margin-bottom: 20px;
}
.request-table {
  width: 100%;
  border-collapse: collapse;
}
.request-table th,
.request-table td {
  border: 1px solid #ccc;
  padding: 8px;
  text-align: center;
}
</style>
