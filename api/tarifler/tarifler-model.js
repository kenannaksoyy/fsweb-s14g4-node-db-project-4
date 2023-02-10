const db = require("../../data/db-config");

exports.idyeGoreTarifGetir = async tarif_id => {
    const rows = await db("tarifler as ta")
        .leftJoin("adimlar as ad", "ta.tarif_id", "ad.tarif_id")
        //tarifler tablosunu adimlar tablosu birlesimi sahiplenici tarif_id
        .leftJoin("adimlar_malzemeler as adm", "ad.adim_id", "adm.adim_id")
        //adimlar_malzemeler tablosu kopru olan adimlar tablosu birlesimi sahiplenici adim_id
        .leftJoin("malzemeler as ma", "adm.malzeme_id", "ma.malzeme_id")
        //malzemeler tablosu kopru olan adimlar_malzemeler tablosu birlesimi sahiplenici malzeme_id
        //boylece 4 tablo köpruler ve sahiplendirici key ile birleşimi sağlandı
        .select(
            "ta.tarif_adi", "ta.tarif_id", "ta.kayıt_tarihi",
            "ad.adim_id", "ad.adim_sirasi", "ad.adim_talimati",
            "ma.malzeme_id", "ma.malzeme_adi","ma.birim",
            "adm.miktar"
        )
        //istenenleri aldık
        .where("ta.tarif_id", tarif_id);
    
    if(rows.length===0){
        return 0;
    }
    const tarif = { 
        tarif_id : rows[0].tarif_id,
        tarif_adi : rows[0].tarif_adi,
        kayit_tarih :rows[0].kayıt_tarihi,
        adimlar : [],
    }      
    rows.forEach( row => {
        const adim = {
            adim_sirasi : row.adim_sirasi,
            adim_id : row.adim_id,
            adim_talimati : row.adim_talimati,
            icindekiler : []
        }
        if (!row.malzeme_adi) {
            tarif.adimlar.push(adim)
        } 
        else if (!tarif.adimlar.find(adim => adim.adim_id === row.adim_id)) 
        {
            const icindeki = {
                icindekiler_id:row.malzeme_id, 
                icindekiler_adi: row.malzeme_adi, 
                miktar: row.miktar, 
                birim : row.birim
            }
            adim.icindekiler.push(icindeki)
            tarif.adimlar.push(adim)
        }
        
        else { 
            tarif.adimlar.find(adim => adim.adim_id === row.adim_id)
            .icindekiler
            .push(
                {
                icindekiler_id:row.malzeme_id, 
                icindekiler_adi: row.malzeme_adi, 
                miktar: row.miktar, 
                birim : row.birim 
                }
            )
        }
    });
    return tarif;
};

/*
{
  "tarif_id" : 1,
  "tarif_adi": "Spagetti Bolonez",
  "kayit_tarihi": "2021-01-01 08:23:19.120",
  "adimlar": [
    {
      "adim_id": 11,
      "adim_sirasi": 1,
      "adim_talimati": "Büyük bir tencereyi orta ateşe koyun",
      "icindekiler": []
    },
    {
      "adim_id": 12,
      "adim_sirasi": 2,
      "adim_talimati": "1 yemek kaşığı zeytinyağı ekleyin",
      "icindekiler": [
        { "icindekiler_id": 27, "icindekiler_adi": "zeytinyağı", "miktar": 0.014 }
      ]
    },
  ]
}
*/