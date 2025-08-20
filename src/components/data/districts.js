const districts = [
  {
    name: "Chung",
    slug: "chung",

    link: "/chung/"
  },
  {
    name: "China Scheme",
    slug: "china-scheme",
    imageUrl: "https://psba.gop.pk/wp-content/uploads/2025/01/PMBMC-out-stores-2.png",
    link: "/china-scheme/"
  },
  {
    name: "Mian Plaza",
    slug: "mian-plaza",
    imageUrl: "https://psba.gop.pk/wp-content/uploads/2025/01/PMBMC-out-stores-3.png",
    link: "/mian-plaza/"
  },
  {
    name: "Harbanspura",
    slug: "harbanspura",
    imageUrl: "https://psba.gop.pk/wp-content/uploads/2025/01/PMBMC-out-stores-4.png",
    link: "/harbanspura/"
  },
  {
    name: "Raiwind",
    slug: "raiwind",
    imageUrl: "https://psba.gop.pk/wp-content/uploads/2025/01/PMBMC-out-stores-5.png",
    link: "/raiwind/"
  },
  {
    name: "Sabzazaar",
    slug: "sabzazaar",
    imageUrl: "https://psba.gop.pk/wp-content/uploads/2025/01/PMBMC-out-stores-6.png",
    link: "/sabzazaar/"
  },
  {
    name: "Thokar Niaz Baig",
    slug: "thokar-niaz-baig",
    imageUrl: "https://psba.gop.pk/wp-content/uploads/2025/01/PMBMC-out-stores-7.png",
    link: "/thokar-niaz-baig/"
  },
  {
    name: "Sher Shah Colony",
    slug: "sher-shah-colony",
    imageUrl: "https://psba.gop.pk/wp-content/uploads/2025/01/PMBMC-out-stores-8.png",
    link: "/sher-shah-colony/"
  },
  {
    name: "Township",
    slug: "township",
    imageUrl: "https://psba.gop.pk/wp-content/uploads/2025/01/PMBMC-out-stores-9.png",
    link: "/township/"
  },
  {
    name: "Wahdat Colony",
    slug: "wahdat-colony",
    imageUrl: "https://psba.gop.pk/wp-content/uploads/2025/01/PMBMC-out-stores-10.png",
    link: "/wahdat-colony/"
  },
  {
    name: "Sargodha",
    slug: "sargodha",
    imageUrl: "https://psba.gop.pk/wp-content/uploads/2025/01/PMBMC-out-stores-12.png",
    link: "/sargodha/"
  },
  {
    name: "Bhera",
    slug: "bhera",
    imageUrl: "https://psba.gop.pk/wp-content/uploads/2025/01/PMBMC-out-stores-11.png",
    link: "/bhera/"
  },
  {
    name: "Faisalabad",
    slug: "faisalabad1",
    imageUrl: "https://psba.gop.pk/wp-content/uploads/2025/01/PMBMC-out-stores-13.png",
    link: "/faisalabad/"
  },
  {
    name: "Taunsa Shareef",
    slug: "taunsa-shareef",
    imageUrl: "https://psba.gop.pk/wp-content/uploads/2025/01/PMBMC-out-stores-14.png",
    link: "/taunsa-shareef/"
  },
  {
    name: "Bhakkar",
    slug: "bhakkar",
    imageUrl: "https://psba.gop.pk/wp-content/uploads/2025/01/PMBMC-out-stores-15.png",
    link: "/bhakkar/"
  },
  {
    name: "Pakpattan",
    slug: "pakpattan",
    imageUrl: "https://psba.gop.pk/wp-content/uploads/2025/01/PMBMC-out-stores-16.png",
    link: "/pakpattan/"
  },
  {
    name: "Vehari",
    slug: "vehari",
    imageUrl: "https://psba.gop.pk/wp-content/uploads/2025/01/PMBMC-out-stores-18.png",
    link: "/vehari/"
  },
  {
    name: "Mianwali",
    slug: "mianwali",
    imageUrl: "https://psba.gop.pk/wp-content/uploads/2025/01/PMBMC-out-stores-17.png",
    link: "/mianwali/"
  },
  {
    name: "Sialkot",
    slug: "sialkot",
    imageUrl: "https://psba.gop.pk/wp-content/uploads/2025/01/PMBMC-out-stores-19.png",
    link: "/sialkot/"
  },
  {
    name: "D G Khan",
    slug: "dg-khan",
    imageUrl: "https://psba.gop.pk/wp-content/uploads/2025/01/PMBMC-out-stores-21.png",
    link: "/dg-khan/"
  },
  {
    name: "Farooqabad",
    slug: "farooqabad",
    imageUrl: "https://psba.gop.pk/wp-content/uploads/2025/01/PMBMC-out-stores-20.png",
    link: "/farooqabad/"
  },
  {
    name: "Sahiwal",
    slug: "sahiwal",
    imageUrl: "https://psba.gop.pk/wp-content/uploads/2025/01/PMBMC-out-stores-22.png",
    link: "/sahiwal/"
  },
  {
    name: "Toba Tek Singh",
    slug: "toba-tek-singh",
    imageUrl: "https://psba.gop.pk/wp-content/uploads/2025/01/PMBMC-out-stores-23.png",
    link: "/toba-tek-singh/"
  },
  {
    name: "Jampur",
    slug: "jampur",
    imageUrl: "https://psba.gop.pk/wp-content/uploads/2025/01/PMBMC-out-stores-24.png",
    link: "/jampur/"
  },
  {
    name: "Lodhran",
    slug: "lodhran",
    imageUrl: "https://psba.gop.pk/wp-content/uploads/2025/01/PMBMC-out-stores-25.png",
    link: "/lodhran/"
  },
  {
    name: "Layyah",
    slug: "layyah",
    imageUrl: "https://psba.gop.pk/wp-content/uploads/2025/01/PMBMC-out-stores-27.png",
    link: "/layyah/"
  },
  {
    name: "Chur Harpal",
    slug: "chur-harpal",
    imageUrl: "https://psba.gop.pk/wp-content/uploads/2025/01/PMBMC-out-stores-26.png",
    link: "/chur-harpal/"
  },
  {
    name: "Khushab",
    slug: "khushab",
    imageUrl: "https://psba.gop.pk/wp-content/uploads/2025/01/PMBMC-out-stores-28.png",
    link: "/khushab/"
  },
  {
    name: "Jhang",
    slug: "jhang",
    imageUrl: "https://psba.gop.pk/wp-content/uploads/2025/01/PMBMC-out-stores-30.png",
    link: "/jhang/"
  },
  {
    name: "Kasur",
    slug: "kasur",
    imageUrl: "https://psba.gop.pk/wp-content/uploads/2025/01/PMBMC-out-stores-29.png",
    link: "/kasur/"
  },
  {
    name: "Hafizabad",
    slug: "hafizabad",
    imageUrl: "https://psba.gop.pk/wp-content/uploads/2025/01/PMBMC-out-stores-31.png",
    link: "/hafizabad/"
  },
  {
    name: "Gujrat",
    slug: "gujrat",
    imageUrl: "https://psba.gop.pk/wp-content/uploads/2025/01/PMBMC-out-stores-33.png",
    link: "/gujrat/"
  },
  {
    name: "Gujranwala",
    slug: "gujranwala",
    imageUrl: "https://psba.gop.pk/wp-content/uploads/2025/01/PMBMC-out-stores-32.png",
    link: "/gujranwala/"
  },
  {
    name: "Chakwal",
    slug: "chakwal",
    imageUrl: "https://psba.gop.pk/wp-content/uploads/2025/01/PMBMC-out-stores-34.png",
    link: "/chakwal/"
  },
  {
    name: "Bahawalpur",
    slug: "bahawalpur",
    imageUrl: "https://psba.gop.pk/wp-content/uploads/2025/01/PMBMC-out-stores-35.png",
    link: "/bahawalpur/"
  }
];

export default districts;