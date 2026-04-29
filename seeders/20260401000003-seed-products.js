"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Products", [
      {
        name: "Nike Air Zoom Pegasus 40",
        description:
          "Sepatu lari premium dengan teknologi Air Zoom untuk kenyamanan maksimal di setiap langkah. Cocok untuk lari jarak jauh maupun latihan harian.",
        price: 1950000,
        size: 42,
        stock: 25,
        sold: 22,
        imgUrl:
          "https://img.ncrsport.com/img/storage/large/FB7179-100-1.jpg?w=600&q=80",
        categoryId: 1,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Adidas Ultraboost 23",
        description:
          "Sepatu lari berteknologi Boost untuk energi balik optimal. Upper Primeknit memberikan fit yang sempurna dan fleksibel.",
        price: 2300000,
        size: 43,
        stock: 15,
        sold: 18,
        imgUrl:
          "https://assets.adidas.com/images/w_600,f_auto,q_auto/c9045494c79b4daca8ad306c22565cdf_9366/Ultraboost_Light_23_Shoes_Black_HP6443.jpg?w=600&q=80",
        categoryId: 1,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "New Balance Fresh Foam 1080v13",
        description:
          "Sepatu lari dengan midsole Fresh Foam X yang memberikan bantalan lembut namun responsif. Ideal untuk pelari yang mengutamakan kenyamanan.",
        price: 1750000,
        size: 41,
        stock: 30,
        sold: 8,
        imgUrl:
          "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full/catalog-image/105/MTA-158757206/new-balance_new-balance-fresh-foam-x-1080v13-men-s-running-shoes-timberwolf_full01.jpg?w=600&q=80",
        categoryId: 1,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Nike Mercurial Vapor 15",
        description:
          "Sepatu futsal premium untuk kecepatan maksimal. Sol Vaporposite yang ringan dan responsif untuk performa terbaik di lapangan.",
        price: 2100000,
        size: 42,
        stock: 20,
        sold: 16,
        imgUrl:
          "https://thumblr.uniid.it/product/352916/045f2653b5d7.jpg?width=3840&format=webp&q=75?w=600&q=80",
        categoryId: 1,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Puma Future 7 Pro FG",
        description:
          "Sepatu bola dengan upper FUZIONFIT+ yang adaptif mengikuti bentuk kaki. Cocok untuk lapangan rumput alam maupun sintetis.",
        price: 1850000,
        size: 43,
        stock: 18,
        sold: 5,
        imgUrl:
          "https://thumblr.uniid.it/product/357586/408e97d77df4.jpg?width=3840&format=webp&q=75?w=600&q=80",
        categoryId: 1,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Nike Air Force 1 '07",
        description:
          "Ikon sneakers klasik yang tidak pernah ketinggalan zaman. Desain low-top sederhana namun elegan, cocok untuk tampilan kasual sehari-hari.",
        price: 1450000,
        size: 42,
        stock: 40,
        sold: 35,
        imgUrl:
          "https://static.nike.com/a/images/t_web_pdp_936_v2/f_auto,u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/b7d9211c-26e7-431a-ac24-b0540fb3c00f/AIR+FORCE+1+%2707.png?w=600&q=80",
        categoryId: 2,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Adidas Stan Smith Lux",
        description:
          "Sneakers tennis klasik yang telah menjadi wardrobe staple selama puluhan tahun. Upper kulit premium dengan tiga stripes ikonik.",
        price: 1200000,
        size: 41,
        stock: 35,
        sold: 28,
        imgUrl:
          "https://assets.adidas.com/images/w_600,f_auto,q_auto/e54cbb2a58704d0bb3bf1cf795c8e15a_9366/Sepatu_Stan_Smith_Lux_Putih_IF8844_01_standard.jpg?w=600&q=80",
        categoryId: 2,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Converse Chuck Taylor All Star",
        description:
          "Sepatu canvas legendaris yang tidak lekang waktu. Tersedia dalam berbagai warna, cocok dipadukan dengan outfit apa saja.",
        price: 850000,
        size: 40,
        stock: 50,
        sold: 42,
        imgUrl:
          "https://bb-scm-prod-pim.oss-ap-southeast-5.aliyuncs.com/products/cb188e47bb3eeb7a765b52ca3bb13d06/helix/04-CONVERSE-FFSSBCONA-CONM9166C-Black.jpg?x-oss-process=image/format,webp",
        categoryId: 2,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Vans Old Skool Pro",
        description:
          "Sepatu skate klasik dengan side stripe ikonik. Sol waffle yang grippy dan upper suede-canvas yang tahan lama.",
        price: 950000,
        size: 42,
        stock: 45,
        sold: 31,
        imgUrl:
          "https://media.karousell.com/media/photos/products/2025/6/29/vans_oldskool_pro_x_baker_1751211595_f63c7942_progressive.jpg?w=600&q=80",
        categoryId: 2,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "New Balance 740",
        description:
          "Sneakers lifestyle dengan heritage running yang kuat. ENCAP midsole memberikan support dan cushioning yang nyaman untuk pemakaian harian.",
        price: 1350000,
        size: 43,
        stock: 28,
        sold: 12,
        imgUrl:
          "https://down-id.img.susercontent.com/file/id-11134207-7rasi-m4r07b9rb1czd6?w=600&q=80",
        categoryId: 2,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Clarks Desert Boot",
        description:
          "Boot suede klasik dengan sol crepe yang ikonik. Desain minimalis yang timeless, cocok untuk tampilan formal casual.",
        price: 1650000,
        size: 42,
        stock: 20,
        sold: 9,
        imgUrl:
          "https://cdn.media.amplience.net/i/clarks/26155484_GW_4?w=600&q=80",
        categoryId: 3,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Dr. Martens 1460",
        description:
          "Boot kulit ikonik dengan sol AirWair yang legendaris. Dibuat dari kulit Smooth berkualitas tinggi, semakin nyaman seiring pemakaian.",
        price: 2200000,
        size: 41,
        stock: 15,
        sold: 6,
        imgUrl:
          "https://bb-scm-prod-pim.oss-ap-southeast-5.aliyuncs.com/products/8f3deb635ee73769d441a44a38947a6b/titan/02-DR-MARTENS-FUBMDDRMA-1460-Smooth-Leather-Lace-Up-Boots-Cherry%20Red.jpg?w=600&q=80",
        categoryId: 3,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Oxford Brogue Premium",
        description:
          "Sepatu oxford brogue berbahan full-grain leather dengan detail perforasi elegan. Cocok untuk acara formal maupun business meeting.",
        price: 3500000,
        size: 43,
        stock: 10,
        sold: 4,
        imgUrl:
          "https://arthurknight.com/media/catalog/product/cache/f8b6fd432ac0c44b66c9948b8ae0b93d/j/o/john-white-oxblood-burgundy-oxford-brogue-shoes-5.webp?w=600&q=80",
        categoryId: 3,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Loafer Penny Lane Suede",
        description:
          "Penny loafer berbahan suede lembut dengan detail strap klasik. Nyaman dipakai seharian, cocok untuk tampilan smart casual.",
        price: 1450000,
        size: 42,
        stock: 25,
        sold: 11,
        imgUrl:
          "https://www.jacobbrian.com/wp-content/uploads/2023/12/james_3227_4_qtr_original_89063.jpg?w=600&q=80",
        categoryId: 3,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Derby Wingtip Genuine Leather",
        description:
          "Sepatu derby wingtip berbahan genuine leather pilihan. Jahitan tangan yang rapi dan sol leather yang kokoh untuk tampilan profesional.",
        price: 2800000,
        size: 44,
        stock: 8,
        sold: 3,
        imgUrl:
          "https://leatherskinshop.com/cdn/shop/products/Men-Bold-Tan-Derby-Wingtip-Brogue-Genuine-Leather-Shoes-1_1024x1024.jpg?v=1558823097?w=600&q=80",
        categoryId: 3,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Steve Madden Irenee Heels",
        description:
          "Heels stiletto elegan dengan strap ankle yang chic. Tinggi hak 9cm memberikan tampilan langsing dan percaya diri untuk berbagai acara.",
        price: 1200000,
        size: 38,
        stock: 20,
        sold: 19,
        imgUrl:
          "https://img.gem.app/1667677982/1t/1750931306/steve-madden-irenee-block-heels.jpg?w=600&q=80",
        categoryId: 4,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Tory Burch Ballet Flat",
        description:
          "Balerina flat mewah dengan logo medallion ikonik. Upper kulit premium yang lembut dan sol yang nyaman untuk pemakaian seharian.",
        price: 4100000,
        size: 37,
        stock: 18,
        sold: 14,
        imgUrl:
          "https://dynamic.zacdn.com/hfugvJ17eKH4ApIL8abnzFlf6yM=/filters:quality(70):format(webp)/https://static-id.zacdn.com/p/tory-burch-1598-9587115-1.jpg?w=600&q=80",
        categoryId: 4,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Birkenstock Arizona Soft Footbed",
        description:
          "Sandal ergonomis dengan footbed EVA yang ringan dan fleksibel. Kontur footbed anatomis mendukung postur alami dan kenyamanan sepanjang hari.",
        price: 1350000,
        size: 38,
        stock: 30,
        sold: 22,
        imgUrl:
          "https://down-id.img.susercontent.com/file/221ad8d0db9a73a220b4518819083b2a?w=600&q=80",
        categoryId: 4,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Block Heel Ankle Boot Wanita",
        description:
          "Ankle boot dengan block heel 5cm yang stabil dan nyaman. Material faux suede premium dengan zipper samping untuk kemudahan pemakaian.",
        price: 980000,
        size: 37,
        stock: 22,
        sold: 17,
        imgUrl:
          "https://dynamic.zacdn.com/_Lt6DHUCY9SKhNe3hnJ8XCPdGgg=/filters:quality(70):format(webp)/https://static-id.zacdn.com/p/marks-spencer-9629-4981294-2.jpg?w=600&q=80",
        categoryId: 4,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Wedge Espadrille Canvas",
        description:
          "Wedge espadrille dengan platform 5cm berbahan canvas yang breathable. Tali ankle wrap memberikan stabilitas ekstra dan tampilan musim panas yang playful.",
        price: 750000,
        size: 36,
        stock: 35,
        sold: 26,
        imgUrl:
          "https://espadrille.co.uk/wp-content/uploads/2023/11/Frost-Canvas-Ankle-Strap-Espadrilles-High-Wedge-espadrille.co_.uk_.jpg?w=600&q=80",
        categoryId: 4,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Products", null, {});
  },
};
