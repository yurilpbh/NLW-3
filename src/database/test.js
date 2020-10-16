const database = require('./db');
const saveOrphanage = require('./saveOrphanage');

database.then(async db => {
  //Inserir dados na tabela 
  /*await saveOrphanage(db, {
    lat: "-27.222633",
    lng: "-49.6555874",
    name: "Lar dos meninos",
    about: "Presta assistência a crianças de 06 a 15 anos que se encontre em situação de risco e/ou vulnerabilidade social.",
    whatsapp: "91918181",
    images: [
      "https://images.unsplash.com/photo-1581701391032-33cb5e7b44fe?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjF9",

      "https://images.unsplash.com/photo-1576025773492-cc2eb828c42a?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjF9"
    ].toString(),
    instructions: "Venha como se sentir a vontade e traga muito amor e paciência para dar.",
    opening_hours: "Horário de visitas Das 8h até 18h",
    open_on_weekends: "0"
  });
  */ 
  //Consultar dados da tabela
  const selectedOrphanages = await db.all("SELECT * FROM orphanages")
  console.log(selectedOrphanages)

  //Consultar somente um orfanato pelo id
  // const selectedOrphanage = await db.all('SELECT * FROM orphanages WHERE id = 3')
  // console.log(selectedOrphanage)

  //Deletar dado da tabela
  //console.log(await db.run("DELETE FROM orphanages WHERE id = '4'"));
})