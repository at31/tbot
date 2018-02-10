const MongoClient = require('mongodb').MongoClient;
const chai = require('chai');
const assert = require('chai').should();
const expect = require('chai').expect;
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

const DB_URL = 'mongodb://localhost:27017';
const DB_NAME = 'tbot';
const COLLECTION_NAME = 'diaryinfo';

describe('Mongo', function() {
	describe('MongoClient', function() {
		it('should return db when connect', function(done) {

			let MongoHelper = function (dbURL, dbName, collectionName){
				return new Promise((resolve, reject)=>{
					MongoClient.connect(dbURL, function (err, client) {
						if(err!==null){
							reject(err);
						}
						let db = client.db(dbName);
						let collection = db.collection(collectionName);
						resolve(collection);
					});
				});
			};

			MongoHelper(DB_URL, DB_NAME, COLLECTION_NAME)//.should.eventually.to.be.an('object');
				.then(doc=>{
					expect(doc).to.be.a('object');
					done();
				}).catch(err=>{
					done(err);
				});

		});
	});
});
