const Product = require('./model/product')

class FakeDb {
  constructor() {
    this.products = [
      {
        coverImage:'./assets/img/cat1.jpg',
        name: 'Phone XL',
        price: 799,
        description: 'A large phone with one of the best screens',
        heading1: 'neko!',
        heading2: 'neko! neko!',
        heading3: 'neko! neko! neko!',
        headingtext1: 'When the cat\'s away, the mice will play. When the cat\'s away, the mice will play. When the cat\'s away, the mice will play.',
        headingtext2: 'Let’s see which way the cat jumps. Let’s see which way the cat jumps. Let’s see which way the cat jumps. Let’s see which way the cat jumps. ',
        headingtext3: 'The cat did it. The cat did it. The cat did it. The cat did it. The cat did it. The cat did it. The cat did it. The cat did it. The cat did it. ',
      },
      {
        coverImage:'./assets/img/cat2.jpg',
        name: 'Phone Mini',
        price: 699,
        description: 'A great phone with one of the best cameras',
        heading1: 'neko!',
        heading2: 'neko! neko!',
        heading3: 'neko! neko! neko!',
        headingtext1: 'When the cat\'s away, the mice will play. When the cat\'s away, the mice will play. When the cat\'s away, the mice will play.',
        headingtext2: 'Let’s see which way the cat jumps. Let’s see which way the cat jumps. Let’s see which way the cat jumps. Let’s see which way the cat jumps. ',
        headingtext3: 'The cat did it. The cat did it. The cat did it. The cat did it. The cat did it. The cat did it. The cat did it. The cat did it. The cat did it. ',
      },
      {
        coverImage:'./assets/img/cat3.jpg',
        name: 'Phone Standard',
        price: 299,
        description: '',
        heading1: 'neko!',
        heading2: 'neko! neko!',
        heading3: 'neko! neko! neko!',
        headingtext1: 'When the cat\'s away, the mice will play. When the cat\'s away, the mice will play. When the cat\'s away, the mice will play.',
        headingtext2: 'Let’s see which way the cat jumps. Let’s see which way the cat jumps. Let’s see which way the cat jumps. Let’s see which way the cat jumps. ',
        headingtext3: 'The cat did it. The cat did it. The cat did it. The cat did it. The cat did it. The cat did it. The cat did it. The cat did it. The cat did it. ',
      },
      {
        coverImage:'./assets/img/cat4.jpg',
        name: 'Phone Super',
        price: 9999,
        description: 'A super phone with one of the best cameras',
        heading1: 'neko!',
        heading2: 'neko! neko!',
        heading3: 'neko! neko! neko!',
        headingtext1: 'When the cat\'s away, the mice will play. When the cat\'s away, the mice will play. When the cat\'s away, the mice will play.',
        headingtext2: 'Let’s see which way the cat jumps. Let’s see which way the cat jumps. Let’s see which way the cat jumps. Let’s see which way the cat jumps. ',
        headingtext3: 'The cat did it. The cat did it. The cat did it. The cat did it. The cat did it. The cat did it. The cat did it. The cat did it. The cat did it. ',
      }
    ]
  }

  async initDb (){
    await this.cleanDb()
    this.pushProductsToDb()
  }

  async cleanDb(){
    await Product.deleteMany({}) //この命令が終わるまで待ち
  }

  pushProductsToDb(){
    this.products.forEach(
      (product) => {
        const newProduct =new Product(product)
        newProduct.save()
      }
    )
  }

  saveDb(){
    this.pushProductsToDb()
  }
}

module.exports = FakeDb
