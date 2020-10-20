const database = require('./db');
const saveOrphanage = require('./saveOrphanage');

database.then(async db => {
  //Inserir dados na tabela 
  /*await saveOrphanage(db, {
    lat: "-19.938164",
    lng: "-43.958319",
    name: "Lar das crianças",
    about: "Presta assistência a crianças de 06 a 15 anos que se encontrem em situação de risco e/ou vulnerabilidade social.",
    whatsapp: "31 9 9888 8888",
    images: [
      "https://images.unsplash.com/photo-1591851395349-6d8c2fe76e24?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjF9",
      "https://images.unsplash.com/photo-1582140140291-29a99a90ee2d?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjF9",
      "https://images.unsplash.com/photo-1516189997422-95e31c89369d?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjF9"
    ].toString(),
    instructions: "Venha como se sentir a vontade e traga muito amor e paciência para dar.",
    opening_hours: "Horário de visitas Das 9h até 18h",
    open_on_weekends: "0"
  });*/
  
  //Consultar dados da tabela
   const selectedOrphanages = await db.all("SELECT * FROM orphanages")
   console.log(selectedOrphanages)

  //Consultar somente um orfanato pelo id
  // const selectedOrphanage = await db.all('SELECT * FROM orphanages WHERE id = 3')
  // console.log(selectedOrphanage)

  //Deletar dado da tabela
  //console.log(await db.run("DELETE FROM orphanages WHERE id = '4'"));
})