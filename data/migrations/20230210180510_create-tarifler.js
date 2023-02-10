/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

/*
    ->tarifler tablosu
       - tarif_id -pri key-
       - tarif_adi
       - kayıt_tarihi
  
    ->adımlar tabosu
       - adim_id -fro key-
       - adim_sirasi
       - adim_talimati
       - tarif_id -fro key-

    ->adımlar_malzemeler tablosu
       - adımlar_malzemeler_id" -pri key-
       - miktar 
       - adım_id -fro key-
       - malzeme_id -fro key-

    ->malzemeler tablosu
       - malzeme_id   -pri key-
       - malzeme_adi
       - birim
*/

exports.up = function(knex) {
    const all = knex.schema
    .createTable("tarifler", t => {
        t.increments("tarif_id");
        t.string("tarif_adi",128/*Sınır*/).notNullable().unique();
        t.timestamp("kayıt_tarihi").defaultTo(knex.fn.now());//anlık zaman
    })
    .createTable("adimlar", t => {
        t.increments("adim_id");
        t.integer("adim_sirasi").unsigned().notNullable();
        t.string("adim_talimati",256).notNullable();
        
        t.integer("tarif_id").unsigned().notNullable()
        .references("tarif_id")//tarif sahiplendirici
        .inTable("tarifler")//bağlı tablosu
        .onUpdate("CASCADE").onDelete("CASCADE");//tarifler tablosuna bağlı olduğu için işlemler etkilenmesi
    })
    .createTable("malzemeler", t => {
        t.increments("malzeme_id");
        t.string("malzeme_adi",128).notNullable();
        t.string("birim",32).notNullable();
    })
    .createTable("adimlar_malzemeler", t => {
        t.increments("adimlar_malzemeler_id");
        t.float("miktar").unsigned();
        
        t.integer("adim_id").unsigned().notNullable()
        .references("adim_id")//adim sahiplendirici
        .inTable("adimlar")//bağlı tablosu
        .onUpdate("CASCADE").onDelete("CASCADE");//adim tablosuna bağlı olduğu için işlemler etkilenmesi

        t.integer("malzeme_id").unsigned().notNullable()
        .references("malzeme_id")//malzeme sahiplendirici
        .inTable("malzemeler")//bağlı tablosu
        .onUpdate("CASCADE").onDelete("CASCADE");//malzeme tablosuna bağlı olduğu için işlemler etkilenmesi

    })

    //Bağlantılara bağlı olan tabloları sıralaması önemli
    return all;
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema
  .dropTableIfExists("adimlar_malzemeler")
  .dropTableIfExists("malzemeler")
  .dropTableIfExists("adimlar")
  .dropTableIfExists("tarifler");
  //up tabloların tam tersi sırasıyla
};
