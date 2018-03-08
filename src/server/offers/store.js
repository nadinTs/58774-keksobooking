const db = require(`../../database/index`);

const setupCollection = async () => {
  const dBase = await db;

  const collection = dBase.collection(`offers`);

  collection.createIndex({date: -1}, {unique: true});
  return collection;
};

class OfferStore {
  constructor(collection) {
    this.collection = collection;
  }

  async getOffer(offerDate) {
    return (await this.collection).findOne({
      date: offerDate
    });
  }

  async getAllOffers() {
    return (await this.collection).find();
  }

  async save(offerData) {
    return (await this.collection).insertOne(offerData);
  }
}

module.exports = new OfferStore(setupCollection().catch((e) => console.error(`Failed to set up "offer"-collection`, e)));
