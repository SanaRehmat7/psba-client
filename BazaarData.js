const bazaars = [
  {
    id: 1,
    name: "Chung",
    district: 'lahore',
    location: "Adalat Ali Shah Road, Multan Road Chung, Lahore",
    google_maps: "https://maps.google.com/maps?q=Model%20Bazaar%20Chung&t=m&z=10&output=embed&iwloc=near",
    area: "08 Kanals",
    stalls: 164,
    established: "June 2015",
    operational_days: "7 days a week (as per local requirement)",
    timings: "09:00 am – 05:00 pm",
    facilities: [
      "Specialized engineered roof structure",
      "Fresh fruits & vegetables at DC rate",
      "Good quality grocery items at market competitive rates",
      "Conducive family and business environment",
      "Neat and clean washroom facility",
      "Shopping trolleys available",
      "CCTV security",
      "Security guards",
      "Active Complaint Cell"
    ],
    special_days: ["Monday", "Friday"],
    focal_person: "Ahmad Mahi ud Din",
    contact: {
      phone: "0322-2211546",
      email: "chung@psba.gop.pk",
      helpline: "(042) 111-176-262"
    },
    description: "Located near shrine of Adalat Ali Shah in the middle of Chung area, serving Mohlanwal, Maraka, Izmir Town & Bahira Town. Features shaded roofing structure with fans during summers, plantation, and over 100 stalls. Weekly average visitors exceed 20,000 people."
  },
  {
    id: 2,
    name: "China Scheme",
    district: 'lahore',
    location: "Adda #63, Gujjar Pura, China Scheme Lahore",
    google_maps: "https://maps.google.com/maps?q=Model%20Bazaar%20China%20Scheme&t=m&z=10&output=embed&iwloc=near",
    area: "32 Kanals",
    stalls: 479,
    established: "May 2015",
    operational_days: "7 days a week (as per local requirement)",
    timings: "09:00 am – 07:00 pm",
    facilities: [
      "Specialized engineered roof structure",
      "Fresh fruits & vegetables at DC rate",
      "Quality grocery items at competitive rates",
      "Family-friendly environment",
      "Sanitized washrooms",
      "Shopping trolleys",
      "CCTV surveillance",
      "24/7 security personnel",
      "Complaint resolution center"
    ],
    special_days: ["Tuesday"],
    focal_person: "Muhammad Usman",
    contact: {
      phone: "042-37330254",
      email: "chinascheme@psba.gop.pk",
      helpline: "(042) 111-176-262"
    },
    description: "Situated near sports complex in Gujjar Pura area, serving Gujjar Pura, Kot Khawaja Saeed, Shad Bagh & Baghbanpura. Offers daily commodities at economical rates with family-friendly environment and shaded roofing structure. Weekly footfall exceeds 25,000 visitors."
  },
  {
    id: 3,
    name: "Mian Plaza Johar Town",
    district: 'lahore',
    location: "Near ALLAH hoo chowk, model bazaar mian plaza johar town, Lahore.",
    google_maps: "https://maps.google.com/maps?q=Mian%20Plaza%20Model%20Bazaar&t=m&z=10&output=embed&iwloc=near",
    area: "	08 Kanals",
    stalls: 126,
    established: "August 2015",
    operational_days: "7 days a week",
    timings: "9:00 am – 6:00 pm",
    facilities: [
      "	Vegetables & fruits, grocery items",
      "cosmetics jewellery, garments section",
      "Dedicated parking area",
      "Air-conditioned sections",
      "Branded stores",
      "Food court"
    ],
    special_days: ["Sunday"],
    focal_person: "Ahmad Ali Hashmi",
    contact: {
      phone: "042-37894561",
      email: "mianplaza@psba.gop.pk",
      helpline: "(042) 111-176-262"
    },
    description: "Modern shopping complex offering traditional bazaar items and branded products. Features a unique blend of traditional and contemporary shopping experience with air-conditioned comfort."
  },
  {
    id: 4,
    name: "Harbanspura",
    district: 'lahore',
    location: "	Near Pir Naseer Chandiyan, Harbanspura Road Lahore",
    google_maps: "https://maps.google.com/maps?q=Harbanspura%20Model%20Bazaar&t=m&z=10&output=embed&iwloc=near",
    area: "19 Kanals",
    stalls: 134,
    established: "June 2014",
    operational_days: "7 days a week",
    timings: "09:00 am – 07:00 pm",
    facilities: [
      "Spacious covered area",
      "	Vegetables & fruits, grocery items",
      "cosmetics jewellery, garments section",
      "Separate sections for different products",
      "Children's play area",
      "Food stalls",
      "Prayer area"
    ],
    special_days: ["Sunday"],
    focal_person: "Falak Sher",
    contact: {
      phone: "+92 (42) 37335669",
      email: "harbanspura@psba.gop.pk",
      helpline: "(042) 111-176-262"
    },
    description: "Serves residents of Harbanspura, Kot Abdul Malik, and adjacent areas. Features wide walkways and organized sections for different product categories with weekly footfall of 22,000+ visitors."
  },
  {
    id: 5,
    name: "Raiwind",
    district: 'lahore',
    location: "	Railway road near National Bank of Raiwind, Lahore",
    google_maps: "https://maps.google.com/maps?q=Raiwind%20Model%20Bazaar&t=m&z=10&output=embed&iwloc=near",
    area: "18 Kanals",
    stalls: 249,
    established: "December 2013",
    operational_days: "7 days a week",
    timings: "08:30 am – 07:30 pm",
    facilities: [
      "	Vegetables & fruits, grocery items",
      "cosmetics jewellery, garments section",
      "Large covered shopping area",
      "Agricultural produce section",
      "Dairy products corner",
      "Bank ATM facility",
      "Medical first-aid center"
    ],
    special_days: ["Sunday"],
    focal_person: "Ali Raza",
    contact: {
      phone: "042-37123458",
      email: "raiwind@psba.gop.pk",
      helpline: "(042) 111-176-262"
    },
    description: "Strategically located near transport terminal, serving daily commuters and local residents. Specializes in fresh agricultural produce and dairy products with over 30,000 weekly visitors."
  },
  {
    id: 6,
    name: "Sabzazaar",
    district: 'lahore',
    location: "G block, Near Sabzazaar Police Station Liaqat Chowk, Lahore",
    google_maps: "https://maps.google.com/maps?q=Sabzazaar%20Model%20Bazaar&t=m&z=10&output=embed&iwloc=near",
    area: "22 Kanals",
    stalls: 226,
    established: "September 2011",
    operational_days: "7 days a week(as per local requirement)",
    timings: "09:00 am – 05:00 pm",
    facilities: [
      "	Vegetables & fruits, grocery items",
      "cosmetics jewellery, garments section",
      "Eco-friendly design",
      "Organic produce section",
      "Recycling center"
    ],
    special_days: ["Wednesday (08:00 am – 07:00 pm)"],
    focal_person: "	Muhammad Usman",
    contact: {
      phone: "042-37495606",
      email: "sabzazaar@psba.gop.pk",
      helpline: "(042) 111-176-262"
    },
    description: "Pioneering eco-friendly bazaar with sustainable features. Specializes in organic produce and environmentally conscious products, attracting environmentally aware shoppers from across the city."
  },
  {
    id: 7,
    name: "Thokar Niaz Baig",
    district: 'lahore',
    location: "Main Boulevard, Thokar Niaz Baig, Lahore",
    google_maps: "https://maps.google.com/maps?q=Thokar%20Niaz%20Baig%20Model%20Bazaar&t=m&z=10&output=embed&iwloc=near",
    area: "17 Kanals",
    stalls: 124,
    established: "October 2012",
    operational_days: "7 days a week(as per local requirement)",
    timings: "09:00 am – 08:00 pm",
    facilities: [
      "Dedicated parking area",
      "Food court with diverse cuisines",
      "Kids play zone",
      "	Vegetables & fruits, grocery items",
      "cosmetics jewellery, garments section",
    ],
    special_days: ["Sunday"],
    focal_person: "Umer Fraz",
    contact: {
      phone: "042-37123460",
      email: "thokar@psba.gop.pk",
      helpline: "(042) 111-176-262"
    },
    description: "Serves as a major shopping hub for southern Lahore residents. Features modern amenities and diverse product range with special focus on textiles and handicrafts."
  },
  {
    id: 8,
    name: "Sher Shah Colony",
    district: 'lahore',
    location: "Model Bazaar Sher Shah Colony, Raiwind Road, Lahore",
    google_maps: "https://maps.google.com/maps?q=Sher%20Shah%20Colony%20Model%20Bazaar&t=m&z=10&output=embed&iwloc=near",
    area: "13 Kanals",
    stalls: 205,
    established: "July 2015",
    operational_days: "7 days a week(as per local requirement)",
    timings: "09:00 am – 08:00 pm",
    facilities: [
      "	Vegetables & fruits, grocery items",
      "cosmetics jewellery, garments section",
      "Public library section",
      "Artisan displays",
      "Cultural events space"
    ],
    special_days: ["Sunday"],
    focal_person: "Mehmood Ahmad",
    contact: {
      phone: "042-35321112",
      email: "shershah@psba.gop.pk",
      helpline: "(042) 111-176-262"
    },
    description: "Focuses on community development through vocational training and cultural activities. Features artisan products and hosts weekly cultural events with average 18,000 weekly visitors."
  },
  {
    id: 9,
    name: "Township",
    district: 'lahore',
    location: "	Chaudary Rehmat Ali Road, 1-C1, Township, Lahore",
    google_maps: "https://maps.google.com/maps?q=Township%20Model%20Bazaar&t=m&z=10&output=embed&iwloc=near",
    area: "54 Kanals",
    stalls: 510,
    established: "July 2011",
    operational_days: "7 days a week(as per local requirement)",
    timings: "09:00 am – 08:00 pm",
    facilities: [
      "	Vegetables & fruits, grocery items",
      "cosmetics jewellery, garments section",
      "International food court",
      "Entertainment zone",
      "Valet parking",
      "joyland"
    ],
    focal_person: "Malik Asim Ahmad Mahmood",
    contact: {
      phone: "042-35241858",
      email: "township@psba.gop.pk",
      helpline: "(042) 111-176-262"
    },
    description: "Premium shopping destination with international brands and upscale dining options. Features climate-controlled environment and luxury shopping experience."
  },
  {
    id: 10,
    name: "Wahdat Colony",
    district: 'lahore',
    location: "	Near Government Degree College for Girls Wahdat road Lahore.",
    google_maps: "https://maps.google.com/maps?q=Wahdat%20Colony%20Model%20Bazaar&t=m&z=10&output=embed&iwloc=near",
    area: "09 Kanals",
    stalls: 102,
    established: "July 2016",
    operational_days: "7 days a week",
    timings: "09:00 am – 05:00 pm",
    facilities: [
      "	Vegetables & fruits, grocery items",
      "cosmetics jewellery, garments section",
      "Differently-abled access",
      "Community kitchen",
      "Public meeting spaces"
    ],
    special_days: ["Sunday & Thursday (08:00 am – 06:00 pm)"],
    focal_person: "Muhammad Usman Naveed Anjum",
    contact: {
      phone: "042-35405414",
      email: "wahdatcolony@psba.gop.pk",
      helpline: "(042) 111-176-262"
    },
    description: "Designed with accessibility features for all community members. Focuses on inclusive shopping experience with facilities for senior citizens and differently-abled visitors."
  },
  {
    id: 11,
    name: "Sargodha",
    district: 'Sargodha Main',
    location: "Model Bazaar Sargodha, University Road Sargodha",
    google_maps: "https://maps.google.com/maps?q=Sargodha%20Model%20Bazaar&t=m&z=10&output=embed&iwloc=near",
    area: "17 Kanals",
    stalls: 186,
    established: "April 2012",
    operational_days: "7 days a week",
    timings: "03:00 pm – 10:30 pm",
    facilities: [
      "Grocery, food court, garments section",
      "Cold storage facilities",
      "Farmers' assistance center",
      "Joyland"
    ],
    Joyland_timings: "03:00 pm – 11:00 pm",
    special_days: ["-"],
    focal_person: "Shahid Imran",
    contact: {
      phone: "048-3768846",
      email: "sargodha@psba.gop.pk",
      helpline: "(042) 111-176-262"
    },
    description: "Serves agricultural community with specialized facilities for farmers. Features regional products and provides agricultural advisory services."
  },
  {
    id: 12,
    name: "Bhera",
    district: 'Sargodha',
    location: "Near Government Girls College Bhera Circular road Bhera, District Sargodha",
    google_maps: "https://maps.google.com/maps?q=Bhera%20Model%20Bazaar&t=m&z=10&output=embed&iwloc=near",
    area: "17 Kanals",
    stalls: 116,
    established: "May 2016",
    operational_days: "7 days a week",
    timings: "09:00 am – 05:00 pm",
    facilities: [
      "	Vegetables & fruits, grocery items",
      "Traditional craft workshops",
      "Cultural heritage displays",
      "Handicraft sales center",
      "Tourist information"
    ],
    special_days: ["Tuesday"],
    focal_person: "Zeeshan Haider Awan",
    contact: {
      phone: "	048-6691222",
      email: "bhera@psba.gop.pk",
      helpline: "(042) 111-176-262"
    },
    description: "Showcases cultural heritage of historic Bhera town. Features traditional crafts and hosts workshops for preserving local artisanal skills."
  },
  {
    id: 13,
    name: "Jhand Road",
    district: 'Faisalabad',
    location: "Model Bazaar Jhang Road Faisalabad.",
    google_maps: "https://maps.google.com/maps?q=Faisalabad1%20Model%20Bazaar&t=m&z=10&output=embed&iwloc=near",
    area: "103 Kanals",
    stalls: 268,
    established: "July 2012",
    operational_days: "7 days a week",
    timings: "08:00 am – 10:00 pm",
    facilities: [
      "Vegetables & Fruits",
      "Fabric wholesale market",
      "Design consultation",
      "Food Court",
      "Joyland",
      "Export quality section"
    ],
    special_days: ["-"],
    focal_person: "Zahid Imran",
    contact: {
      phone: "+92 (41) 9330335",
      email: "fsd.jhangroad@psba.gop.pk",
      helpline: "(042) 111-176-262"
    },
    Joyland_timings: "03:00 pm – 11:00 pm",
    description: "Textile hub offering fabrics from local mills at wholesale rates. Features design consultation and tailoring services for custom clothing."
  },
  {
    id: 14,
    name: "Millat Road",
    district: 'Faisalabad',
    location: "Model Bazaar Chakwal, Pinwal Road.",
    google_maps: "https://maps.google.com/maps?q=Faisalabad2%20Model%20Bazaar&t=m&z=10&output=embed&iwloc=near",
    area: "10.5 Kanals",
    stalls: 120,
    established: "April 2018",
    operational_days: "7 days a week",
    timings: "08:00 am – 09:00 pm",
    facilities: [
      "Vegetables & Fruits, Grocery",
      "Garments section",
      "Food Court",
      "Technical support center",
      "Spare parts market"
    ],
    special_days: ["Friday"],
    focal_person: "Zahid Imran",
    contact: {
      phone: "041-8767094",
      email: "fsd.millatroad@psba.gop.pk",
      helpline: "(042) 111-176-262"
    },
    description: "Industrial and agricultural supply center serving Faisalabad's manufacturing sector. Features technical support and machinery maintenance services."
  },
  {
    id: 15,
    name: "Taunsa Shareef",
    district: "Taunsa Shareef",
    location: "Mangrotha Road, Near Kalma Chowk, Taunsa Shareef.",
    google_maps: "https://maps.google.com/maps?q=Taunsa%20Shareef%20Model%20Bazaar&t=m&z=10&output=embed&iwloc=near",
    area: "7 Kanals",
    stalls: 120,
    established: "Octubar 2022",
    operational_days: "7 days a week",
    timings: "09:00 am – 06:00 pm",
    facilities: [
      "Fruit, vegetable",
      "grocery section",
      "Dairy products corner",
      "Agricultural advisory"
    ],
    special_days: ["-"],
    focal_person: "Shahid Aziz",
    contact: {
      phone: "+92 (64) 2601714",
      email: "taunsasharif@psba.gop.pk",
      helpline: "(042) 111-176-262"
    },
    description: "Serves livestock farmers with dedicated animal market and veterinary services. Features dairy products and animal feed at subsidized rates."
  },
  {
    id: 16,
    name: "Bhakkar",
    district: "Bhakkar",
    location: "Opposit Patwar Khana, Railway Road, Bhakkar.",
    google_maps: "https://maps.google.com/maps?q=Bhakkar%20Model%20Bazaar&t=m&z=10&output=embed&iwloc=near",
    area: "11 Kanals & 5 marla",
    stalls: 120,
    established: "April 2022",
    operational_days: "7 days a week",
    timings: "09:00 am – 09:00 pm",
    facilities: [
      "Desert agriculture section",
      "Water conservation display",
      "Fruit, vegetable",
      "grocery section",
      "Desert farming advisory"
    ],
    special_days: ["_"],
    focal_person: "Sheikh Zohaib Hassan ",
    contact: {
      phone: "+92 (453) 510051",
      email: "bhakkar@psba.gop.pk",
      helpline: "(042) 111-176-262"
    },
    description: "Focuses on desert agriculture techniques and water conservation. Features drought-resistant crops and solar-powered farming solutions."
  },
  {
    id: 17,
    name: "Pakpattan",
    district: "Pakpattan",
    location: "Peer Ghani Road, Pakpattan",
    google_maps: "https://maps.google.com/maps?q=Pakpattan%20Model%20Bazaar&t=m&z=10&output=embed&iwloc=near",
    area: "4 Kanals & 4 marla",
    stalls: 80,
    established: "2022",
    operational_days: "7 days a week",
    timings: "09:00 am – 07:00 pm",
    facilities: [
      "Fruit, vegetable",
      "grocery section",
      "Religious book store",
      "Pilgrim assistance center",
      "Cultural performances area"
    ],
    special_days: ["-"],
    focal_person: "Hafiz Rao Naveed Ahmad",
    contact: {
      phone: "+92 (45) 7382262",
      email: "pakpattan@psba.gop.pk",
      helpline: "(042) 111-176-262"
    },
    description: "Cultural and spiritual center near Baba Farid shrine. Features Sufi artifacts and hosts cultural performances for pilgrims and visitors."
  },
  {
    id: 18,
    name: "Vehari",
    district: "Vehari",
    location: "Purani sabzi mandi, club road vehari",
    google_maps: "https://maps.google.com/maps?q=Vehari%20Model%20Bazaar&t=m&z=10&output=embed&iwloc=near",
    area: "6.5 Kanals",
    stalls: 99,
    established: "April 2018",
    operational_days: "7 days a week",
    timings: "08:00 am – 07:00 pm",
    facilities: [
      "Cotton specialty market",
     "Fruit, vegetable",
      "grocery section",
      "Religious book store",
      "Farm machinery section"
    ],
    special_days: ["Monday"],
    focal_person: "Muhammad Mubashar Manzoor",
    contact: {
      phone: "067-3363511",
      email: "vehari@psba.gop.pk",
      helpline: "(042) 111-176-262"
    },
    description: "Serves cotton farmers and textile industry. Features agricultural inputs and farm machinery at subsidized rates for local farmers."
  },
  {
    id: 19,
    name: "Mianwali",
    district: "Mianwali",
    location: "Near general bus stand Mianwali.",
    google_maps: "https://maps.google.com/maps?q=Mianwali%20Model%20Bazaar&t=m&z=10&output=embed&iwloc=near",
    area: "22 Kanals",
    stalls: 210,
    established: "2022",
    operational_days: "7 days a week",
    timings: "09:00 am – 07:00 pm",
    facilities: [
      "Fruit, vegetable",
      "grocery section",
      "Geological displays",
      "Minerals processing demo",
      "Mining advisory services"
    ],
    special_days: ["In planning, phase II"],
    focal_person: "Shafiq-ur-Rehman",
    contact: {
      phone: "045-9231700",
      email: "mianwali@psba.gop.pk",
      helpline: "(042) 111-176-262"
    },
    description: "Showcases mineral resources of the region. Features mining equipment and geological displays with advisory services for mineral sector."
  },
  {
    id: 20,
    name: "Sialkot",
    district: "sialkot",
    location: "	Old Tehsil Building Near CIA Staff (Police Station), Tehsil Bazaar, Sialkot.",
    google_maps: "https://maps.google.com/maps?q=Sialkot%20Model%20Bazaar&t=m&z=10&output=embed&iwloc=near",
    area: "06 Kanals",
    stalls: 47,
    established: "December 2014",
    operational_days: "7 days a week",
    timings: "10:00 am – 11:00 pm",
    facilities: [
      "Sports goods section",
      "Fruit, vegetable",
      "grocery section",
    ],
    special_days: ["Monday"],
    focal_person: "Muhammad Afzaal",
    contact: {
      phone: "+92 (52) 3552322",
      email: "sialkot@psba.gop.pk",
      helpline: "(052) 111-176-262"
    },
    description: "Showcases Sialkot's export industries including sports goods and surgical instruments. Features design innovation center and export certification assistance."
  },
  {
    id: 21,
    name: "D G Khan",
    district: "dg-khan",
    location: "	Old GTS Stand Near Traffic Chowk Dera Ghazi Khan",
    google_maps: "https://maps.google.com/maps?q=DG%20Khan%20Model%20Bazaar&t=m&z=10&output=embed&iwloc=near",
    area: "48 Kanals",
    stalls: 271,
    established: "May 2016",
    operational_days: "7 days a week",
    timings: "09:00 am – 10:00 pm",
    facilities: [
      "Fruit, vegetable",
      "grocery section",
      "Date palm products",
      "Desert agriculture section",
      "Traditional crafts corner",
      "Cultural heritage displays"
    ],
    special_days: ["-"],
    focal_person: "Muhammad Ramzan",
    contact: {
      phone: "+92 (64) 2402751",
      email: "dgkhan@psba.gop.pk",
      helpline: "(042) 111-176-262"
    },
    description: "Features products from desert agriculture including dates and livestock. Showcases traditional crafts of the region with cultural heritage displays."
  },
  {
    id: 22,
    name: "Farooqabad",
    district: "sheikhupura",
    location: "Main lari adda Farooqabad",
    google_maps: "https://maps.google.com/maps?q=Farooqabad%20Model%20Bazaar&t=m&z=10&output=embed&iwloc=near",
    area: "13 Kanals",
    stalls: 120,
    established: "March 2018",
    operational_days: "7 days a week",
    timings: "08:30 am – 07:00 pm",
    facilities: [
      "Grocery, crockery, cosmetics",
      "Farm equipment rentals",
      "Crop advisory services",
      "Weather information center",
      "Agri-tech solutions"
    ],
    special_days: ["Sunday"],
    focal_person: "	Hafiz Saleem Ullah",
    contact: {
      phone: "056-3876050",
      email: "farooqabad@psba.gop.pk",
      helpline: "(042) 111-176-262"
    },
    description: "Provides agricultural solutions including machinery rentals and crop advisory services. Features weather information and agri-tech solutions for modern farming."
  },
  {
    id: 23,
    name: "Sahiwal",
    district: "sahiwal",
    location: "Railway Road Model Bazaar Sahiwal",
    google_maps: "https://maps.google.com/maps?q=Sahiwal%20Model%20Bazaar&t=m&z=10&output=embed&iwloc=near",
    area: "20 Kanals",
    stalls: 221,
    established: "August 2011",
    operational_days: "7 days a week",
    timings: "09:00 am – 08:00 pm",
    facilities: [
      "Vegetables & fruits, grocery items",
      "food court, garments",
      "Dairy products corner",
      "Cattle feed market"
    ],
    special_days: ["-"],
    focal_person: "Umer Munir",
    contact: {
      phone: "+92 (40) 4462566",
      email: "sahiwal@psba.gop.pk",
      helpline: "(042) 111-176-262"
    },
    description: "Focuses on dairy industry with livestock market and dairy processing facilities. Provides animal healthcare services and quality cattle feed."
  },
  {
    id: 24,
    name: "Toba Tek Singh",
    district: "toba-tek-sing",
    location: "	Near Government College For Women, Jhang Road, Toba Tek Singh.",
    google_maps: "https://maps.google.com/maps?q=Toba%20Tek%20Singh%20Model%20Bazaar&t=m&z=10&output=embed&iwloc=near",
    area: "14 Kanals",
    stalls: 134,
    established: "July 2012",
    operational_days: "7 days a week",
    timings: "09:00 am – 08:00 pm",
    facilities: [
      "Citrus fruits market",
      "Vegetables & fruits, grocery items",
      "Orchard equipment corner",
      "Joyland",
      "Cold storage facilities"
    ],
    special_days: ["Saturday"],
    Joyland_timings: "3:00 am – 10:00 pm",
    focal_person: "Saqib Shahzad",
    contact: {
      phone: "+92 (46) 2516900",
      email: "tobateksingh@psba.gop.pk",
      helpline: "(042) 111-176-262"
    },
    description: "Specializes in citrus fruits and orchard products. Features fruit processing facilities and horticultural advisory services for orchard owners."
  },
  {
    id: 25,
    name: "Jampur",
    district: "Rajanpur",
    location: "Old Municipal Committee near Demis Gate Jampur, District Rajanpur.",
    google_maps: "https://maps.google.com/maps?q=Jampur%20Model%20Bazaar&t=m&z=10&output=embed&iwloc=near",
    area: "11 Kanals",
    stalls: 192,
    established: "June 2015",
    operational_days: "7 days a week",
    timings: "08:00 am – 10:00 pm",
    facilities: [
      "Vegetables & fruits, grocery items",
      "Traditional pottery section",
      "Handicraft workshops",
      "Clay processing demo",
      "Joyland",
      "Cultural heritage displays"
    ],
    Joyland_timings: "03:00am to 11:00pm" ,
    special_days: ["-"],
    focal_person: "Allah Nawaz Khan",
    contact: {
      phone: "+92 (60) 4685396",
      email: "jampur@psba.gop.pk",
      helpline: "(042) 111-176-262"
    },
    description: "Promotes traditional pottery and handicrafts of the region. Features artisan workshops and cultural heritage displays with live demonstrations."
  },
  {
    id: 26,
    name: "Lodhran",
    district: "lodhran",
    location: "Main road opposite Children park Lodhran",
    google_maps: "https://maps.google.com/maps?q=Lodhran%20Model%20Bazaar&t=m&z=10&output=embed&iwloc=near",
    area: "16 Kanals",
    stalls: 112,
    established: "April 2018",
    operational_days: "7 days a week",
    timings: "09:00 am – 10:00 pm",
    facilities: [
      "Cotton market",
      "Vegetables & fruits, grocery items",
      "Agricultural advisory",
      "Joyland",
      "Farm equipment section"
    ],
    Joyland_timings: "03:00 pm – 12:00 am",
    special_days: ["-"],
    focal_person: "Rao Muzaffar Zulfiqar",
    contact: {
      phone: "+92 (60) 8546494",
      email: "lodhran@psba.gop.pk",
      helpline: "(042) 111-176-262"
    },
    description: "Serves cotton farmers with dedicated market and processing facilities. Provides agricultural advisory and crop protection solutions."
  },
  {
    id: 27,
    name: "Layyah",
    district: "layyah",
    location: "Collage road, Near DHQ Hospital, District Layyah",
    google_maps: "https://maps.google.com/maps?q=Layyah%20Model%20Bazaar&t=m&z=10&output=embed&iwloc=near",
    area: "2.9 Kanals",
    stalls: 74,
    established: "August 2016",
    operational_days: "7 days a week",
    timings: "09:00 am – 09:00 pm",
    facilities: [
      "Desert farming section",
      "Water conservation tech",
      "Drought-resistant crops",
      "Livestock market",
      "Animal healthcare center"
    ],
    special_days: ["-"],
    focal_person: "Jawad Zaheer",
    contact: {
      phone: "+92 (60) 6412633",
      email: "layyah@psba.gop.pk",
      helpline: "(042) 111-176-262"
    },
    description: "Focuses on desert agriculture and livestock farming. Features water conservation technologies and drought-resistant crop varieties."
  },
  {
    id: 28,
    name: "Chur Harpal",
    district: "Rawalpindi",
    location: "Near Women Degree College Peshawar Road Rawalpindi",
    google_maps: "https://maps.google.com/maps?q=Chur%20Harpal%20Model%20Bazaar&t=m&z=10&output=embed&iwloc=near",
    area: "03 Kanals",
    stalls: 49,
    established: "July 2014",
    operational_days: "7 days a week",
    timings: "09:00 am – 10:00 pm",
    facilities: [
      "Vegetables & fruits, grocery items",
      "Traditional weaving",
      "Cultural heritage displays",
      "Handicraft workshops",
      "Tribal art gallery"
    ],
    special_days: ["-"],
    focal_person: "Khurram Shehzad",
    contact: {
      phone: "+92 (51) 5492820",
      email: "rawalpindi@psba.gop.pk",
      helpline: "(042) 111-176-262"
    },
    description: "Showcases tribal crafts and cultural heritage of the region. Features traditional weaving workshops and tribal art displays."
  },
  {
    id: 29,
    name: "Khushab",
    district: "khushab",
    location: "	Main Maiwali Road Jauharabad Tehsil & District Khushab.",
    google_maps: "https://maps.google.com/maps?q=Khushab%20Model%20Bazaar&t=m&z=10&output=embed&iwloc=near",
    area: "16 Kanals",
    stalls: 145,
    established: "May 2017",
    operational_days: "7 days a week",
    timings: "09:00 am – 11:00 pm",
    facilities: [
      "Salt products section",
      "Garments section",
      "Mining equipment corner",
      "Joyland",
      "Mineral processing demo"
    ],
    Joyland_timings: "4:00p.m to 11:00pm",
    special_days: ["Friday"],
    focal_person: "Muhammad Zia",
    contact: {
      phone: "045-4721165",
      email: "khushab@psba.gop.pk",
      helpline: "(042) 111-176-262"
    },
    description: "Features salt and mineral products from the region. Provides geological information and mining equipment for local industry."
  },
  {
    id: 30,
    name: "Jhang",
    district: "Jhang",
    location: "Near kalma Chowk, Gojra road, Jhang.",
    google_maps: "https://maps.google.com/maps?q=Jhang%20Model%20Bazaar&t=m&z=10&output=embed&iwloc=near",
    area: "11 Kanals",
    stalls: 120,
    established: "April 2018",
    operational_days: "7 days a week",
    timings: "09:00 am – 09:00 pm",
    facilities: [
      "Vegetables & Fruits, Grocery",
      "Dairy products section",
      "Livestock corner",
      "Veterinary services",
      "Joyland"
    ],
    Joyland_timings: "03:00pm to 11:00pm",
    special_days: ["Wednesday (09:00am to 11:00pm)"],
    focal_person: "Iftikhar Iqbal",
    contact: {
      phone: "+92 (47) 7500757",
      email: "jhang@psba.gop.pk",
      helpline: "(042) 111-176-262"
    },
    description: "Comprehensive agricultural market serving farmers in the Chenab region. Features livestock section and veterinary services."
  },
  {
    id: 31,
    name: "Kasur",
    district: "kasur",
    location: "Noor Mahal Cinema Road, Purana Bus Stand Kasur City Tehsil & District Kasur",
    google_maps: "https://maps.google.com/maps?q=Kasur%20Model%20Bazaar&t=m&z=10&output=embed&iwloc=near",
    area: "27 Kanals",
    stalls: 164,
    established: "Octobar 2014",
    operational_days: "7 days a week",
    timings: "09:00 am – 10:00 pm",
    facilities: [
      "Leather products section",
      "Footwear manufacturing corner",
      "Tanning process demo",
      "Design innovation center",
      "Export quality products"
    ],
    special_days: ["Friday & Tuesday"],
    focal_person: "Tahir Mehmood",
    contact: {
      phone: "049-2728625",
      email: "kasur@psba.gop.pk",
      helpline: "(042) 111-176-262"
    },
    description: "Specializes in leather products and footwear manufacturing. Features tanning demonstrations and design innovation center."
  },
  {
    id: 32,
    name: "Hafizabad",
    district: "hafizabad",
    location: "Ali Pur road Hafizabad",
    google_maps: "https://maps.google.com/maps?q=Hafizabad%20Model%20Bazaar&t=m&z=10&output=embed&iwloc=near",
    area: "16 Kanals",
    stalls: 201,
    established: "September 2016",
    operational_days: "7 days a week",
    timings: "09:00 am – 06:00 pm",
    facilities: [
      "Vegetables & fruits, grocery",
      "Rice processing section",
      "Grain storage solutions",
      "Agricultural advisory",
      "Export quality products"
    ],
    special_days: ["Sunday"],
    focal_person: "Raza Hussain",
    contact: {
      phone: "+92 (54) 7520200",
      email: "hafizabad@psba.gop.pk",
      helpline: "(054) 111-176-262"
    },
    description: "Specializes in rice products and processing. Features grain storage solutions and export quality rice varieties from the region."
  },
  {
    id: 23,
    name: "Gujrat",
    district: "gujrat",
    location: "Opposite General Bus Stand G.T Road Gujrat",
    google_maps: "https://maps.google.com/maps?q=Gujrat%20Model%20Bazaar&t=m&z=10&output=embed&iwloc=near",
    area: "23 Kanals",
    stalls: 254,
    established: "March 2012",
    operational_days: "7 days a week",
    timings: "09:00 am – 09:00 pm",
    facilities: [
      "Furniture specialty section",
      "Clay pottery corner",
      "Handicraft workshops",
      "Design innovation center",
      "Export assistance"
    ],
    special_days: ["-"],
    focal_person: "Raheel Anwer",
    contact: {
      phone: "+92 (53) 3729642",
      email: "gujrat@psba.gop.pk",
      helpline: "(042) 111-176-262"
    },
    description: "Showcases Gujrat's furniture and pottery industries. Features handicraft workshops and design innovation center with export assistance."
  },
  {
    id: 34,
    name: "Gujranwala",
    district: "gujranwala",
    location: "Kashmir Road, Peoples Colony Gujranwala.",
    google_maps: "https://maps.google.com/maps?q=Gujranwala%20Model%20Bazaar&t=m&z=10&output=embed&iwloc=near",
    area: "47 Kanals",
    stalls: 653,
    established: "July 2011",
    operational_days: "7 days a week",
    timings: "09:00 am – 05:00 pm",
    facilities: [
      "Vegetables & Fruits, Grocery",
      "Joyland",
      "Electrical appliances",
      "Industrial tools corner",
      "Export quality products"
    ],
    Joyland_timings: "11:00am to 11:00pm",
    special_days: ["Tuesday, Friday & Sunday (09:00a.m to 06:30p.m)"],
    focal_person: "Aadil Sajjad Mureed",
    contact: {
      phone: "055-37123487",
      email: "gujranwala@psba.gop.pk",
      helpline: "(042) 111-176-262"
    },
    description: "Features Gujranwala's industrial products including sports goods, cutlery, and electrical appliances. Focuses on export quality merchandise."
  },
  {
    id: 35,
    name: "Chakwal",
    district: "Chakwal",
    location: "Model Bazaar Chakwal, Pinwal Road.",
    google_maps: "https://maps.google.com/maps?q=Chakwal%20Model%20Bazaar&t=m&z=10&output=embed&iwloc=near",
    area: "10.5 Kanals",
    stalls: 120,
    established: "April 2018",
    operational_days: "7 days a week",
    timings: "08:00 am – 09:00 pm",
    facilities: [
      "Vegetables & Fruits, Grocery",
      "Marble and granite display",
      "Mining equipment corner",
      "Geological information",
      "Stone processing demo"
    ],
    special_days: ["Friday"],
    focal_person: "Zeeshan-ul-Hassan",
    contact: {
      phone: "+92 (54) 3550126",
      email: "chakwal@psba.gop.pk",
      helpline: "(042) 111-176-262"
    },
    description: "Showcases mineral resources including marble and granite. Features stone processing demonstrations and mining equipment."
  },
  {
    id: 36,
    name: "Bahawalpur",
    district: "bahawalpur",
    location: "Dring Stadium Road, Near TMA office Bahawalpur.",
    google_maps: "https://maps.google.com/maps?q=Bahawalpur%20Model%20Bazaar&t=m&z=10&output=embed&iwloc=near",
    area: "25 Kanals",
    stalls: 210,
    established: "August 2011",
    operational_days: "7 days a week",
    timings: "09:00 am – 09:00 pm",
    facilities: [
      "Vegetables & fruits, grocery items",
      "Sindhi handicrafts",
      "Cultural heritage center",
      "Desert agriculture section",
      "Traditional textile corner"
    ],
    special_days: ["-"],
    focal_person: "Qasim Hussain",
    contact: {
      phone: "+92 (62) 2785299",
      email: "bahawalpur@psba.gop.pk",
      helpline: "(042) 111-176-262"
    },
    description: "Features products from Cholistan desert including dates and traditional textiles. Showcases Sindhi handicrafts and cultural heritage."
  }
];

export default bazaars;
