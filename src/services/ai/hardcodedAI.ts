import type { PartId } from '@/types';

// ─── Hardcoded AI Responses ───────────────────────────────────
// These are curated, realistic answers per engine part and topic.
// Keywords are matched against user input to return the best response.

interface AIResponseEntry {
  keywords: string[];
  response: string;
  triggersAnimation?: string;
}

type PartResponses = {
  default: string;
  entries: AIResponseEntry[];
};

export const AI_RESPONSES: Record<PartId | 'general', PartResponses> = {
  piston: {
    default:
      'Piston adalah komponen silinder yang bergerak naik-turun di dalam cylinder bore. Ia menerima tekanan pembakaran dan mengubahnya menjadi gaya mekanis yang diteruskan ke crankshaft melalui connecting rod.',
    entries: [
      {
        keywords: ['fungsi', 'function', 'apa', 'what', 'kegunaan', 'purpose'],
        response:
          '🔧 **Fungsi Piston:**\n\nPiston berfungsi sebagai "pendorong" utama dalam siklus kerja mesin. Ia melakukan 4 tugas utama:\n\n1. **Kompresi** — Menekan campuran udara-bahan bakar agar mudah terbakar\n2. **Transmisi Tenaga** — Menyalurkan gaya pembakaran ke crankshaft\n3. **Pembuangan** — Mendorong gas sisa keluar dari ruang bakar\n4. **Intake** — Menciptakan vakum saat turun untuk menghisap campuran baru\n\n⚙️ Piston bergerak 3,200× per menit pada kondisi saat ini.',
        triggersAnimation: 'pistonMove',
      },
      {
        keywords: ['cara kerja', 'how', 'bekerja', 'work', 'proses', 'process', 'gerakan', 'movement'],
        response:
          '🔄 **Cara Kerja Piston:**\n\nPiston bekerja dalam **4 langkah (4-stroke cycle)**:\n\n**↓ Langkah 1 – Intake:**\nPiston turun → katup intake terbuka → campuran udara-bahan bakar masuk\n\n**↑ Langkah 2 – Kompresi:**\nPiston naik → semua katup tertutup → campuran dikompresi 1:10\n\n**↓ Langkah 3 – Pembakaran:**\nSpark plug memercikkan api → ledakan mendorong piston turun → TENAGA!\n\n**↑ Langkah 4 – Buang:**\nPiston naik → katup exhaust terbuka → gas sisa keluar\n\nAnimasi telah diaktifkan untuk menunjukkan gerakannya! 🎬',
        triggersAnimation: 'pistonMove',
      },
      {
        keywords: ['material', 'bahan', 'terbuat', 'made', 'alloy'],
        response:
          '🔬 **Material Piston:**\n\nPiston modern terbuat dari **Aluminum Alloy (4032 atau 2618)**.\n\n**Mengapa Aluminum?**\n- Ringan (densitas 2.7 g/cm³ vs baja 7.8 g/cm³)\n- Konduktivitas panas tinggi (panas cepat tersebar)\n- Cukup kuat untuk menahan tekanan hingga 70 bar\n\n**Coating Khusus:**\n- Lapisan timah untuk pelumasan awal\n- Anodizing keras di crown untuk tahan panas\n- Groove cincin dilapis chromium',
      },
      {
        keywords: ['suhu', 'temperature', 'panas', 'hot', 'thermal'],
        response:
          '🌡️ **Temperatur Piston:**\n\nSuhu operasional piston saat ini: **185°C**\n\n| Area | Suhu Tipikal |\n|------|--------------|\n| Crown (atas) | 250-300°C |\n| Ring grooves | 180-200°C |\n| Skirt (bawah) | 100-130°C |\n\n⚠️ Jika suhu crown >350°C, risiko detonasi meningkat. Sistem pendinginan oil jet biasanya digunakan pada mesin performa tinggi.',
      },
    ],
  },

  crankshaft: {
    default:
      'Crankshaft adalah poros engkol yang mengubah gerakan linear piston menjadi gerakan rotasi. Ia adalah komponen yang mentransmisikan torsi ke transmisi dan akhirnya ke roda kendaraan.',
    entries: [
      {
        keywords: ['fungsi', 'function', 'apa', 'what', 'kegunaan'],
        response:
          '🔧 **Fungsi Crankshaft:**\n\nCrankshaft adalah "konverter energi" utama mesin:\n\n1. **Konversi Gerak** — Mengubah gerak linear piston → rotasi\n2. **Penyimpan Energi** — Flywheel di ujungnya menyimpan momentum rotasi\n3. **Distribusi Tenaga** — Mengirim torsi ke transmisi, alternator, dan pompa\n4. **Sinkronisasi** — Mengontrol timing camshaft via timing belt/chain\n\n⚡ Berputar pada 3,200 RPM dengan torsi ~180 Nm.',
        triggersAnimation: 'crankshaftSpin',
      },
      {
        keywords: ['cara kerja', 'how', 'bekerja', 'work', 'proses', 'rotasi', 'berputar'],
        response:
          '🔄 **Cara Kerja Crankshaft:**\n\nCrankshaft memiliki **pin eksentrik (crankpin)** yang offset dari pusat rotasi:\n\n1. Piston mendorong connecting rod ke bawah\n2. Connecting rod menggerakkan crankpin dalam gerakan melingkar\n3. Crankshaft berputar secara penuh (360°)\n4. Pada mesin 4-silinder, setiap piston berzündung setiap 180° rotasi\n\n**Keseimbangan:**\nCounterweight di crankshaft mengimbangi berat connecting rod dan piston untuk mengurangi getaran. Animasi diaktifkan! 🎬',
        triggersAnimation: 'crankshaftSpin',
      },
    ],
  },

  valve: {
    default:
      'Katup intake mengontrol aliran campuran udara-bahan bakar masuk ke dalam ruang pembakaran. Timing pembukaan dan penutupannya dikontrol secara presisi oleh camshaft.',
    entries: [
      {
        keywords: ['fungsi', 'function', 'apa', 'what'],
        response:
          '🔧 **Fungsi Intake Valve:**\n\nKatup intake adalah "pintu" menuju ruang pembakaran:\n\n1. **Membuka saat intake stroke** — Memungkinkan campuran masuk\n2. **Menutup saat kompresi** — Menyegel ruang bakar rapat\n3. **Timing kritis** — Membuka 10-15° sebelum TDC (Top Dead Center)\n4. **Lift valve** — Biasanya 8-12mm tergantung desain mesin\n\n🌡️ Temperatur operasional: 210°C (lebih dingin dari exhaust valve yang bisa >700°C)',
      },
      {
        keywords: ['buka', 'tutup', 'timing', 'open', 'close', 'camshaft'],
        response:
          '⏱️ **Valve Timing:**\n\nPengaturan timing katup sangat kritis:\n\n| Event | Waktu |\n|-------|-------|\n| Intake Opens | 10° BTDC |\n| Intake Closes | 50° ABDC |\n| Duration | 240° |\n\n**VTEC / VVT:**\nMesin modern menggunakan Variable Valve Timing untuk mengoptimalkan performa di berbagai RPM — di RPM rendah untuk efisiensi, di RPM tinggi untuk tenaga maksimum.',
        triggersAnimation: 'valveOpen',
      },
    ],
  },

  cylinder: {
    default:
      'Cylinder block adalah blok mesin yang merupakan komponen struktural utama. Ia menampung semua komponen internal mesin termasuk piston, connecting rod, dan crankshaft.',
    entries: [
      {
        keywords: ['fungsi', 'function', 'apa', 'what', 'struktur'],
        response:
          '🔧 **Fungsi Cylinder Block:**\n\nCylinder block adalah fondasi seluruh mesin:\n\n1. **Housing Piston** — Bore (lubang silinder) tempat piston bergerak\n2. **Jalur Pendingin** — Rongga coolant mengelilingi setiap silinder\n3. **Oil Gallery** — Saluran oli bertekanan ke semua komponen\n4. **Mounting Point** — Tempat melekatnya head, transmission, accessories\n\n📐 Material: **Gray Cast Iron** atau **Aluminum Alloy** (lebih ringan 40%)',
      },
      {
        keywords: ['bore', 'stroke', 'displacement', 'cc', 'kapasitas', 'volume'],
        response:
          '📊 **Spesifikasi Cylinder:**\n\n| Parameter | Nilai |\n|-----------|-------|\n| Bore | 77.0 mm |\n| Stroke | 84.9 mm |\n| Displacement | 397.5 cc/silinder |\n| Compression Ratio | 10.5:1 |\n| Suhu Coolant | 92°C |\n\n**Cara Menghitung Displacement:**\n`V = π/4 × bore² × stroke × jumlah silinder`',
      },
    ],
  },

  camshaft: {
    default:
      'Camshaft adalah poros bubungan yang mengontrol timing dan lift semua katup. Ia berputar pada setengah kecepatan crankshaft dan memiliki lobe (bubungan) berbentuk khusus untuk setiap katup.',
    entries: [
      {
        keywords: ['fungsi', 'function', 'apa', 'what'],
        response:
          '🔧 **Fungsi Camshaft:**\n\nCamshaft adalah "otak" sistem valvetrain:\n\n1. **Mengontrol Timing** — Kapan setiap katup membuka dan menutup\n2. **Mengontrol Lift** — Seberapa jauh katup terbuka (8-12mm)\n3. **Mengontrol Duration** — Berapa lama katup tetap terbuka\n4. **Sinkronisasi** — Berhubungan dengan crankshaft via timing chain\n\n⚠️ Status: **Warning** — Disarankan pengecekan celah katup pada 20,000 km',
        triggersAnimation: 'camshaftRotate',
      },
      {
        keywords: ['lobe', 'bubungan', 'profile', 'durasi', 'duration'],
        response:
          '📐 **Profil Camshaft Lobe:**\n\nBentuk lobe menentukan karakter mesin:\n\n**Lobe Stock (OEM):**\n- Duration: 240° intake / 236° exhaust\n- Lift: 8.5mm\n- LSA (Lobe Separation Angle): 112°\n\n**Performance Cam:**\n- Duration: 280°+ (lebih "aggressive")\n- Lift: 10.5mm+\n- Meningkatkan power tapi mengorbankan idle quality\n\n🔄 Animasi camshaft diaktifkan! 🎬',
        triggersAnimation: 'camshaftRotate',
      },
    ],
  },

  sparkplug: {
    default:
      'Busi (spark plug) menghasilkan percikan listrik untuk membakar campuran udara-bahan bakar di dalam ruang pembakaran pada momen yang sangat tepat dalam siklus kerja mesin.',
    entries: [
      {
        keywords: ['fungsi', 'function', 'apa', 'what', 'percikan', 'spark', 'ignite'],
        response:
          '🔧 **Fungsi Spark Plug:**\n\nBusi adalah komponen sistem pengapian yang kritis:\n\n1. **Menghasilkan Percikan** — Tegangan 20,000-45,000 volt menghasilkan arc\n2. **Timing Pengapian** — Memercik 10-35° BTDC tergantung beban\n3. **Menjaga Suhu** — Heat range busi harus sesuai spek mesin\n4. **Indikator Kesehatan** — Warna elektroda menunjukkan kondisi mesin\n\n⚠️ **Status: Perlu Servis!** — Busi saat ini sudah melampaui interval penggantian 20,000 km',
        triggersAnimation: 'sparkIgnite',
      },
      {
        keywords: ['ganti', 'replace', 'interval', 'servis', 'service', 'worn', 'aus'],
        response:
          '🔧 **Interval Penggantian Busi:**\n\n| Tipe Busi | Interval |\n|-----------|----------|\n| Copper | 20,000 km |\n| Platinum | 60,000 km |\n| Iridium | 100,000 km |\n| Double Iridium | 120,000 km |\n\n**Tanda Busi Perlu Diganti:**\n- ❌ Sulit starter\n- ❌ Mesin terasa brebet / misfiring\n- ❌ Konsumsi bahan bakar meningkat\n- ❌ Akselerasi menurun\n\n⚠️ Busi pada mesin ini: **Perlu segera diganti!**',
      },
      {
        keywords: ['gap', 'celah', 'voltage', 'tegangan', 'listrik'],
        response:
          '⚡ **Spesifikasi Teknis Busi:**\n\n| Parameter | Nilai |\n|-----------|-------|\n| Electrode Gap | 0.8-1.0 mm |\n| Firing Voltage | 12,000-45,000 V |\n| Thread Size | M14 x 1.25 |\n| Reach | 26.5 mm |\n| Heat Range | 6 (NGK standard) |\n| Suhu Elektroda | 450-850°C (optimal) |\n\n**Material Elektroda:** Iridium (ketahanan superior vs copper)',
      },
    ],
  },

  general: {
    default:
      'Selamat datang di Smart AR Assistant! Pilih salah satu bagian mesin untuk mendapatkan informasi detail dan penjelasan teknis dari AI Assistant.',
    entries: [
      {
        keywords: ['mesin', 'engine', 'cara kerja', 'how engine works', 'bagaimana', 'how does'],
        response:
          '🔄 **Cara Kerja Mesin 4-Tak:**\n\nMesin 4-tak (four-stroke engine) adalah jenis mesin pembakaran dalam yang paling umum:\n\n**Siklus 4 Langkah:**\n1. **INTAKE** ↓ — Piston turun, katup intake buka, campuran masuk\n2. **COMPRESSION** ↑ — Semua katup tutup, piston naik, kompresi 10:1\n3. **POWER** ↓ — Busi memercik, ledakan mendorong piston → TENAGA!\n4. **EXHAUST** ↑ — Katup buang buka, gas sisa didorong keluar\n\nProses ini terjadi **3,200 kali per menit** pada kondisi saat ini! 🚀',
        triggersAnimation: 'fullCycle',
      },
      {
        keywords: ['halo', 'hello', 'hi', 'hai', 'hei'],
        response:
          '👋 **Halo! Saya AR Assistant!**\n\nSaya siap membantu Anda memahami komponen mesin yang sedang Anda lihat di AR.\n\n**Yang bisa saya lakukan:**\n- 🔍 Menjelaskan fungsi setiap komponen\n- 📊 Memberikan data teknis dan spesifikasi\n- 🎬 Memicu animasi untuk visualisasi cara kerja\n- 🔧 Memberikan tips perawatan\n\n**Pilih bagian mesin** di sebelah kiri, lalu tanya saya apa saja!',
      },
      {
        keywords: ['torsi', 'torque', 'power', 'tenaga', 'horsepower', 'hp', 'kw'],
        response:
          '⚡ **Output Performa Mesin:**\n\n| Spec | Nilai |\n|------|-------|\n| Max Power | 45 HP @ 8,500 RPM |\n| Max Torque | 43 Nm @ 6,500 RPM |\n| Displacement | 397.5 cc |\n| Compression | 10.5:1 |\n| Fuel Type | Gasoline RON 92+ |\n\n**Faktor yang Mempengaruhi Performa:**\n- Compression ratio\n- Cam profile\n- Intake & exhaust flow\n- Ignition timing\n- Air-fuel ratio (λ = 1.0 ideal)',
      },
      {
        keywords: ['tips', 'perawatan', 'maintenance', 'servis', 'service', 'rawat'],
        response:
          '🛠️ **Tips Perawatan Mesin:**\n\n**Rutin (setiap 3,000 km):**\n- ✅ Cek & ganti oli mesin\n- ✅ Cek level coolant\n- ✅ Inspeksi visual filter udara\n\n**Berkala (setiap 10,000 km):**\n- ✅ Ganti filter oli\n- ✅ Ganti filter udara\n- ✅ Cek celah katup\n- ✅ Inspeksi busi\n\n**Jangka Panjang (setiap 40,000 km):**\n- ✅ Ganti timing belt/chain\n- ✅ Overhaul throttle body\n- ✅ Flush sistem pendingin\n\n⚠️ Busi saat ini perlu perhatian segera!',
      },
    ],
  },
};

export function getAIResponse(
  question: string,
  partId: PartId | null
): { response: string; triggersAnimation: string | null } {
  const key = partId ?? 'general';
  const partData = AI_RESPONSES[key] ?? AI_RESPONSES.general;
  const lowerQ = question.toLowerCase();

  // Try to find a keyword match
  for (const entry of partData.entries) {
    if (entry.keywords.some((kw) => lowerQ.includes(kw))) {
      return {
        response: entry.response,
        triggersAnimation: entry.triggersAnimation ?? null,
      };
    }
  }

  // Also check general entries if no part-specific match
  if (partId) {
    for (const entry of AI_RESPONSES.general.entries) {
      if (entry.keywords.some((kw) => lowerQ.includes(kw))) {
        return {
          response: entry.response,
          triggersAnimation: entry.triggersAnimation ?? null,
        };
      }
    }
  }

  // Fall back to default for this part
  return {
    response: partData.default,
    triggersAnimation: null,
  };
}

// Simulate AI typing delay (realistic effect)
export async function simulateAIThinking(ms = 1200): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
