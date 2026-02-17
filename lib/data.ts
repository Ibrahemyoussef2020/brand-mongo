import bcrypt from 'bcryptjs';

const data = {
    users:[
        {
            name:'Ibrahim Youssef',
            email:'ibra@yo.com',
            password:bcrypt.hashSync('Ibrahim123'),
            isAdmin:true
        },
        {
            name:'Ali Syed',
            email:'Ali@Syed.com',
            password:bcrypt.hashSync('Ali123'),
            isAdmin:false
        }
    ],
    dealOffers:[
      {
        static_id: "deal-1",
        title:{
          en:"Smart watches",
          ar:"ساعات ذكية"
        },
        discount: "-25%",
        category: {
          en: "watches",
          ar: "ساعات"
        },
        description: {
          en: "Your Fitness will be more clear handled & more safe with our machine you body more better , Book quickly Before stock runs out",
          ar: "ستكون لياقتك البدنية أكثر وضوحاً وأماناً مع أجهزتنا، جسمك سيكون أفضل، احجز بسرعة قبل نفاذ الكمية"
        },
        image: "images/watch-9",
        brand: { en: "xiaomi", ar: "شاومي" },
        avgRating: 2,
        ratings: 140,
        price: 1300,
        oldPrice: 1600,
        badge: {
          en: "seller",
          ar: "الأكثر مبيعاً"
        },
        free_delivery: false,
        color: {
          en: "medium black",
          ar: "أسود متوسط"
        },
        to_home: true,
        premium_offer: true,
        has_discount: true,
        verified: true
      },
      {
        static_id: "deal-2",
        title: {
          en: "Computers",
          ar: "كمبيوترات"
        },
        discount: "-16%",
        category: {
          en: "computers",
          ar: "كمبيوترات"
        },
        description: {
          en: "Your Fitness will be more clear handled & more safe with our machine you body more better , Book quickly Before stock runs out",
          ar: "ستكون لياقتك البدنية أكثر وضوحاً وأماناً مع أجهزتنا، جسمك سيكون أفضل، احجز بسرعة قبل نفاذ الكمية"
        },
        image: "images/computer-cat-5",
        brand: { en: "samsung", ar: "سامسونج" },
        avgRating: 4,
        ratings: 150,
        price: 800,
        oldPrice: 800,
        badge: {
          en: "choice",
          ar: "اختيارنا"
        },
        free_delivery: false,
        color: {
          en: "cyan",
          ar: "سماوي"
        },
        to_home: false,
        premium_offer: false,
        has_discount: false,
        verified: false
      },
      {
        static_id: "deal-3",
        title: {
          en: "GoPro cameras",
          ar: "كاميرات جو برو"
        },
        discount: "-40%",
        category: {
          en: "cameras",
          ar: "كاميرات"
        },
        description: {
          en: "Your Fitness will be more clear handled & more safe with our machine you body more better , Book quickly Before stock runs out",
          ar: "ستكون لياقتك البدنية أكثر وضوحاً وأماناً مع أجهزتنا، جسمك سيكون أفضل، احجز بسرعة قبل نفاذ الكمية"
        },
        image: "images/camera-9",
        brand: { en: "tigger", ar: "تيجر" },
        avgRating: 3,
        ratings: 150,
        price: 500,
        oldPrice: 800,
        badge: {
          en: "limited",
          ar: "لفترة محدودة"
        },
        free_delivery: true,
        color: {
          en: "medium black",
          ar: "أسود متوسط"
        },
        to_home: false,
        premium_offer: true,
        has_discount: true,
        verified: false
      },
      {
        static_id: "deal-4",
        title: {
          en: "Headphones",
          ar: "سماعات"
        },
        discount: "-25%",
        category: {
          en: "headphones",
          ar: "سماعات"
        },
        description: {
          en: "Your Fitness will be more clear handled & more safe with our machine you body more better , Book quickly Before stock runs out",
          ar: "ستكون لياقتك البدنية أكثر وضوحاً وأماناً مع أجهزتنا، جسمك سيكون أفضل، احجز بسرعة قبل نفاذ الكمية"
        },
        image: "images/headphones-12",
        brand: { en: "apple", ar: "أبل" },
        avgRating: 5,
        ratings: 135,
        price: 10050,
        oldPrice: 10200,
        badge: {
          en: "seller",
          ar: "الأكثر مبيعاً"
        },
        free_delivery: true,
        color: {
          en: "light black",
          ar: "أسود فاتح"
        },
        to_home: false,
        premium_offer: true,
        has_discount: true,
        verified: true
      },
      {
        static_id: "deal-5",
        title: {
          en: "Mobile phones",
          ar: "موبايلات"
        },
        discount: "-25%",
        category: {
          en: "mobiles",
          ar: "موبايلات"
        },
        description: {
          en: "Your Fitness will be more clear handled & more safe with our machine you body more better , Book quickly Before stock runs out",
          ar: "ستكون لياقتك البدنية أكثر وضوحاً وأماناً مع أجهزتنا، جسمك سيكون أفضل، احجز بسرعة قبل نفاذ الكمية"
        },
        image: "images/mobile-7",
        brand: { en: "dell", ar: "ديل" },
        avgRating: 2,
        ratings: 110,
        price: 70,
        oldPrice: 70,
        free_delivery: true,
        color: {
          en: "light black",
          ar: "أسود فاتح"
        },
        to_home: true,
        premium_offer: false,
        has_discount: false,
        verified: true
      }
    ],
    homeOutdoor:[
      {
       static_id: "home-categorys-1",
        title: {
          en: "Soft chairs",
          ar: "كراسي مريحة"
        },
        category: {
          en: "chairs",
          ar: "كراسي"
        },
        description: {
          en: "Your Fitness will be more clear handled & more safe with our machine you body more better , Book quickly Before stock runs out",
          ar: "ستكون لياقتك البدنية أكثر وضوحاً وأماناً مع أجهزتنا، جسمك سيكون أفضل، احجز بسرعة قبل نفاذ الكمية"
        },
        image: "images/chair-5",
        brand: { en: "hp", ar: "اتش بي" },
        avgRating: 5,
        ratings: 140,
        price: 800,
        oldPrice: 1200,
        badge: {
          en: "seller",
          ar: "الأكثر مبيعاً"
        },
        free_delivery: false,
        color: {
          en: "silver",
          ar: "فضي"
        },
        to_home: true,
        premium_offer: true,
        has_discount: true,
        verified: true
      },
      {
       static_id: "home-categorys-2",
        title: {
          en: "Abagoras & Vazes",
          ar: "أباجورات وفازات"
        },
        category: {
          en: "vazes",
          ar: "فازات"
        },
        description: {
          en: "Your Fitness will be more clear handled & more safe with our machine you body more better , Book quickly Before stock runs out",
          ar: "ستكون لياقتك البدنية أكثر وضوحاً وأماناً مع أجهزتنا، جسمك سيكون أفضل، احجز بسرعة قبل نفاذ الكمية"
        },
        image: "images/vaze-7",
        brand: { en: "dell", ar: "ديل" },
        avgRating: 4,
        ratings: 150,
        price: 1100,
        oldPrice: 1100,
        badge: {
          en: "choice",
          ar: "اختيارنا"
        },
        free_delivery: false,
        color: {
          en: "cyan",
          ar: "سماوي"
        },
        to_home: false,
        premium_offer: false,
        has_discount: false,
        verified: false
      },
      {
       static_id: "home-categorys-3",
        title: {
          en: "Kitchen machine",
          ar: "أجهزة مطبخ"
        },
        category: {
          en: "appliaces",
          ar: "أجهزة منزلية"
        },
        description: {
          en: "Your Fitness will be more clear handled & more safe with our machine you body more better , Book quickly Before stock runs out",
          ar: "ستكون لياقتك البدنية أكثر وضوحاً وأماناً مع أجهزتنا، جسمك سيكون أفضل، احجز بسرعة قبل نفاذ الكمية"
        },
        image: "images/dish-9",
        brand: { en: "samsung", ar: "سامسونج" },
        avgRating: 3,
        ratings: 120,
        price: 850,
        oldPrice: 1200,
        badge: {
          en: "limited",
          ar: "لفترة محدودة"
        },
        free_delivery: true,
        color: {
          en: "gray",
          ar: "رمادي"
        },
        to_home: false,
        premium_offer: false,
        has_discount: true
      },
      {
       static_id: "home-categorys-4",
        title: {
          en: "Vazes & Abagoras",
          ar: "فازات وأباجورات"
        },
        category: {
          en: "vazes",
          ar: "فازات"
        },
        description: {
          en: "Your Fitness will be more clear handled & more safe with our machine you body more better , Book quickly Before stock runs out",
          ar: "ستكون لياقتك البدنية أكثر وضوحاً وأماناً مع أجهزتنا، جسمك سيكون أفضل، احجز بسرعة قبل نفاذ الكمية"
        },
        image: "images/vaze-6",
        brand: { en: "hp", ar: "اتش بي" },
        avgRating: 5,
        ratings: 134,
        price: 200,
        oldPrice: 200,
        badge: {
          en: "seller",
          ar: "الأكثر مبيعاً"
        },
        free_delivery: true,
        color: {
          en: "dark black",
          ar: "أسود داكن"
        },
        to_home: false,
        premium_offer: true,
        has_discount: false,
        verified: true
      },
      {
       static_id: "home-categorys-5",
        title: {
          en: "Kitchen mixer & B",
          ar: "خلاط مطبخ"
        },
        category: {
          en: "kitchen-tools",
          ar: "أدوات مطبخ"
        },
        image: "images/kitchen-tools-8",
        brand: { en: "zanussi", ar: "زانوسي" },
        description: {
          en: "Your Houes will be more easy handled & more safe with our machine you life more better , Book quickly Before stock runs out",
          ar: "سيكون منزلك أكثر سهولة وأماناً مع أجهزتنا، حياتك ستكون أفضل، احجز بسرعة قبل نفاذ الكمية"
        },
        avgRating: 5,
        ratings: 877,
        price: 2500,
        oldPrice: 2000.99,
        badge: {
          en: "choice",
          ar: "اختيارنا"
        },
        free_delivery: true,
        color: {
          en: "yellow white",
          ar: "أبيض مائل للأصفر"
        },
        to_home: true,
        premium_offer: true,
        has_discount: true,
        verified: true
      },
      {
       static_id: "home-categorys-6",
        title: {
          en: "Blenders & mixers",
          ar: "خلاطات"
        },
        category: {
          en: "kitchen-tools",
          ar: "أدوات مطبخ"
        },
        image: "images/kitchen-tools-1",
        brand: { en: "sharp", ar: "شارب" },
        description: {
          en: "Your Houes will be more easy handled & more safe with our machine you life more better , Book quickly Before stock runs out",
          ar: "سيكون منزلك أكثر سهولة وأماناً مع أجهزتنا، حياتك ستكون أفضل، احجز بسرعة قبل نفاذ الكمية"
        },
        avgRating: 2,
        ratings: 29283,
        price: 10,
        oldPrice: 20,
        badge: {
          en: "seller",
          ar: "الأكثر مبيعاً"
        },
        free_delivery: false,
        color: {
          en: "light white",
          ar: "أبيض فاتح"
        },
        to_home: true,
        premium_offer: false,
        has_discount: true,
        verified: true
      },
      {
       static_id: "home-categorys-7",
        title: {
          en: "Offic appliance",
          ar: "أجهزة مكتبية"
        },
        category: {
          en: "chairs",
          ar: "كراسي"
        },
        image: "images/14",
        brand: { en: "tornado", ar: "تورنيدو" },
        description: {
          en: "Your Houes will be more easy handled & more safe with our machine you life more better , Book quickly Before stock runs out",
          ar: "سيكون منزلك أكثر سهولة وأماناً مع أجهزتنا، حياتك ستكون أفضل، احجز بسرعة قبل نفاذ الكمية"
        },
        avgRating: 5,
        ratings: 877,
        price: 3000,
        oldPrice: 3500.99,
        badge: {
          en: "seller",
          ar: "الأكثر مبيعاً"
        },
        free_delivery: false,
        color: {
          en: "silver",
          ar: "فضي"
        },
        to_home: false,
        premium_offer: true,
        has_discount: true,
        verified: true
      },
      {
       static_id: "home-categorys-8",
        title: {
          en: "Offic appliance",
          ar: "أجهزة مكتبية"
        },
        category: {
          en: "chairs",
          ar: "كراسي"
        },
        image: "images/14",
        brand: { en: "tornado", ar: "تورنيدو" },
        description: {
          en: "Your Houes will be more easy handled & more safe with our machine you life more better , Book quickly Before stock runs out",
          ar: "سيكون منزلك أكثر سهولة وأماناً مع أجهزتنا، حياتك ستكون أفضل، احجز بسرعة قبل نفاذ الكمية"
        },
        avgRating: 5,
        ratings: 402,
        price: 4000,
        oldPrice: 4500.99,
        badge: {
          en: "choice",
          ar: "اختيارنا"
        },
        free_delivery: false,
        color: {
          en: "light white",
          ar: "أبيض فاتح"
        },
        to_home: false,
        premium_offer: true,
        has_discount: true,
        verified: false
      }
    ],
    homeConsumer:[
      {
        static_id: "consumer-categorys-1",
        title: {
          en: "Smart watches",
          ar: "ساعات ذكية"
        },
        category: {
          en: "watches",
          ar: "ساعات"
        },
        image: "images/watch-9",
        brand: { en: "sharp", ar: "شارب" },
        description: {
          en: "Your Houes will be more easy handled & more safe with our machine you life more better , Book quickly Before stock runs out",
          ar: "سيكون منزلك أكثر سهولة وأماناً مع أجهزتنا، حياتك ستكون أفضل، احجز بسرعة قبل نفاذ الكمية"
        },
        avgRating: 2,
        ratings: 29283,
        price: 10,
        oldPrice: 20,
        badge: {
          en: "seller",
          ar: "الأكثر مبيعاً"
        },
        free_delivery: false,
        color: {
          en: "light black",
          ar: "أسود فاتح"
        },
        to_home: true,
        premium_offer: false,
        has_discount: true,
        verified: true
      },
      {
        static_id: "consumer-categorys-2",
        title: {
          en: "Cameras",
          ar: "كاميرات"
        },
        category: {
          en: "cameras",
          ar: "كاميرات"
        },
        image: "images/camera-9",
        brand: { en: "zanussi", ar: "زانوسي" },
        description: {
          en: "Your Houes will be more easy handled & more safe with our machine you life more better , Book quickly Before stock runs out",
          ar: "سيكون منزلك أكثر سهولة وأماناً مع أجهزتنا، حياتك ستكون أفضل، احجز بسرعة قبل نفاذ الكمية"
        },
        avgRating: 5,
        ratings: 877,
        price: 190,
        oldPrice: 200,
        badge: {
          en: "choice",
          ar: "اختيارنا"
        },
        free_delivery: true,
        color: {
          en: "browen white",
          ar: "بني مائل للأبيض"
        },
        to_home: true,
        premium_offer: true,
        has_discount: true,
        verified: true
      },
      {
        static_id: "consumer-categorys-3",
        title: {
          en: "Headphones",
          ar: "سماعات"
        },
        category: {
          en: "headphones",
          ar: "سماعات"
        },
        image: "images/headphones-12",
        brand: { en: "zanussi", ar: "زانوسي" },
        description: {
          en: "Your Houes will be more easy handled & more safe with our machine you life more better , Book quickly Before stock runs out",
          ar: "سيكون منزلك أكثر سهولة وأماناً مع أجهزتنا، حياتك ستكون أفضل، احجز بسرعة قبل نفاذ الكمية"
        },
        avgRating: 4,
        ratings: 2993,
        price: 380,
        oldPrice: 380,
        badge: {
          en: "limited",
          ar: "لفترة محدودة"
        },
        free_delivery: false,
        color: {
          en: "browen",
          ar: "بني"
        },
        to_home: true,
        premium_offer: true,
        has_discount: false,
        verified: false
      },
      {
        static_id: "consumer-categorys-4",
        title: {
          en: "Sports",
          ar: "رياضة"
        },
        category: {
          en: "sports",
          ar: "رياضة"
        },
        image: "images/sport-6",
        brand: { en: "sharp", ar: "شارب" },
        description: {
          en: "Your Houes will be more easy handled & more safe with our machine you life more better , Book quickly Before stock runs out",
          ar: "سيكون منزلك أكثر سهولة وأماناً مع أجهزتنا، حياتك ستكون أفضل، احجز بسرعة قبل نفاذ الكمية"
        },
        avgRating: 5,
        ratings: 885,
        price: 3900.9,
        oldPrice: 4200.99,
        badge: {
          en: "limited",
          ar: "لفترة محدودة"
        },
        free_delivery: true,
        color: {
          en: "cyan",
          ar: "سماوي"
        },
        to_home: true,
        premium_offer: true,
        has_discount: true,
        verified: false
      },
      {
        static_id: "consumer-categorys-5",
        title: {
          en: "Gaming set",
          ar: "مجموعة ألعاب"
        },
        category: {
          en: "headphones",
          ar: "سماعات"
        },
        image: "images/headphones-10",
        brand: { en: "toshiba", ar: "توشيبا" },
        description: {
          en: "Your Houes will be more easy handled & more safe with our machine you life more better , Book quickly Before stock runs out",
          ar: "سيكون منزلك أكثر سهولة وأماناً مع أجهزتنا، حياتك ستكون أفضل، احجز بسرعة قبل نفاذ الكمية"
        },
        avgRating: 5,
        ratings: 877,
        price: 3000,
        oldPrice: 3500.99,
        badge: {
          en: "seller",
          ar: "الأكثر مبيعاً"
        },
        free_delivery: false,
        color: {
          en: "light black",
          ar: "أسود فاتح"
        },
        to_home: false,
        premium_offer: true,
        has_discount: true,
        verified: false
      },
      {
        static_id: "consumer-categorys-6",
        title: {
          en: "Laptops & PC",
          ar: "لابتوبات وكمبيوترات"
        },
        category: {
          en: "computers",
          ar: "كمبيوترات"
        },
        image: "images/computer-cat-5",
        brand: { en: "zanussi", ar: "زانوسي" },
        description: {
          en: "Your Houes will be more easy handled & more safe with our machine you life more better , Book quickly Before stock runs out",
          ar: "سيكون منزلك أكثر سهولة وأماناً مع أجهزتنا، حياتك ستكون أفضل، احجز بسرعة قبل نفاذ الكمية"
        },
        avgRating: 4,
        ratings: 62749,
        price: 4000,
        oldPrice: 4200.99,
        badge: {
          en: "seller",
          ar: "الأكثر مبيعاً"
        },
        free_delivery: false,
        color: {
          en: "black",
          ar: "أسود"
        },
        to_home: true,
        premium_offer: true,
        has_discount: true,
        verified: false
      },
      {
        static_id: "consumer-categorys-7",
        title: {
          en: "Tablets & Phones",
          ar: "تابلت وموبايلات"
        },
        category: {
          en: "phones",
          ar: "هواتف"
        },
        image: "images/mobile-10",
        brand: { en: "tornado", ar: "تورنيدو" },
        description: {
          en: "Your Houes will be more easy handled & more safe with our machine you life more better , Book quickly Before stock runs out",
          ar: "سيكون منزلك أكثر سهولة وأماناً مع أجهزتنا، حياتك ستكون أفضل، احجز بسرعة قبل نفاذ الكمية"
        },
        avgRating: 5,
        ratings: 29283,
        price: 450,
        oldPrice: 950,
        badge: {
          en: "seller",
          ar: "الأكثر مبيعاً"
        },
        free_delivery: true,
        color: {
          en: "white black",
          ar: "أبيض وأسود"
        },
        to_home: false,
        premium_offer: true,
        has_discount: false,
        verified: true
      },
      {
        static_id: "consumer-categorys-8",
        title: {
          en: "Smart phone",
          ar: "موبايل ذكي"
        },
        category: {
          en: "phones",
          ar: "هواتف"
        },
        image: "images/mobile-9",
        brand: { en: "xiaomi", ar: "شاومي" },
        description: {
          en: "Your Houes will be more easy handled & more safe with our machine you life more better , Book quickly Before stock runs out",
          ar: "سيكون منزلك أكثر سهولة وأماناً مع أجهزتنا، حياتك ستكون أفضل، احجز بسرعة قبل نفاذ الكمية"
        },
        avgRating: 2,
        ratings: 140,
        price: 1300,
        oldPrice: 1600,
        badge: {
          en: "seller",
          ar: "الأكثر مبيعاً"
        },
        free_delivery: false,
        color: {
          en: "medium black",
          ar: "أسود متوسط"
        },
        to_home: true,
        premium_offer: true,
        has_discount: true,
        verified: true
      }
    ],
    recomendedItem:[
      {
        static_id: 1,
        title: {
          en: "soft milton 100%",
          ar: "سويت شيرت ميلتون 100%"
        },
        type: {
          en: "T-shirt",
          ar: "تي شيرت"
        },
        category: {
          en: "fashion",
          ar: "أزياء"
        },
        image: "images/fashion-1",
        attribute: {
          en: "Hardcover",
          ar: "غلاف فني"
        },
        brand: { en: "poma", ar: "بوما" },
        description: {
          en: "The 2023 edition takes readers on a journey that's out of this world! ",
          ar: "تأخذك طبعة 2023 في رحلة خارج هذا العالم!"
        },
        avgRating: 5,
        ratings: 929,
        price: 80.5,
        oldPrice: 120,
        badge: {
          en: "choice",
          ar: "اختيارنا"
        },
        discount: {
          en: "discount up to 30%",
          ar: "خصم يصل إلى 30%"
        },
        link: {
          en: "Deal",
          ar: "صفقة"
        },
        free_delivery: true,
        color: {
          en: "pink",
          ar: "وردي"
        },
        to_home: false,
        premium_offer: true,
        has_discount: true
      },
      {
        static_id: 2,
        title: {
          en: "Browen Jaket",
          ar: "جاكيت بني"
        },
        type: {
          en: "jaket",
          ar: "جاكيت"
        },
        category: {
          en: "fashion",
          ar: "أزياء"
        },
        image: "images/fashion-3",
        brand: { en: "poma", ar: "بوما" },
        description: {
          en: "Give them the simplest cookbook ever this Christmas . . . Jamie's back to basics with over 120 simple, delicious, ONE pan recipes",
          ar: "امنحهم أبسط كتاب طهي على الإطلاق في هذا الكريسماس... جيمي يعود إلى الأساسيات مع أكثر من 120 وصفة بسيطة ولذيذة"
        },
        avgRating: 4,
        ratings: 2993,
        price: 13,
        oldPrice: 23,
        badge: {
          en: "choice",
          ar: "اختيارنا"
        },
        discount: {
          en: "discount up to 12%",
          ar: "خصم يصل إلى 12%"
        },
        link: {
          en: "Offer",
          ar: "عرض"
        },
        free_delivery: false,
        color: {
          en: "browen",
          ar: "بني"
        },
        to_home: true,
        premium_offer: false,
        has_discount: true
      },
      {
        static_id: 3,
        title: {
          en: "calssic blue bag",
          ar: "حقيبة زرقاء كلاسيكية"
        },
        type: {
          en: "bag",
          ar: "حقيبة"
        },
        category: {
          en: "fashion",
          ar: "أزياء"
        },
        image: "images/fashion-10",
        description: {
          en: "Except trouble is never far away where the Thursday Murder Club is concerned. ",
          ar: "المشاكل لا تكون بعيدة أبداً عندما يتعلق الأمر بنادي الخميس للجرائم."
        },
        brand: { en: "lacoste", ar: "لاكوست" },
        avgRating: 5,
        ratings: 29283,
        price: 10,
        oldPrice: 20,
        discount: {
          en: "discount up to 8%",
          ar: "خصم يصل إلى 8%"
        },
        link: {
          en: "Deal",
          ar: "صفقة"
        },
        free_delivery: false,
        color: {
          en: "white",
          ar: "أبيض"
        },
        to_home: false,
        premium_offer: false,
        has_discount: true
      },
      {
        static_id: 4,
        title: {
          en: "blue Jaket of suite",
          ar: "جاكيت بدلة أزرق"
        },
        type: {
          en: "jaket",
          ar: "جاكيت"
        },
        category: {
          en: "fashion",
          ar: "أزياء"
        },
        image: "images/fashion-16",
        description: {
          en: "Want to impress your friends and family with both useful, worthless but undeniably interesting facts? ",
          ar: "هل تريد إثارة إعجاب أصدقائك وعائلتك بحقائق مفيدة وغير مفيدة ولكنها مثيرة للاهتمام بلا شك؟"
        },
        brand: { en: "lacoste", ar: "لاكوست" },
        avgRating: 4,
        ratings: 885,
        price: 100.9,
        oldPrice: 130.99,
        badge: {
          en: "limited",
          ar: "لفترة محدودة"
        },
        discount: {
          en: "discount up to 100$",
          ar: "خصم يصل إلى 100 دولار"
        },
        link: {
          en: "Deal",
          ar: "صفقة"
        },
        free_delivery: false,
        color: {
          en: "blue",
          ar: "أزرق"
        },
        to_home: true,
        premium_offer: true,
        has_discount: true
      },
      {
        static_id: 5,
        title: {
          en: "school blue bag",
          ar: "حقيبة مدرسة زرقاء"
        },
        type: {
          en: "bag",
          ar: "حقيبة"
        },
        category: {
          en: "fashion",
          ar: "أزياء"
        },
        image: "images/fashion-5",
        description: {
          en: "Colleen_Hoover tells fan favourite Atlas’s side of the story and shares what comes next in this long-anticipated sequel to the #1 Sunday Times bestseller It Ends with Us ",
          ar: "تروي كولين هوفر جانب أطلس من القصة وتشاركنا ما سيحدث لاحقاً في هذا التتمة المنتظرة."
        },
        brand: { en: "zara", ar: "زارا" },
        avgRating: 3,
        ratings: 4402,
        price: 1,
        oldPrice: 14.99,
        badge: {
          en: "choice",
          ar: "اختيارنا"
        },
        discount: {
          en: "discount up to 30%",
          ar: "خصم يصل إلى 30%"
        },
        link: {
          en: "Offer",
          ar: "عرض"
        },
        free_delivery: true,
        color: {
          en: "linear-gradient(to bottom right,cyan,white,pink)",
          ar: "تدرج (سماوي، أبيض، وردي)"
        },
        to_home: false,
        premium_offer: false,
        has_discount: true
      },
      {
        static_id: 6,
        title: {
          en: "jeans blue short",
          ar: "شورت جينز أزرق"
        },
        type: {
          en: "short",
          ar: "شورت"
        },
        category: {
          en: "fashion",
          ar: "أزياء"
        },
        image: "images/fashion-4",
        description: {
          en: "Colleen_Hoover tells fan favourite Atlas’s side of the story and shares what comes next in this long-anticipated sequel to the #1 Sunday Times bestseller It Ends with Us ",
          ar: "تروي كولين هوفر جانب أطلس من القصة وتشاركنا ما سيحدث لاحقاً في هذا التتمة المنتظرة."
        },
        brand: { en: "lacoste", ar: "لاكوست" },
        avgRating: 3,
        ratings: 877,
        price: 8,
        oldPrice: 14.99,
        badge: {
          en: "choice",
          ar: "اختيارنا"
        },
        discount: {
          en: "discount up to 130$",
          ar: "خصم يصل إلى 130 دولار"
        },
        link: {
          en: "Deal",
          ar: "صفقة"
        },
        free_delivery: false,
        color: {
          en: "gray",
          ar: "رمادي"
        },
        to_home: true,
        premium_offer: false,
        has_discount: true
      },
      {
        static_id: 7,
        title: {
          en: "Headset for gaming with mic",
          ar: "سماعة ألعاب مع ميكروفون"
        },
        type: {
          en: "head-phone",
          ar: "سماعة رأس"
        },
        category: {
          en: "fashion",
          ar: "أزياء"
        },
        image: "images/headphones-12",
        description: {
          en: "Colleen_Hoover tells fan favourite Atlas’s side of the story and shares what comes next in this long-anticipated sequel to the #1 Sunday Times bestseller It Ends with Us ",
          ar: "تروي كولين هوفر جانب أطلس من القصة وتشاركنا ما سيحدث لاحقاً في هذا التتمة المنتظرة."
        },
        brand: { en: "tigger", ar: "تيجر" },
        avgRating: 4,
        ratings: 62749,
        price: 8,
        oldPrice: 12.99,
        discount: {
          en: "discount up to 24%",
          ar: "خصم يصل إلى 24%"
        },
        link: {
          en: "Deal",
          ar: "صفقة"
        },
        free_delivery: false,
        color: {
          en: "black",
          ar: "أسود"
        },
        to_home: true,
        premium_offer: false,
        has_discount: true
      },
      {
        static_id: 8,
        title: {
          en: "school blue bag",
          ar: "حقيبة مدرسة زرقاء"
        },
        type: {
          en: "bag",
          ar: "حقيبة"
        },
        category: {
          en: "fashion",
          ar: "أزياء"
        },
        image: "images/fashion-5",
        description: {
          en: "Colleen_Hoover tells fan favourite Atlas’s side of the story and shares what comes next in this long-anticipated sequel to the #1 Sunday Times bestseller It Ends with Us ",
          ar: "تروي كولين هوفر جانب أطلس من القصة وتشاركنا ما سيحدث لاحقاً في هذا التتمة المنتظرة."
        },
        brand: { en: "zara", ar: "زارا" },
        avgRating: 3,
        ratings: 4402,
        price: 1,
        oldPrice: 14.99,
        badge: {
          en: "choice",
          ar: "اختيارنا"
        },
        discount: {
          en: "discount up to 30%",
          ar: "خصم يصل إلى 30%"
        },
        link: {
          en: "Offer",
          ar: "عرض"
        },
        free_delivery: false,
        color: {
          en: "linear-gradient(to right top,lightgreen,gray)",
          ar: "تدرج (أخضر فاتح، رمادي)"
        },
        to_home: true,
        premium_offer: true,
        has_discount: true
      },
      {
        static_id: 9,
        title: {
          en: "Browen calssic vaze",
          ar: "فازة بني كلاسيكية"
        },
        type: {
          en: "vaze",
          ar: "فازة"
        },
        category: {
          en: "vazes",
          ar: "فازات"
        },
        image: "images/vaze-6",
        attribute: {
          en: "Streaming Device",
          ar: "جهاز بث"
        },
        description: {
          en: "Our most affordable Fire TV Stick—enjoy fast streaming in Full HD. Comes with Alexa Voice Remote Lite. Easy to set up, stays hidden—plug in behind your TV, turn on the TV and connect to the internet to get set up. ",
          ar: "Fire TV Stick الأكثر اقتصادية - استمتع ببث سريع بجودة Full HD. يأتي مع Alexa Voice Remote Lite."
        },
        brand: { en: "beauty", ar: "بيوتي" },
        avgRating: 4,
        ratings: 17602,
        price: 15.99,
        oldPrice: 20.99,
        badge: {
          en: "choice",
          ar: "اختيارنا"
        },
        discount: {
          en: "discount up to 10%",
          ar: "خصم يصل إلى 10%"
        },
        link: {
          en: "Offer",
          ar: "عرض"
        },
        free_delivery: true,
        color: {
          en: "browen",
          ar: "بني"
        },
        to_home: false,
        premium_offer: false,
        has_discount: true
      },
      {
        static_id: 10,
        title: {
          en: "Large black kattel",
          ar: "غلاية سوداء كبيرة"
        },
        type: {
          en: "shooses",
          ar: "غلايات"
        },
        category: {
          en: "kitchen-tools",
          ar: "أدوات مطبخ"
        },
        image: "images/kitchen-tools-7",
        description: {
          en: "Kattel; Larg; hugo boss. 100% Cotton. Machine Wash. Fastening: Pull On. Collar Style: Classic. Slim Fit",
          ar: "غلاية؛ كبيرة؛ هيوجو بوس. 100% قطن."
        },
        brand: { en: "toshiba", ar: "توشيبا" },
        avgRating: 3,
        ratings: 10,
        price: 19.95,
        oldPrice: 45,
        discount: {
          en: "discount up to 15%",
          ar: "خصم يصل إلى 15%"
        },
        link: {
          en: "Deal",
          ar: "صفقة"
        },
        free_delivery: false,
        color: {
          en: "black",
          ar: "أسود"
        },
        to_home: true,
        premium_offer: true,
        has_discount: true
      }
    ],
    flags:[
      {
        static_id: 1,
        image: "images/flags/1",
        title: {
          en: "Denmark",
          ar: "الدنمارك"
        },
        description: "shopname.ae-ex"
      },
      {
        static_id: 2,
        image: "images/flags/2",
        title: {
          en: "Australia",
          ar: "أستراليا"
        },
        description: "shopname.ae-ex"
      },
      {
        static_id: 3,
        image: "images/flags/3",
        title: {
          en: "France",
          ar: "فرنسا"
        },
        description: "shopname.ae-ex"
      },
      {
        static_id: 4,
        image: "images/flags/4",
        title: {
          en: "United States",
          ar: "الولايات المتحدة"
        },
        description: "shopname.ae-ex"
      },
      {
        static_id: 5,
        image: "images/flags/5",
        title: {
          en: "Russia",
          ar: "روسيا"
        },
        description: "shopname.ae-ex"
      },
      {
        static_id: 6,
        image: "images/flags/6",
        title: {
          en: "China",
          ar: "الصين"
        },
        description: "shopname.ae-ex"
      },
      {
        static_id: 7,
        image: "images/flags/7",
        title: {
          en: "Italy",
          ar: "إيطاليا"
        },
        description: "shopname.ae-ex"
      },
      {
        static_id: 8,
        image: "images/flags/8",
        title: {
          en: "England",
          ar: "إنجلترا"
        },
        description: "shopname.ae-ex"
      },
      {
        static_id: 9,
        image: "images/flags/7",
        title: {
          en: "Italy",
          ar: "إيطاليا"
        },
        description: "shopname.ae-ex"
      },
      {
        static_id: 10,
        image: "images/flags/5",
        title: {
          en: "Russia",
          ar: "روسيا"
        },
        description: "shopname.ae-ex"
      }
    ],
    products:[
        {
            static_id:"deal-1",
            title:{
              en: "Smart watches medium black",
              ar: "ساعات ذكية أسود متوسط"
            },
            discount:"-25%",
            category:{
              en: "watches",
              ar: "ساعات"
            },
            description: {
              en: "Your Fitness will be more clear handled & more safe with our machine you body more better , Book quickly Before stock runs out",
              ar: "ستكون لياقتك البدنية أكثر وضوحاً وأماناً مع أجهزتنا، جسمك سيكون أفضل، احجز بسرعة قبل نفاذ الكمية"
            },
            image:"images/watch-9",
            brand: { en: "xiaomi", ar: "شاومي" },
            avgRating: 2,
            ratings: 140,
            price: 1300,
            oldPrice: 1600,
            badge: {
              en: "seller",
              ar: "الأكثر مبيعاً"
            },
            free_delivery: false,
            color: {
              en: "medium black",
              ar: "أسود متوسط"
            },
            to_home: true,
            premium_offer: true,
            has_discount: true,
            verified:true
        },
        {
            static_id:"deal-2",
            title:{
              en: "Computers",
              ar: "كمبيوترات"
            },
            discount:"-16%",
            category:{
              en: "computers",
              ar: "كمبيوترات"
            },
            description: {
              en: "Your Fitness will be more clear handled & more safe with our machine you body more better , Book quickly Before stock runs out",
              ar: "ستكون لياقتك البدنية أكثر وضوحاً وأماناً مع أجهزتنا، جسمك سيكون أفضل، احجز بسرعة قبل نفاذ الكمية"
            },
            image:"images/computer-cat-5",
            brand: { en: "samsung", ar: "سامسونج" },
            avgRating: 4,
            ratings: 150,
            price: 800,
            oldPrice: 800,
            badge: {
              en: "choice",
              ar: "اختيارنا"
            },
            free_delivery: false,
            color: {
              en: "cyan",
              ar: "سماوي"
            },
            to_home: false,
            premium_offer: false,
            has_discount: false,
            verified:false
        },
        {
            static_id:"deal-3",
            title:{
              en: "GoPro cameras",
              ar: "كاميرات جو برو"
            },
            discount:"-40%",
            category:{
              en: "cameras",
              ar: "كاميرات"
            },
            description: {
              en: "Your Fitness will be more clear handled & more safe with our machine you body more better , Book quickly Before stock runs out",
              ar: "ستكون لياقتك البدنية أكثر وضوحاً وأماناً مع أجهزتنا، جسمك سيكون أفضل، احجز بسرعة قبل نفاذ الكمية"
            },
            image:"images/camera-9",
            brand: { en: "tigger", ar: "تيجر" },
            avgRating: 3,
            ratings: 150,
            price: 500,
            oldPrice: 800,
            badge: {
              en: "limited",
              ar: "لفترة محدودة"
            },
            free_delivery: true,
            color: {
              en: "medium black",
              ar: "أسود متوسط"
            },
            to_home: false,
            premium_offer: true,
            has_discount: true,
            verified:false
        },
        {
            static_id:"deal-4",
            title:{
              en: "Headphone light black",
              ar: "سماعة رأس أسود فاتح"
            },
            discount:"-25%",
            category:{
              en: "headphones",
              ar: "سماعات"
            },
            description: {
              en: "Your Fitness will be more clear handled & more safe with our machine you body more better , Book quickly Before stock runs out",
              ar: "ستكون لياقتك البدنية أكثر وضوحاً وأماناً مع أجهزتنا، جسمك سيكون أفضل، احجز بسرعة قبل نفاذ الكمية"
            },
            image:"images/headphones-12",
            brand: { en: "apple", ar: "أبل" },
            avgRating: 5,
            ratings: 135,
            price: 10050,
            oldPrice: 10200,
            badge: {
              en: "seller",
              ar: "الأكثر مبيعاً"
            },
            free_delivery: true,
            color: {
              en: "light black",
              ar: "أسود فاتح"
            },
            to_home: false,
            premium_offer: true,
            has_discount: true,
            verified:true
        },
        {
            static_id:"deal-5",
            title:{
              en: "Mobile phones",
              ar: "موبايلات"
            },
            discount:"-25%",
            category:{
              en: "mobiles",
              ar: "موبايلات"
            },
            description: {
              en: "Your Fitness will be more clear handled & more safe with our machine you body more better , Book quickly Before stock runs out",
              ar: "ستكون لياقتك البدنية أكثر وضوحاً وأماناً مع أجهزتنا، جسمك سيكون أفضل، احجز بسرعة قبل نفاذ الكمية"
            },
            image:"images/mobile-7",
            brand: { en: "dell", ar: "ديل" },
            avgRating: 2,
            ratings: 110,
            price: 70,
            oldPrice: 70,
            free_delivery: true,
            color: {
              en: "light black",
              ar: "أسود فاتح"
            },
            to_home: true,
            premium_offer: false,
            has_discount: false,
            verified:true
        },
      {
            static_id:"home-categorys-1",
            title:{
              en: "Soft chairs",
              ar: "كراسي مريحة"
            },
            category:{
              en: "chairs",
              ar: "كراسي"
            },
            description: {
              en: "Your Fitness will be more clear handled & more safe with our machine you body more better , Book quickly Before stock runs out",
              ar: "ستكون لياقتك البدنية أكثر وضوحاً وأماناً مع أجهزتنا، جسمك سيكون أفضل، احجز بسرعة قبل نفاذ الكمية"
            },
            image:"images/chair-5",
            brand: { en: "hp", ar: "اتش بي" },
            avgRating: 5,
            ratings: 140,
            price: 800,
            oldPrice: 1200,
            badge: {
              en: "seller",
              ar: "الأكثر مبيعاً"
            },
            free_delivery: false,
            color: {
              en: "silver",
              ar: "فضي"
            },
            to_home: true,
            premium_offer: true,
            has_discount: true,
            verified:true
        },
        {
            static_id:"home-categorys-2",
            title:{
              en: "Abagoras & Vazes",
              ar: "أباجورات وفازات"
            },
            category:{
              en: "vazes",
              ar: "فازات"
            },
            description: {
              en: "Your Fitness will be more clear handled & more safe with our machine you body more better , Book quickly Before stock runs out",
              ar: "ستكون لياقتك البدنية أكثر وضوحاً وأماناً مع أجهزتنا، جسمك سيكون أفضل، احجز بسرعة قبل نفاذ الكمية"
            },
            image:"images/vaze-7",
            brand: { en: "dell", ar: "ديل" },
            avgRating: 4,
            ratings: 150,
            price: 1100,
            oldPrice: 1100,
            badge: {
              en: "choice",
              ar: "اختيارنا"
            },
            free_delivery: false,
            color: {
              en: "cyan",
              ar: "سماوي"
            },
            to_home: false,
            premium_offer: false,
            has_discount: false,
            verified:false
        },
        {
            static_id:"home-categorys-3",
            title:{
              en: "Kitchen machine",
              ar: "أجهزة مطبخ"
            },
            category:{
              en: "appliaces",
              ar: "أجهزة منزلية"
            },
            description: {
              en: "Your Fitness will be more clear handled & more safe with our machine you body more better , Book quickly Before stock runs out",
              ar: "ستكون لياقتك البدنية أكثر وضوحاً وأماناً مع أجهزتنا، جسمك سيكون أفضل، احجز بسرعة قبل نفاذ الكمية"
            },
            image:"images/dish-9",
            brand: { en: "samsung", ar: "سامسونج" },
            avgRating: 3,
            ratings: 120,
            price: 850,
            oldPrice: 1200,
            badge: {
              en: "limited",
              ar: "لفترة محدودة"
            },
            free_delivery: true,
            color: {
              en: "gray",
              ar: "رمادي"
            },
            to_home: false,
            premium_offer: false,
            has_discount: true
        },
        {
            static_id:"home-categorys-4",
            title:{
              en: "Vazes & Abagoras",
              ar: "فازات وأباجورات"
            },
            category:{
              en: "vazes",
              ar: "فازات"
            },
            description: {
              en: "Your Fitness will be more clear handled & more safe with our machine you body more better , Book quickly Before stock runs out",
              ar: "ستكون لياقتك البدنية أكثر وضوحاً وأماناً مع أجهزتنا، جسمك سيكون أفضل، احجز بسرعة قبل نفاذ الكمية"
            },
            image:"images/vaze-6",
            brand: { en: "hp", ar: "اتش بي" },
            avgRating: 5,
            ratings: 134,
            price: 200,
            oldPrice: 200,
            badge: {
              en: "seller",
              ar: "الأكثر مبيعاً"
            },
            free_delivery: true,
            color: {
              en: "dark black",
              ar: "أسود داكن"
            },
            to_home: false,
            premium_offer: true,
            has_discount: false,
            verified:true
        },
        {
            static_id:"home-categorys-5",
            title:{
              en: "Kitchen mixer & B",
              ar: "خلاط مطبخ"
            },
            category:{
              en: "kitchen-tools",
              ar: "أدوات مطبخ"
            },
            image:"images/kitchen-tools-8",
            brand: { en: "zanussi", ar: "زانوسي" },
            description: {
              en: "Your Houes will be more easy handled & more safe with our machine you life more better , Book quickly Before stock runs out",
              ar: "سيكون منزلك أكثر سهولة وأماناً مع أجهزتنا، حياتك ستكون أفضل، احجز بسرعة قبل نفاذ الكمية"
            },
            avgRating: 5,
            ratings: 877,
            price: 2500,
            oldPrice: 2000.99,
            badge: {
              en: "choice",
              ar: "اختيارنا"
            },
            free_delivery: true,
            color: {
              en: "yellow white",
              ar: "أبيض مائل للأصفر"
            },
            to_home: true,
            premium_offer: true,
            has_discount: true,
            verified:true
        },
        {
            static_id:"home-categorys-6",
            title:{
              en: "Blenders & mixers",
              ar: "خلاطات"
            },
            category:{
              en: "kitchen-tools",
              ar: "أدوات مطبخ"
            },
            image:"images/kitchen-tools-1",
            brand: { en: "sharp", ar: "شارب" },
            description: {
              en: "Your Houes will be more easy handled & more safe with our machine you life more better , Book quickly Before stock runs out",
              ar: "سيكون منزلك أكثر سهولة وأماناً مع أجهزتنا، حياتك ستكون أفضل، احجز بسرعة قبل نفاذ الكمية"
            },
            avgRating: 2,
            ratings: 29283,
            price: 10,
            oldPrice: 20,
            badge: {
              en: "seller",
              ar: "الأكثر مبيعاً"
            },
            free_delivery: false,
            color: {
              en: "light white",
              ar: "أبيض فاتح"
            },
            to_home: true,
            premium_offer: false,
            has_discount: true,
            verified:true
        },
        {
            static_id:"home-categorys-7",
            title:{
              en: "Offic appliance 7",
              ar: "أجهزة مكتبية 7"
            },
            category:{
              en: "chairs",
              ar: "كراسي"
            },
            image:"images/14",
            brand: { en: "tornado", ar: "تورنيدو" },
            description: {
              en: "Your Houes will be more easy handled & more safe with our machine you life more better , Book quickly Before stock runs out",
              ar: "سيكون منزلك أكثر سهولة وأماناً مع أجهزتنا، حياتك ستكون أفضل، احجز بسرعة قبل نفاذ الكمية"
            },
            avgRating: 5,
            ratings: 877,
            price: 3000,
            oldPrice: 3500.99,
            badge: {
              en: "seller",
              ar: "الأكثر مبيعاً"
            },
            free_delivery: false,
            color: {
              en: "silver",
              ar: "فضي"
            },
            to_home: false,
            premium_offer: true,
            has_discount: true,
            verified:true
        },
        {
            static_id:"home-categorys-8",
            title:{
              en: "Offic appliance 8",
              ar: "أجهزة مكتبية 8"
            },
            category:{
              en: "chairs",
              ar: "كراسي"
            },
            image:"images/14",
            brand: { en: "tornado", ar: "تورنيدو" },
            description: {
              en: "Your Houes will be more easy handled & more safe with our machine you life more better , Book quickly Before stock runs out",
              ar: "سيكون منزلك أكثر سهولة وأماناً مع أجهزتنا، حياتك ستكون أفضل، احجز بسرعة قبل نفاذ الكمية"
            },
            avgRating: 5,
            ratings: 402,
            price: 4000,
            oldPrice: 4500.99,
            badge: {
              en: "choice",
              ar: "اختيارنا"
            },
            free_delivery: false,
            color: {
              en: "light white",
              ar: "أبيض فاتح"
            },
            to_home: false,
            premium_offer: true,
            has_discount: true,
            verified:false
        },
         {
            static_id:"consumer-categorys-1",
            title:{
              en: "Smart watches light black",
              ar: "ساعات ذكية أسود فاتح"
            },
            category:{
              en: "watches",
              ar: "ساعات"
            },
            image:"images/watch-9",
            brand: { en: "sharp", ar: "شارب" },
            description: {
              en: "Your Houes will be more easy handled & more safe with our machine you life more better , Book quickly Before stock runs out",
              ar: "سيكون منزلك أكثر سهولة وأماناً مع أجهزتنا، حياتك ستكون أفضل، احجز بسرعة قبل نفاذ الكمية"
            },
            avgRating: 2,
            ratings: 29283,
            price: 10,
            oldPrice: 20,
            badge: {
              en: "seller",
              ar: "الأكثر مبيعاً"
            },
            free_delivery: false,
            color: {
              en: "light black",
              ar: "أسود فاتح"
            },
            to_home: true,
            premium_offer: false,
            has_discount: true,
            verified:true
        },
        {
            static_id:"consumer-categorys-2",
            title:{
              en: "Cameras",
              ar: "كاميرات"
            },
            category:{
              en: "cameras",
              ar: "كاميرات"
            },
            image:"images/camera-9",
            brand: { en: "zanussi", ar: "زانوسي" },
            description: {
              en: "Your Houes will be more easy handled & more safe with our machine you life more better , Book quickly Before stock runs out",
              ar: "سيكون منزلك أكثر سهولة وأماناً مع أجهزتنا، حياتك ستكون أفضل، احجز بسرعة قبل نفاذ الكمية"
            },
            avgRating: 5,
            ratings: 877,
            price: 190,
            oldPrice: 200,
            badge: {
              en: "choice",
              ar: "اختيارنا"
            },
            free_delivery: true,
            color: {
              en: "browen white",
              ar: "أبيض بني"
            },
            to_home: true,
            premium_offer: true,
            has_discount: true,
            verified:true
        },
        {
            static_id:"consumer-categorys-3",
            title:{
              en: "Headphones large browen",
              ar: "سماعات رأس بني كبير"
            },
            category:{
              en: "headphones",
              ar: "سماعات"
            },
            image:"images/headphones-12",
            brand: { en: "zanussi", ar: "زانوسي" },
            description: {
              en: "Your Houes will be more easy handled & more safe with our machine you life more better , Book quickly Before stock runs out",
              ar: "سيكون منزلك أكثر سهولة وأماناً مع أجهزتنا، حياتك ستكون أفضل، احجز بسرعة قبل نفاذ الكمية"
            },
            avgRating: 4,
            ratings: 2993,
            price: 380,
            oldPrice: 380,
            badge: {
              en: "limited",
              ar: "لفترة محدودة"
            },
            free_delivery: false,
            color: {
              en: "browen",
              ar: "بني"
            },
            to_home: true,
            premium_offer: true,
            has_discount: false,
            verified:false
        },
        {
            static_id:"consumer-categorys-4",
            title:{
              en: "Sports",
              ar: "رياضة"
            },
            category:{
              en: "sports",
              ar: "رياضة"
            },
            image:"images/sport-6",
            brand: { en: "sharp", ar: "شارب" },
            description: {
              en: "Your Houes will be more easy handled & more safe with our machine you life more better , Book quickly Before stock runs out",
              ar: "سيكون منزلك أكثر سهولة وأماناً مع أجهزتنا، حياتك ستكون أفضل، احجز بسرعة قبل نفاذ الكمية"
            },
            avgRating: 5,
            ratings: 885,
            price: 3900.9,
            oldPrice: 4200.99,
            badge: {
              en: "limited",
              ar: "لفترة محدودة"
            },
            free_delivery: true,
            color: {
              en: "cyan",
              ar: "سماوي"
            },
            to_home: true,
            premium_offer: true,
            has_discount: true,
            verified:false
        },
        {
            static_id:"consumer-categorys-5",
            title:{
              en: "Gaming set",
              ar: "طقم ألعاب"
            },
            category:{
              en: "headphones",
              ar: "سماعات"
            },
            image:"images/headphones-10",
            brand: { en: "toshiba", ar: "توشيبا" },
            description: {
              en: "Your Houes will be more easy handled & more safe with our machine you life more better , Book quickly Before stock runs out",
              ar: "سيكون منزلك أكثر سهولة وأماناً مع أجهزتنا، حياتك ستكون أفضل، احجز بسرعة قبل نفاذ الكمية"
            },
            avgRating: 5,
            ratings: 877,
            price: 3000,
            oldPrice: 3500.99,
            badge: {
              en: "seller",
              ar: "الأكثر مبيعاً"
            },
            free_delivery: false,
            color: {
              en: "light black",
              ar: "أسود فاتح"
            },
            to_home: false,
            premium_offer: true,
            has_discount: true,
            verified:false
        },
        {
            static_id:"consumer-categorys-6",
            title:{
              en: "Laptops & PC",
              ar: "لابتوبات وكمبيوترات"
            },
            category:{
              en: "computers",
              ar: "كمبيوترات"
            },
            image:"images/computer-cat-5",
            brand: { en: "zanussi", ar: "زانوسي" },
            description: {
              en: "Your Houes will be more easy handled & more safe with our machine you life more better , Book quickly Before stock runs out",
              ar: "سيكون منزلك أكثر سهولة وأماناً مع أجهزتنا، حياتك ستكون أفضل، احجز بسرعة قبل نفاذ الكمية"
            },
            avgRating: 4,
            ratings: 62749,
            price: 4000,
            oldPrice: 4200.99,
            badge: {
              en: "seller",
              ar: "الأكثر مبيعاً"
            },
            free_delivery: false,
            color: {
              en: "black",
              ar: "أسود"
            },
            to_home: true,
            premium_offer: true,
            has_discount: true,
            verified:false
        },
        {
            static_id:"consumer-categorys-7",
            title:{
              en: "Tablets & Phones",
              ar: "تابلت وموبايلات"
            },
            category:{
              en: "phones",
              ar: "هواتف"
            },
            image:"images/mobile-10",
            brand: { en: "tornado", ar: "تورنيدو" },
            description: {
              en: "Your Houes will be more easy handled & more safe with our machine you life more better , Book quickly Before stock runs out",
              ar: "سيكون منزلك أكثر سهولة وأماناً مع أجهزتنا، حياتك ستكون أفضل، احجز بسرعة قبل نفاذ الكمية"
            },
            avgRating: 5,
            ratings: 29283,
            price: 450,
            oldPrice: 950,
            badge: {
              en: "seller",
              ar: "الأكثر مبيعاً"
            },
            free_delivery: true,
            color: {
              en: "white black",
              ar: "أبيض أسود"
            },
            to_home: false,
            premium_offer: true,
            has_discount: false,
            verified:true
        },
        {
            static_id:"consumer-categorys-8",
            title:{
              en: "Smart phone",
              ar: "موبايل ذكي"
            },
            category:{
              en: "phones",
              ar: "هواتف"
            },
            image:"images/mobile-9",
            brand: { en: "xiaomi", ar: "شاومي" },
            description: {
              en: "Your Houes will be more easy handled & more safe with our machine you life more better , Book quickly Before stock runs out",
              ar: "سيكون منزلك أكثر سهولة وأماناً مع أجهزتنا، حياتك ستكون أفضل، احجز بسرعة قبل نفاذ الكمية"
            },
            avgRating: 2,
            ratings: 140,
            price: 1300,
            oldPrice: 1600,
            badge: {
              en: "seller",
              ar: "الأكثر مبيعاً"
            },
            free_delivery: false,
            color: {
              en: "medium black",
              ar: "أسود متوسط"
            },
            to_home: true,
            premium_offer: true,
            has_discount: true,
            verified:true
        },
       {
            static_id: "fashion-1",
            title: {
              en: "soft milton 100%",
              ar: "سويت شيرت ميلتون 100%"
            },
            type: {
              en: "T-shirt",
              ar: "تي شيرت"
            },
            category: {
              en: "fashion",
              ar: "أزياء"
            },
            image: "images/fashion-1",
            brand: { en: "poma", ar: "بوما" },
            description: {
              en: "The 2023 edition takes readers on a journey that's out of this world! ",
              ar: "تأخذك طبعة 2023 في رحلة خارج هذا العالم!"
            },
            avgRating: 5,
            ratings: 929,
            price: 80.5,
            oldPrice: 120,
            badge: {
              en: "choice",
              ar: "اختيارنا"
            },
            discount: {
              en: "discount up to 30%",
              ar: "خصم يصل إلى 30%"
            },
            link: {
              en: "Deal",
              ar: "صفقة"
            },
            free_delivery: true,
            color: {
              en: "pink",
              ar: "وردي"
            },
            to_home: false,
            premium_offer: true,
            has_discount: true
        },
        {
            static_id:"fashion-2",
            title: {
              en: "Browen Jaket",
              ar: "جاكيت بني"
            },
            type: {
              en: "jaket",
              ar: "جاكيت"
            },
            category: {
              en: "fashion",
              ar: "أزياء"
            },
            image: "images/fashion-3",
            brand: { en: "poma", ar: "بوما" },
            description: {
              en: "Give them the simplest cookbook ever this Christmas . . . Jamie's back to basics with over 120 simple, delicious, ONE pan recipes",
              ar: "امنحهم أبسط كتاب طهي على الإطلاق في هذا الكريسماس... جيمي يعود إلى الأساسيات"
            },
            avgRating: 4,
            ratings: 2993,
            price: 13,
            oldPrice: 23,
            badge: {
              en: "choice",
              ar: "اختيارنا"
            },
            discount: {
              en: "discount up to 12%",
              ar: "خصم يصل إلى 12%"
            },
            link: {
              en: "Offer",
              ar: "عرض"
            },
            free_delivery: false,
            color: {
              en: "browen",
              ar: "بني"
            },
            to_home: true,
            premium_offer: false,
            has_discount: true
        },
        {
            static_id:"fashion-3",
            title: {
              en: "calssic blue bag",
              ar: "حقيبة زرقاء كلاسيكية"
            },
            type: {
              en: "bag",
              ar: "حقيبة"
            },
            category: {
              en: "fashion",
              ar: "أزياء"
            },
            image: "images/fashion-10",
            description: {
              en: "Except trouble is never far away where the Thursday Murder Club is concerned. ",
              ar: "المشاكل لا تكون بعيدة أبداً عندما يتعلق الأمر بنادي الخميس للجرائم."
            },
            brand: { en: "lacoste", ar: "لاكوست" },
            avgRating: 5,
            ratings: 29283,
            price: 10,
            oldPrice: 20,
            discount: {
              en: "discount up to 8%",
              ar: "خصم يصل إلى 8%"
            },
            link: {
              en: "Deal",
              ar: "صفقة"
            },
            free_delivery: false,
            color: {
              en: "white",
              ar: "أبيض"
            },
            to_home: false,
            premium_offer: false,
            has_discount: true
        },
        {
            static_id:"fashion-4",
            title: {
              en: "blue Jaket of suite",
              ar: "جاكيت بدلة أزرق"
            },
            type: {
              en: "jaket",
              ar: "جاكيت"
            },
            category: {
              en: "fashion",
              ar: "أزياء"
            },
            image: "images/fashion-16",
            description: {
              en: "Want to impress your friends and family with both useful, worthless but undeniably interesting facts? ",
              ar: "هل تريد إثارة إعجاب أصدقائك وعائلتك بحقائق مثيرة للاهتمام؟"
            },
            brand: { en: "lacoste", ar: "لاكوست" },
            avgRating: 4,
            ratings: 885,
            price: 100.9,
            oldPrice: 130.99,
            badge: {
              en: "limited",
              ar: "لفترة محدودة"
            },
            discount: {
              en: "discount up to 100$",
              ar: "خصم يصل إلى 100 دولار"
            },
            link: {
              en: "Deal",
              ar: "صفقة"
            },
            free_delivery: false,
            color: {
              en: "blue",
              ar: "أزرق"
            },
            to_home: true,
            premium_offer: true,
            has_discount: true
        },
        {
            static_id:"fashion-5",
            title: {
              en: "school blue bag",
              ar: "حقيبة مدرسة زرقاء"
            },
            type: {
              en: "bag",
              ar: "حقيبة"
            },
            category: {
              en: "fashion",
              ar: "أزياء"
            },
            image: "images/fashion-5",
            description: {
              en: "Colleen_Hoover tells fan favourite Atlass side of the story and shares what comes next in this long-anticipated sequel to the #1 Sunday Times bestseller It Ends with Us ",
              ar: "تروي كولين هوفر جانب أطلس من القصة..."
            },
            brand: { en: "zara", ar: "زارا" },
            avgRating: 3,
            ratings: 4402,
            price: 1,
            oldPrice: 14.99,
            badge: {
              en: "choice",
              ar: "اختيارنا"
            },
            discount: {
              en: "discount up to 30%",
              ar: "خصم يصل إلى 30%"
            },
            link: {
              en: "Offer",
              ar: "عرض"
            },
            free_delivery: true,
            color: {
              en: "linear-gradient(to bottom right,cyan,white,pink)",
              ar: "تدرج (سماوي، أبيض، وردي)"
            },
            to_home: false,
            premium_offer: false,
            has_discount: true
        },
        {
            static_id:"fashion-6",
            title: {
              en: "jeans blue short",
              ar: "شورت جينز أزرق"
            },
            type: {
              en: "short",
              ar: "شورت"
            },
            category: {
              en: "fashion",
              ar: "أزياء"
            },
            image: "images/fashion-4",
            description: {
              en: "Colleen_Hoover tells fan favourite Atlass side of the story and shares what comes next in this long-anticipated sequel to the #1 Sunday Times bestseller It Ends with Us ",
              ar: "تروي كولين هوفر جانب أطلس من القصة..."
            },
            brand: { en: "lacoste", ar: "لاكوست" },
            avgRating: 3,
            ratings: 877,
            price: 8,
            oldPrice: 14.99,
            badge: {
              en: "choice",
              ar: "اختيارنا"
            },
            discount: {
              en: "discount up to 130$",
              ar: "خصم يصل إلى 130 دولار"
            },
            link: {
              en: "Deal",
              ar: "صفقة"
            },
            free_delivery: false,
            color: {
              en: "gray",
              ar: "رمادي"
            },
            to_home: true,
            premium_offer: false,
            has_discount: true
        },
        {
            static_id:"fashion-7",
            title: {
              en: "Headset for gaming with mic",
              ar: "سماعة ألعاب مع ميكروفون"
            },
            type: {
              en: "head-phone",
              ar: "سماعة رأس"
            },
            category: {
              en: "fashion",
              ar: "أزياء"
            },
            image: "images/headphones-12",
            description: {
              en: "Colleen_Hoover tells fan favourite Atlass side of the story and shares what comes next in this long-anticipated sequel to the #1 Sunday Times bestseller It Ends with Us ",
              ar: "تروي كولين هوفر جانب أطلس من القصة..."
            },
            brand: { en: "tigger", ar: "تيجر" },
            avgRating: 4,
            ratings: 62749,
            price: 8,
            oldPrice: 12.99,
            discount: {
              en: "discount up to 24%",
              ar: "خصم يصل إلى 24%"
            },
            link: {
              en: "Deal",
              ar: "صفقة"
            },
            free_delivery: false,
            color: {
              en: "black",
              ar: "أسود"
            },
            to_home: true,
            premium_offer: false,
            has_discount: true
        },
        {
            static_id:"fashion-8",
            title: {
              en: "school blue bag",
              ar: "حقيبة مدرسة زرقاء"
            },
            type: {
              en: "bag",
              ar: "حقيبة"
            },
            category: {
              en: "fashion",
              ar: "أزياء"
            },
            image: "images/fashion-5",
            description: {
              en: "Colleen_Hoover tells fan favourite Atlass side of the story and shares what comes next in this long-anticipated sequel to the #1 Sunday Times bestseller It Ends with Us ",
              ar: "تروي كولين هوفر جانب أطلس من القصة..."
            },
            brand: { en: "zara", ar: "زارا" },
            avgRating: 3,
            ratings: 4402,
            price: 1,
            oldPrice: 14.99,
            badge: {
              en: "choice",
              ar: "اختيارنا"
            },
            discount: {
              en: "discount up to 30%",
              ar: "خصم يصل إلى 30%"
            },
            link: {
              en: "Offer",
              ar: "عرض"
            },
            free_delivery: false,
            color: {
              en: "linear-gradient(to right top,lightgreen,gray)",
              ar: "تدرج (أخضر فاتح، رمادي)"
            },
            to_home: true,
            premium_offer: true,
            has_discount: true
        },
        {
            static_id:"fashion-9",
            title: {
              en: "Browen calssic vaze",
              ar: "فازة بني كلاسيكية"
            },
            type: {
              en: "vaze",
              ar: "فازة"
            },
            category: {
              en: "vazes",
              ar: "فازات"
            },
            image: "images/vaze-6",
            description: {
              en: "Our most affordable Fire TV Stick—enjoy fast streaming in Full HD. Comes with Alexa Voice Remote Lite. Easy to set up, stays hidden—plug in behind your TV, turn on the TV and connect to the internet to get set up. ",
              ar: "Fire TV Stick الأكثر اقتصادية..."
            },
            brand: { en: "beauty", ar: "بيوتي" },
            avgRating: 4,
            ratings: 17602,
            price: 15.99,
            oldPrice: 20.99,
            badge: {
              en: "choice",
              ar: "اختيارنا"
            },
            discount: {
              en: "discount up to 10%",
              ar: "خصم يصل إلى 10%"
            },
            link: {
              en: "Offer",
              ar: "عرض"
            },
            free_delivery: true,
            color: {
              en: "browen",
              ar: "بني"
            },
            to_home: false,
            premium_offer: false,
            has_discount: true
        },
        {
            static_id:"fashion-10",
            title: {
              en: "Large black kattel",
              ar: "غلاية سوداء كبيرة"
            },
            type: {
              en: "shooses",
              ar: "غلايات"
            },
            category: {
              en: "kitchen-tools",
              ar: "أدوات مطبخ"
            },
            image: "images/kitchen-tools-7",
            description: {
              en: "Kattel; Larg; hugo boss. 100% Cotton. Machine Wash. Fastening: Pull On. Collar Style: Classic. Slim Fit",
              ar: "غلاية كبيرة 100% قطن."
            },
            brand: { en: "toshiba", ar: "توشيبا" },
            avgRating: 3,
            ratings: 10,
            price: 19.95,
            oldPrice: 45,
            discount: {
              en: "discount up to 15%",
              ar: "خصم يصل إلى 15%"
            },
            link: {
              en: "Deal",
              ar: "صفقة"
            },
            free_delivery: false,
            color: {
              en: "black",
              ar: "أسود"
            },
            to_home: true,
            premium_offer: true,
            has_discount: true
        },
        {
            static_id: "mobile-1",
            title: {
              en: "xiaomi gray mobile",
              ar: "موبايل شاومي رمادي"
            },
            type: {
              en: "mobile",
              ar: "موبايل"
            },
            category: {
              en: "mobiles",
              ar: "موبايلات"
            },
            description: {
              en: "More cheep and more premium",
              ar: "أرخص وأكثر تميزاً"
            },
            image: "images/mobile-1",
            brand: { en: "xiaomi", ar: "شاومي" },
            avgRating: 2,
            ratings: 140,
            price: 1300,
            oldPrice: 1600,
            badge: {
              en: "seller",
              ar: "الأكثر مبيعاً"
            },
            free_delivery: false,
            color: {
              en: "medium black",
              ar: "أسود متوسط"
            },
            to_home: true,
            premium_offer: true,
            has_discount: true,
            verified:true
        },
        {
            static_id: "mobile-2",
            title: {
              en: "samsung syan mobile",
              ar: "موبايل سامسونج سماوي"
            },
            type: {
              en: "mobile",
              ar: "موبايل"
            },
            category: {
              en: "mobiles",
              ar: "موبايلات"
            },
            description: {
              en: "More cheep and more premium",
              ar: "أرخص وأكثر تميزاً"
            },
            image: "images/mobile-2",
            brand: { en: "samsung", ar: "سامسونج" },
            avgRating: 4,
            ratings: 150,
            price: 800,
            oldPrice: 800,
            badge: {
              en: "choice",
              ar: "اختيارنا"
            },
            free_delivery: false,
            color: {
              en: "cyan",
              ar: "سماوي"
            },
            to_home: false,
            premium_offer: false,
            has_discount: false,
            verified:false
        },
        {
            static_id: "mobile-3",
            title: {
              en: "Oppo white airpods",
              ar: "سماعات أوبو بيضاء"
            },
            type: {
              en: "airpods",
              ar: "سماعات لاسلكية"
            },
            category: {
              en: "mobiles",
              ar: "موبايلات"
            },
            description: {
              en: "More cheep and more premium",
              ar: "أرخص وأكثر تميزاً"
            },
            image: "images/mobile-3",
            brand: "oppo",
            avgRating: 2,
            ratings: 110,
            price: 350,
            oldPrice: 400,
            badge: {
              en: "limited",
              ar: "لفترة محدودة"
            },
            free_delivery: false,
            color: {
              en: "white",
              ar: "أبيض"
            },
            to_home: false,
            premium_offer: false,
            has_discount: true,
            verified:false
        },
        {
            static_id: "mobile-4",
            title: {
              en: "Unlimited streaming",
              ar: "بث غير محدود"
            },
            type: {
              en: "smoothing mashine",
              ar: "جهاز تنعيم"
            },
            category: {
              en: "mobiles",
              ar: "موبايلات"
            },
            description: {
              en: "More cheep and more premium",
              ar: "أرخص وأكثر تميزاً"
            },
            image: "images/mobile-4",
            brand: { en: "tigger", ar: "تيجر" },
            avgRating: 3,
            ratings: 150,
            price: 500,
            oldPrice: 800,
            badge: {
              en: "limited",
              ar: "لفترة محدودة"
            },
            free_delivery: true,
            color: {
              en: "medium black",
              ar: "أسود متوسط"
            },
            to_home: false,
            premium_offer: true,
            has_discount: true,
            verified:false
        },
        {
            static_id: "mobile-5",
            title: {
              en: "Ipone black mobile",
              ar: "موبايل أيفون أسود"
            },
            type: {
              en: "mobile",
              ar: "موبايل"
            },
            category: {
              en: "mobiles",
              ar: "موبايلات"
            },
            description: {
              en: "More cheep and more premium",
              ar: "أرخص وأكثر تميزاً"
            },
            image: "images/product_13",
            brand: { en: "apple", ar: "أبل" },
            avgRating: 5,
            ratings: 135,
            price: 10050,
            oldPrice: 10200,
            badge: {
              en: "seller",
              ar: "الأكثر مبيعاً"
            },
            free_delivery: true,
            color: {
              en: "light black",
              ar: "أسود فاتح"
            },
            to_home: false,
            premium_offer: true,
            has_discount: true,
            verified:true
        },
        {
            static_id: "mobile-6",
            title: {
              en: "Nokia mobile charger",
              ar: "شاحن نوكيا"
            },
            "details": {
              en: "Browes without hizitaion",
              ar: "تصفح بدون تردد"
            },
            type: {
              en: "mobile charger",
              ar: "شاحن موبايل"
            },
            category: {
              en: "mobiles",
              ar: "موبايلات"
            },
            description: {
              en: "More cheep and more premium",
              ar: "أرخص وأكثر تميزاً"
            },
            image: "images/fashion-13",
            brand: { en: "dell", ar: "ديل" },
            avgRating: 2,
            ratings: 110,
            price: 70,
            oldPrice: 70,
            free_delivery: true,
            color: {
              en: "light black",
              ar: "أسود فاتح"
            },
            to_home: true,
            premium_offer: false,
            has_discount: false,
            verified:true
        },
        {
            static_id: "computer-1",
            title: {
              en: "computer gray screen",
              ar: "شاشة كمبيوتر رمادية"
            },
            type: {
              en: "computer screen",
              ar: "شاشة كمبيوتر"
            },
            category: {
              en: "computers",
              ar: "كمبيوترات"
            },
            description: {
              en: "More cheep and more premium",
              ar: "أرخص وأكثر تميزاً"
            },
            image: "images/computer-cat-1",
            brand: { en: "hp", ar: "اتش بي" },
            avgRating: 5,
            ratings: 140,
            price: 800,
            oldPrice: 1200,
            badge: {
              en: "seller",
              ar: "الأكثر مبيعاً"
            },
            free_delivery: false,
            color: {
              en: "silver",
              ar: "فضي"
            },
            to_home: true,
            premium_offer: true,
            has_discount: true,
            verified:true
        },
        {
            static_id: "computer-2",
            title: {
              en: "dell silver labtop",
              ar: "لابتوب ديل فضي"
            },
            type: {
              en: "labtop",
              ar: "لابتوب"
            },
            category: {
              en: "computers",
              ar: "كمبيوترات"
            },
            description: {
              en: "More cheep and more premium",
              ar: "أرخص وأكثر تميزاً"
            },
            image: "images/computer-cat-2",
            brand: { en: "dell", ar: "ديل" },
            avgRating: 4,
            ratings: 150,
            price: 1100,
            oldPrice: 1100,
            badge: {
              en: "choice",
              ar: "اختيارنا"
            },
            free_delivery: false,
            color: {
              en: "cyan",
              ar: "سماوي"
            },
            to_home: false,
            premium_offer: false,
            has_discount: false,
            verified:false
        },
        {
            static_id: "computer-3",
            title: {
              en: "Samsong selver labtop",
              ar: "لابتوب سامسونج فضي"
            },
            type: {
              en: "labtop",
              ar: "لابتوب"
            },
            category: {
              en: "computers",
              ar: "كمبيوترات"
            },
            description: {
              en: "More cheep and more premium",
              ar: "أرخص وأكثر تميزاً"
            },
            image: "images/computer-cat-3",
            brand: { en: "samsung", ar: "سامسونج" },
            avgRating: 3,
            ratings: 120,
            price: 850,
            oldPrice: 1200,
            badge: {
              en: "limited",
              ar: "لفترة محدودة"
            },
            free_delivery: true,
            color: {
              en: "gray",
              ar: "رمادي"
            },
            to_home: false,
            premium_offer: false,
            has_discount: true
        },
        {
            static_id: "computer-4",
            title: {
              en: "Tigger light black touer computer",
              ar: "كمبيوتر تايجر أسود فاتح"
            },
            type: {
              en: "touer computer",
              ar: "كمبيوتر مكتبي"
            },
            category: {
              en: "computers",
              ar: "كمبيوترات"
            },
            description: {
              en: "More cheep and more premium",
              ar: "أرخص وأكثر تميزاً"
            },
            image: "images/computer-cat-4",
            brand: { en: "tigger", ar: "تيجر" },
            avgRating: 4,
            ratings: 150,
            price: 500,
            oldPrice: 800,
            badge: {
              en: "limited",
              ar: "لفترة محدودة"
            },
            free_delivery: true,
            color: {
              en: "medium black",
              ar: "أسود متوسط"
            },
            to_home: false,
            premium_offer: true,
            has_discount: true,
            verified:false
        },
        {
            static_id: "computer-5",
            title: {
              en: "speaker casting with gift",
              ar: "سماعة مع هدية"
            },
            type: {
              en: "speaker",
              ar: "سماعة"
            },
            category: {
              en: "computers",
              ar: "كمبيوترات"
            },
            description: {
              en: "More cheep and more premium",
              ar: "أرخص وأكثر تميزاً"
            },
            image: "images/headphones-1",
            brand: { en: "hp", ar: "اتش بي" },
            avgRating: 5,
            ratings: 134,
            price: 200,
            oldPrice: 200,
            badge: {
              en: "seller",
              ar: "الأكثر مبيعاً"
            },
            free_delivery: true,
            color: {
              en: "dark black",
              ar: "أسود داكن"
            },
            to_home: false,
            premium_offer: true,
            has_discount: false,
            verified:true
        },
        {
            static_id: "computer-6",
            title: {
              en: "dell gray headphone",
              ar: "سماعة ديل رمادية"
            },
            type: {
              en: "headphone",
              ar: "سماعة رأس"
            },
            category: {
              en: "computers",
              ar: "كمبيوترات"
            },
            description: {
              en: "More cheep and more premium",
              ar: "أرخص وأكثر تميزاً"
            },
            image: "images/headphones-1",
            brand: { en: "dell", ar: "ديل" },
            avgRating: 5,
            ratings: 134,
            price: 150,
            oldPrice: 200,
            badge: {
              en: "seller",
              ar: "الأكثر مبيعاً"
            },
            free_delivery: false,
            color: {
              en: "light black",
              ar: "أسود فاتح"
            },
            to_home: true,
            premium_offer: true,
            has_discount: true,
            verified:false
        },
        {
            static_id: "devices-1",
            title: {
              en: "Cold Air v-2",
              ar: "تكييف بارد v-2"
            },
            type: {
              en: "air conditioner",
              ar: "تكييف"
            },
            category: {
              en: "devices",
              ar: "أجهزة منزلية"
            },
            image: "images/consider-6",
            brand: { en: "zanussi", ar: "زانوسي" },
            description: {
              en: "Your Houes will be more easy handled & more safe with our machine you life more better , Book quickly Before stock runs out",
              ar: "سيكون منزلك أكثر سهولة وأماناً..."
            },
            avgRating: 5,
            ratings: 877,
            price: 2500,
            oldPrice: 2000.99,
            badge: {
              en: "choice",
              ar: "اختيارنا"
            },
            free_delivery: true,
            color: {
              en: "yellow white",
              ar: "أبيض مائل للأصفر"
            },
            to_home: true,
            premium_offer: true,
            has_discount: true,
            verified:true
        },
        {
            static_id: "devices-2",
            title: {
              en: "Heater 10L Toshipa",
              ar: "سخان 10 لتر توشيبا"
            },
            type: {
              en: "heater",
              ar: "سخان"
            },
            category: {
              en: "devices",
              ar: "أجهزة منزلية"
            },
            image: "images/consider-15",
            brand: { en: "zanussi", ar: "زانوسي" },
            description: {
              en: "Your Houes will be more easy handled & more safe with our machine you life more better , Book quickly Before stock runs out",
              ar: "سيكون منزلك أكثر سهولة وأماناً..."
            },
            avgRating: 4,
            ratings: 2993,
            price: 1380,
            oldPrice: 1380,
            badge: {
              en: "limited",
              ar: "لفترة محدودة"
            },
            free_delivery: false,
            color: {
              en: "dark black",
              ar: "أسود داكن"
            },
            to_home: true,
            premium_offer: true,
            has_discount: false,
            verified:false
        },
        {
            static_id: "devices-3",
            title: {
              en: "Sweet Water A 10L",
              ar: "مبرد مياه A 10 لتر"
            },
            type: {
              en: "coldair",
              ar: "مبرد مياه"
            },
            category: {
              en: "devices",
              ar: "أجهزة منزلية"
            },
            image: "images/consider-16",
            brand: { en: "sharp", ar: "شارب" },
            description: {
              en: "Your Houes will be more easy handled & more safe with our machine you life more better , Book quickly Before stock runs out",
              ar: "سيكون منزلك أكثر سهولة وأماناً..."
            },
            avgRating: 2,
            ratings: 29283,
            price: 10,
            oldPrice: 20,
            badge: {
              en: "seller",
              ar: "الأكثر مبيعاً"
            },
            free_delivery: false,
            color: {
              en: "light white",
              ar: "أبيض فاتح"
            },
            to_home: true,
            premium_offer: false,
            has_discount: true,
            verified:true
        },
        {
            static_id: "devices-4",
            title: {
              en: "Sharp BC",
              ar: "شارب BC"
            },
            type: {
              en: "refirgerator",
              ar: "ثلاجة"
            },
            category: {
              en: "devices",
              ar: "أجهزة منزلية"
            },
            image: "images/consider-17",
            brand: { en: "sharp", ar: "شارب" },
            description: {
              en: "Your Houes will be more easy handled & more safe with our machine you life more better , Book quickly Before stock runs out",
              ar: "سيكون منزلك أكثر سهولة وأماناً..."
            },
            avgRating: 5,
            ratings: 885,
            price: 3900.9,
            oldPrice: 4200.99,
            badge: {
              en: "limited",
              ar: "لفترة محدودة"
            },
            free_delivery: true,
            color: {
              en: "dark black",
              ar: "أسود داكن"
            },
            to_home: true,
            premium_offer: true,
            has_discount: true,
            verified:false
        },
        {
            static_id: "devices-5",
            title: {
              en: "Sharp A2a4",
              ar: "شارب A2a4"
            },
            type: {
              en: "refirgerator",
              ar: "ثلاجة"
            },
            category: {
              en: "devices",
              ar: "أجهزة منزلية"
            },
            image: "images/consider-18",
            brand: { en: "tornado", ar: "تورنيدو" },
            description: {
              en: "Your Houes will be more easy handled & more safe with our machine you life more better , Book quickly Before stock runs out",
              ar: "سيكون منزلك أكثر سهولة وأماناً..."
            },
            avgRating: 5,
            ratings: 402,
            price: 4000,
            oldPrice: 4500.99,
            badge: {
              en: "choice",
              ar: "اختيارنا"
            },
            free_delivery: false,
            color: {
              en: "light white",
              ar: "أبيض فاتح"
            },
            to_home: false,
            premium_offer: true,
            has_discount: true,
            verified:false
        },
        {
            static_id: "devices-6",
            title: {
              en: "Closess AZ 13",
              ar: "غسالة ملابس AZ 13"
            },
            type: {
              en: "Washer",
              ar: "غسالة"
            },
            category: {
              en: "devices",
              ar: "أجهزة منزلية"
            },
            image: "images/consider-19",
            brand: { en: "tornado", ar: "تورنيدو" },
            description: {
              en: "Your Houes will be more easy handled & more safe with our machine you life more better , Book quickly Before stock runs out",
              ar: "سيكون منزلك أكثر سهولة وأماناً..."
            },
            avgRating: 5,
            ratings: 877,
            price: 3000,
            oldPrice: 3500.99,
            badge: {
              en: "seller",
              ar: "الأكثر مبيعاً"
            },
            free_delivery: false,
            color: {
              en: "silver",
              ar: "فضي"
            },
            to_home: false,
            premium_offer: true,
            has_discount: true,
            verified:true
        },
        {
            static_id: "devices-7",
            title: {
              en: "Clean life 10",
              ar: "كين لايف 10"
            },
            type: {
              en: "Washer",
              ar: "غسالة"
            },
            category: {
              en: "devices",
              ar: "أجهزة منزلية"
            },
            image: "images/consider-20",
            brand: { en: "zanussi", ar: "زانوسي" },
            description: {
              en: "Your Houes will be more easy handled & more safe with our machine you life more better , Book quickly Before stock runs out",
              ar: "سيكون منزلك أكثر سهولة وأماناً..."
            },
            avgRating: 4,
            ratings: 62749,
            price: 4000,
            oldPrice: 4200.99,
            badge: {
              en: "seller",
              ar: "الأكثر مبيعاً"
            },
            free_delivery: false,
            color: {
              en: "black",
              ar: "أسود"
            },
            to_home: true,
            premium_offer: true,
            has_discount: true,
            verified:false
        },
        {
            static_id: "devices-8",
            title: {
              en: "Sweet Water C 15L",
              ar: "مبرد مياه C 15 لتر"
            },
            type: {
              en: "coldair",
              ar: "مبرد مياه"
            },
            category: {
              en: "devices",
              ar: "أجهزة منزلية"
            },
            image: "images/consider-21",
            brand: { en: "tornado", ar: "تورنيدو" },
            description: {
              en: "Your Houes will be more easy handled & more safe with our machine you life more better , Book quickly Before stock runs out",
              ar: "سيكون منزلك أكثر سهولة وأماناً..."
            },
            avgRating: 5,
            ratings: 29283,
            price: 450,
            oldPrice: 950,
            badge: {
              en: "seller",
              ar: "الأكثر مبيعاً"
            },
            free_delivery: true,
            color: {
              en: "white",
              ar: "أبيض"
            },
            to_home: false,
            premium_offer: true,
            has_discount: false,
            verified:true
        },
        {
            static_id: "book-1",
            title: {
              en: "guinness  2023",
              ar: "جينيس 2023"
            },
            type: {
              en: "book",
              ar: "كتاب"
            },
            category: {
              en: "books",
              ar: "كتب"
            },
            image: "images/product_1",
            "image_small": "images/product_1_small",
            brand: "Jamie_Oliver",
            description: {
              en: "The 2023 edition takes readers on a journey that's out of this world! ",
              ar: "تأخذك طبعة 2023 في رحلة خارج هذا العالم!"
            },
            avgRating: 4,
            ratings: 929,
            price: 8.5,
            oldPrice: 8.5,
            badge: {
              en: "choice",
              ar: "اختيارنا"
            },
            free_delivery: false,
            color: {
              en: "light green",
              ar: "أخضر فاتح"
            },
            to_home: true,
            premium_offer: true,
            has_discount: false,
            verified:true
        },
        {
            static_id: "book-2",
            title: {
              en: "One: Simple One-Pan Wonders",
              ar: "واحد: عجائب المقلاة الواحدة البسيطة"
            },
            image: "images/product_2",
            "image_small": "images/product_2_small",
            brand: "Jamie_Oliver",
            description: {
              en: "Give them the simplest cookbook ever this Christmas . . . Jamie's back to basics with over 120 simple, delicious, ONE pan recipes",
              ar: "امنحهم أبسط كتاب طهي على الإطلاق في هذا الكريسماس..."
            },
            avgRating: 3,
            ratings: 2993,
            price: 13,
            oldPrice: 23,
            badge: {
              en: "choice",
              ar: "اختيارنا"
            },
            free_delivery: true,
            color: {
              en: "dark green",
              ar: "أخضر داكن"
            },
            to_home: false,
            premium_offer: false,
            has_discount: true,
            verified:false
        },
        {
            static_id: "book-3",
            title: {
              en: "The Bullet That Missed: (The Thursday Murder Club 3)",
              ar: "الرصاصة التي أخطأت"
            },
            type: {
              en: "book",
              ar: "كتاب"
            },
            category: {
              en: "books",
              ar: "كتب"
            },
            image: "images/product_3",
            "image_small": "images/product_3_small",
            description: {
              en: "Except trouble is never far away where the Thursday Murder Club is concerned. ",
              ar: "المشاكل لا تكون بعيدة أبداً..."
            },
            brand: "Richard_Osman",
            avgRating: 2,
            ratings: 29283,
            price: 10,
            oldPrice: 20,
            free_delivery: false,
            color: {
              en: "dark blue",
              ar: "أزرق داكن"
            },
            to_home: false,
            premium_offer: false,
            has_discount: true,
            verified:true
        },
        {
            static_id: "book-4",
            title: {
              en: "Interesting Facts For Curious Minds",
              ar: "حقائق مثيرة للعقول الفضولية"
            },
            type: {
              en: "book",
              ar: "كتاب"
            },
            category: {
              en: "books",
              ar: "كتب"
            },
            image: "images/product_4",
            "image_small": "images/product_4_small",
            description: {
              en: "Want to impress your friends and family with both useful, worthless but undeniably interesting facts? ",
              ar: "هل تريد إثارة إعجاب أصدقائك وعائلتك؟"
            },
            brand: "Jordan_Moore",
            avgRating: 4,
            ratings: 885,
            price: 10.9,
            oldPrice: 13.99,
            badge: {
              en: "limited",
              ar: "لفترة محدودة"
            },
            free_delivery: true,
            color: {
              en: "dark move",
              ar: "موف داكن"
            },
            to_home: true,
            premium_offer: true,
            has_discount: false,
            verified:true
        },
        {
            static_id: "book-5",
            title: {
              en: "No Plan B",
              ar: "لا توجد خطة ب"
            },
            type: {
              en: "book",
              ar: "كتاب"
            },
            category: {
              en: "books",
              ar: "كتب"
            },
            image: "images/product_0",
            "image_small": "images/product_0_small",
            description: {
              en: "The gripping new Jack Reacher thriller from the No.1 bestselling authors Lee Child and Andrew Child.",
              ar: "مغامرة جاك ريتشر الجديدة والمثيرة..."
            },
            brand: "Richard_Osman",
            avgRating: 5,
            ratings: 24089,
            price: 70,
            oldPrice: 90,
            badge: {
              en: "seller",
              ar: "الأكثر مبيعاً"
            },
            free_delivery: true,
            color: {
              en: "light blue",
              ar: "أزرق فاتح"
            },
            to_home: false,
            premium_offer: true,
            has_discount: true,
            verified:false
        },
        {
            static_id: "book-6",
            title: {
              en: "It Start with Us",
              ar: "يبدأ بنا"
            },
            type: {
              en: "book",
              ar: "كتاب"
            },
            category: {
              en: "books",
              ar: "كتب"
            },
            image: "images/product_5",
            "image_small": "images/product_5_small",
            description: {
              en: "Colleen_Hoover tells fan favourite Atlass side of the story and shares what comes next in this long-anticipated sequel to the #1 Sunday Times bestseller It Ends with Us ",
              ar: "تروي كولين هوفر جانب أطلس من القصة..."
            },
            brand: "Colleen_Hoover",
            avgRating: 4,
            ratings: 4402,
            price: 14,
            oldPrice: 14,
            badge: {
              en: "choice",
              ar: "اختيارنا"
            },
            free_delivery: true,
            color: {
              en: "cyan",
              ar: "سماوي"
            },
            to_home: true,
            premium_offer: false,
            has_discount: false,
            verified:true
        },
        {
            static_id: "book-7",
            title: {
              en: "SPACEBOY",
              ar: "رجل الفضاء"
            },
            type: {
              en: "book",
              ar: "كتاب"
            },
            category: {
              en: "books",
              ar: "كتب"
            },
            image: "images/product_6",
            "image_small": "images/product_6_small",
            description: {
              en: "Go back to the Space Race with No.1 bestselling author David Walliams for a breathless cinematic adventure full of mystery, action, laughs and surprises ",
              ar: "عد إلى سباق الفضاء مع ديفيد ويليامز..."
            },
            brand: "Jordan_Moore",
            avgRating: 5,
            ratings: 877,
            price: 7,
            oldPrice: 14.99,
            badge: {
              en: "choice",
              ar: "اختيارنا"
            },
            free_delivery: true,
            color: {
              en: "light yellow",
              ar: "أصفر فاتح"
            },
            to_home: true,
            premium_offer: true,
            has_discount: true,
            verified:false
        },
        {
            static_id: "book-8",
            title: {
              en: "Lessons in Chemistry",
              ar: "دروس في الكيمياء"
            },
            type: {
              en: "book",
              ar: "كتاب"
            },
            category: {
              en: "books",
              ar: "كتب"
            },
            image: "images/product_7",
            "image_small": "images/product_7_small",
            description: {
              en: "Chemist Elizabeth Zott is not your average woman. In fact, Elizabeth Zott would be the first to point out that there is no such thing.",
              ar: "الكيميائية إليزابيث زوت ليست امرأة عادية..."
            },
            brand: "Colleen_Hoover",
            avgRating: 4,
            ratings: 62749,
            price: 8,
            oldPrice: 16.99,
            free_delivery: false,
            color: {
              en: "red green",
              ar: "أحمر وأخضر"
            },
            to_home: true,
            premium_offer: true,
            has_discount: true,
            verified:false
        },
        {
            static_id:"sprot-0",
            title: {
              en: "Speed Bike 400",
              ar: "دراجة سرعة 400"
            },
            type: {
              en: "bike",
              ar: "دراجة"
            },
            category: {
              en: "sports",
              ar: "رياضة"
            },
            image: "images/sport-4",
            brand: "buildings",
            description: {
              en: "Your Fitness will be more clear handled & more safe with our machine you body more better , Book quickly Before stock runs out",
              ar: "لياقتك البدنية ستكون أفضل مع أجهزتنا..."
            },
            avgRating: 4,
            ratings: 4089,
            price: 1000,
            oldPrice: 1200,
            badge: {
              en: "seller",
              ar: "الأكثر مبيعاً"
            },
            free_delivery: true,
            color: {
              en: "gray",
              ar: "رمادي"
            },
            to_home: false,
            premium_offer: true,
            has_discount: true,
            verified:true
          },
          {
            static_id:"sprot-1",
            title: {
              en: "XZER 1-A-200",
              ar: "XZER 1-A-200"
            },
            type: {
              en: "treadmill",
              ar: "جهاز مشي"
            },
            category: {
              en: "sports",
              ar: "رياضة"
            },
            image: "images/sport-1",
            brand: "buildings",
            description: {
              en: "Your Fitness will be more clear handled & more safe with our machine you body more better , Book quickly Before stock runs out",
              ar: "لياقتك البدنية ستكون أفضل مع أجهزتنا..."
            },
            avgRating: 3,
            ratings: 1089,
            price: 4000,
            oldPrice: 4100,
            badge: {
              en: "limited",
              ar: "لفترة محدودة"
            },
            free_delivery: true,
            color: {
              en: "silver",
              ar: "فضي"
            },
            to_home: true,
            premium_offer: false,
            has_discount: true,
            verified:false
          },
          {
            static_id:"sprot-2",
            title: {
              en: "Speed Bike 500",
              ar: "دراجة سرعة 500"
            },
            type: {
              en: "bike",
              ar: "دراجة"
            },
            category: {
              en: "sports",
              ar: "رياضة"
            },
            image: "images/sport-2",
            brand: "roket",
            description: {
              en: "Your Fitness will be more clear handled & more safe with our machine you body more better , Book quickly Before stock runs out",
              ar: "لياقتك البدنية ستكون أفضل مع أجهزتنا..."
            },
            avgRating: 5,
            ratings: 2089,
            price: 1400,
            oldPrice: 1400,
            badge: {
              en: "seller",
              ar: "الأكثر مبيعاً"
            },
            free_delivery: true,
            color: {
              en: "dark gray",
              ar: "رمادي داكن"
            },
            to_home: true,
            premium_offer: true,
            has_discount: false,
            verified:true
          },
          {
            static_id:"sprot-3",
            title: {
              en: "XZER 2-A-300",
              ar: "XZER 2-A-300"
            },
            type: {
              en: "treadmill",
              ar: "جهاز مشي"
            },
            category: {
              en: "sports",
              ar: "رياضة"
            },
            image: "images/sport-3",
            brand: "roket",
            description: {
              en: "Your Fitness will be more clear handled & more safe with our machine you body more better , Book quickly Before stock runs out",
              ar: "لياقتك البدنية ستكون أفضل مع أجهزتنا..."
            },
            avgRating: 3,
            ratings: 1089,
            price: 5000,
            oldPrice: 5200,
            badge: {
              en: "limited",
              ar: "لفترة محدودة"
            },
            free_delivery: false,
            color: {
              en: "thin black",
              ar: "أسود رفيع"
            },
            to_home: false,
            premium_offer: false,
            has_discount: true,
            verified:false
          },
          {
            static_id:"sprot-4",
            title: {
              en: "Speed Bike 200",
              ar: "دراجة سرعة 200"
            },
            type: {
              en: "bike",
              ar: "دراجة"
            },
            category: {
              en: "sports",
              ar: "رياضة"
            },
            image: "images/sport-4",
            brand: "hugo boss",
            description: {
              en: "Your Fitness will be more clear handled & more safe with our machine you body more better , Book quickly Before stock runs out",
              ar: "لياقتك البدنية ستكون أفضل مع أجهزتنا..."
            },
            avgRating: 4,
            ratings: 1589,
            price: 800,
            oldPrice: 800,
            badge: {
              en: "seller",
              ar: "الأكثر مبيعاً"
            },
            free_delivery: true,
            color: {
              en: "brown blue",
              ar: "بني أزرق"
            },
            to_home: false,
            premium_offer: true,
            has_discount: false,
            verified:false
          },
          {
            static_id:"sprot-5",
            title: {
              en: "termal devices",
              ar: "أجهزة حرارية"
            },
            type: {
              en: "termal",
              ar: "حراري"
            },
            category: {
              en: "sports",
              ar: "رياضة"
            },
            image: "images/sport-5",
            brand: "buildings",
            description: {
              en: "Your Fitness will be more clear handled & more safe with our machine you body more better , Book quickly Before stock runs out",
              ar: "لياقتك البدنية ستكون أفضل مع أجهزتنا..."
            },
            avgRating: 4,
            ratings: 2000,
            price: 5500,
            oldPrice: 5500,
            badge: {
              en: "choice",
              ar: "اختيارنا"
            },
            free_delivery: false,
            color: {
              en: "blue black",
              ar: "أزرق وأسود"
            },
            to_home: true,
            premium_offer: false,
            has_discount: false,
            verified:true
          },
          {
            static_id:"sprot-6",
            title: {
              en: "XZER 1-B-200",
              ar: "XZER 1-B-200"
            },
            type: {
              en: "treadmill",
              ar: "جهاز مشي"
            },
            category: {
              en: "sports",
              ar: "رياضة"
            },
            image: "images/sport-6",
            brand: "hugo boss",
            description: {
              en: "Your Fitness will be more clear handled & more safe with our machine you body more better , Book quickly Before stock runs out",
              ar: "لياقتك البدنية ستكون أفضل مع أجهزتنا..."
            },
            avgRating: 2,
            ratings: 1089,
            price: 4000,
            oldPrice: 4100,
            badge: {
              en: "seller",
              ar: "الأكثر مبيعاً"
            },
            free_delivery: false,
            color: {
              en: "red gray",
              ar: "أحمر رمادي"
            },
            to_home: false,
            premium_offer: false,
            has_discount: true,
            verified:false
          },
          {
            static_id:"sprot-7",
            title: {
              en: "Speed Bike 700",
              ar: "دراجة سرعة 700"
            },
            type: {
              en: "bike",
              ar: "دراجة"
            },
            category: {
              en: "sports",
              ar: "رياضة"
            },
            image: "images/sport-7",
            brand: "buildings",
            description: {
              en: "Your Fitness will be more clear handled & more safe with our machine you body more better , Book quickly Before stock runs out",
              ar: "لياقتك البدنية ستكون أفضل مع أجهزتنا..."
            },
            avgRating: 5,
            ratings: 24089,
            price: 2500,
            oldPrice: 2700,
            badge: {
              en: "seller",
              ar: "الأكثر مبيعاً"
            },
            free_delivery: true,
            color: {
              en: "gray",
              ar: "رمادي"
            },
            to_home: true,
            premium_offer: true,
            has_discount: true,
            verified:true
          },
          {
            static_id:"sprot-8",
            title: {
              en: "2023 Guide to the Night Sky",
              ar: "دليل السماء الليلية 2023"
            },
            type: {
              en: "sholder device",
              ar: "جهاز كتف"
            },
            image: "images/sport-8",
            description: {
              en: "From the UKs Number One Astronomy publisher, this is the bestselling stargazing handbook to the planets, stars and constellations visible from the northern hemisphere.",
              ar: "من أكبر ناشري الفلك في المملكة المتحدة..."
            },
            brand: "hugo boss",
            avgRating: 2,
            ratings: 134,
            price: 4.79,
            oldPrice: 6.99,
            badge: {
              en: "choice",
              ar: "اختيارنا"
            },
            free_delivery: false,
            color: {
              en: "gray",
              ar: "رمادي"
            },
            to_home: false,
            premium_offer: false,
            has_discount: false,
            verified:false
          },
        {
            static_id: "pet-0",
            title: {
              en: "Morando Cindy",
              ar: "موراندو سيندي"
            },
            type: {
              en: "buffalo meet",
              ar: "لحم جاموسي"
            },
            category: {
              en: "pets",
              ar: "حيوانات أليفة"
            },
            image: "images/pets-0",
            description: {
              en: "The gripping new Jack Reacher thriller from the No.1 bestselling authors Lee Child and Andrew Child.",
              ar: "مغامرة جاك ريتشر الجديدة..."
            },
            brand: "Corn",
            avgRating: 2,
            ratings: 24089,
            price: 125,
            oldPrice: 185,
            badge: {
              en: "seller",
              ar: "الأكثر مبيعاً"
            },
            free_delivery: false,
            color: {
              en: "pink",
              ar: "وردي"
            },
            to_home: true,
            premium_offer: true,
            has_discount: true,
            verified:true
          },
          {
            static_id: "pet-1",
            title: {
              en: "Gran Menu Dry",
              ar: "جران منيو جاف"
            },
            type: {
              en: "chicken",
              ar: "دجاج"
            },
            category: {
              en: "pets",
              ar: "حيوانات أليفة"
            },
            image: "images/pets-1",
            brand: "Corn",
            description: {
              en: "The 2023 edition takes readers on a journey that's out of this world! ",
              ar: "تأخذك طبعة 2023 في رحلة..."
            },
            avgRating: 3,
            ratings: 929,
            price: 98.5,
            oldPrice: 122,
            badge: {
              en: "limited",
              ar: "لفترة محدودة"
            },
            free_delivery: true,
            color: {
              en: "move",
              ar: "موف"
            },
            to_home: false,
            premium_offer: true,
            has_discount: true,
            verified:false
          },
          {
            static_id: "pet-2",
            title: {
              en: "Legends Wholesome Chicken 100",
              ar: "أساطير الدجاج الصحي 100"
            },
            type: {
              en: "camel meet",
              ar: "لحم جمل"
            },
            category: {
              en: "pets",
              ar: "حيوانات أليفة"
            },
            image: "images/pets-2",
            brand: "Corn",
            description: {
              en: "Give them the simplest cookbook ever this Christmas . . . Jamie's back to basics with over 120 simple, delicious, ONE pan recipes",
              ar: "امنحهم أبسط كتاب طهي..."
            },
            avgRating: 4,
            ratings: 2993,
            price: 108,
            oldPrice: 108,
            badge: {
              en: "limited",
              ar: "لفترة محدودة"
            },
            free_delivery: true,
            color: {
              en: "yellow",
              ar: "أصفر"
            },
            to_home: false,
            premium_offer: true,
            has_discount: false,
            verified:true
          },
          {
            static_id: "pet-3",
            title: {
              en: "Alpha Chicken Dry Food ",
              ar: "طعام ألفا دجاج جاف"
            },
            type: {
              en: "cow meet",
              ar: "لحم بقري"
            },
            category: {
              en: "pets",
              ar: "حيوانات أليفة"
            },
            image: "images/pets-3",
            description: {
              en: "Except trouble is never far away where the Thursday Murder Club is concerned. ",
              ar: "المشاكل لا تكون بعيدة أبداً..."
            },
            brand: "D & C",
            avgRating: 5,
            ratings: 29283,
            price: 110,
            oldPrice: 120,
            badge: {
              en: "choice",
              ar: "اختيارنا"
            },
            free_delivery: false,
            color: {
              en: "yellow",
              ar: "أصفر"
            },
            to_home: true,
            premium_offer: false,
            has_discount: true,
            verified:false
          },
          {
            static_id: "pet-4",
            title: {
              en: "Meet Chiken Burger- 1",
              ar: "برجر دجاج لحم 1"
            },
            type: {
              en: "dried vegetables",
              ar: "خضروات مجففة"
            },
            category: {
              en: "pets",
              ar: "حيوانات أليفة"
            },
            image: "images/pets-4",
            description: {
              en: "Want to impress your friends and family with both useful, worthless but undeniably interesting facts? ",
              ar: "هل تريد إثارة إعجاب أصدقائك وعائلتك؟"
            },
            brand: "D & C",
            avgRating: 4,
            ratings: 885,
            price: 100.9,
            oldPrice: 130.99,
            badge: {
              en: "choice",
              ar: "اختيارنا"
            },
            free_delivery: true,
            color: {
              en: "light green",
              ar: "أخضر فاتح"
            },
            to_home: false,
            premium_offer: true,
            has_discount: true,
            verified:false
          },
          {
            static_id: "pet-5",
            title: {
              en: "Meet Chiken Burger- 2",
              ar: "برجر دجاج لحم 2"
            },
            type: {
              en: "camel meet",
              ar: "لحم جمل"
            },
            category: {
              en: "pets",
              ar: "حيوانات أليفة"
            },
            image: "images/pets-5",
            description: {
              en: "Colleen_Hoover tells fan favourite Atlass side of the story and shares what comes next in this long-anticipated sequel to the #1 Sunday Times bestseller It Ends with Us ",
              ar: "تروي كولين هوفر جانب أطلس من القصة..."
            },
            brand: "D & C",
            avgRating: 3,
            ratings: 4402,
            price: 80,
            oldPrice: 91.99,
            badge: {
              en: "limited",
              ar: "لفترة محدودة"
            },
            free_delivery: true,
            color: {
              en: "dark yellow",
              ar: "أصفر داكن"
            },
            to_home: true,
            premium_offer: false,
            has_discount: true,
            verified:true
          },
          {
            static_id: "pet-6",
            title: {
              en: "Legends Wholesome Chicken 200",
              ar: "أساطير الدجاج الصحي 200"
            },
            type: {
              en: "cow meet",
              ar: "لحم بقري"
            },
            category: {
              en: "pets",
              ar: "حيوانات أليفة"
            },
            image: "images/pets-6",
            description: {
              en: "Go back to the Space Race with No.1 bestselling author David Walliams for a breathless cinematic adventure full of mystery, action, laughs and surprises ",
              ar: "عد إلى سباق الفضاء مع ديفيد ويليامز..."
            },
            brand: "my pet Baby",
            avgRating: 5,
            ratings: 877,
            price: 104.99,
            oldPrice: 104.99,
            badge: {
              en: "choice",
              ar: "اختيارنا"
            },
            free_delivery: false,
            color: {
              en: "linear-gradient(to bottom right,yellow,#8B008B)",
              ar: "تدرج (أصفر، أرجواني)"
            },
            to_home: true,
            premium_offer: true,
            has_discount: false,
            verified:true
          },
          {
            static_id: "pet-7",
            title: {
              en: "Alpha Chicken Dry Food 100",
              ar: "طعام ألفا دجاج جاف 100"
            },
            type: {
              en: "buffalo meet",
              ar: "لحم جاموسي"
            },
            category: {
              en: "pets",
              ar: "حيوانات أليفة"
            },
            image: "images/pets-7",
            description: {
              en: "Chemist Elizabeth Zott is not your average woman. In fact, Elizabeth Zott would be the first to point out that there is no such thing.",
              ar: "الكيميائية إليزابيث زوت ليست امرأة عادية..."
            },
            brand: "my pet Baby",
            avgRating: 4,
            ratings: 62749,
            price: 81,
            oldPrice: 81,
            badge: {
              en: "seller",
              ar: "الأكثر مبيعاً"
            },
            free_delivery: false,
            color: {
              en: "brown",
              ar: "بني"
            },
            to_home: false,
            premium_offer: true,
            has_discount: false,
            verified:false
          },
          {
            static_id: "pet-8",
            title: {
              en: "Legends Wholesome Chicken 300",
              ar: "أساطير الدجاج الصحي 300"
            },
            type: {
              en: "chicken",
              ar: "دجاج"
            },
            category: {
              en: "pets",
              ar: "حيوانات أليفة"
            },
            image: "images/pets-8",
            description: {
              en: "From the UKs Number One Astronomy publisher, this is the bestselling stargazing handbook to the planets, stars and constellations visible from the northern hemisphere.",
              ar: "من أكبر ناشري الفلك في المملكة المتحدة..."
            },
            brand: "my pet Baby",
            avgRating: 2,
            ratings: 134,
            price: 80.79,
            oldPrice: 90.99,
            badge: {
              en: "choice",
              ar: "اختيارنا"
            },
            free_delivery: true,
            color: {
              en: "green",
              ar: "أخضر"
            },
            to_home: true,
            premium_offer: false,
            has_discount: true,
            verified:true
          },
        {
            static_id: "fashion-1",
            title: {
              en: "polo milton 100%",
              ar: "بولو ميلتون 100%"
            },
            type: {
              en: "T-shirt",
              ar: "تيشرت"
            },
            category: {
              en: "fashion",
              ar: "أزياء"
            },
            image: "images/fashion-1",
            brand: { en: "poma", ar: "بوما" },
            description: {
              en: "The 2023 edition takes readers on a journey that's out of this world! ",
              ar: "تأخذك طبعة 2023 في رحلة..."
            },
            avgRating: 5,
            ratings: 929,
            price: 80.5,
            oldPrice: 120,
            badge: {
              en: "choice",
              ar: "اختيارنا"
            },
            discount: {
              en: "discount up to 30%",
              ar: "خصم حتى 30%"
            },
            link: {
              en: "Deal",
              ar: "صفقة"
            },
            free_delivery: true,
            color: {
              en: "green",
              ar: "أخضر"
            },
            to_home: false,
            premium_offer: true,
            has_discount: true,
            verified:true
          },
          {
            static_id: "fashion-2",
            title: {
              en: "Poma Brand",
              ar: "ماركة بوما"
            },
            type: {
              en: "T-shirt",
              ar: "تيشرت"
            },
            category: {
              en: "fashion",
              ar: "أزياء"
            },
            image: "images/fashion-2",
            brand: { en: "poma", ar: "بوما" },
            description: {
              en: "Give them the simplest cookbook ever this Christmas . . . Jamie's back to basics with over 120 simple, delicious, ONE pan recipes",
              ar: "امنحهم أبسط كتاب طهي..."
            },
            avgRating: 4,
            ratings: 2993,
            price: 93,
            oldPrice: 120,
            badge: {
              en: "choice",
              ar: "اختيارنا"
            },
            discount: {
              en: "discount up to 12%",
              ar: "خصم حتى 12%"
            },
            link: {
              en: "Offer",
              ar: "عرض"
            },
            free_delivery: false,
            color: {
              en: "yellow",
              ar: "أصفر"
            },
            to_home: true,
            premium_offer: false,
            has_discount: true,
            verified:false
          },
          {
            static_id: "fashion-3",
            title: {
              en: "Browen Jaket",
              ar: "جاكيت بني"
            },
            type: {
              en: "jaket",
              ar: "جاكيت"
            },
            category: {
              en: "fashion",
              ar: "أزياء"
            },
            image: "images/fashion-3",
            description: {
              en: "Except trouble is never far away where the Thursday Murder Club is concerned. ",
              ar: "المشاكل لا تكون بعيدة أبداً..."
            },
            brand: { en: "lacoste", ar: "لاكوست" },
            avgRating: 5,
            ratings: 29283,
            price: 510,
            oldPrice: 570,
            discount: {
              en: "discount up to 8%",
              ar: "خصم حتى 8%"
            },
            link: {
              en: "Deal",
              ar: "صفقة"
            },
            free_delivery: false,
            color: {
              en: "browen",
              ar: "بني"
            },
            to_home: false,
            premium_offer: false,
            has_discount: true,
            verified:true
          },
          {
            static_id: "fashion-4",
            title: {
              en: "jeans blue short",
              ar: "شورت جينز أزرق"
            },
            type: {
              en: "short",
              ar: "شورت"
            },
            category: {
              en: "fashion",
              ar: "أزياء"
            },
            image: "images/fashion-4",
            description: {
              en: "Want to impress your friends and family with both useful, worthless but undeniably interesting facts? ",
              ar: "هل تريد إثارة إعجاب عائلتك؟"
            },
            brand: { en: "lacoste", ar: "لاكوست" },
            avgRating: 4,
            ratings: 885,
            price: 100.9,
            oldPrice: 130.99,
            badge: {
              en: "limited",
              ar: "لفترة محدودة"
            },
            discount: {
              en: "discount up to 100$",
              ar: "خصم حتى 100 دولار"
            },
            link: {
              en: "Deal",
              ar: "صفقة"
            },
            free_delivery: false,
            color: {
              en: "blue",
              ar: "أزرق"
            },
            to_home: true,
            premium_offer: true,
            has_discount: true,
            verified:false
          },
          {
            static_id: "fashion-5",
            title: {
              en: "soft short socks",
              ar: "جوارب قصيرة ناعمة"
            },
            type: {
              en: "socks",
              ar: "جوارب"
            },
            category: {
              en: "fashion",
              ar: "أزياء"
            },
            image: "images/fashion-5",
            description: {
              en: "Colleen_Hoover tells fan favourite Atlass side of the story and shares what comes next in this long-anticipated sequel to the #1 Sunday Times bestseller It Ends with Us ",
              ar: "تروي كولين هوفر جانب أطلس..."
            },
            brand: { en: "zara", ar: "زارا" },
            avgRating: 3,
            ratings: 4402,
            price: 1,
            oldPrice: 14.99,
            badge: {
              en: "choice",
              ar: "اختيارنا"
            },
            discount: {
              en: "discount up to 30%",
              ar: "خصم حتى 30%"
            },
            link: {
              en: "Offer",
              ar: "عرض"
            },
            free_delivery: true,
            color: {
              en: "multi colors",
              ar: "ألوان متعددة"
            },
            to_home: false,
            premium_offer: false,
            has_discount: true,
            verified:true
          },
          {
            static_id: "fashion-6",
            title: {
              en: "polo milton 50%",
              ar: "بولو ميلتون 50%"
            },
            type: {
              en: "T-shirt",
              ar: "تيشرت"
            },
            category: {
              en: "fashion",
              ar: "أزياء"
            },
            image: "images/fashion-6",
            description: {
              en: "Go back to the Space Race with No.1 bestselling author David Walliams for a breathless cinematic adventure full of mystery, action, laughs and surprises ",
              ar: "عد إلى سباق الفضاء مع ديفيد ويليامز..."
            },
            brand: { en: "lacoste", ar: "لاكوست" },
            avgRating: 3,
            ratings: 877,
            price: 108,
            oldPrice: 120,
            badge: {
              en: "choice",
              ar: "اختيارنا"
            },
            discount: {
              en: "discount up to 130$",
              ar: "خصم حتى 130 دولار"
            },
            link: {
              en: "Deal",
              ar: "صفقة"
            },
            free_delivery: false,
            color: {
              en: "gray",
              ar: "رمادي"
            },
            to_home: true,
            premium_offer: false,
            has_discount: true,
            verified:false
          },
          {
            static_id: "fashion-7",
            title: {
              en: "Blue jeans bag",
              ar: "حقيبة جينز زرقاء"
            },
            type: {
              en: "school bag",
              ar: "حقيبة مدرسية"
            },
            category: {
              en: "fashion",
              ar: "أزياء"
            },
            image: "images/fashion-7",
            description: {
              en: "Chemist Elizabeth Zott is not your average woman. In fact, Elizabeth Zott would be the first to point out that there is no such thing.",
              ar: "الكيميائية إليزابيث زوت ليست عادية..."
            },
            brand: { en: "zara", ar: "زارا" },
            avgRating: 4,
            ratings: 62749,
            price: 80,
            oldPrice: 110.99,
            discount: {
              en: "discount up to 24%",
              ar: "خصم حتى 24%"
            },
            link: {
              en: "Deal",
              ar: "صفقة"
            },
            free_delivery: false,
            color: {
              en: "blue",
              ar: "أزرق"
            },
            to_home: true,
            premium_offer: false,
            has_discount: true,
            verified:false
          },
          {
            static_id: "fashion-8",
            title: {
              en: "move 7 shirt",
              ar: "قميص موف 7"
            },
            type: {
              en: "T-shirt",
              ar: "تيشرت"
            },
            category: {
              en: "fashion",
              ar: "أزياء"
            },
            image: "images/fashion-8",
            description: {
              en: "From the UKs Number One Astronomy publisher, this is the bestselling stargazing handbook to the planets, stars and constellations visible from the northern hemisphere.",
              ar: "من أكبر ناشري الفلك في المملكة المتحدة..."
            },
            brand: "nike",
            avgRating: 4,
            ratings: 134,
            price: 16.79,
            oldPrice: 6.99,
            badge: {
              en: "choice",
              ar: "اختيارنا"
            },
            discount: {
              en: "discount up to 15%",
              ar: "خصم حتى 15%"
            },
            link: {
              en: "Offer",
              ar: "عرض"
            },
            free_delivery: false,
            color: {
              en: "move",
              ar: "موف"
            },
            to_home: true,
            premium_offer: true,
            has_discount: true,
            verified:true
          },
        {
            static_id: "watch-1",
            title: {
              en: "digital 1 watch in metal",
              ar: "ساعة رقمية 1 معدنية"
            },
            type: {
              en: "degital watch",
              ar: "ساعة رقمية"
            },
            category: {
              en: "watches",
              ar: "ساعات"
            },
            image: "images/watch-1",
            brand: "huawei",
            description: {
              en: "The 2023 edition takes readers on a journey that's out of this world! ",
              ar: "تأخذك طبعة 2023 في رحلة..."
            },
            avgRating: 5,
            ratings: 929,
            price: 80.5,
            oldPrice: 120,
            badge: {
              en: "choice",
              ar: "اختيارنا"
            },
            discount: {
              en: "discount up to 30%",
              ar: "خصم حتى 30%"
            },
            link: {
              en: "Deal",
              ar: "صفقة"
            },
            free_delivery: true,
            color: {
              en: "pink",
              ar: "وردي"
            },
            to_home: false,
            premium_offer: true,
            has_discount: true,
            verified:true
          },
          {
            static_id: "watch-2",
            title: {
              en: "digital 2 watch in metal",
              ar: "ساعة رقمية 2 معدنية"
            },
            type: {
              en: "numeral watch",
              ar: "ساعة عقارب"
            },
            category: {
              en: "watches",
              ar: "ساعات"
            },
            image: "images/watch-2",
            brand: "omega",
            description: {
              en: "Give them the simplest cookbook ever this Christmas . . . Jamie's back to basics with over 120 simple, delicious, ONE pan recipes",
              ar: "امنحهم أبسط كتاب طهي..."
            },
            avgRating: 4,
            ratings: 2993,
            price: 13,
            oldPrice: 23,
            badge: {
              en: "choice",
              ar: "اختيارنا"
            },
            discount: {
              en: "discount up to 12%",
              ar: "خصم حتى 12%"
            },
            link: {
              en: "Offer",
              ar: "عرض"
            },
            free_delivery: false,
            color: {
              en: "yellow",
              ar: "أصفر"
            },
            to_home: true,
            premium_offer: false,
            has_discount: true,
            verified:false
          },
          {
            static_id: "watch-3",
            title: {
              en: "digital 3 watch in metal",
              ar: "ساعة رقمية 3 معدنية"
            },
            type: {
              en: "streem watch",
              ar: "ساعة ستريم"
            },
            category: {
              en: "watches",
              ar: "ساعات"
            },
            image: "images/watch-3",
            description: {
              en: "Except trouble is never far away where the Thursday Murder Club is concerned. ",
              ar: "المشاكل لا تكون بعيدة أبداً..."
            },
            brand: "casio",
            avgRating: 5,
            ratings: 29283,
            price: 10,
            oldPrice: 20,
            discount: {
              en: "discount up to 8%",
              ar: "خصم حتى 8%"
            },
            link: {
              en: "Deal",
              ar: "صفقة"
            },
            free_delivery: false,
            color: {
              en: "white",
              ar: "أبيض"
            },
            to_home: false,
            premium_offer: false,
            has_discount: true,
            verified:false
          },
          {
            static_id: "watch-4",
            title: {
              en: "digital 4 watch in metal",
              ar: "ساعة رقمية 4 معدنية"
            },
            type: {
              en: "candidi watch",
              ar: "ساعة كانديدي"
            },
            category: {
              en: "watches",
              ar: "ساعات"
            },
            image: "images/watch-4",
            description: {
              en: "Want to impress your friends and family with both useful, worthless but undeniably interesting facts? ",
              ar: "هل تريد إثارة إعجاب عائلتك؟"
            },
            brand: "omega",
            avgRating: 4,
            ratings: 885,
            price: 100.9,
            oldPrice: 130.99,
            badge: {
              en: "limited",
              ar: "لفترة محدودة"
            },
            discount: {
              en: "discount up to 100$",
              ar: "خصم حتى 100 دولار"
            },
            link: {
              en: "Deal",
              ar: "صفقة"
            },
            free_delivery: false,
            color: {
              en: "blue",
              ar: "أزرق"
            },
            to_home: true,
            premium_offer: true,
            has_discount: true,
            verified:false
          },
          {
            static_id: "watch-5",
            title: {
              en: "digital 5 watch in metal",
              ar: "ساعة رقمية 5 معدنية"
            },
            type: {
              en: "sport watch",
              ar: "ساعة رياضية"
            },
            category: {
              en: "watches",
              ar: "ساعات"
            },
            image: "images/watch-5",
            description: {
              en: "Colleen_Hoover tells fan favourite Atlass side of the story and shares what comes next in this long-anticipated sequel to the #1 Sunday Times bestseller It Ends with Us ",
              ar: "تروي كولين هوفر جانب أطلس..."
            },
            brand: { en: "zara", ar: "زارا" },
            avgRating: 3,
            ratings: 4402,
            price: 1,
            oldPrice: 14.99,
            badge: {
              en: "choice",
              ar: "اختيارنا"
            },
            discount: {
              en: "discount up to 30%",
              ar: "خصم حتى 30%"
            },
            link: {
              en: "Offer",
              ar: "عرض"
            },
            free_delivery: true,
            color: {
              en: "linear-gradient(to bottom right,cyan,white,pink)",
              ar: "تدرج (سماوي، أبيض، وردي)"
            },
            to_home: false,
            premium_offer: false,
            has_discount: true,
            verified:true
          },
          {
            static_id: "watch-6",
            title: {
              en: "digital 6 watch in metal",
              ar: "ساعة رقمية 6 معدنية"
            },
            type: {
              en: "watch",
              ar: "ساعة"
            },
            category: {
              en: "watches",
              ar: "ساعات"
            },
            image: "images/watch-6",
            description: {
              en: "Go back to the Space Race with No.1 bestselling author David Walliams for a breathless cinematic adventure full of mystery, action, laughs and surprises ",
              ar: "عد إلى سباق الفضاء مع ديفيد ويليامز..."
            },
            brand: { en: "lacoste", ar: "لاكوست" },
            avgRating: 3,
            ratings: 877,
            price: 8,
            oldPrice: 14.99,
            badge: {
              en: "choice",
              ar: "اختيارنا"
            },
            discount: {
              en: "discount up to 130$",
              ar: "خصم حتى 130 دولار"
            },
            link: {
              en: "Deal",
              ar: "صفقة"
            },
            free_delivery: false,
            color: {
              en: "gray",
              ar: "رمادي"
            },
            to_home: true,
            premium_offer: false,
            has_discount: true,
            verified:false
          },
          {
            static_id: "watch-7",
            title: {
              en: "digital 7 watch in metal",
              ar: "ساعة رقمية 7 معدنية"
            },
            type: {
              en: "cartier watch",
              ar: "ساعة كارتييه"
            },
            category: {
              en: "fashion",
              ar: "أزياء"
            },
            image: "images/watch-7",
            description: {
              en: "Chemist Elizabeth Zott is not your average woman. In fact, Elizabeth Zott would be the first to point out that there is no such thing.",
              ar: "الكيميائية إليزابيث زوت ليست عادية..."
            },
            brand: "cartier",
            avgRating: 4,
            ratings: 62749,
            price: 80,
            oldPrice: 110.99,
            discount: {
              en: "discount up to 24%",
              ar: "خصم حتى 24%"
            },
            link: {
              en: "Deal",
              ar: "صفقة"
            },
            free_delivery: false,
            color: {
              en: "black",
              ar: "أسود"
            },
            to_home: true,
            premium_offer: false,
            has_discount: true,
            verified:true
          },
          {
            static_id: "watch-8",
            title: {
              en: "digital 8 watch in metal",
              ar: "ساعة رقمية 8 معدنية"
            },
            type: {
              en: "full optional watch",
              ar: "ساعة كاملة المواصفات"
            },
            category: {
              en: "breitling watches",
              ar: "ساعات بريتلينغ"
            },
            image: "images/watch-8",
            description: {
              en: "From the UKs Number One Astronomy publisher, this is the bestselling stargazing handbook to the planets, stars and constellations visible from the northern hemisphere.",
              ar: "من أكبر ناشري الفلك في المملكة المتحدة..."
            },
            brand: "reitling",
            avgRating: 4,
            ratings: 134,
            price: 16.79,
            oldPrice: 6.99,
            badge: {
              en: "choice",
              ar: "اختيارنا"
            },
            discount: {
              en: "discount up to 15%",
              ar: "خصم حتى 15%"
            },
            link: {
              en: "Offer",
              ar: "عرض"
            },
            free_delivery: false,
            color: {
              en: "light green",
              ar: "أخضر فاتح"
            },
            to_home: true,
            premium_offer: true,
            has_discount: true,
            verified:false
          },
        {
            static_id: "camera-1",
            title: {
              en: "security office camera",
              ar: "كاميرا مراقبة مكتبية"
            },
            type: {
              en: "security camera",
              ar: "كاميرا مراقبة"
            },
            category: {
              en: "cameras",
              ar: "كاميرات"
            },
            image: "images/camera-1",
            brand: "secu society",
            description: {
              en: "Your Fitness will be more clear handled & more safe with our machine you body more better , Book quickly Before stock runs out",
              ar: "الخصوصية والأمان مع كاميراتنا..."
            },
            avgRating: 3,
            ratings: 2089,
            price: 1500,
            oldPrice: 1700,
            badge: {
              en: "seller",
              ar: "الأكثر مبيعاً"
            },
            free_delivery: true,
            color: {
              en: "white",
              ar: "أبيض"
            },
            to_home: false,
            premium_offer: true,
            has_discount: true,
            verified:true
          },
          {
            static_id: "camera-2",
            title: {
              en: "security mobile camera",
              ar: "كاميرا مراقبة متحركة"
            },
            type: {
              en: "security wireless camera",
              ar: "كاميرا مراقبة لاسلكية"
            },
            category: {
              en: "cameras",
              ar: "كاميرات"
            },
            image: "images/camera-2",
            brand: "secu home",
            description: {
              en: "Your Fitness will be more clear handled & more safe with our machine you body more better , Book quickly Before stock runs out",
              ar: "الخصوصية والأمان مع كاميراتنا..."
            },
            avgRating: 4,
            ratings: 4085,
            price: 1200,
            oldPrice: 1300,
            badge: {
              en: "seller",
              ar: "الأكثر مبيعاً"
            },
            free_delivery: false,
            color: {
              en: "white",
              ar: "أبيض"
            },
            to_home: true,
            premium_offer: true,
            has_discount: true,
            verified:false
          },
          {
            static_id: "camera-3",
            title: {
              en: "kids camera",
              ar: "كاميرا أطفال"
            },
            type: {
              en: "kids toy camera",
              ar: "كاميرا ألعاب أطفال"
            },
            category: {
              en: "cameras",
              ar: "كاميرات"
            },
            image: "images/camera-3",
            brand: "my baby",
            description: {
              en: "Your Fitness will be more clear handled & more safe with our machine you body more better , Book quickly Before stock runs out",
              ar: "الخصوصية والأمان مع كاميراتنا..."
            },
            avgRating: 2,
            ratings: 4070,
            price: 2000,
            oldPrice: 2500,
            badge: {
              en: "seller",
              ar: "الأكثر مبيعاً"
            },
            free_delivery: true,
            color: {
              en: "pink",
              ar: "وردي"
            },
            to_home: false,
            premium_offer: true,
            has_discount: true,
            verified:false
          },
          {
            static_id: "camera-4",
            title: {
              en: "digital camera",
              ar: "كاميرا رقمية"
            },
            type: {
              en: "digital camera",
              ar: "كاميرا رقمية"
            },
            category: {
              en: "cameras",
              ar: "كاميرات"
            },
            image: "images/camera-4",
            brand: "canon",
            description: {
              en: "Your Fitness will be more clear handled & more safe with our machine you body more better , Book quickly Before stock runs out",
              ar: "الخصوصية والأمان مع كاميراتنا..."
            },
            avgRating: 5,
            ratings: 5050,
            price: 2000,
            oldPrice: 3000,
            badge: {
              en: "seller",
              ar: "الأكثر مبيعاً"
            },
            free_delivery: false,
            color: {
              en: "red",
              ar: "أحمر"
            },
            to_home: false,
            premium_offer: false,
            has_discount: false,
            verified:false
          },
          {
            static_id: "camera-5",
            title: {
              en: "2022 digital camera",
              ar: "كاميرا رقمية 2022"
            },
            type: {
              en: "digital camera",
              ar: "كاميرا رقمية"
            },
            category: {
              en: "cameras",
              ar: "كاميرات"
            },
            image: "images/camera-5",
            brand: "canon",
            description: {
              en: "Your Fitness will be more clear handled & more safe with our machine you body more better , Book quickly Before stock runs out",
              ar: "الخصوصية والأمان مع كاميراتنا..."
            },
            avgRating: 3,
            ratings: 6069,
            price: 3000,
            oldPrice: 3300,
            badge: {
              en: "seller",
              ar: "الأكثر مبيعاً"
            },
            free_delivery: false,
            color: {
              en: "dark black",
              ar: "أسود داكن"
            },
            to_home: false,
            premium_offer: false,
            has_discount: false,
            verified:true
          },
          {
            static_id: "camera-6",
            title: {
              en: "2022 digital camera",
              ar: "كاميرا رقمية 2022"
            },
            type: {
              en: "memory camera",
              ar: "كاميرا ذاكرة"
            },
            category: {
              en: "cameras",
              ar: "كاميرات"
            },
            image: "images/camera-6",
            brand: "korlor",
            description: {
              en: "Your Fitness will be more clear handled & more safe with our machine you body more better , Book quickly Before stock runs out",
              ar: "الخصوصية والأمان مع كاميراتنا..."
            },
            avgRating: 4,
            ratings: 4099,
            price: 3500,
            oldPrice: 3200,
            badge: {
              en: "seller",
              ar: "الأكثر مبيعاً"
            },
            free_delivery: true,
            color: {
              en: "medium black",
              ar: "أسود متوسط"
            },
            to_home: false,
            premium_offer: true,
            has_discount: false,
            verified:false
          },
          {
            static_id: "camera-7",
            title: {
              en: "small boket camera",
              ar: "كاميرا جيب صغيرة"
            },
            type: {
              en: "boket camera",
              ar: "كاميرا جيب"
            },
            category: {
              en: "cameras",
              ar: "كاميرات"
            },
            image: "images/camera-7",
            brand: "korlor",
            description: {
              en: "Your Fitness will be more clear handled & more safe with our machine you body more better , Book quickly Before stock runs out",
              ar: "الخصوصية والأمان مع كاميراتنا..."
            },
            avgRating: 4,
            ratings: 7089,
            price: 3400,
            oldPrice: 3100,
            badge: {
              en: "seller",
              ar: "الأكثر مبيعاً"
            },
            free_delivery: false,
            color: {
              en: "dark black",
              ar: "أسود داكن"
            },
            to_home: false,
            premium_offer: true,
            has_discount: true,
            verified:true
          },
          {
            static_id: "camera-8",
            title: {
              en: "2021 phone camera",
              ar: "كاميرا هاتف 2021"
            },
            type: {
              en: "phone camera",
              ar: "كاميرا هاتف"
            },
            category: {
              en: "cameras",
              ar: "كاميرات"
            },
            image: "images/camera-8",
            brand: "korlor",
            description: {
              en: "Your Fitness will be more clear handled & more safe with our machine you body more better , Book quickly Before stock runs out",
              ar: "الخصوصية والأمان مع كاميراتنا..."
            },
            avgRating: 4,
            ratings: 6647,
            price: 3600,
            oldPrice: 3700,
            badge: {
              en: "seller",
              ar: "الأكثر مبيعاً"
            },
            free_delivery: false,
            color: {
              en: "light white",
              ar: "أبيض فاتح"
            },
            to_home: false,
            premium_offer: true,
            has_discount: true,
            verified:false
          },
        {
            static_id: "chair-1",
            title: {
              en: "gray office chair",
              ar: "كرسي مكتب رمادي"
            },
            type: {
              en: "chair with thin armies",
              ar: "كرسي بمساند نحيفة"
            },
            category: {
              en: "fashion",
              ar: "أزياء"
            },
            image: "images/chair-1",
            brand: "global office",
            description: {
              en: "The 2023 edition takes readers on a journey that's out of this world! ",
              ar: "تأخذك طبعة 2023 في رحلة..."
            },
            avgRating: 5,
            ratings: 1929,
            price: 180.5,
            oldPrice: 1120,
            badge: {
              en: "choice",
              ar: "اختيارنا"
            },
            discount: {
              en: "discount up to 30%",
              ar: "خصم حتى 30%"
            },
            link: {
              en: "Deal",
              ar: "صفقة"
            },
            free_delivery: true,
            color: {
              en: "gray",
              ar: "رمادي"
            },
            to_home: false,
            premium_offer: true,
            has_discount: true,
            verified:true
          },
          {
            static_id: "chair-2",
            title: {
              en: "Poma Brand",
              ar: "ماركة بوما"
            },
            type: {
              en: "tend armies",
              ar: "مساند مائلة"
            },
            category: {
              en: "chairs",
              ar: "كراسي"
            },
            image: "images/chair-2",
            brand: "vip",
            description: {
              en: "Give them the simplest cookbook ever this Christmas . . . Jamie's back to basics with over 120 simple, delicious, ONE pan recipes",
              ar: "امنحهم أبسط كتاب طهي..."
            },
            avgRating: 4,
            ratings: 2993,
            price: 2213,
            oldPrice: 2323,
            badge: {
              en: "choice",
              ar: "اختيارنا"
            },
            discount: {
              en: "discount up to 12%",
              ar: "خصم حتى 12%"
            },
            link: {
              en: "Offer",
              ar: "عرض"
            },
            free_delivery: false,
            color: {
              en: "light cyan",
              ar: "سماوي فاتح"
            },
            to_home: true,
            premium_offer: false,
            has_discount: true,
            verified:false
          },
          {
            static_id: "chair-3",
            title: {
              en: "colord wepper chair",
              ar: "كرسي ويبر ملون"
            },
            type: {
              en: "wepper chair",
              ar: "كرسي ويبر"
            },
            category: {
              en: "chairs",
              ar: "كراسي"
            },
            image: "images/chair-3",
            description: {
              en: "Except trouble is never far away where the Thursday Murder Club is concerned. ",
              ar: "المشاكل لا تكون بعيدة أبداً..."
            },
            brand: "decorko",
            avgRating: 5,
            ratings: 29283,
            price: 9000,
            oldPrice: 10000,
            discount: {
              en: "discount up to 8%",
              ar: "خصم حتى 8%"
            },
            link: {
              en: "Deal",
              ar: "صفقة"
            },
            free_delivery: false,
            color: {
              en: "white",
              ar: "أبيض"
            },
            to_home: false,
            premium_offer: false,
            has_discount: true,
            verified:true
          },
          {
            static_id: "chair-4",
            title: {
              en: "white blastick chair",
              ar: "كرسي بلاستيك أبيض"
            },
            type: {
              en: "stong blastick chair",
              ar: "كرسي بلاستيك قوي"
            },
            category: {
              en: "chairs",
              ar: "كراسي"
            },
            image: "images/chair-4",
            description: {
              en: "Want to impress your friends and family with both useful, worthless but undeniably interesting facts? ",
              ar: "هل تريد إثارة إعجاب عائلتك؟"
            },
            brand: "decorko",
            avgRating: 4,
            ratings: 885,
            price: 10000,
            oldPrice: 13000,
            badge: {
              en: "limited",
              ar: "لفترة محدودة"
            },
            discount: {
              en: "discount up to 100$",
              ar: "خصم حتى 100 دولار"
            },
            link: {
              en: "Deal",
              ar: "صفقة"
            },
            free_delivery: false,
            color: {
              en: "white",
              ar: "أبيض"
            },
            to_home: true,
            premium_offer: true,
            has_discount: true,
            verified:false
          },
          {
            static_id: "chair-5",
            title: {
              en: "chair with reguler legs",
              ar: "كرسي بأرجل عادية"
            },
            type: {
              en: "legs chair",
              ar: "كرسي بأرجل"
            },
            category: {
              en: "chairs",
              ar: "كراسي"
            },
            image: "images/chair-5",
            description: {
              en: "Colleen_Hoover tells fan favourite Atlass side of the story and shares what comes next in this long-anticipated sequel to the #1 Sunday Times bestseller It Ends with Us ",
              ar: "تروي كولين هوفر جانب أطلس..."
            },
            brand: "my business",
            avgRating: 3,
            ratings: 4402,
            price: 1661,
            oldPrice:1900,
            badge: {
              en: "choice",
              ar: "اختيارنا"
            },
            discount: {
              en: "discount up to 30%",
              ar: "خصم حتى 30%"
            },
            link: {
              en: "Offer",
              ar: "عرض"
            },
            free_delivery: true,
            color: {
              en: "pink",
              ar: "وردي"
            },
            to_home: false,
            premium_offer: false,
            has_discount: true,
            verified:false
          },
          {
            static_id: "chair-6",
            title: {
              en: "sefty back chair",
              ar: "كرسي بظهر آمن"
            },
            type: {
              en: "sefty chair",
              ar: "كرسي آمن"
            },
            category: {
              en: "chairs",
              ar: "كراسي"
            },
            image: "images/chair-6",
            description: {
              en: "Go back to the Space Race with No.1 bestselling author David Walliams for a breathless cinematic adventure full of mystery, action, laughs and surprises ",
              ar: "عد إلى سباق الفضاء مع ديفيد ويليامز..."
            },
            brand: "vip",
            avgRating: 3,
            ratings: 477,
            price: 9000,
            oldPrice: 10000,
            badge: {
              en: "choice",
              ar: "اختيارنا"
            },
            discount: {
              en: "discount up to 130$",
              ar: "خصم حتى 130 دولار"
            },
            link: {
              en: "Deal",
              ar: "صفقة"
            },
            free_delivery: false,
            color: {
              en: "dark gray",
              ar: "رمادي داكن"
            },
            to_home: true,
            premium_offer: false,
            has_discount: true,
            verified:true
          },
          {
            static_id: "chair-7",
            title: {
              en: "tend bottom chair",
              ar: "كرسي بقاعدة مائلة"
            },
            type: {
              en: "tend bottom chair",
              ar: "كرسي قاعدة مائلة"
            },
            category: {
              en: "chairs",
              ar: "كراسي"
            },
            image: "images/chair-7",
            description: {
              en: "Chemist Elizabeth Zott is not your average woman. In fact, Elizabeth Zott would be the first to point out that there is no such thing.",
              ar: "الكيميائية إليزابيث زوت ليست عادية..."
            },
            brand: "oficers",
            avgRating: 4,
            ratings: 62749,
            price: 80,
            oldPrice: 110.99,
            discount: {
              en: "discount up to 24%",
              ar: "خصم حتى 24%"
            },
            link: {
              en: "Deal",
              ar: "صفقة"
            },
            free_delivery: false,
            color: {
              en: "dark black",
              ar: "أسود داكن"
            },
            to_home: true,
            premium_offer: false,
            has_discount: true,
            verified:false
          },
          {
            static_id: "chair-8",
            title: {
              en: "Black wide chair",
              ar: "كرسي أسود واسع"
            },
            type: {
              en: "wide chair",
              ar: "كرسي واسع"
            },
            category: {
              en: "chairs",
              ar: "كراسي"
            },
            image: "images/chair-8",
            description: {
              en: "From the UKs Number One Astronomy publisher, this is the bestselling stargazing handbook to the planets, stars and constellations visible from the northern hemisphere.",
              ar: "من أكبر ناشري الفلك في المملكة المتحدة..."
            },
            brand: "my business",
            avgRating: 4,
            ratings: 134,
            price: 9016,
            oldPrice:11000,
            badge: {
              en: "choice",
              ar: "اختيارنا"
            },
            discount: {
              en: "discount up to 15%",
              ar: "خصم حتى 15%"
            },
            link: {
              en: "Offer",
              ar: "عرض"
            },
            free_delivery: false,
            color: {
              en: "light black",
              ar: "أسود فاتح"
            },
            to_home: true,
            premium_offer: true,
            has_discount: true,
            verified:false
          },
        {
            static_id: "dish-1",
            title: {
              en: "blue chinese dishes",
              ar: "أطباق صينية زرقاء"
            },
            type: {
              en: "chair with thin armies",
              ar: "أطباق بمساند نحيفة"
            },
            category: {
              en: "dishes",
              ar: "أطباق"
            },
            image: "images/dish-1",
            brand: "the king",
            description: {
              en: "The 2023 edition takes readers on a journey that's out of this world! ",
              ar: "تأخذك طبعة 2023 في رحلة..."
            },
            avgRating: 5,
            ratings: 1929,
            price: 580.5,
            oldPrice: 520,
            badge: {
              en: "choice",
              ar: "اختيارنا"
            },
            discount: {
              en: "discount up to 30%",
              ar: "خصم حتى 30%"
            },
            link: {
              en: "Deal",
              ar: "صفقة"
            },
            free_delivery: true,
            color: {
              en: "light blue",
              ar: "أزرق فاتح"
            },
            to_home: false,
            premium_offer: true,
            has_discount: true,
            verified:false
          },
          {
            static_id: "dish-2",
            title: {
              en: "peeler can",
              ar: "مقشرة علب"
            },
            type: {
              en: "peeler can",
              ar: "مقشرة علب"
            },
            category: {
              en: "dishes",
              ar: "أطباق"
            },
            image: "images/dish-2",
            brand: "prince",
            description: {
              en: "Give them the simplest cookbook ever this Christmas . . . Jamie's back to basics with over 120 simple, delicious, ONE pan recipes",
              ar: "امنحهم أبسط كتاب طهي..."
            },
            avgRating: 4,
            ratings: 2993,
            price: 213,
            oldPrice: 323,
            badge: {
              en: "choice",
              ar: "اختيارنا"
            },
            discount: {
              en: "discount up to 12%",
              ar: "خصم حتى 12%"
            },
            link: {
              en: "Offer",
              ar: "عرض"
            },
            free_delivery: false,
            color: {
              en: "browen white",
              ar: "بني أبيض"
            },
            to_home: true,
            premium_offer: false,
            has_discount: true,
            verified:false
          },
          {
            static_id: "dish-3",
            title: {
              en: "colord cups and dishes",
              ar: "أكواب وأطباق ملونة"
            },
            type: {
              en: "cups dishes",
              ar: "أطباق أكواب"
            },
            category: {
              en: "dishes",
              ar: "أطباق"
            },
            image: "images/dish-3",
            description: {
              en: "Except trouble is never far away where the Thursday Murder Club is concerned. ",
              ar: "المشاكل لا تكون بعيدة أبداً..."
            },
            brand: "the king",
            avgRating: 5,
            ratings: 29283,
            price: 900,
            oldPrice: 1000,
            discount: {
              en: "discount up to 8%",
              ar: "خصم حتى 8%"
            },
            link: {
              en: "Deal",
              ar: "صفقة"
            },
            free_delivery: false,
            color: {
              en: "white",
              ar: "أبيض"
            },
            to_home: false,
            premium_offer: false,
            has_discount: true,
            verified:false
          },
          {
            static_id: "dish-4",
            title: {
              en: "several type dishes",
              ar: "أطباق بأنواع متعددة"
            },
            type: {
              en: "granete dishes",
              ar: "أطباق جرانيت"
            },
            category: {
              en: "dishes",
              ar: "أطباق"
            },
            image: "images/dish-4",
            description: {
              en: "Want to impress your friends and family with both useful, worthless but undeniably interesting facts? ",
              ar: "هل تريد إثارة إعجاب عائلتك؟"
            },
            brand: "the queen",
            avgRating: 4,
            ratings: 885,
            price: 1000,
            oldPrice: 900,
            badge: {
              en: "limited",
              ar: "لفترة محدودة"
            },
            discount: {
              en: "discount up to 100$",
              ar: "خصم حتى 100 دولار"
            },
            link: {
              en: "Deal",
              ar: "صفقة"
            },
            free_delivery: false,
            color: {
              en: "white",
              ar: "أبيض"
            },
            to_home: true,
            premium_offer: true,
            has_discount: true,
            verified:false
          },
          {
            static_id: "dish-5",
            title: {
              en: "browen ceramic dishes",
              ar: "أطباق سيراميك بنية"
            },
            type: {
              en: "ceramic dishes",
              ar: "أطباق سيراميك"
            },
            category: {
              en: "dishes",
              ar: "أطباق"
            },
            image: "images/dish-5",
            description: {
              en: "Colleen_Hoover tells fan favourite Atlass side of the story and shares what comes next in this long-anticipated sequel to the #1 Sunday Times bestseller It Ends with Us ",
              ar: "تروي كولين هوفر جانب أطلس..."
            },
            brand: "the queen",
            avgRating: 3,
            ratings: 402,
            price: 661,
            oldPrice:1900,
            badge: {
              en: "choice",
              ar: "اختيارنا"
            },
            discount: {
              en: "discount up to 30%",
              ar: "خصم حتى 30%"
            },
            link: {
              en: "Offer",
              ar: "عرض"
            },
            free_delivery: true,
            color: {
              en: "light browen",
              ar: "بني فاتح"
            },
            to_home: false,
            premium_offer: false,
            has_discount: true,
            verified:false
          },
          {
            static_id: "dish-6",
            title: {
              en: "white several types",
              ar: "أنواع بيضاء متعددة"
            },
            type: {
              en: "white blue group",
              ar: "مجموعة أبيض وأزرق"
            },
            category: {
              en: "dishes",
              ar: "أطباق"
            },
            image: "images/dish-6",
            description: {
              en: "Go back to the Space Race with No.1 bestselling author David Walliams for a breathless cinematic adventure full of mystery, action, laughs and surprises ",
              ar: "عد إلى سباق الفضاء مع ديفيد ويليامز..."
            },
            brand: "the king",
            avgRating: 3,
            ratings: 477,
            price: 900,
            oldPrice: 1000,
            badge: {
              en: "choice",
              ar: "اختيارنا"
            },
            discount: {
              en: "discount up to 130$",
              ar: "خصم حتى 130 دولار"
            },
            link: {
              en: "Deal",
              ar: "صفقة"
            },
            free_delivery: false,
            color: {
              en: "white blue",
              ar: "أبيض أزرق"
            },
            to_home: true,
            premium_offer: false,
            has_discount: true,
            verified:true
          },
          {
            static_id: "dish-7",
            title: {
              en: "several sizes group",
              ar: "مجموعة أحجام متعددة"
            },
            type: {
              en: "several sizes group",
              ar: "مجموعة أحجام متعددة"
            },
            category: {
              en: "dishes",
              ar: "أطباق"
            },
            image: "images/dish-7",
            description: {
              en: "Chemist Elizabeth Zott is not your average woman. In fact, Elizabeth Zott would be the first to point out that there is no such thing.",
              ar: "الكيميائية إليزابيث زوت ليست عادية..."
            },
            brand: "princess",
            avgRating: 4,
            ratings: 62749,
            price: 80,
            oldPrice: 110.99,
            discount: {
              en: "discount up to 24%",
              ar: "خصم حتى 24%"
            },
            link: {
              en: "Deal",
              ar: "صفقة"
            },
            free_delivery: false,
            color: {
              en: "dark black",
              ar: "أسود داكن"
            },
            to_home: true,
            premium_offer: false,
            has_discount: true,
            verified:false
          },
          {
            static_id: "dish-8",
            title: {
              en: "boxes and dishes group",
              ar: "مجموعة صناديق وأطباق"
            },
            type: {
              en: "boxes and dishes",
              ar: "صناديق وأطباق"
            },
            category: {
              en: "chairs",
              ar: "كراسي"
            },
            image: "images/dish-8",
            description: {
              en: "From the UKs Number One Astronomy publisher, this is the bestselling stargazing handbook to the planets, stars and constellations visible from the northern hemisphere.",
              ar: "من أكبر ناشري الفلك في المملكة المتحدة..."
            },
            brand: "my business",
            avgRating: 4,
            ratings: 134,
            price: 916,
            oldPrice:1000,
            badge: {
              en: "choice",
              ar: "اختيارنا"
            },
            discount: {
              en: "discount up to 15%",
              ar: "خصم حتى 15%"
            },
            link: {
              en: "Offer",
              ar: "عرض"
            },
            free_delivery: false,
            color: {
              en: "white",
              ar: "أبيض"
            },
            to_home: true,
            premium_offer: true,
            has_discount: true,
            verified:true
          }, 
        {
            static_id: "headphone-1",
            title: {
              en: "xiaomi gray headphone",
              ar: "سماعة شاومي رمادية"
            },
            type: {
              en: "moving headphone",
              ar: "سماعة متحركة"
            },
            category: {
              en: "headphones",
              ar: "سماعات"
            },
            description: {
              en: "More cheep and more premium",
              ar: "أرخص وأكثر جودة"
            },
            image: "images/headphone-1",
            brand: { en: "xiaomi", ar: "شاومي" },
            avgRating: 2,
            ratings: 140,
            price: 1300,
            oldPrice: 1600,
            badge: {
              en: "seller",
              ar: "الأكثر مبيعاً"
            },
            free_delivery: false,
            color: {
              en: "medium black",
              ar: "أسود متوسط"
            },
            to_home: true,
            premium_offer: true,
            has_discount: true,
            verified:true
        },
        {
            static_id: "headphone-2",
            title: {
              en: "samsung syan hea headphone-2",
              ar: "سماعة سامسونج سيان"
            },
            type: {
              en: "headphone with mic",
              ar: "سماعة بميكروفون"
            },
            category: {
              en: "headphones",
              ar: "سماعات"
            },
            description: {
              en: "More cheep and more premium",
              ar: "أرخص وأكثر جودة"
            },
            image: "images/headphone-2",
            brand: { en: "samsung", ar: "سامسونج" },
            avgRating: 4,
            ratings: 150,
            price: 800,
            oldPrice: 800,
            badge: {
              en: "choice",
              ar: "اختيارنا"
            },
            free_delivery: false,
            color: {
              en: "white",
              ar: "أبيض"
            },
            to_home: false,
            premium_offer: false,
            has_discount: false,
            verified:false
        },
        {
            static_id: "headphone-3",
            title: {
              en: "Oppo white headphone",
              ar: "سماعة أوبو بيضاء"
            },
            type: {
              en: "squard airpods",
              ar: "سماعات مربعة"
            },
            category: {
              en: "headphones",
              ar: "سماعات"
            },
            description: {
              en: "More cheep and more premium",
              ar: "أرخص وأكثر جودة"
            },
            image: "images/headohone-3",
            brand: "oppo",
            avgRating: 2,
            ratings: 110,
            price: 350,
            oldPrice: 400,
            badge: {
              en: "limited",
              ar: "لفترة محدودة"
            },
            free_delivery: false,
            color: {
              en: "green",
              ar: "أخضر"
            },
            to_home: false,
            premium_offer: false,
            has_discount: true,
            verified:true
        },
        {
            static_id: "headphone-4",
            title: {
              en: "regular headphone",
              ar: "سماعة عادية"
            },
            type: {
              en: "regular headphone",
              ar: "سماعة عادية"
            },
            category: {
              en: "headphones",
              ar: "سماعات"
            },
            description: {
              en: "More cheep and more premium",
              ar: "أرخص وأكثر جودة"
            },
            image: "images/headohone-4",
            brand: { en: "tigger", ar: "تيجر" },
            avgRating: 3,
            ratings: 150,
            price: 500,
            oldPrice: 800,
            badge: {
              en: "limited",
              ar: "لفترة محدودة"
            },
            free_delivery: true,
            color: {
              en: "medium red",
              ar: "أحمر متوسط"
            },
            to_home: false,
            premium_offer: true,
            has_discount: true,
            verified:false
        },
        {
            static_id: "headphone-5",
            title: {
              en: "Ipone black headphone",
              ar: "سماعة أيفون سوداء"
            },
            type: {
              en: "5G headphone",
              ar: "سماعة 5G"
            },
            category: {
              en: "headphones",
              ar: "سماعات"
            },
            description: {
              en: "More cheep and more premium",
              ar: "أرخص وأكثر جودة"
            },
            image: "images/headohone-5",
            brand: { en: "apple", ar: "أبل" },
            avgRating: 5,
            ratings: 135,
            price: 1050,
            oldPrice: 1200,
            badge: {
              en: "seller",
              ar: "الأكثر مبيعاً"
            },
            free_delivery: true,
            color: {
              en: "light black",
              ar: "أسود فاتح"
            },
            to_home: false,
            premium_offer: true,
            has_discount: true,
            verified:false
        },
        {
            static_id: "headphone-6",
            title: {
              en: "Nokia headphone charger",
              ar: "شاحن سماعة نوكيا"
            },
            "details": {
              en: "Browes without hizitaion",
              ar: "تصفح بدون تردد"
            },
            type: {
              en: "headphone charger",
              ar: "شاحن سماعة"
            },
            category: {
              en: "headphones",
              ar: "سماعات"
            },
            description: {
              en: "More cheep and more premium",
              ar: "أرخص وأكثر جودة"
            },
            image: "images/headohone-6",
            brand: { en: "dell", ar: "ديل" },
            avgRating: 2,
            ratings: 110,
            price: 70,
            oldPrice: 70,
            free_delivery: true,
            color: {
              en: "dark black",
              ar: "أسود داكن"
            },
            to_home: true,
            premium_offer: false,
            has_discount: false,
            verified:false
        },
        {
            static_id: "kitchen-1",
            title: {
              en: "cofee maker",
              ar: "ماكينة قهوة"
            },
            type: {
              en: "cofee maker",
              ar: "ماكينة قهوة"
            },
            category: {
              en: "kitchen-tools",
              ar: "أدوات مطبخ"
            },
            image: "images/kitchen-tools-1",
            brand: { en: "zanussi", ar: "زانوسي" },
            description: {
              en: "Your Houes will be more easy handled & more safe with our machine you life more better , Book quickly Before stock runs out",
              ar: "سيصبح منزلك أسهل وأكثر أماناً..."
            },
            avgRating: 5,
            ratings: 877,
            price: 190,
            oldPrice: 200,
            badge: {
              en: "choice",
              ar: "اختيارنا"
            },
            free_delivery: true,
            color: {
              en: "browen white",
              ar: "بني أبيض"
            },
            to_home: true,
            premium_offer: true,
            has_discount: true,
            verified:true
        },
        {
            static_id: "kitchen-2",
            title: {
              en: "Grill 10L Toshipa",
              ar: "شواية 10 لتر توشيبا"
            },
            type: {
              en: "grill with legs",
              ar: "شواية بأرجل"
            },
            category: {
              en: "kitchen-tools",
              ar: "أدوات مطبخ"
            },
            image: "images/kitchen-tools-2",
            brand: { en: "zanussi", ar: "زانوسي" },
            description: {
              en: "Your Houes will be more easy handled & more safe with our machine you life more better , Book quickly Before stock runs out",
              ar: "سيصبح منزلك أسهل وأكثر أماناً..."
            },
            avgRating: 4,
            ratings: 2993,
            price: 380,
            oldPrice: 380,
            badge: {
              en: "limited",
              ar: "لفترة محدودة"
            },
            free_delivery: false,
            color: {
              en: "browen",
              ar: "بني"
            },
            to_home: true,
            premium_offer: true,
            has_discount: false,
            verified:false
        },
        {
            static_id: "kitchen-3",
            title: {
              en: "Grill Water A 10L",
              ar: "شواية مياه 10 لتر"
            },
            type: {
              en: "grill with tire",
              ar: "شواية بإطارات"
            },
            category: {
              en: "kitchen-tools",
              ar: "أدوات مطبخ"
            },
            image: "images/kitchen-tools-3",
            brand: { en: "sharp", ar: "شارب" },
            description: {
              en: "Your Houes will be more easy handled & more safe with our machine you life more better , Book quickly Before stock runs out",
              ar: "سيصبح منزلك أسهل وأكثر أماناً..."
            },
            avgRating: 2,
            ratings: 29283,
            price: 10,
            oldPrice: 20,
            badge: {
              en: "seller",
              ar: "الأكثر مبيعاً"
            },
            free_delivery: false,
            color: {
              en: "light black",
              ar: "أسود فاتح"
            },
            to_home: true,
            premium_offer: false,
            has_discount: true,
            verified:true
        },
        {
            static_id: "kitchen-4",
            title: {
              en: "Blender of fruits",
              ar: "خلاط فواكه"
            },
            type: {
              en: "blender",
              ar: "خلاط"
            },
            category: {
              en: "kitchen-tools",
              ar: "أدوات مطبخ"
            },
            image: "images/kitchen-tools-4",
            brand: { en: "sharp", ar: "شارب" },
            description: {
              en: "Your Houes will be more easy handled & more safe with our machine you life more better , Book quickly Before stock runs out",
              ar: "سيصبح منزلك أسهل وأكثر أماناً..."
            },
            avgRating: 5,
            ratings: 885,
            price: 3900.9,
            oldPrice: 4200.99,
            badge: {
              en: "limited",
              ar: "لفترة محدودة"
            },
            free_delivery: true,
            color: {
              en: "cyan",
              ar: "سماوي"
            },
            to_home: true,
            premium_offer: true,
            has_discount: true,
            verified:false
        },
        {
            static_id: "kitchen-5",
            title: {
              en: "cofee broak",
              ar: "استراحة قهوة"
            },
            type: {
              en: "cofee maker",
              ar: "ماكينة قهوة"
            },
            category: {
              en: "kitchen-tools",
              ar: "أدوات مطبخ"
            },
            image: "images/kitchen-tools-5",
            brand: { en: "tornado", ar: "تورنيدو" },
            description: {
              en: "Your Houes will be more easy handled & more safe with our machine you life more better , Book quickly Before stock runs out",
              ar: "سيصبح منزلك أسهل وأكثر أماناً..."
            },
            avgRating: 5,
            ratings: 402,
            price: 4000,
            oldPrice: 4500.99,
            badge: {
              en: "choice",
              ar: "اختيارنا"
            },
            free_delivery: false,
            color: {
              en: "light white",
              ar: "أبيض فاتح"
            },
            to_home: false,
            premium_offer: true,
            has_discount: true,
            verified:true
        },
        {
            static_id: "kitchen-6",
            title: {
              en: "Small black kattel",
              ar: "غلاية سوداء صغيرة"
            },
            type: {
              en: "kattel",
              ar: "غلاية"
            },
            category: {
              en: "kitchen-tools",
              ar: "أدوات مطبخ"
            },
            image: "images/kitchen-tools-6",
            brand: { en: "toshiba", ar: "توشيبا" },
            description: {
              en: "Your Houes will be more easy handled & more safe with our machine you life more better , Book quickly Before stock runs out",
              ar: "سيصبح منزلك أسهل وأكثر أماناً..."
            },
            avgRating: 5,
            ratings: 877,
            price: 3000,
            oldPrice: 3500.99,
            badge: {
              en: "seller",
              ar: "الأكثر مبيعاً"
            },
            free_delivery: false,
            color: {
              en: "light black",
              ar: "أسود فاتح"
            },
            to_home: false,
            premium_offer: true,
            has_discount: true,
            verified:false
        },
        {
            static_id: "kitchen-7",
            title: {
              en: "Large black kattel",
              ar: "غلاية سوداء كبيرة"
            },
            type: {
              en: "kattel",
              ar: "غلاية"
            },
            category: {
              en: "kitchen-tools",
              ar: "أدوات مطبخ"
            },
            image: "images/kitchen-tools-7",
            brand: { en: "zanussi", ar: "زانوسي" },
            description: {
              en: "Your Houes will be more easy handled & more safe with our machine you life more better , Book quickly Before stock runs out",
              ar: "سيصبح منزلك أسهل وأكثر أماناً..."
            },
            avgRating: 4,
            ratings: 62749,
            price: 4000,
            oldPrice: 4200.99,
            badge: {
              en: "seller",
              ar: "الأكثر مبيعاً"
            },
            free_delivery: false,
            color: {
              en: "black",
              ar: "أسود"
            },
            to_home: true,
            premium_offer: true,
            has_discount: true,
            verified:false
        },
        {
            static_id: "kitchen-8",
            title: {
              en: "Fruit juicer",
              ar: "عصارة فواكه"
            },
            type: {
              en: "Fruit juicer",
              ar: "عصارة فواكه"
            },
            category: {
              en: "kitchen-tools",
              ar: "أدوات مطبخ"
            },
            image: "images/kitchen-tools-8",
            brand: { en: "tornado", ar: "تورنيدو" },
            description: {
              en: "Your Houes will be more easy handled & more safe with our machine you life more better , Book quickly Before stock runs out",
              ar: "سيصبح منزلك أسهل وأكثر أماناً..."
            },
            avgRating: 5,
            ratings: 29283,
            price: 450,
            oldPrice: 950,
            badge: {
              en: "seller",
              ar: "الأكثر مبيعاً"
            },
            free_delivery: true,
            color: {
              en: "white black",
              ar: "أبيض أسود"
            },
            to_home: false,
            premium_offer: true,
            has_discount: false,
            verified:true
        } 
     ]

}

export default data