export const Course = [
  {
    id: 1,
    name: "Course 1",
    description: "Course 1 Description",
    category: "Category 1",
  },
  {
    id: 2,
    name: "Course 2",
    description: "Course 2 Description",
    category: "Category 2",
  },
  {
    id: 3,
    name: "Course 3",
    description: "Course 3 Description",
    category: "Category 3",
  },
  {
    id: 4,
    name: "Course 4",
    description: "Course 4 Description",
    category: "Category 4",
  },
  {
    id: 5,
    name: "Course 5",
    description: "Course 5 Description",
    category: "Category 5",
  },
  {
    id: 6,
    name: "Course 6",
    description: "Course 6 Description",
    category: "Category 6",
  },
  {
    id: 7,
    name: "Course 7",
    description: "Course 7 Description",
    category: "Category 7",
  },
  {
    id: 8,
    name: "Course 8",
    description: "Course 8 Description",
    category: "Category 8",
  },
  {
    id: 9,
    name: "Course 9",
    description: "Course 9 Description",
    category: "Category 9",
  },
  {
    id: 10,
    name: "Course 10",
    description: "Course 10 Description",
    category: "Category 10",
  },
  {
    id: 11,
    name: "Course 11",
    description: "Course 11 Description",
    category: "Category 11",
  },
  {
    id: 12,
    name: "Course 12",
    description: "Course 12 Description",
    category: "Category 12",
  },
  {
    id: 13,
    name: "Course 13",
    description: "Course 13 Description",
    category: "Category 13",
  },
  {
    id: 14,
    name: "Course 14",
    description: "Course 14 Description",
    category: "Category 14",
  },
  {
    id: 15,
    name: "Course 15",
    description: "Course 15 Description",
    category: "Category 15",
  },
]

export const Resource = [
  {
    id: 1,
    moduleId: 1,
    title: "Resource 1",
    description: "Resource 1 Description",
    createAt: "2021-01-01",
  },
  {
    id: 2,
    moduleId: 1,
    title: "Resource 2",
    description: "Resource 2 Description",
    createAt: "2021-01-01",
  },
  {
    id: 3,
    moduleId: 1,
    title: "Resource 3",
    description: "Resource 3 Description",
    createAt: "2021-01-01",
  },
  {
    id: 4,
    moduleId: 1,
    title: "Resource 4",
    description: "Resource 4 Description",
    createAt: "2021-01-01",
  },
  {
    id: 5,
    moduleId: 1,
    title: "Resource 5",
    description: "Resource 5 Description",
    createAt: "2021-01-01",
  },
  {
    id: 6,
    moduleId: 1,
    title: "Resource 6",
    description: "Resource 6 Description",
    createAt: "2021-01-01",
  },
  {
    id: 7,
    moduleId: 1,
    title: "Resource 7",
    description: "Resource 7 Description",
    createAt: "2021-01-01",
  },
  {
    id: 8,
    moduleId: 1,
    title: "Resource 8",
    description: "Resource 8 Description",
    createAt: "2021-01-01",
  },
  {
    id: 9,
    moduleId: 1,
    title: "Resource 9",
    description: "Resource 9 Description",
    createAt: "2021-01-01",
  },
  {
    id: 10,
    moduleId: 1,
    title: "Resource 10",
    description: "Resource 10 Description",
    createAt: "2021-01-01",
  },
  {
    id: 11,
    moduleId: 1,
    title: "Resource 11",
    description: "Resource 11 Description",
    createAt: "2021-01-01",
  },
  {
    id: 12,
    moduleId: 1,
    title: "Resource 12",
    description: "Resource 12 Description",
    createAt: "2021-01-01",
  },
]

export const people = [
  {
    id:1,
    name:'Apriana',
    role:'INSTRUCTOR'
  },
  {
    id:2,
    name:'Apriana',
    role:'STUDENT'
  },
  {
    id:3,
    name:'Apriana',
    role:'STUDENT'
  },
  {
    id:4,
    name:'Apriana',
    role:'STUDENT'
  },
]
export const quiz = [
  {
    key: "1",
    name: "Tony Reichert",
    count_question: "CEO",
    type: "Active",
    name_course:"Course",
    updateAt:"2024-01-24"
  },
  {
    key: "2",
    name: "Tony Reichert",
    count_question: "CEO",
    type: "Active",
    name_course:"Course",
    updateAt:"2024-01-24"
  },
  {
    key: "3",
    name: "Tony Reichert",
    count_question: "CEO",
    type: "Active",
    name_course:"Course",
    updateAt:"2024-01-24"
  },
]
export const quizResult = [
  {
    id:1,
    quizName : "Quiz 1",
    createdAt: "2021-01-01",
    score: 100,
  }
]

export const chatbot = [
  {
    "role": "user",
    "content": "halo"
  },
  {
    "role": "assistant",
    "content": "Hello! How can I assist you today?",
    "context": {
      "messages": [
        {
          "role": "tool",
          "content": "{\"citations\": [], \"intent\": \"[]\"}"
        }
      ]
    }
  },
  {
    "role": "user",
    "content": "apa itu basis data"
  },
  {
    "role": "assistant",
    "content": "Basis data adalah kumpulan data yang saling berhubungan yang disimpan secara bersama sedemikian rupa dan tanpa pengulangan (redudansi) [doc4]. Basis data digunakan untuk merepresentasikan fakta dunia nyata yang mewakili suatu objek [doc1]. Basis data juga merupakan bagian dari sistem basis data yang terdiri dari beberapa komponen seperti pemakai, bahasa basis data, dan DBMS [doc3]. Pemodelan data adalah proses untuk membuat diagram sederhana pada tahap pembangunan perangkat lunak yang berisi elemen data di dalamnya, diagram dibuat menggunakan teks, dan symbol untuk memperlihatkan aliran data dan hubungan antar data. Pemodelan data menyediakan blueprint dalam perancangan database baru atau saat reengineering aplikasi [doc1].",
    "context": {
      "messages": [
        {
          "role": "tool",
          "content": "{\"citations\": [{\"content\": \"Konsep \\nPemodelan Data\\n\\nGentisya Tri Mardiani, S.Kom., M.Kom\\n\\nTeknik Informatika - \\nUNIKOMAnalisis dan Desain Basis Data\\n\\n2\\n\\nDATA MODELING\\n\\nDATA MODELING\\n\\n▪ Data modeling is the process of creating a simplified diagram of a \\n\\nsoftware system and the data elements it contains, using text and \\n\\nsymbols to represent the data and how it flows.Data models \\n\\nprovide a blueprint for designing a new database or reengineering \\n\\na legacy application.▪ Data modeling helps an organization use its data effectively to \\n\\nmeet business needs for information.\\n\\n3\\n\\nPEMODELAN DATA\\n\\n• Pemodelan data adalah suatu proses untuk membuat diagram sederhana\\n\\npada tahap pembangunan perangkat lunak yang berisi elemen data di \\n\\ndalamnya, diagram dibuat menggunakan teks, dan symbol untuk\\n\\nmemperlihatkan aliran data dan hubungan antar data.Pemodelan data \\n\\nmenyediakan blueprint dalam perancangan database baru atau saat\\n\\nreengineering aplikasi.• Pemodelan data dapat membantu organisasi dalam menggunakan data \\n\\nsecara efektif untuk mencapai kebutuhan bisnis dalam menampilkan\\n\\ninformasi\\n\\n4\\n\\nPemodelan data\\n\\n▪ Pemodelan data juga membantu dalam mendefinisikan kebutuhan standar data \\n\\ninternal suatu perusahaan.Model data adalah kunci dari komponen arsitektur data, \\n\\ndasar kebutuhan untuk membuat data flow diagram (DFD), blueprint arsitektur\\n\\nsistem, unified data vocabulary, dan model arsitektur lainnya.▪ Model data dibangun oleh data modelers, data architects, dan data management \\n\\nprofessionals lainnya dengan masukkan dari business analysts, executives, dan users.▪ Namun, pemodelan data merupakan salah satu skill yang harus dikuasai untuk data \\n\\nscientists dan analysts dalam membangun aplikasi business intelligence dan analisis\\n\\ndata science lebih lanjut. \\n\\n5\\n\\nTYPE OF DATA MODELS\\n\\n6\\n\\nConceptual \\ndata model\\n\\nLogical \\ndata model\\n\\nPhysical \\ndata model\\n\\nTYPE OF DATA MODELS\\n\\n1.Conceptual data model\\n\\nThis is a high-level visualization of the business or analytics processes that a \\n\\nsystem will support.It maps out the kinds of data that are needed, how \\n\\ndifferent business entities interrelate and associated business rules.Business \\n\\nexecutives are the main audience for conceptual data models, to help them \\n\\nsee how a system will work and ensure that it meets business needs.Conceptual models aren't tied to specific database or application \\n\\ntechnologies.\\n\\n7\\n\\nTYPE OF DATA MODELS\\n\\n2.Logical data model\\n\\nLogical data models show how data entities are related and describe the \\n\\ndata from a technical perspective.For example, they define data structures \\n\\nand provide details on attributes, keys, data types and other characteristics.But like conceptual models, they \\n\\naren't connected to a particular technology platform.\\n\\n8\\n\\nTYPE OF DATA MODELS\\n\\n3.Physical data model\\n\\nA logical model serves as the basis for the creation of a physical data model.They define the structures \\n\\nthat the database or a file system will use to store and manage the data.Database designers use physical data models to create \\n\\ndesigns and generate schema for databases.\\n\\n9\\n\\nPHASES OF DATA MODELING\\n\\n10\\n\\nTAHAPAN PEMODELAN DATA\\n\\n11\\n\\nDATA MODELING TECHNIQUES\\n\\n▪ 1.Hierarchical data modeling\\n\\n▪ 2.Network data modeling\\n\\n▪ 3.Relational data modeling\\n\\n▪ 4.Entity-relationship data modeling\\n\\n▪ 5.Dimensional data modeling\\n\\n▪ 6.Object-oriented data modeling\\n\\n▪ 7.Graph data modeling\\n\\n12\\n\\nDATA MODELING TECHNIQUES\\n\\n13\\n\\n14\\n\\nPROSES DALAM PEMODELAN DATA\\n\\n1.Identify the business entities that are represented in the data set.\\n\\n2.Identify the data attributes that need to be incorporated into the model.\\n\\n5.Finalize the data model and validate its accuracy.\\n\\n15\\n\\nPROSES DALAM PEMODELAN DATA\\n\\n16\\n\\nKeuntungan melakukan pemodelan data\\n\\n▪ Model data yang baik dapat membantu organisasi dalam\\n\\nmembangun dan mengimplementasikan strategi data dimana\\n\\nakan memanfaatkan data secara penuh\", \"id\": null, \"title\": \"Pertemuan 2 - Konsep Pemodelan Data\", \"filepath\": \"https://aicstorage.blob.core.windows.net/1701746286448-courseraaaa-container/1701746905300-Pertemuan%202%20-%20Konsep%20Pemodelan%20Data_.pdf\", \"url\": \"https://aicstorage.blob.core.windows.net/1701746286448-courseraaaa-container/1701746905300-Pertemuan%202%20-%20Konsep%20Pemodelan%20Data_.pdf\", \"metadata\": {\"chunking\": \"orignal document size=2470. Scores=1.3730637Org Highlight count=122.Filtering to chunk no. 0/Highlights=74 of size=1188\"}, \"chunk_id\": \"0\"}, {\"content\": \"▪ Pemodelan data yang efektif juga dapat menjamin database \\n\\nyang dibuat sudah sesuai dengan kebutuhan bisnis organisasi\\n\\ndalam manajemen data dan pemrosesan data \\n\\n17\\n\\nBenefits of data modeling\\n\\n▪ Internal agreement on data definitions and standards\\n\\n▪ Increased involvement in data management by business users\\n\\n▪ More efficient database design at a lower cost\\n\\n▪ Better use of available data assets\\n\\n18\\n\\nChallenges of data modeling\\n\\n▪ A lack of organizational commitment and business buy-in\\n\\n▪ A lack of understanding by business users\\n\\n▪ Modeling complexity and scope creep\\n\\n▪ Undefined or unclear business requirements\\n\\n19\\n\\nABSTRAKSI DATA\\n\\n▪ Abstraksi data merupakan tingkatan/ level dalam hal\\n\\nbagaimana melihat data pada suatu sistem basis data.▪ Ada 3 level abstraksi data:\\n\\n- Level Fisik (Physical Level) – Internal level\\n\\n- Level Logic/ Konseptual (Conceptual Level)\\n\\n- Level Pandangan Pemakai (View Level) \\n\\n20\\n\\nABSTRAKSI DATA\\n\\n21\\n\\nABSTRAKSI DATA\\n\\n▪ Physical level – Internal level\\n\\nMerupakan level terendah yang menunjukan bagaimana sesungguhnya suatu data \\n\\n/record disimpan.Pada level ini pemakai melihat data sebagai gabungan dari\\n\\nstruktur datanya itu sendiri.▪ Conceptual/ Logic level\\n\\nMenjelaskan suatu data yang disimpan di dalam database dan hubungannya antara\\n\\nsatu data dengan data lainnya.▪ View Level – Eksternal level\\n\\nMerupakan level tertinggi, hanya menunjukkan sebagian dari basis data sesuai\\n\\ndengan kebutuhan user\\n22\\n\\nTUGAS KELOMPOK\\n(persiapan untuk tugas di materi berikutnya)\\n\\n▪ Buatlah kelompok, anggota 3-4 orang\\n\\n▪ Setiap kelompok cari dokumen manual/ dokumen berisi data \\n\\n(tidak boleh ada tema yang sama dengan kelompok lain –\\n\\nsilakan atur dengan KM kelasnya)\\n\\ncontoh tema: penjualan, transportasi, perpustakaan, sekolah, penyewaan, kosan, \\n\\ngudang, restoran, dsb\\n\\n▪ Dokumen tsb digunakan sebagai acuan dalam pemodelan data \\n\\nuntuk pembangunan sistem informasi\\n\\n23\\n\\nlms.unikom.ac.id\\n\\n2023/2024 Gasal – Analisis dan \\nDesain Basis Data –\\nGentisya Tri Mardiani, S.Kom., M.Kom\\n\\n24\\n\\nTERIMA KASIH\\ngentisya.tri.mardiani@email.unikom.ac.id\\n\\n\\tSlide 1: Konsep  Pemodelan Data\\n\\tSlide 2\\n\\tSlide 3: DATA MODELING\\n\\tSlide 4: PEMODELAN DATA\\n\\tSlide 5: Pemodelan data\\n\\tSlide 6: TYPE OF DATA MODELS\\n\\tSlide 7: TYPE OF DATA MODELS\\n\\tSlide 8: TYPE OF DATA MODELS\\n\\tSlide 9: TYPE OF DATA MODELS.Slide 10: PHASES OF DATA MODELING\\n\\tSlide 11: TAHAPAN PEMODELAN DATA\\n\\tSlide 12: DATA MODELING TECHNIQUES\\n\\tSlide 13: DATA MODELING TECHNIQUES\\n\\tSlide 14\\n\\tSlide 15: PROSES DALAM PEMODELAN DATA\\n\\tSlide 16: PROSES DALAM PEMODELAN DATA\\n\\tSlide 17: Keuntungan melakukan pemodelan data\\n\\tSlide 18: Benefits of data modeling\\n\\tSlide 19: Challenges of data modeling\\n\\tSlide 20: ABSTRAKSI DATA\\n\\tSlide 21: ABSTRAKSI DATA\\n\\tSlide 22: ABSTRAKSI DATA\\n\\tSlide 23: TUGAS KELOMPOK  (persiapan untuk tugas di materi berikutnya)\\n\\tSlide 24: lms.unikom.ac.id\\n\\tSlide 25: TERIMA KASIH\", \"id\": null, \"title\": \"Pertemuan 2 - Konsep Pemodelan Data\", \"filepath\": \"https://aicstorage.blob.core.windows.net/1701746286448-courseraaaa-container/1701746905300-Pertemuan%202%20-%20Konsep%20Pemodelan%20Data_.pdf\", \"url\": \"https://aicstorage.blob.core.windows.net/1701746286448-courseraaaa-container/1701746905300-Pertemuan%202%20-%20Konsep%20Pemodelan%20Data_.pdf\", \"metadata\": {\"chunking\": \"orignal document size=2470. Scores=1.3730637Org Highlight count=122.Filtering to chunk no. 1/Highlights=48 of size=1104\"}, \"chunk_id\": \"1\"}, {\"content\": \"20\\n\\nFUNGSI DBMS\\n\\n▪ Data Recovery & Concurency, DBMS harus dapat\\n\\nmengangani kegagalan pengaksesan database yang dapat\\n\\ndisebabkan oleh kerusakan sistem, kerusakan disk, dsb.▪ Data Dictionary, DBMS harus dapat menyediakan data \\n\\ndictionary (kamus data)\\n\\n▪ Performance, DBMS harus dapat menangani unjuk kerja\\n\\ndari semua fungsi seefisien mungkin.\\n\\n21\\n\\nCONTOH DBMS\\n\\n22\\n\\nPENGGUNAAN DBMS\\n\\n23\\n\\nKOMPONEN SISTEM BASIS DATA (3)\\n\\n▪ Pemakai (Users)\\n\\nUsers atau pemakai adalah beberapa jenis atau tipe pemakai pada sistem\\n\\nbasis data, berdasarkan cara mereka berinteraksi pada basis data.- End user, orang yang mengakses database melalui terminal/ client dengan\\n\\nmenggunakan query language atau program aplikasi yang dibuat oleh \\n\\nprogrammer. 24\\n\\nBAHASA BASIS DATA\\n\\nSecara garis besar, bahasa basis data (database languages) dibagi\\n\\nmenjadi :\\n\\n▪ Data Definition Language (DDL)\\n\\n▪ Data Manipulation Language (DML)\\n\\n▪ Data Control Language (DCL)\\n\\n25\\n\\nDDL\\n\\nData Definition Language (DDL)\\n\\nberfungsi untuk membuat tabel baru, membuat index, \\n\\nmengubah tabel, menentukan struktur tabel, dll.Hasil dari kompilasi perintah DDL adalah kumpulan tabel yang \\n\\ndisimpan dalam file khusus yang disebut kamus data (data \\n\\ndictionary).Kamus data dapat mendefinisikan data yang mengalir di sistem\\n\\ndengan lengkap. \\n26\\n\\nDML\\n\\nData Manipulation Language (DML)\\n\\nBerguna untuk melakukan manipulasi dan pengambilan data pada suatu\\n\\nbasis data.Manipulasi data dapat berupa:\\n\\n▪ Penyisipan/ penambahan data baru (insert)\\n\\n▪ Pengubahan data (update)\\n\\n▪ Penghapusan data (delete)\\n\\nDML merupakan bahasa yang bertujuan untuk memudahkan pemakai\\n\\nuntuk mengakses data. \\n\\n27\\n\\nDCL\\n\\nData Control Language (DCL)\\n\\nuntuk mengendalikan pengaksesan data.Pengendalian dapat dilakukan \\n\\nberdasar per pengguna, per table, per kolom maupun per operasi \\n\\nyang boleh dilakukan\\n\\ncontoh: GRANT, REVOKE, LOCK TABLE\\n\\n▪ Pengendali Transaksi\\n\\nPerintah yang berfungsi untuk mengendalikan pengeksekusian transaksi\\n\\ncontoh: COMMIT, ROLLBACK\\n\\n28\\n\\n29\\n\\nlms.unikom.ac.id\\n\\n2023/2024 Ganjil – Analisis dan \\nDesain Basis Data – \\nGentisya Tri Mardiani, S.Kom., M.Kom\\n\\nTERIMA KASIH\\ngentisya.tri.mardiani@email.unikom.ac.id\\n\\n\\tSlide 1: Analisis dan Desain Basis Data\\n\\tSlide 2\\n\\tSlide 3\\n\\tSlide 4\\n\\tSlide 5\\n\\tSlide 6\\n\\tSlide 7: DATA PENUMPANG\\n\\tSlide 8: CONTOH DOKUMEN BERISI DATA\\n\\tSlide 9: BASIS DATA (DATABASE)\\n\\tSlide 10: DATA\\n\\tSlide 11: KLASIFIKASI DATA\\n\\tSlide 12\\n\\tSlide 13: KARAKTERISTIK FILE\\n\\tSlide 14: SISTEM BASIS DATA\\n\\tSlide 15: KOMPONEN SISTEM BASIS DATA (1)\\n\\tSlide 16: KOMPONEN SISTEM BASIS DATA (2)\\n\\tSlide 17\\n\\tSlide 18\\n\\tSlide 19: DBMS\\n\\tSlide 20: FUNGSI DBMS\\n\\tSlide 21: FUNGSI DBMS\\n\\tSlide 22: CONTOH DBMS\\n\\tSlide 23: PENGGUNAAN DBMS\\n\\tSlide 24: KOMPONEN SISTEM BASIS DATA (3).Slide 25: BAHASA BASIS DATA\\n\\tSlide 26: DDL\\n\\tSlide 27: DML\\n\\tSlide 28: DCL\\n\\tSlide 29\\n\\tSlide 30: TERIMA KASIH\", \"id\": null, \"title\": \"Pertemuan 1 - Pendahuluan Basis Data\", \"filepath\": \"https://aicstorage.blob.core.windows.net/1701746286448-courseraaaa-container/1701746409193-Pertemuan%201%20-%20Pendahuluan%20Basis%20Data_.pdf\", \"url\": \"https://aicstorage.blob.core.windows.net/1701746286448-courseraaaa-container/1701746409193-Pertemuan%201%20-%20Pendahuluan%20Basis%20Data_.pdf\", \"metadata\": {\"chunking\": \"orignal document size=3080. Scores=1.2268364Org Highlight count=110.Filtering to chunk no. 1/Highlights=53 of size=1189\"}, \"chunk_id\": \"1\"}, {\"content\": \"Analisis dan Desain \\nBasis Data\\n\\nGentisya Tri Mardiani, S.Kom., M.Kom\\n\\nTeknik Informatika - UNIKOM\\n\\nDATA?.BASIS DATA???.SISTEM BASIS DATA??.2\\n\\n3\\n\\n4\\n\\n5\\n\\nApakah ini DATA?.6\\n\\nPENUMPANG\\n\\nJURUSAN/ TRAYEK\\n\\nTERMINAL/ HALTE\\n\\nDATA\\n\\nRepresentasi fakta dunia nyata \\n\\nyang mewakili suatu objek.DATA PENUMPANG\\n\\n7\\n\\nNAMA\\n\\nALAMAT\\n\\nTUJUAN\\n\\nNO.KARTU BIS\\n\\nCONTOH DOKUMEN BERISI DATA\\n\\n8\\n\\nNo.Dipatiukur\\n\\nKARTU MEMBER BIS\\n\\nFoto\\n\\nBASIS DATA (DATABASE)\\n\\n▪ Kumpulan data yang saling berhubungan yang disimpan secara \\n\\nbersama sedemikian rupa dan tanpa pengulangan (redudansi) yang \\n\\ntidak perlu, untuk memenuhi berbagai kebutuhan\\n\\n▪ Himpunan kelompok data (arsip) yang saling berhubungan yang \\n\\ndiorganisasi agar dapat dimanfaatkan kembali dengan cepat dan \\n\\nmudah\\n\\n9\\n\\nDATA\\n\\n10\\n\\nNAMA ALAMAT TUJUAN NO.KARTU BIS\\n\\nAsep Ahmad Jl.JURUSAN NAMA JURUSAN HALTE TUJUAN\\n\\nD01 Dago-Leuwipanjang Dipatiukur LeuwiPanjang\\n\\nD02 Dipatiukur-Jatinangor Dipatiukur Jatinangor\\n\\nC01 Leuwipanjang-Caheum Leuwipanjang Cicaheum\\n\\nEntitas →Nama Tabel\\n\\n→Atribut / \\n\\nKolom/ Fields\\n\\n} Value/ Baris\\n\\nJURUSAN\\n\\nPENUMPANG\\n\\nKLASIFIKASI DATA\\n\\n▪ Data Tetap\\n\\n▫ Kelompok data yang tidak mengalami perubahan, paling tidak dalam kurun\\n\\nwaktu yang lama.▫ Contoh : Data pribadi mahasiswa.▪ Data Tidak Tetap\\n\\n▫ Kelompok data yang secara rutin mengalami perubahan.▫ Contoh : Data rencana studi mahasiswa.▪ Data Yang bertambah menurut waktu\\n\\n▫ Kelompok data ini biasanya merupakan data akumulasi dari kelompok data \\n\\ntetap dan data tak tetap.▫ Contoh : Data transkrip nilai.\\n11\\n\\n12\\n\\nFILE\\n\\nSekumpulan record yang menyatakan\\n\\nkumpulan entitas yang terogranisir dan \\n\\ntersimpan pada media penyimpanan\\n\\nelektronis\\n\\nKARAKTERISTIK FILE\\n\\n▪ Persistance (Bertahan Lama) \\n\\n▫ Suatu kemampuan untuk dapat diakses pada masa yang akan datang.▪ Size (Ukuran) \\n\\n▫ Memiliki ukuran yang relatif cukup besar . \\n\\n13\\n\\nSISTEM BASIS DATA\\n\\nSistem Basis Data merupakan suatu sistem yang terdiri dari\\n\\nkumpulan file yang saling berhubungan dan memungkinkan dilakukan\\n\\npengelolaan terhadap data tersebut, sehingga dapat menyediakan\\n\\ninformasi yang dibutuhkan oleh pengguna.Sistem basis data merupakan lingkup yang lebih luas daripada basis data.\\n\\n14\\n\\nKOMPONEN SISTEM BASIS DATA (1)\\n\\n▪ Data\\n\\n- Data disimpan secara terintegrasi (integrated)\\n\\n- Data dapat dipakai secara bersama-sama (shared)\\n\\n- Integrated merupakan kumpulan dari berbagai macam file dari\\n\\nberbagai macam aplikasi yang berbeda disusun dengan cara\\n\\nmenghilangkan bagian-bagian yang rangkap (redudant).- Shared yaitu masing-masing bagian dari database dapat diakses\\n\\noleh pemakai dalam waktu yang bersamaan untuk aplikasi yang\\n\\nberbeda.\\n15\\n\\nKOMPONEN SISTEM BASIS DATA (2)\\n\\n▪ Hardware\\n\\nsemua perangkat keras yang digunakan untuk pengelolaan sistem basis data.- Perangkat jaringan dan komunikasi data (network).▪ Software\\n\\nsebagai perantara (interface) antara pemakai dengan data fisik pada database.- Database Management System (DBMS)\\n\\n- Program aplikasi-aplikasi pendukung.\\n\\n16\\n\\n17\\n\\nDATABASE MANAGEMENT SYSTEM\\n\\n18\\n\\nMESIN\\n\\nKAPASITAS\\n\\nPENGENDALI\\n\\nBAHAN BAKAR\\n\\nKEAMANAN\\n\\nTRAYEK/ JURUSAN\\n\\nPERFORMANCE\\n\\nDBMS\\n\\n▪ Database Management System (DBMS) merupakan kumpulan\\n\\nprogram aplikasi yang digunakan untuk membuat dan mengelola\\n\\nbasis data.▪ Tujuan DBMS adalah menyediakan lingkungan yang mudah dan\\n\\naman untuk penggunaan dan perawatan database.\\n\\n19\\n\\nFUNGSI DBMS\\n\\n▪ Data Definition, DBMS harus dapat mengolah\\n\\npendefinisian data.▪ Data Manipulation, DBMS harus dapat menangani\\n\\npermintaan dari pemakai untuk mengakses data.▪ Data Security & Integrity, DBMS harus dapat memeriksa\\n\\nkeamanan dan integritas data yang didefinisikan oleh DBA\", \"id\": null, \"title\": \"Pertemuan 1 - Pendahuluan Basis Data\", \"filepath\": \"https://aicstorage.blob.core.windows.net/1701746286448-courseraaaa-container/1701746409193-Pertemuan%201%20-%20Pendahuluan%20Basis%20Data_.pdf\", \"url\": \"https://aicstorage.blob.core.windows.net/1701746286448-courseraaaa-container/1701746409193-Pertemuan%201%20-%20Pendahuluan%20Basis%20Data_.pdf\", \"metadata\": {\"chunking\": \"orignal document size=3080. Scores=1.2268364Org Highlight count=110.Filtering to chunk no. 0/Highlights=57 of size=1539\"}, \"chunk_id\": \"0\"}, {\"content\": \"., M.Kom \\n\\n \\n\\nBasDat 2017-2018 \\n\\n\\n\\nPendahuluan \\n\\n• Model data E-R didasarkan pada persepsi bahwa dunia \\nnyata merupakan sekumpulan dari sejumlah obyek dasar \\n(entitas) dan relasi antar obyek-obyek data tersebut \\n\\n• Komponen pada basis data secara Konseptual : \\n\\n - Entitas \\n\\n - Atribut \\n\\n - Relationship / hubungan \\n\\n - Batasan \\n\\n \\n\\n\\n\\nDatabase Development Phases \\n\\n\\n\\nEntitas \\n\\n• Entitas (entity) adalah sebuah objek yang keberadaannya \\ndapat dibedakan terhadap objek lain \\n\\n• Entitas dapat berupa orang, benda, tempat, kejadian, \\nkonsep \\n\\n• Contoh : \\n\\n– Orang : MAHASISWA, DOSEN, PEMASOK \\n\\n– Benda : MOBIL, MESIN, RUANGAN \\n\\n– Organisasi : NEGARA, DESA \\n\\n– Kejadian : PENJUALAN, REGISTRASI \\n\\n– Konsep : REKENING \\n\\n\\n\\nAtribut \\n\\n• Atribut adalah sifat atau karakteristik yang melekat dalam \\nsebuah entitas \\n\\n• Contoh : \\n\\n– MAHASISWA = (NIM, NamaMhs, AlamatMhs) \\n\\n– MOBIL = (NoMobil, NamaMobil, Cc) \\n\\n• Setiap atribut akan memiliki nilai (values) \\n\\n• Domain (Value Set) merupakan batas-batas nilai yang \\ndiperbolehkan.Single-valued dan multi-valued attributes \\n\\n• Atribut Single-valued : Atribut yang memiliki paling \\n\\nbanyak satu nilai untuk setiap baris data \\n\\n• Multi-valued attributes : Atribut yang dapat diisi \\n\\ndengan lebih satu nilai tetapi jenisnya sama..Super Key merupakan seluruh atribut (kumpulan atribut)  yang dapat \\nmembedakan setiap baris data dalam sebuah relasi secara unik. \\n\\n2..Candidate Key merupakan kumpulan atribut minimal yang dapat \\nmembedakan setiap baris data dalam sebuah relasi secara unik \\n\\n3..Primary Key merupakan atribut kunci yang memiliki nilai unik, dan salah \\nsatu dari candidate key yang terpilih \\n\\nPemilihan primary key dari sejumlah candidate key umumnya  didasari oleh : \\n\\n• Key tersebut lebih sering (lebih natural) untuk dijadikan sebagai  acuan \\n\\n• Key tersebut lebih ringkas \\n\\n• Jaminan keunikan key tersebut lebih baik \\n\\n \\n\\n \\n\\n\\n\\nLATIHAN \\n\\n• Tentukan entitas dan atribut apa saja yang terlibat dalam sistem \\n\\ninformasi pengelolaan perpustakaan!.– Primary key dari himpunan entitas lemah dibentuk dari primary key himpunan \\nentitas (kuat) dimana enititas lemah bergantung, serta diskriminator dari \\nentitas lemah itu sendiri \\n\\n \\n\\n \\n\\n \\n\\n\\n\\nEntitas Lemah \\n• Penggambaran himpunan entitas lemah menggunakan dobel persegi \\n\\npanjang\", \"id\": null, \"title\": null, \"filepath\": \"https://aicstorage.blob.core.windows.net/1701746286448-courseraaaa-container/1701747377183-Pertemuan%203%20-%20Model%20relational%20-%20ERD.pdf\", \"url\": \"https://aicstorage.blob.core.windows.net/1701746286448-courseraaaa-container/1701747377183-Pertemuan%203%20-%20Model%20relational%20-%20ERD.pdf\", \"metadata\": {\"chunking\": \"orignal document size=3014. Scores=1.3321052Org Highlight count=9.Filtering to highlight size=927\"}, \"chunk_id\": \"0\"}], \"intent\": \"[\\\"Apa itu basis data?\\\", \\\"Definisi basis data\\\", \\\"Konsep dasar basis data\\\"]\"}"
        }
      ]
    }
  }
]